import { buscarDados } from "../dadosCard/buscarDados.js";

const API = "http://localhost:3000";

// Pega o ID do título pela URL (detalhes.html?id=3)
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

// Elementos do HTML
const breadcrumbTitulo = document.querySelector("#breadcrumb-titulo");
const breadcrumbCategoria = document.querySelector("#breadcrumb-categoria");

const titulo = document.querySelector("#work-title");
const tituloOriginal = document.querySelector("#work-original-title");

const imagem = document.querySelector("#work-poster-img");
const banner = document.querySelector("#work-banner-bg");

const metaTags = document.querySelector("#work-meta-tags");
const ano = document.querySelector("#work-year");
const sinopse = document.querySelector("#work-synopsis");
const generos = document.querySelector("#work-genres");

const notaGrande = document.querySelector("#work-score");
const totalVotos = document.querySelector("#work-votes");
const estrelasTopo = document.querySelector(".stars-display");

const listaAvaliacoes = document.querySelector(".reviews-list");
const contadorAvaliacoes = document.querySelector(".reviews-count-label");
const notaResumo = document.querySelector(".big-score");
const estrelasResumo = document.querySelector(".stars-row");
const barras = document.querySelectorAll(".bar-row");

// Campos que ainda não existem no banco: escondemos para não mostrar dados de outra obra
const camposSemDados = [
    "#work-tagline", "#work-duration", "#work-age", "#work-country", ".credits-col"
];

// ---------- utilitários ----------

function formatarTipo(tipo) {
    const tipos = { "filme": "FILME", "série": "SÉRIE", "anime": "ANIME" };
    return tipos[tipo?.toLowerCase()] || tipo?.toUpperCase() || "";
}

function formatarNota(n) {
    return Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// "2026-10-01..." -> "01/10/2026" (sem passar por Date, para não deslocar o dia)
function formatarData(valor) {
    const [a, m, d] = String(valor).slice(0, 10).split("-");
    return `${d}/${m}/${a}`;
}

function preencherEstrelas(container, nota) {
    container.replaceChildren();
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.className = "star" + (nota >= i ? " filled" : nota >= i - 0.5 ? " half" : "");
        star.textContent = "★";
        container.appendChild(star);
    }
}

function textoAvaliacoes(qtd) {
    return `${qtd.toLocaleString("pt-BR")} ${qtd === 1 ? "avaliação" : "avaliações"}`;
}

// ---------- dados do título ----------

async function carregarDetalhes() {
    try {
        if (!id || !Number.isInteger(Number(id))) {
            throw new Error("ID do título inválido.");
        }

        const resposta = await buscarDados(`${API}/DetalhesTitulos/${id}`);
        // aceita objeto ou array de uma linha
        const dados = Array.isArray(resposta) ? resposta[0] : resposta;

        if (!dados || !dados.id_titulo || !dados.nome) {
            throw new Error(`A API não devolveu os dados do título ${id}: ${JSON.stringify(resposta)}`);
        }

        titulo.textContent = dados.nome;
        breadcrumbTitulo.textContent = dados.nome;
        tituloOriginal.textContent = dados.nome;

        imagem.src = dados.imagem_url;
        imagem.alt = `Pôster de ${dados.nome}`;
        banner.style.backgroundImage = `url("${dados.imagem_url}")`;

        ano.textContent = dados.ano_lancamento;

        const tipoFormatado = formatarTipo(dados.tipo);
        const listaGeneros = dados.generos ? dados.generos.split(", ") : [];
        metaTags.textContent = [tipoFormatado, ...listaGeneros.map(g => g.toUpperCase())].join(" • ");
        breadcrumbCategoria.textContent = tipoFormatado;

        sinopse.textContent = dados.sinopse;

        generos.replaceChildren();
        listaGeneros.forEach(nome => {
            const pill = document.createElement("span");
            pill.classList.add("genre-pill");
            pill.textContent = nome;
            generos.appendChild(pill);
        });

        camposSemDados.forEach(seletor => {
            const el = document.querySelector(seletor);
            if (el) el.style.display = "none";
        });

        document.title = `Vault — ${dados.nome}`;
    } catch (erro) {
        console.error("Erro ao carregar detalhes:", erro);
        titulo.textContent = "Título não encontrado";
        sinopse.textContent = `Não foi possível carregar as informações desta obra (${erro.message}).`;
    }
}

// ---------- média e avaliações ----------

function criarCardAvaliacao(a) {
    const card = document.createElement("article");
    card.className = "review-card";
    card.innerHTML = `
        <div class="review-card-top">
            <div class="reviewer-info">
                <div class="reviewer-avatar"></div>
                <div>
                    <span class="reviewer-name"></span>
                    <span class="review-date"></span>
                </div>
            </div>
            <div class="review-stars"></div>
        </div>
        <p class="review-text"></p>`;

    card.querySelector(".reviewer-avatar").textContent = a.nome_usuario.slice(0, 2).toUpperCase();
    card.querySelector(".reviewer-name").textContent = a.nome_usuario;
    card.querySelector(".review-date").textContent = formatarData(a.data_avaliacao);
    card.querySelector(".review-text").textContent = a.comentario ?? "";
    preencherEstrelas(card.querySelector(".review-stars"), Number(a.nota));
    return card;
}

const LIMITE_INICIAL = 5;
let todasAvaliacoes = [];
let mostrarTodas = false;

const seletorOrdem = document.querySelector(".reviews-sort-select");
const botaoVerTodas = document.querySelector(".btn-see-all-reviews");

function ordenarAvaliacoes(lista) {
    const ordem = seletorOrdem ? seletorOrdem.selectedIndex : 0;
    const recentes = (x, y) => String(y.data_avaliacao).localeCompare(String(x.data_avaliacao)) || y.id_avaliacao - x.id_avaliacao;

    return [...lista].sort((x, y) => {
        if (ordem === 2) return (Number(y.nota) - Number(x.nota)) || recentes(x, y);      // maiores notas
        if (ordem === 0) return ((y.comentario?.length ?? 0) - (x.comentario?.length ?? 0)) || recentes(x, y); // mais relevantes
        return recentes(x, y);                                                              // mais recentes
    });
}

// Se o usuário logado já avaliou este título, trava o formulário
function atualizarEstadoFormulario() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    const jaAvaliou = !!usuario && todasAvaliacoes.some(a => Number(a.id_usuario) === Number(usuario.id));
    if (!jaAvaliou) return;

    document.querySelector(".btn-publish-review").disabled = true;
    document.querySelector("#review-comment").disabled = true;
    document.querySelectorAll(".rating-pill").forEach(p => { p.disabled = true; });
    document.querySelector(".publish-disclaimer").textContent = "Você já avaliou esta obra.";
}

function renderizarLista() {
    listaAvaliacoes.replaceChildren();

    if (todasAvaliacoes.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "review-text";
        vazio.textContent = "Ainda não há avaliações para esta obra. Seja o primeiro!";
        listaAvaliacoes.appendChild(vazio);
    }

    const ordenadas = ordenarAvaliacoes(todasAvaliacoes);
    const visiveis = mostrarTodas ? ordenadas : ordenadas.slice(0, LIMITE_INICIAL);
    visiveis.forEach(a => listaAvaliacoes.appendChild(criarCardAvaliacao(a)));

    atualizarEstadoFormulario();

    if (botaoVerTodas) {
        botaoVerTodas.style.display = todasAvaliacoes.length > LIMITE_INICIAL ? "" : "none";
        botaoVerTodas.textContent = mostrarTodas ? "Ver menos ↑" : "Ver todas as avaliações →";
    }
}

function iniciarListaAvaliacoes() {
    seletorOrdem?.addEventListener("change", renderizarLista);
    botaoVerTodas?.addEventListener("click", () => {
        mostrarTodas = !mostrarTodas;
        renderizarLista();
    });
}

async function carregarAvaliacoes() {
    try {
        const [resumo] = await buscarDados(`${API}/media/${id}`);
        const avaliacoes = await buscarDados(`${API}/avaliacoes/${id}`);

        const qtd = Number(resumo.quantidade);
        const media = resumo.media === null ? null : Number(resumo.media);
        const textoNota = media === null ? "—" : formatarNota(media);

        // topo da página
        notaGrande.textContent = textoNota;
        totalVotos.textContent = `${textoAvaliacoes(qtd)} da comunidade`;
        preencherEstrelas(estrelasTopo, media ?? 0);

        // resumo da seção de avaliações
        contadorAvaliacoes.textContent = textoAvaliacoes(qtd);
        notaResumo.textContent = textoNota;
        preencherEstrelas(estrelasResumo, media ?? 0);

        // barras de distribuição (5★ na primeira linha ... 1★ na última)
        const contagem = [0, 0, 0, 0, 0, 0];
        avaliacoes.forEach(a => { contagem[Math.min(5, Math.max(1, Math.ceil(Number(a.nota))))]++; });
        barras.forEach((barra, i) => {
            const pct = qtd ? Math.round((contagem[5 - i] / qtd) * 100) : 0;
            barra.querySelector(".bar-fill").style.width = `${pct}%`;
            barra.querySelector(".bar-percent").textContent = `${pct}%`;
        });

        // lista
        todasAvaliacoes = avaliacoes;
        mostrarTodas = false;
        renderizarLista();
    } catch (erro) {
        console.error("Erro ao carregar avaliações:", erro);
    }
}

// ---------- formulário de avaliação ----------

function iniciarFormulario() {
    const form = document.querySelector("#review-form");
    const campoNome = document.querySelector("#display-name");
    const campoComentario = document.querySelector("#review-comment");
    const aviso = document.querySelector(".publish-disclaimer");

    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    if (usuario) {
        campoNome.value = usuario.nome;
    } else {
        campoNome.placeholder = "Faça login para avaliar";
        aviso.textContent = "Você precisa estar logado para publicar uma avaliação.";
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!usuario) {
            window.location.href = "login.html";
            return;
        }

        const pillAtiva = document.querySelector(".rating-pill.active");
        if (!pillAtiva) {
            aviso.textContent = "Escolha uma nota antes de publicar.";
            return;
        }

        try {
            const resposta = await fetch(`${API}/enviarAvaliacao`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nota: pillAtiva.dataset.value,
                    comentario: campoComentario.value.trim() || null,
                    data_avaliacao: new Date().toLocaleDateString("en-CA"), // AAAA-MM-DD, data local
                    id_titulo: Number(id),
                    id_usuario: usuario.id
                })
            });
            const resultado = await resposta.json();

            if (!resposta.ok) {
                aviso.textContent = resultado.erro || "Não foi possível publicar a avaliação.";
                return;
            }

            aviso.textContent = "Avaliação publicada!";
            campoComentario.value = "";
            campoComentario.dispatchEvent(new Event("input"));
            await carregarAvaliacoes();
        } catch (erro) {
            console.error("Erro ao enviar avaliação:", erro);
            aviso.textContent = "Erro de conexão com o servidor.";
        }
    });
}

iniciarListaAvaliacoes();
carregarDetalhes();
carregarAvaliacoes();
iniciarFormulario();

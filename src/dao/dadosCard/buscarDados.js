async function buscarDados(url) {
    const resp = await fetch(url)
    if (!resp.ok) throw new Error(`Erro ${resp.status} ao buscar ${url}`)
    return await resp.json()
}

export {buscarDados}
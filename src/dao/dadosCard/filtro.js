import { formatString } from "./barraDePesquisa.js"
import { setTipo } from "./estadoFiltro.js"

function iniciarFiltro(btns) {
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(button => button.classList.remove('active'))
            btn.classList.add('active')

            setTipo(formatString(btn.textContent))
        })
    })
}

export { iniciarFiltro }
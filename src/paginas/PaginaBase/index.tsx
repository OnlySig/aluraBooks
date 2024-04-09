import { Outlet } from "react-router-dom"
import BarraNavegacao from "../../componentes/BarraNavegacao"
import Rodape from "../../componentes/Rodape"
import TagsCategorias from "../../componentes/TagsCategorias"
import Newsletter from "../../componentes/Newsletter"

const PaginaBase = () => {
    return (<main>
        <BarraNavegacao />
        <Outlet />
        <TagsCategorias/>
        <Newsletter/>
        <Rodape />
    </main>)
}

export default PaginaBase
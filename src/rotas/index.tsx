import { Route, Routes } from "react-router-dom"
import Home from "../paginas/Home"
import PaginaBase from "../paginas/PaginaBase"
import MinhaConta from "../paginas/MinhaConta"
import Pedidos from "../paginas/MinhaConta/Pedidos"
import Trocas from "../paginas/MinhaConta/Trocas"

const Rotas = () => {
    return (<Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path="/" element={<Home />} />
        <Route path='/minha-conta' element={<MinhaConta />}>
          <Route path="pedidos" element={<Pedidos/>}/>
          <Route path="trocas" element={<Trocas/>}/>
        </Route>
      </Route>
    </Routes>)
}

export default Rotas
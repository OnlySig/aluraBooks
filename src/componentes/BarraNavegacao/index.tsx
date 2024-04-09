import { Link, useLocation, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import logado from './assets/minhaConta.svg'
import delogar from './assets/logout.svg'
import './BarraNavegacao.css'
import ModalRegisterUser from "../ModalRegisterUser"
import { useEffect, useState } from "react"
import ModalLoginUser from "../ModalLoginUser"
import { useDellToken, useObterToken } from "../../hooks/token"
import http from "../../http"
import { ICategoria } from "../../interfaces/ICategoria"

const BarraNavegacao = () => {
    const nav = useNavigate()
    const token = useObterToken()
    const removeToken = useDellToken
    const irMinhaConta = () => nav('/minha-conta/pedidos')
    const efetuarLogout = () => {
        setUserLogged(false)
        removeToken()
        nav('/')
    }
    const [modalToggle, setModalToggle] = useState(false)
    const [modalToggleLogin, setModalToggleLogin] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [categorias, setCategorias] = useState<ICategoria[]>([])
    const { pathname } = useLocation()
    useEffect(()=>{if(token != null)setUserLogged(true)},[token])
    useEffect(()=>{http.get('categorias').then(resp=>setCategorias(resp.data)).catch(error=>console.log(error))},[])
    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo da AluraBooks" />
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    {categorias.map(categoria => 
                        <li key={categoria.id}>
                            <Link to={`/categorias/${categoria.slug}`}>
                                {categoria.nome}
                            </Link>
                        </li>
                    )}
                </ul>
            </li>
            {pathname === '/minha-conta/pedidos' && 
                <>
                    <li><a href="#!">FAVORITOS</a></li>
                    <li><a href="#!">MINHA ESTANTE</a></li>
                </>
            }
        </ul>
        <ul className="acoes">
            {!userLogged && 
            <>
                <li>
                    <BotaoNavegacao texto="Login" textoAltSrc="Icone representando um usuário" imagemSrc={usuario} onClick={()=>setModalToggleLogin(true)}/>
                </li>
                <li>
                    <BotaoNavegacao texto="Cadastrar-se" textoAltSrc="Icone representando um usuário" imagemSrc={usuario} onClick={()=>setModalToggle(true)}/>
                    <ModalRegisterUser aoAbrir={modalToggle} aoFechar={()=>setModalToggle(false)}/>
                    <ModalLoginUser aoAbrir={modalToggleLogin} aoCriar={setModalToggle} aoFechar={()=>setModalToggleLogin(false)}/>
                </li>
            </>}
            {userLogged && 
                <>
                    <li><BotaoNavegacao texto={pathname === '/minha-conta/pedidos' ? "Meu perfil" : 'Minha conta'} imagemSrc={logado} textoAltSrc="Icone logado" onClick={irMinhaConta}/></li>
                    <li><BotaoNavegacao imagemSrc={delogar} textoAltSrc="logout/sair" onClick={efetuarLogout}/></li>
                </>
            }
        </ul>
    </nav>)
}

export default BarraNavegacao
import { AbCampoTexto, AbModal } from "ds-alurabooks"
import ImgModal from '../ModalRegisterUser/assets/login.png'
import './ModalLogin.css'
import { useEffect, useState } from "react"
import { useCriarToken } from "../../hooks/token"
import http from "../../http"

interface loginProps {
    aoAbrir: boolean
    aoFechar: ()=>void
    aoCriar: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalLoginUser = ({ aoAbrir, aoFechar, aoCriar } : loginProps) => {
    const [email, setEmail] = useState('vinicios.neves@alura.com')
    const [senha, setSenha] = useState('123')
    const [error, setError] = useState('')
    const criarToken = useCriarToken()

    const logar = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const user = {
            email,
            senha
        }
        http.post('public/login', user)
        .then(res=>{
            criarToken(res.data.access_token)
            setEmail('')
            setSenha('')
            aoFechar()
        })
        .catch(error=>{
            error?.response?.data?.message ? setError(error.response.data.message) : setError('Erro inesperado, entre em contato com o suporte!')
        })
    }
    const createAccount = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        aoCriar(true)
        aoFechar()
    }
    useEffect(()=>{
        setTimeout(()=>{
            setError('')
        }, 4000)
    },[error])
    return(
        <AbModal titulo="LOGIN" aberta={aoAbrir} aoFechar={aoFechar}>
            <div className="modal__container">
                <img src={ImgModal} alt="sla kkkkkkkkkkk" className="login__modal__imagem"/>
                <form className="form__login__container">
                    <AbCampoTexto value={email} onChange={e=>setEmail(e)} label="E-mail" placeholder="seuemail@maneiro.com.br"/>
                    <AbCampoTexto value={senha} onChange={e=>setSenha(e)} label="Senha" placeholder="************"/>
                    <div className="login__actions__container">
                        {<span><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">{error}</a></span>}
                        <div className="login__actions">
                            <a href="https://github.com/OnlySig" target="_blank" rel="noopener noreferrer">Esqueci minha senha</a>
                            <button onClick={logar}>Fazer login</button>
                        </div>
                        <div className="login__actions createAccount">
                            <h3>Ainda não tem uma conta?</h3>
                            <button onClick={createAccount}>Criar conta</button>
                        </div>
                    </div>
                    <hr/>
                </form>
            </div>
        </AbModal>
    )
}

export default ModalLoginUser
import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
import ImgLogin from './assets/login.png'
import { useState } from "react"
import './ModalRegister.css'
import http from "../../http"

interface modalProps {
    aoAbrir: boolean
    aoFechar: () => void
}

const ModalRegisterUser = ({ aoAbrir, aoFechar } : modalProps) => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [endereco, setEndereco] = useState('')
    const [complemento, setComplemento] = useState('')
    const [cep, setCep] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConfirma, setSenhaConfirma] = useState('')
    const [erro, setErro] = useState('')
    const cadastrar = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = {
            nome,
            email,
            endereco,
            complemento,
            cep,
            senha,
            senhaConfirma
        }
        http.post('public/registrar', user)
            .then(() => {
                setNome('')
                setEmail('')
                setEndereco('')
                setComplemento('')
                setCep('')
                setCep('')
                setSenha('')
                setSenhaConfirma('')
                aoFechar()
            })
            .catch(error =>{
                setErro(error.response.data.message)
            })
    }
    return(
        <AbModal titulo="CADASTRAR" aberta={aoAbrir} aoFechar={aoFechar}>
            <div className="modal__container">
                <img className="modal__image" src={ImgLogin} alt="Monitor com uma fechadura e uma pessoa com uma chave" />
                <section className="form__container" onSubmit={cadastrar}>
                    <AbCampoTexto label="Nome" placeholder="Seu nome completo" value={nome} onChange={(e)=>setNome(e)}/>
                    <AbCampoTexto label="Email" type="email" placeholder="seuemail@maneiro.com.br" value={email} onChange={(e)=>setEmail(e)}/>
                    <AbCampoTexto label="Endereço" placeholder="Sua rua é número" value={endereco} onChange={(e)=>setEndereco(e)}/>
                    <div className="inputs__row">
                        <AbCampoTexto label="Complemento" placeholder="Apto/casa, bloco, referência" value={complemento} onChange={(e)=>setComplemento(e)}/>
                        <AbCampoTexto label="CEP" placeholder="Apto/casa e bloco" value={cep} onChange={(e)=>setCep(e)}/>
                    </div>
                    <AbCampoTexto label="Senha" type="password" placeholder="************" value={senha} onChange={(e)=>setSenha(e)}/>
                    <AbCampoTexto label="Confirmar senha" type="password" placeholder="************" value={senhaConfirma} onChange={(e)=>setSenhaConfirma(e)}/>
                    {erro && <p>{erro}</p>}
                    <div className="button__container">
                        <AbBotao texto="Cadastrar" />
                    </div>
                </section>
            </div>
        </AbModal>
    )
}

export default ModalRegisterUser
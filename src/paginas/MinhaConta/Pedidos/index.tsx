import { AbBotao } from "ds-alurabooks"
import { useEffect, useState } from "react"
import { IPedidos } from "../../../interfaces/IPedidos"
import { useNavigate } from "react-router-dom"
import http from "../../../http"
import { useFormatar } from "../../../hooks/formatar"

const Pedidos = () => {
    const [pedidos, setPedidos] = useState<IPedidos[]>([])
    const nav = useNavigate()

    useEffect(()=> {
        http.get('pedidos')
        .then(resp=>setPedidos(resp.data))
        .catch(error => {
            error && nav('/')
            alert('Erro inesperado, contate o suporte')
        })
    }, [nav])

    const excluir = (id: number) => {
        http.delete(`pedidos/${id}`)
        .then(()=>setPedidos(pedidos.filter(pedido => pedido.id !== id)))
        .catch(error => console.log(error))
    }
    const formatar = useFormatar('pt-br', 'BRL')
    return(
        <>
            <h2>Pedidos</h2>
            {pedidos.map(pedido=>
                <div className='pedido__container' key={pedido.id}>
                    <div className='pedido__infos'>
                        <p>Pedido: <strong>{pedido.id}</strong></p>
                        <p>Data do pedido: <strong>{new Date(pedido.data).toLocaleDateString()}</strong></p>
                        <p>Valor total: <strong>{formatar.format(pedido.total)}</strong></p>
                        <p>Entrega realizada em: <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong></p>
                    </div>
                    <div className='pedido__btn__container'>
                        <AbBotao texto='X' onClick={()=>excluir(pedido.id)}/>
                        <AbBotao texto='Detalhes'/>
                    </div>
                </div>
            )}
        </>
    )
}
export default Pedidos
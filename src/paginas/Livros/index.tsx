import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAutoresPorId, getLivrosComSlug } from "../../http"
import TituloPrincipal from "../../componentes/TituloPrincipal"
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade } from "ds-alurabooks"
import { useFormatar } from "../../hooks/formatar"
import './LivroInfo.css'
import Loader from "../../componentes/Loader"
import { ILivro } from "../../interfaces/ILivro"
import { AxiosError } from "axios"

const Livros = () => {
    const { slug } = useParams()
    const { data: livro, isLoading, error } = useQuery<ILivro | null, AxiosError>(['LivroSlug', slug], ()=> getLivrosComSlug(slug??''))
    const { data: autor } = useQuery(['autorKey', livro], ()=> getAutoresPorId(livro?.autor??0))
    const formatar = useFormatar('pt-br', 'BRL')
    const opcoes: AbGrupoOpcao[] = livro?.opcoesCompra ? livro.opcoesCompra.map(opcao =>({
        id: opcao.id,
        corpo: formatar.format(opcao.preco),
        titulo: opcao.titulo,
        rodape: opcao.formatos ? opcao.formatos.join(',') : ''
    }))
    : []
    if(error) {
        return <h1>Ops, um erro aconteceu inesperadamente!</h1>
    }
    if(livro === null) {
        return <h1>Livro não encontrado!</h1>
    }
    if(isLoading || !livro) {
        return <Loader/>
    }
    return (
        <>
            <TituloPrincipal title="Detalhes do livro"/>
            {livro !== undefined && autor !== undefined &&
                <section className="container__livro">
                    <div className="item__livroInfo">
                        <img className="image__livro" src={livro.imagemCapa} alt={`Capa do livro: ${livro.titulo}`} />
                        <div className="infos__livro">
                            <h1>{livro.titulo}</h1>
                            <h3>{livro.descricao}</h3>
                            <span>Por: {autor[0].nome}</span>
                            <h2>Selecione o formato de seu livro:</h2>
                            <div className="opcoes__livro">
                                <AbGrupoOpcoes opcoes={opcoes} valorPadrao={opcoes[2]} />
                            </div>
                            <span className="span__livro">*Você terá acesso às futuras atualizações do livro.</span>
                            <div>
                                <AbInputQuantidade />
                            </div>
                            <AbBotao texto="Comprar"/>
                        </div>
                    </div>
                    <div className="footer__container">
                        <footer>
                            <h2>Sobre o autor</h2>
                            {autor[0].sobre}
                        </footer>
                        <footer>
                            <h2>Sobre o Livro</h2>
                            {livro.sobre}
                        </footer>
                    </div>
                </section>
            }
        </>
    )
}

export default Livros
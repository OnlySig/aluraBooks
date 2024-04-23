import { AbBotao, AbCard } from "ds-alurabooks"
import { useEffect, useState } from "react"
import { ILivro } from "../../interfaces/ILivro"
import './LivrosDestaque.css'
import { getAutoresPorId } from "../../http"
import { useQuery } from "@tanstack/react-query"
import { useFormatar } from "../../hooks/formatar"

interface LivrosDestaqueProps {
    livros: ILivro[] | undefined
}

const LivrosDestaque = ({ livros }: LivrosDestaqueProps) => {
    const [selecionado, selecionarLivro] = useState<ILivro>()
    useEffect(()=>{
        livros?.length && selecionarLivro(livros[1])
    }, [livros])
    const { data: autor } = useQuery(['autoresPorId', selecionado], ()=> getAutoresPorId(selecionado!.autor))
    const fomatar = useFormatar('pt-br', 'BRL')
    return (<section className="LivrosDestaque">
        <div>
            <ul className="livros">
                {livros?.map(livro => 
                    <li key={livro.titulo} onClick={() => selecionarLivro(livro)} className={selecionado?.titulo === livro.titulo ? 'selecionado' : ''}>
                        <img src={livro.imagemCapa} alt={`Capa do livro ${livro.titulo} escrito por ${livro.autor}`} />
                    </li>
                )}
            </ul>
        </div>
        <AbCard>
            {selecionado && autor &&
                <div className="selecionado-detalhes">
                    <header>
                        <h5>Sobre o livro:</h5>
                    </header>
                    <h6>{selecionado?.titulo}</h6>
                    <p>{selecionado?.descricao}</p>
                    <p>Por: {autor![0].nome}</p>
                    <footer>
                        <div className="preco">
                            <em>A partir de:</em>
                            <strong>{fomatar.format(selecionado.opcoesCompra[1].preco)}</strong>
                        </div>
                        <div>
                            <AbBotao texto="Comprar" />
                        </div>
                    </footer>
                </div>
            }
        </AbCard>
    </section>)

}

export default LivrosDestaque
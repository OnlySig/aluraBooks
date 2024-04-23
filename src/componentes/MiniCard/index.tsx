import { AbBotao } from 'ds-alurabooks'
import { Link } from 'react-router-dom'
import { ILivro } from '../../interfaces/ILivro'
import { useFormatar } from '../../hooks/formatar'
import './MiniCard.css'

interface CardLivrosProp {
    livro: ILivro
}

const MiniCard = ( { livro } : CardLivrosProp ) => {
    const formatar = useFormatar('pt-br', 'BRL')
    return (
        <>
            <img src={livro.imagemCapa} alt={`Imagem do livro: ${livro.titulo}`} />
            <div className="box__info">
                <h2>{livro.titulo}</h2>
                <div>
                    A partir de:
                </div>
                <div>
                    {formatar.format(livro.opcoesCompra[1].preco)}
                </div>
                <Link to={`/livro/${livro.slug}`}><AbBotao texto='Comprar'/></Link>
            </div>
        </>
    )
}

export default MiniCard
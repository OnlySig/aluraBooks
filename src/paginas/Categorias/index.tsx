import TituloPrincipal from "../../componentes/TituloPrincipal"
import { getCategoriaPorSlug, getLivros } from "../../http"
import { useParams } from "react-router-dom"
import Loader from "../../componentes/Loader"
import { useQuery } from "@tanstack/react-query"
import MiniCard from "../../componentes/MiniCard"
import './Categorias.css'

const Categorias = () => {
    const { slug } = useParams()
    const { data: categoria, isLoading } = useQuery(['categoriaSlug', slug], ()=> getCategoriaPorSlug(slug || ''))
    const { data: livros } = useQuery(['livrosCategoria', categoria?.id], ()=> getLivros(categoria?.id ?? 0))
    if(isLoading) return <Loader/>
    return (
        <>
            <TituloPrincipal title={categoria?.nome}/>
            <section className="categoria__container">
                {livros!?.length > 0 ? livros?.map(livro=> 
                    <div className="container__box" key={livro.id}>
                        <MiniCard livro={livro}/>
                    </div>
                ) : 'Infelizmente não tem nada aqui, reclama com a api, tenho nada a ver com isso =/'}
            </section>
        </>
  )
}

export default Categorias
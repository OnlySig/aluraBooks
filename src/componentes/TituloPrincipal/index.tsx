import './TituloPrincipal.css'

const TituloPrincipal = ({ title }: { title: string | undefined}) => {
    return(
        <h1 className='tituloPrincipal'>{title}</h1>
    )
}

export default TituloPrincipal
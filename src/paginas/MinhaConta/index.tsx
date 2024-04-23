import Newsletter from '../../componentes/Newsletter'
import TagsCategorias from '../../componentes/TagsCategorias'
import './MinhaConta.css'
import { Link, Outlet, useLocation } from 'react-router-dom'

const MinhaConta = () => {
    const { pathname } = useLocation()
    return(
        <>
            <div className="headerConta">
                Minha conta
            </div>
            <section className="info__account__container">
                <aside className="options__account__container">
                    <ul className='options__itens'>
                        <Link to='/minha-conta/pedidos'><li className={`options__item ${pathname === '/minha-conta/pedidos' && 'is-active__optins__item'}`}>Pedidos</li></Link>
                        <Link to='/minha-conta/trocas'><li className={`options__item ${pathname === '/minha-conta/trocas' && 'is-active__optins__item'}`}>Trocas</li></Link>
                        <li className='options__item'>Cupons</li>
                        <li className='options__item'>Seus dados</li>
                    </ul>
                </aside>
                <div className="info__content__container">
                    <Outlet />
                </div>
            </section>
            <TagsCategorias/>
            <Newsletter/>
        </>
    )
}
export default MinhaConta
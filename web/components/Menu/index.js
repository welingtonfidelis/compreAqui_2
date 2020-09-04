import { Person } from '@material-ui/icons';
import Link from 'next/link';

import Logo from '../../assets/images/logo.png';
import UserLogo from '../../assets/images/user.svg';

export default function Menu(props) {
    console.log('=>', props);

    const options = [
        {
            name: 'Dashboard',
            component: 'Dashboard',
            icon: <Person />
        },
        {
            name: 'Produtos',
            component: 'Product',
            icon: <Person />
        },
        {
            name: 'Pedidos',
            component: 'Order',
            icon: <Person />
        },
    ]
    return (
        <div id="menu-content">
            <header id="menu-logo-img">
                <img src={Logo} alt="logo" srcset="" />
            </header>

            <main id="menu-list-opt">
                {options.map(el => {
                    return (
                        <Link href={el.component} key={el.name}>
                            <div className={ props.page === el.component ? 'menu-selected-opt' : '' }>
                                {el.icon}
                                {el.name}
                            </div>
                        </Link>
                    )
                })}
            </main>

            <footer id="menu-user-img">
                <div className="menu-group-1">
                    <img src={UserLogo} alt="UserLogo" srcset="" />
                    <b>Nome usuário</b>
                </div>
                <div className="menu-group-2">
                    <b>Sair</b>
                </div>
            </footer>
        </div>
    )
}
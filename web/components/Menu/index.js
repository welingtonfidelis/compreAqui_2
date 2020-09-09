import { useEffect, useState } from 'react';
import { CheckBoxOutlineBlank, Dashboard, ExitToApp, Assignment } from '@material-ui/icons';
import Link from 'next/link';
import Router from 'next/router';

import AlertInform from '../AlertInform';
import AlertConfirm from '../AlertConfirm';

import Logo from '../../assets/images/logo.png';
import UserLogo from '../../assets/images/user.svg';

export default function Menu(props) {
    const [name, setName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [showAlertInform, setShowAlertInform] = useState(false);
    const [alertInformText, setAlertInformText] = useState('');
    const [alertInformTitle, setAlertInformTitle] = useState('');
    const [showAlertConfirm, setShowAlertConfirm] = useState(false);
    const [alertConfirmText, setAlertConfirmText] = useState('');
    const [alertConfirmTitle, setAlertConfirmTitle] = useState('');

    useEffect(() => {
        if (!sessionStorage.getItem('compreAqui@token')) {
            alertInform(
                'Sessão inválida',
                'Sinto muito, sua sessão é inválida. Por favor, efetue o login e tente novamente.'
            );
        }
        else {
            setName(sessionStorage.getItem('compreAqui@name'));
            setPhotoUrl(sessionStorage.getItem('compreAqui@photoUrl'));
        }
    }, []);

    const handleBackToLogin = () => {
        Router.push('/');
    }

    const handleExitApp = () => {
        sessionStorage.removeItem('compreAqui@token');
        sessionStorage.removeItem('compreAqui@name');
        sessionStorage.removeItem('compreAqui@photoUrl');

        handleBackToLogin();
    }

    const alertInform = (title, text) => {
        setAlertInformText(text);
        setAlertInformTitle(title);
        setShowAlertInform(true);
    }

    const alertConfirm = (title, text) => {
        title = title ? title : 'Sair da plataforma';
        text = text ? text : 'Gostaria realmente de sair da plataforma?';

        setAlertConfirmText(text);
        setAlertConfirmTitle(title);
        setShowAlertConfirm(true);
    }

    const options = [
        {
            name: 'Dashboard',
            component: 'Dashboard',
            icon: <Dashboard />
        },
        {
            name: 'Pedidos',
            component: 'Order',
            icon: <Assignment />
        },
        {
            name: 'Produtos',
            component: 'Product',
            icon: <CheckBoxOutlineBlank />
        },
    ]

    return (
        <div id="menu-content">
            <AlertInform
                open={showAlertInform}
                close={handleBackToLogin}
                title={alertInformTitle}
                text={alertInformText}
            />

            <AlertConfirm
                open={showAlertConfirm}
                close={setShowAlertConfirm}
                confirm={handleExitApp}
                title={alertConfirmTitle}
                text={alertConfirmText}
            />

            <header id="menu-logo-img">
                <img src={Logo} alt="logo" />
            </header>

            <main id="menu-list-opt">
                {options.map(el => {
                    return (
                        <Link href={el.component} key={el.name}>
                            <div className={props.page === el.component ? 'menu-selected-opt' : ''}>
                                {el.icon}
                                {el.name}
                            </div>
                        </Link>
                    )
                })}
            </main>

            <footer id="menu-user-img">
                <div className="menu-group-1">
                    <img src={photoUrl ? photoUrl : UserLogo} alt="UserLogo" />
                    <b>{name}</b>
                </div>
                <div className="menu-group-2" onClick={() => alertConfirm()}>
                    <b>Sair</b>
                    <ExitToApp color="secondary" />
                </div>
            </footer>
        </div>
    )
}
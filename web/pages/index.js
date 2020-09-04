import Router from 'next/router';

import Input from '../components/Input';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';

import Logo from '../assets/images/logo.png';
import { useState } from 'react';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    console.log('LOGAR');

    Router.push('/Dashboard');
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="login-content">
      <div className="login-conteiner">
        <img src={Logo} alt="Logo" />

        <span>Insira seu usuário/e-mail e senha abaixo</span>

        <div className="login-input-conteiner">
          <Input label="Usuário/E-mail" />

          <Input
            label="Senha"
            type={showPassword ? "text" : "password"}
          />
        </div>

        <ButtonSecondary label="Entrar"/>
        <b>Esqueci minha senha</b>

        <ButtonPrimary label="Cadastre-se"/>
      </div>
    </div>
  )
}

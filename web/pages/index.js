import { useState } from 'react';
import Router from 'next/router';
import { gql } from '@apollo/client';

import api from '../services/api';

import Input from '../components/Input';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import Alert from '../components/Alert';
import AlertInform from '../components/AlertInform';

import Logo from '../assets/images/logo.png';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertInform, setShowAlertInform] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertInformText, setAlertInformText] = useState('');
  const [alertInformTitle, setAlertInformTitle] = useState('');
  const [error, setError] = useState(false);

  const handleNewUser = (e) => {
    e.preventDefault();

    Router.push('/NewUser');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const query = await api.query({
        query: gql`
            query sessionSign ($user: String!, $password: String!) {
              sessionSign(user: $user, password: $password) {
                token
                name
                userType
                photoUrl
              }
            }`,
        variables: {
          user, password
        }
      });

      const { sessionSign } = query.data;
      if(sessionSign.userType !== 'commercial') {
        alertInform(
          'Olá cliente', 
          'Nossa plataforma web ainda está em construção, por favor, utilize o aplicativo.'
        );
      }
      else {
        sessionStorage.setItem('compreAqui@token', sessionSign.token);
        sessionStorage.setItem('compreAqui@name', sessionSign.name);
        sessionStorage.setItem('compreAqui@photoUrl', sessionSign.photoUrl);
        Router.push('/Dashboard');
        return;
      }

    } catch (error) {
      console.log(error);
      alert('Houve um erro ao efeutar seu login', 'error');
      setError(true);
    }
    setLoading(false);
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const alert = (text, type) => {
    setAlertText(text);
    setAlertType(type);
    setShowAlert(true);
  }

  const alertInform = (title, text) => {
    setAlertInformText(text);
    setAlertInformTitle(title);
    setShowAlertInform(true);
  }

  const handleCloseAlertInform = () => {
    setShowAlertInform(false);
  }

  return (
    <div id="login-content">
      <Alert
        open={showAlert}
        close={setShowAlert}
        text={alertText}
        severity={alertType}
      />

      <AlertInform
        open={showAlertInform}
        close={handleCloseAlertInform}
        title={alertInformTitle}
        text={alertInformText}
      />

      <form onSubmit={handleSubmit} className="login-conteiner">
        <img src={Logo} alt="Logo" />

        <span>Insira seu usuário/e-mail e senha abaixo</span>

        <div className="login-input-conteiner">
          <Input
            label="Usuário/E-mail"
            onChange={e => setUser(e.target.value)}
            required
          />

          <Input
            label="Senha"
            type={showPassword ? "text" : "password"}
            onChange={e => setPassword(e.target.value)}
            required
          />

        </div>

        { error && <span className="error-message">Usuário ou senha incorretos</span> }

        <ButtonSecondary label="Entrar" loading={loading} />
        <b>Esqueci minha senha</b>

        <ButtonPrimary label="Cadastre-se" onClick={handleNewUser} />
      </form>
    </div>
  )
}

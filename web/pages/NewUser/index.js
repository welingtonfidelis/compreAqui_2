import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import Router from 'next/router';

import api from '../../services/api';
import utils from '../../services/utils';

import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import Select from '../../components/Select';
import ButtonPrimary from '../../components/ButtonPrimary';
import AlertInform from '../../components/AlertInform';

import UserLogo from '../../assets/images/user.svg';

export default function Product() {
    const [file, setFile] = useState(null);
    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormaData] = useState({});
    const [alertText, setAlertText] = useState('Salvo com sucesso');
    const [alertType, setAlertType] = useState('success');

    useEffect(() => {
        setLoading(true);

        try {
            async function getInfo() {
                const query = await api.query({
                    query: gql`
                        query get {
                            stateIndex{
                                id
                                code
                                name: description
                            }
            
                            categoryIndex {
                                id
                                name
                                photoUrl
                            }
                        }
                    `
                });

                if (query.data) {
                    const { stateIndex, categoryIndex } = query.data;
                    setCategories(categoryIndex);
                    setStates(stateIndex);
                    handleInputChange('category', categoryIndex[0] || null);
                }
            }

            getInfo();
        } catch (error) {
            console.log('ERROR', error);
            alert('Houve um erro ao carregar as informações', 'error');
        }

        setLoading(false);
    }, [])

    const handleSaveUser = async (event) => {
        event.preventDefault()
        console.log('SALVARE');

        try {
            const photo = formData.file ? await utils.fileToBase64(formData.file) : undefined;
            const type = 'commercial';

            const query = await api.mutate({
                mutation: gql`
                mutation userStore(
                        $photo: String $name: String! $email: String!
                        $doc: String! $phone1: String! $phone2: String
                        $user: String! $birth: String! $password: String!
                        $type: String! $cep: String! $street: String!
                        $complement: String $state: String! $number: Int!
                        $city: String! $district: String!
                    ) 
                {
                    userStore(
                        photo: $photo name: $name email: $email
                        doc: $doc phone1: $phone1 phone2: $phone2
                        user: $user birth: $birth password: $password
                        type: $type cep: $cep street: $street
                        complement: $complement state: $state number: $number
                        city: $city district: $district
                    ) 
                }`,
                variables: {
                    photo, name: formData.name, email: formData.email,
                    doc: formData.doc, phone1: formData.phone1, phone2: formData.phone2,
                    user: formData.user, birth: utils.dateStringBRtoEN(formData.birth), 
                    password: formData.password, type, cep: formData.cep, street: formData.street,
                    complement: formData.complement || undefined, state: formData.state.code,
                    number: parseInt(formData.number), city: formData.city, district: formData.district
                }
            });

            const { data } = query;
            if(data.userStore) {
                alert();
                Router.back();
            }
            else alert('Houve um erro ao salvar', 'error');

        } catch (error) {
            console.log(error);
            alert('Houve um erro ao salvar', 'error');
        }
    }

    const handleInputChange = (name, value) => {
        setFormaData({ ...formData, [name]: value });
    }

    const alert = (text = 'Salvo com sucesso', type = 'success') => {
        setAlertText(text);
        setAlertType(type);
        setShowAlert(true);
    }

    const handleCep = async () => {
        setLoading(true);

        const response = await utils.getCep(formData.cep)

        if (response) {
            const tmp = {
                'street': response.logradouro,
                'complement': response.complemento,
                'district': response.bairro,
                'city': response.localidade,
                'state': states.find(el => {
                    return el.code === response.uf
                })
            }
            setFormaData({ ...formData, ...tmp });
        }

        setLoading(false);
    }

    return (
        <div id="new-user-content">
            <AlertInform open={showAlert} close={setShowAlert} text={alertText} severity={alertType} />

            <div>
                <label htmlFor="file">
                    <img
                        className="new-user-image-photo"
                        src={formData.file ? URL.createObjectURL(formData.file) : UserLogo}
                        alt="Profile photo"
                    />
                </label>
            </div>

            <input
                type="file"
                id="file"
                onChange={(e) => handleInputChange('file', e.target.files[0])}
                style={{ display: "none" }}
            />

            <form onSubmit={handleSaveUser} className="new-user-form">
                <Select
                    label="Categoria"
                    options={categories}
                    value={formData.category || null}
                    onChange={(_, opt) => { if (opt) handleInputChange('category', opt) }}
                />
                <InputMask
                    label="CNPJ"
                    mask="99.999.999/9999-99"
                    onChange={e => handleInputChange('doc', e.target.value)}
                // required
                />
                <InputMask
                    label="Data de nascimento"
                    mask="99/99/9999"
                    onChange={e => handleInputChange('birth', e.target.value)}
                // required
                />
                <Input
                    label="Nome"
                    onChange={e => handleInputChange('name', e.target.value)}
                // required
                />
                <Input
                    label="E-mail"
                    type="email"
                    onChange={e => handleInputChange('email', e.target.value)}
                // required
                />
                <InputMask
                    label="Telefone 1"
                    mask="(099) 9 9999-9999"
                    onChange={e => handleInputChange('phone1', e.target.value)}
                // required
                />
                <InputMask
                    label="Telefone 2"
                    mask="(099) 9 9999-9999"
                    onChange={e => handleInputChange('phone2', e.target.value)}
                />
                <Input
                    label="Usuário"
                    onChange={e => handleInputChange('user', e.target.value)}
                // required
                />
                <Input
                    label="Senha"
                    type="password"
                    onChange={e => handleInputChange('password', e.target.value)}
                // required
                />
                <Input
                    label="Confirmar senha"
                    type="password"
                    onChange={e => handleInputChange('confirmPassword', e.target.value)}
                // required
                />
                <InputMask
                    label="CEP"
                    mask="99999-999"
                    onChange={e => handleInputChange('cep', e.target.value)}
                    onBlur={handleCep}
                // required
                />
                <Input
                    label="Rua"
                    value={formData.street || ''}
                    onChange={e => handleInputChange('street', e.target.value)}
                // required
                />
                <Input
                    label="Número"
                    type="number"
                    onChange={e => handleInputChange('number', e.target.value)}
                // required
                />
                <Input
                    label="Complemento"
                    value={formData.complement || ''}
                    onChange={e => handleInputChange('complement', e.target.value)}
                />
                <Input
                    label="Bairro"
                    value={formData.district || ''}
                    onChange={e => handleInputChange('district', e.target.value)}
                // required
                />
                <Input
                    label="Cidade"
                    value={formData.city || ''}
                    onChange={e => handleInputChange('city', e.target.value)}
                // required
                />
                <Select
                    label="Estado"
                    options={states}
                    value={formData.state || null}
                    onChange={(_, opt) => { if (opt) handleInputChange('state', opt) }}
                />

                <ButtonPrimary label="Cadastrar" loading={loading} />
            </form>

            <b>Já tenho cadastro</b>
        </div>
    )
}
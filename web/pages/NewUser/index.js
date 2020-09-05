import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

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
    const [categorySelected, setCategorySelected] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [doc, setDoc] = useState('');
    const [formData, setFormaData] = useState({});

    useEffect(() => {
        console.log('MUDANDO', formData);
    }, [formData])

    useEffect(() => {
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
                }
            }

            getInfo();
        } catch (error) {
            console.log('ERROR', error);
        }
    }, [])

    const handleSaveUser = (event) => {
        event.preventDefault()
        console.log('SALVARE');

        setShowAlert(true);
    }

    const handleInputChange = (name, value) => {
        setFormaData({ ...formData, [name]: value });
    }

    const handleCep = async () => {
        // setLoading(true)
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
            setFormaData({ ...formData, ...tmp});
        }

        // setLoading(false)
    }

    return (
        <div id="new-user-content">
            <AlertInform open={showAlert} close={setShowAlert} />

            <div>
                <label htmlFor="file">
                    <img
                        className="new-user-image-photo"
                        src={file ? URL.createObjectURL(file) : UserLogo}
                        alt="Profile photo"
                    />
                </label>
            </div>

            <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
            />

            <form onSubmit={handleSaveUser} className="new-user-form">
                <Select
                    label="Categoria"
                    options={categories}
                    onChange={(_, opt) => { if (opt) handleInputChange('category', opt) }}
                />
                <InputMask
                    label="CNPJ"
                    mask="99.999.999/9999-99"
                    onChange={e => handleInputChange('doc', e.target.value)}
                    required
                />
                <InputMask
                    label="Data de nascimento"
                    mask="99/99/9999"
                    onChange={e => handleInputChange('birth', e.target.value)}
                    required
                />
                <Input
                    label="Nome"
                    onChange={e => handleInputChange('name', e.target.value)}
                />
                <Input
                    label="E-mail"
                    type="email"
                    onChange={e => handleInputChange('email', e.target.value)}
                    required
                />
                <InputMask
                    label="Telefone 1"
                    mask="(099) 9 9999-9999"
                    onChange={e => handleInputChange('phone1', e.target.value)}
                    required
                />
                <InputMask
                    label="Telefone 2"
                    mask="(099) 9 9999-9999"
                    onChange={e => handleInputChange('phone2', e.target.value)}
                />
                <Input
                    label="Usuário"
                    onChange={e => handleInputChange('user', e.target.value)}
                />
                <Input
                    label="Senha"
                    type="password"
                    onChange={e => handleInputChange('password', e.target.value)}
                />
                <Input
                    label="Confirmar senha"
                    type="password"
                    onChange={e => handleInputChange('confirmPassword', e.target.value)}
                />
                <InputMask
                    label="CEP"
                    mask="99999-999"
                    onChange={e => handleInputChange('cep', e.target.value)}
                    onBlur={handleCep}
                    required
                />
                <Input
                    label="Rua"
                    value={formData.street || ''}
                    onChange={e => handleInputChange('street', e.target.value)}
                    required
                />
                <Input
                    label="Número"
                    type="number"
                    onChange={e => handleInputChange('number', e.target.value)}
                    required
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
                    required
                />
                <Input
                    label="Cidade"
                    value={formData.city || ''}
                    onChange={e => handleInputChange('city', e.target.value)}
                    required
                />
                <Select
                    label="Estado"
                    options={states}
                    value={formData.state || null}
                    onChange={(_, opt) => { if (opt) handleInputChange('state', opt) }}
                />

                <ButtonPrimary label="Cadastrar" />
            </form>

            <b>Já tenho cadastro</b>
        </div>
    )
}
import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

import api from '../../services/api';

import Input from '../../components/Input';
import Select from '../../components/Select';

import UserLogo from '../../assets/images/user.svg';

export default function Product() {
    const [file, setFile] = useState(null);
    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState({});

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
                }`
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
    })

    return (
        <div id="new-user-content">
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

            <form className="new-user-form">
                <Select
                    label="Categoria"
                    options={categories}
                    onChange={(event, opt) => { if (opt) setCategorySelected(opt) }}
                />
                <Input label="CNPJ" />
                <Input label="CNPJ" />
                <Input label="CNPJ" />
                <Input label="CNPJ" />
                <Input label="CNPJ" />
                <Input label="CNPJ" />
                <Input label="CNPJ" />

            </form>
        </div>
    )
}
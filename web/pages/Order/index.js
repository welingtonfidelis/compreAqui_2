import { useEffect, useState } from 'react'
import { gql } from '@apollo/client';
import { Pagination } from '@material-ui/lab';
import {
    SentimentVerySatisfied, SentimentSatisfied, SentimentVeryDissatisfied
} from '@material-ui/icons'
import {
    Table, TableBody, TableCell, TableHead,
    TableContainer, TableRow, Paper
} from '@material-ui/core';

import Alert from '../../components/Alert';
import Menu from '../../components/Menu';
import Input from '../../components/Input';
import Select from '../../components/Select';
import InputMask from '../../components/InputMask';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecondary from '../../components/ButtonSecondary';
import Load from '../../components/Load';
import Modal from '../../components/Modal';

import api from '../../services/api';
import utils from '../../services/utils';

export default function Order() {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [orderStatus, setOrderStatus] = useState('awaiting');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [orderEdit, setOrderEdit] = useState({});
    const [orderEditClientAddress, setOrderEditClientAddress] = useState('');
    const [formData, setFormaData] = useState({});
    const orderOptStatus = [
        { code: "rejected", name: "Rejeitado" },
        { code: "awaiting", name: "Aguardando" },
        { code: "approved", name: "Aprovado" }
    ]

    useEffect(() => {
        getInfo();

    }, [orderStatus, page]);

    const getInfo = async () => {
        setLoading(true);
        try {
            const query = await api.query({
                query: gql`
                        query orderIndexAndorderCount($page: Int, $status: String) {
                            orderIndex(page: $page, status: $status){
                                id
                                createdAt
                                status
                                value
                                client {
                                    name
                                }
                            }
            
                            orderCount(status: $status)
                        }
                    `,
                variables: {
                    page, status: orderStatus
                },
            });

            const { orderIndex, orderCount } = query.data;
            if (orderCount) {
                let tmp = ((orderCount / 15) + '').split('.');
                tmp = tmp[1] ? parseInt(tmp[0]) + 1 : tmp[0];
                setTotalPage(tmp);
            }
            if (orderIndex) setOrderList(orderIndex);

        } catch (error) {
            console.log('ERROR', error);
            alert('Houve um erro ao carregar as informações', 'error');
        }
        setLoading(false);
    }

    const alert = (text = 'Salvo com sucesso', type = 'success') => {
        setAlertText(text);
        setAlertType(type);
        setShowAlert(true);
    }

    const TypeOrderMenu = () => {
        const options = [
            {
                status: 'awaiting', icon: <SentimentSatisfied />, name: 'Aguardando'
            },
            {
                status: 'approved', icon: <SentimentVerySatisfied />, name: 'Aprovado'
            },
            {
                status: 'rejected', icon: <SentimentVeryDissatisfied />, name: 'Recusado'
            },
        ];

        return options.map(el => {
            return (
                <div key={el.name} className="order-menu-item" onClick={() => setOrderStatus(el.status)}>
                    <span style={{ color: orderStatus === el.status ? '#F2BB16' : null }}>
                        {el.icon}
                    </span>

                    <span>
                        {el.name}
                    </span>
                </div>
            );
        });
    }

    const handleInputChange = (name, value) => {
        setFormaData({ ...formData, [name]: value });
    }

    const handleOrderShow = async (id) => {
        setLoading(true);
        try {
            const query = await api.query({
                query: gql`
                    query orderShow($id: ID!) {
                        orderShow(id: $id){
                            id
                            timeWait
                            value
                            status
                            reason
                            createdAt
                            observation
                            delivery
                            cashBack
                            orderProducts {
                                id
                                amount
                                product {
                                    name
                                    price
                                }
                            }
                            client {
                                name
                                email
                                phone1
                                phone2
                                address {
                                    cep
                                    state
                                    city
                                    district
                                    complement
                                    street
                                    number
                                }
                            }
                        }
                    }
                `,
                variables: {
                    id
                },
            });

            const { orderShow } = query.data;
            if (orderShow) {
                const {
                    cep, city, complement, district, number, state, street
                } = orderShow.client.address[0];

                setOrderEditClientAddress(
                    `Rua ${street}, Nº ${number}, ${complement}, ` +
                    `Bairro ${district}, CEP ${cep}. ${city} - ${state}`
                );

                setOrderEdit(orderShow);
                const [status] = orderOptStatus.filter(el => el.code === orderShow.status);
                handleInputChange('status', status);
                setShowModal(true);
            }

        } catch (error) {
            console.log('ERROR', error);
            alert('Houve um erro ao carregar as informações', 'error');
        }
        setLoading(false);
    }

    const handleSaveEdit = async () => {
        console.log('Alterar', formData.status, orderEdit.id);
        setLoading(true);
        try {
            const query = await api.mutate({
                mutation: gql`
                    mutation orderChangeStatus(
                        $id: ID!
                        $status: String!
                        $timeWait: Int
                        $reason: String
                    ) 
                    {
                        orderChangeStatus(
                            id: $id
                            status: $status
                            timeWait: $timeWait
                            reason: $reason
                        )
                    }`,
                variables: {
                    id: orderEdit.id, status: formData.status.code, timeWait: 1, reason: 'OKOK'
                }

            });

            const { data } = query;

            if (data.orderChangeStatus) {
                getInfo();
                handleCancelEdit();
            }

        } catch (error) {
            console.log('ERROR', error);
            alert('Houve um erro ao alterar pedido', 'error');
        }
        setLoading(false);
    }

    const handleCancelEdit = () => {
        setShowModal(false);
        setFormaData({});
        setOrderEdit({});
    }

    return (
        <div id="content">
            <Menu page="Order" />

            <Alert
                open={showAlert}
                close={setShowAlert}
                text={alertText}
                severity={alertType}
            />

            <div id="order-container">
                <Load id="divLoading" loading={loading} />

                <div className="order-top-menu">
                    <TypeOrderMenu />
                </div>

                <div className="order-input-search">
                    <Input label="Cliente" />
                    <Input label="Produto" />
                    <InputMask
                        label="Data"
                        mask="99/99/9999"
                        // onChange={e => handleInputChange('birth', e.target.value)}
                        required
                    />

                    <ButtonPrimary label="Buscar" loading={loading} />
                </div>

                <div className="order-card-container">
                    {
                        orderList.map(el => {
                            return (
                                <div key={el.id} className="order-card" onClick={() => handleOrderShow(el.id)}>
                                    <div className="order-card-header">
                                        <span>Pedido {el.id}</span>
                                        <span>{utils.maskDate(el.createdAt)}</span>
                                    </div>

                                    <div className="order-subcard">
                                        <div className="order-subcard-header">
                                            {el.client.name}
                                        </div>

                                        <div className="order-subcard-content">

                                        </div>

                                        <div className="order-subcard-footer">
                                            {utils.maskValue(el.value)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="pagination">
                    <Pagination
                        count={totalPage}
                        color="primary"
                        value={page}
                        onChange={(e, p) => setPage(p)}
                    />
                </div>

                <Modal
                    open={showModal}
                    close={setShowModal}
                >
                    {orderEdit.id &&
                        <div className="order-modal-edit">
                            <Load id="divLoading" loading={loading} />

                            <div className="order-modal-card-container">
                                <div className="card-left">
                                    <h3>Pedido #{orderEdit.id}</h3>

                                    <Input
                                        label="Data" disabled
                                        defaultValue={utils.maskDate(orderEdit.createdAt)}
                                    />
                                    <Input
                                        label="Cliente" disabled
                                        defaultValue={orderEdit.client.name}
                                    />
                                    <Input
                                        label="E-mail" disabled
                                        defaultValue={orderEdit.client.email}
                                    />
                                    <Input
                                        label="Telefone 1" disabled
                                        defaultValue={orderEdit.client.phone1}
                                    />
                                    <Input
                                        label="Telefone 2" disabled
                                        defaultValue={orderEdit.client.phone2}
                                    />
                                    <Input
                                        label="Entregar" disabled
                                        defaultValue={orderEdit.delivery ? 'SIM' : 'NÃO'}
                                    />
                                    <Input
                                        label="Troco para" disabled
                                        defaultValue={utils.maskValue(orderEdit.cashBack)}
                                    />
                                    <Input
                                        label="Endereço"
                                        multiline rows={4} rowsMax={4}
                                        disabled
                                        defaultValue={orderEditClientAddress}
                                    />
                                    <Input
                                        label="Observações"
                                        multiline rows={4} rowsMax={4}
                                        disabled
                                        defaultValue={orderEdit.observation}
                                    />
                                </div>

                                <div className="card-right">
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Qtd</TableCell>
                                                    <TableCell>Produto</TableCell>
                                                    <TableCell>Preço</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(orderEdit.orderProducts).map(el => (
                                                    <TableRow key={el.id}>
                                                        <TableCell>{el.amount}</TableCell>
                                                        <TableCell>{el.product.name}</TableCell>
                                                        <TableCell>
                                                            {utils.maskValue(el.product.price)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <b>Total: {utils.maskValue(orderEdit.value)}</b>

                                    <Select
                                        label="Situação do pedido"
                                        options={orderOptStatus}
                                        value={formData.status || null}
                                        getOptionSelected={(
                                            option,
                                            value,
                                        ) => value.value === option.value}
                                        onChange={(_, opt) => { if (opt) handleInputChange('status', opt) }}
                                    />
                                </div>
                            </div>

                            <div className="order-modal-buttons">
                                <ButtonSecondary label="Cancelar" onClick={handleCancelEdit} />
                                <ButtonPrimary label="Salvar" loading={loading} onClick={handleSaveEdit} />
                            </div>
                        </div>
                    }
                </Modal>
            </div>
        </div>
    )
}
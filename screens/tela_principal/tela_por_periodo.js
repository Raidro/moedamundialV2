import React, { Component } from 'react';
import api from '../../api/api.js';
import moment from 'moment';

import {
    Container,
    Text,
    Content,
    H1,
    Picker,
    DatePicker,
    Card,
    CardItem,
    Body,
    Button
} from "native-base";

import { StyleSheet } from 'react-native';

export default class tela_periodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataInicio: new Date(),
            dataFim: new Date(),
            selected: "USD-BRL",
            nome: "",
            compra: "",
            venda: "",
            variacao: "",
            variacao_porcentagem: "",
            maximo: "",
            minimo: ""
        };
        this.setDateInicio = this.setDateInicio.bind(this);
        this.setDateFim = this.setDateFim.bind(this);
    }

    setDateInicio(newDate) {
        this.setState({ dataInicio: newDate });

    }

    setDateFim(newDate) {
        this.setState({ dataFim: newDate });
    }


    componentDidMount = async () => {

        this.buscaPeriodo(
            this.state.selected,
            this.state.dataInicio,
            this.state.dataFim
        )

    }

    onValueChange(value) {

        this.setState({
            selected: value,
        });

        this.buscaPeriodo(value)

    }

    buscaPeriodo = async (moeda, data_init, data_fim) => {

        data_init = moment(this.state.dataInicio, 'YYYY-MM-DD').format('YYYYMMDD')
        data_fim = moment(this.state.dataFim, 'YYYY-MM-DD').format('YYYYMMDD')

        await api.get(`/daily/${moeda}/?start_date=${data_init}&end_date=${data_fim}`)
            .then(res => {

                this.setState({
                    nome: res.data["0"]["name"],
                    compra: res.data["0"]["bid"],
                    venda: res.data["0"]["ask"],
                    variacao: res.data["0"]["varBid"],
                    variacao_porcentagem: res.data["0"]["pctChange"],
                    maximo: res.data["0"]["high"],
                    minimo: res.data["0"]["low"]
                })

            })
    }

    render() {
        return (


            <Container>

                <Card style={styles.inicio}>
                    <DatePicker
                        placeHolderText="Selecionar data Inicio"
                        onDateChange={this.setDateInicio}
                        defaultDate={new Date()}

                    />
                </Card>

                <Card style={styles.fim}>
                    <DatePicker
                        placeHolderText="Selecionar data Fim"
                        onDateChange={this.setDateFim}
                        defaultDate={new Date()}
                        style={styles.fim}
                    />
                </Card>

                <Content>

                    <Picker
                        mode="dropdown"
                        style={styles.pickers}
                        selectedValue={this.buscaPeriodo(this.state.selected)}
                        onValueChange={this.onValueChange.bind(this)}

                    >
                        <Picker.Item label="SELECIONE UMA MOEDA" value="SELECIONE UMA MOEDA" />
                        <Picker.Item label="USD - DOLAR COMERCIAL" value="USD-BRL" />
                        <Picker.Item label="USDT - DOLAR TURISTICO" value="USDT-BRL" />
                        <Picker.Item label="CAD - DOLAR CANADENSE" value="CAD-BRL" />
                        <Picker.Item label="AUD - DOLAR AUTRALIANO" value="AUD-BRL" />
                        <Picker.Item label="GBP - LIBRA ESTERLINA" value="GBP-BRL" />
                        <Picker.Item label="ARS - PESO ARGENTINO" value="ARS-BRL" />
                        <Picker.Item label="JPY - IENE JAPONES" value="JPY-BRL" />
                        <Picker.Item label="CHF - FRENCO SUIÇO" value="CHF-BRL" />
                        <Picker.Item label="CNY - YUAN CHINES" value="CNY-BRL" />
                        <Picker.Item label="BTC - BITCOIN" value="BTC-BRL" />
                        <Picker.Item label="LTC - LITECOIN" value="LTC-BRL" />
                        <Picker.Item label="ETH - ETHEREUM" value="ETH-BRL" />
                        <Picker.Item label="XRP - RIPPLE" value="XRP-BRL" />
                    </Picker>

                    <Card>
                        <CardItem header bordered>
                            <Text>{this.state.nome}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>
                                    Compra: {this.state.compra}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>
                                    Venda: {this.state.venda}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>
                                    Variação: {this.state.variacao}
                                </Text>
                            </Body>
                        </CardItem>

                        <CardItem bordered>
                            <Body>
                                <Text>
                                    Variação(%): {this.state.variacao_porcentagem}
                                </Text>
                            </Body>
                        </CardItem>

                        <CardItem bordered>
                            <Body>
                                <Text>
                                    Maximo: {this.state.maximo}
                                </Text>
                            </Body>
                        </CardItem>

                        <CardItem bordered>
                            <Body>
                                <Text>
                                    Minimo: {this.state.minimo}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>

            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,

    },
    pickers: {
        width: undefined,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
    },
    inicio: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fim: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }

})
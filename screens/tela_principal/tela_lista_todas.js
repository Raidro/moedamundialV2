import React, { Component } from 'react';

import api from '../../api/api.js';

import {
    Container,
    Text,
    Content,
    Card,
    CardItem,
    Body,
    H3,
} from "native-base";

import { StyleSheet } from 'react-native';



export default class lista_todas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "all",
            listaTodasMoedas: [],
        };
    }

    componentDidMount = async () => {

        this.buscaTodasMoeda(this.state.selected)


    }

    buscaTodasMoeda = async (valor) => {
        await api.get(`/${valor}`)
            .then(res => {

                console.log(Object.values(res.data))

                this.setState({
                    listaTodasMoedas: Object.values(res.data)
                })

            })
    }

    render() {
        return (
            <Container>
                <Content>

                    <Card style={styles.cardText}>
                        <H3 style={styles.text}>Lista de todas as moedas</H3>
                    </Card>

                    {this.state.listaTodasMoedas.map((listaTodasMoedas, index) =>
                        <Card key={index} style={styles.card}>
                            <CardItem header bordered>
                                <Text>{listaTodasMoedas.name}                          </Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text>
                                        Compra: {listaTodasMoedas.bid}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text>
                                        Venda: {listaTodasMoedas.ask}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text>
                                        Variação: {listaTodasMoedas.varBid}
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem bordered>
                                <Body>
                                    <Text>
                                        Variação(%): {listaTodasMoedas.pctChange}
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem bordered>
                                <Body>
                                    <Text>
                                        Maximo: {listaTodasMoedas.high}
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem bordered>
                                <Body>
                                    <Text>
                                        Minimo: {listaTodasMoedas.low}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    )}
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
        marginTop: 25,
        marginLeft: 15,
        marginRight: 15,

    },
    text: {
        padding: 15,
    },
    cardText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },


});
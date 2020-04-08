import React, { Component } from 'react';

import {
  Container,
  Text,
  Picker,
  Content,
  Card,
  CardItem,
  Body,
  Form,
} from "native-base";

import { StyleSheet } from 'react-native';

import api from '../../api/api.js';


export default class tela_principal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "USD-BRL",
      nome: "",
      compra: "",
      venda: "",
      variacao: "",
      variacao_porcentagem: "",
      maximo: "",
      minimo: ""

    };
  }

  componentDidMount = async () => {

    this.buscaMoeda(this.state.selected)

  }

  onValueChange(value) {

    this.setState({
      selected: value,
    });

    this.buscaMoeda(value)

  }

  buscaMoeda = async (valor) => {
    await api.get(`/${valor}`)
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
        <Content>

          <Card style={styles.cardPicker}>
            <Form>
              <Picker
                mode="dropdown"
                style={styles.pickers}
                selectedValue={this.buscaMoeda(this.state.selected)}
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
            </Form>
          </Card>

          <Card style={styles.card}>
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
  pickers: {
    width: undefined,
    marginLeft: 20,
    marginRight: 20,
  },
  card: {
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,

  },
  cardPicker: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
  }

})

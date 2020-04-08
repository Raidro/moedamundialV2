import React, { Component } from 'react';

import {
    Container,
    Text,
    Picker,
    Content,
    Button,
    Card,
    CardItem,
    Header,
    Body,
    Title,
    Form,
    Tabs,
    Tab,
    TabHeading,
    Icon,
    Footer,
    FooterTab,


} from "native-base";

import TelaMoeda from './tela_moeda';

import TelaLista from './tela_lista_todas';

import TelaPeriodo from './tela_por_periodo';

import { StyleSheet } from 'react-native';

console.disableYellowBox = true

export default class tela_principal extends Component {

    render() {
        return (

            <Container>

                <Header >
                    <Body style={styles.body}>
                        <Title style={styles.title}>
                            World Coins
                        </Title>
                    </Body>
                </Header>

                <Tabs>
                    <Tab heading={<TabHeading><Icon name="logo-bitcoin" /><Text>Moeda</Text></TabHeading>}>
                        <TelaMoeda />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="list" /><Text>Lista Todas</Text></TabHeading>}>
                        <TelaLista />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="calendar" /><Text>Por Periodo</Text></TabHeading>} >
                        <TelaPeriodo />
                    </Tab>
                </Tabs>
            </Container>


        );
    }
}

const styles = StyleSheet.create({

    body: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

        fontSize: 25,

    },

})


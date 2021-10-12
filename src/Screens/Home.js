import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Alert, FlatList } from 'react-native';
import useMovimiento from '../hooks/useMovimiento';
import { connect } from 'react-redux';

const DATA = [
    {
        id: 1,
        Monto: 105, 
        categoria: "transporte", 
        descripcion: "pasajes de la semana", 
        tipo: "gasto", 
    },
    {
        id: 2,
        Monto: 105, 
        categoria: "transporte", 
        descripcion: "pasajes de la semana", 
        tipo: "gasto", 
    },
    {
        id: 3,
        Monto: 105, 
        categoria: "transporte", 
        descripcion: "pasajes de la semana", 
        tipo: "gasto", 
    },
];

const Home = ({currentUserID}) => {

    const [,recuperarListaDeMovimientos,listaMovimientos] = useMovimiento();

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Salir", "¿Seguro que quieres salir de la aplicacion?", [
            {
                text: "No",
                onPress: () => null,
                style: "cancel",
            },
            { text: "Si", onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        recuperarListaDeMovimientos(currentUserID);
    }, [currentUserID]);

    return(
        <View style={styles.generalContainer}>
            <FlatList
                data={listaMovimientos}
                keyExtractor={item => item.id}
                renderItem={item => {
                    return(
                        <View>
                            <BlockMovimiento movimiento={item.item}/>
                        </View>
                    )
                }}
            />
        </View>
    );
}

const BlockMovimiento = ({movimiento}) => {

    //console.log("PROPS ---> ",props);

    return(
        <View style={{padding: 20}}>
            <Text>{"monto: "+movimiento.Monto}</Text>
            <Text>{"categoria: "+movimiento.categoria}</Text>
            <Text>{"descripcion: "+movimiento.descripcion}</Text>
            <Text>{"tipo: "+movimiento.tipo}</Text>
        </View>
    )
}

const mapStateToprops = state => ({
    currentUserID: state.currentUserID,
    //actualizarListaDeMovimientos: state.refreshGetMovements
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToprops,mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    generalContainer: {
        backgroundColor: "#fff",
        flex: 1
    }
});
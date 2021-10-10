import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

//HOOKS
import useMovimiento from '../hooks/useMovimiento';

const NewExpense = ({currentUserID}) => {

    const [ crearNuevoMovimiento ] = useMovimiento();

    return(
        <View style={styles.generalContainer}>
            <Text>{currentUserID}</Text>
            <TouchableOpacity style={{padding: 20}} onPress={() => {
                const newMovimiento = {
                    Monto: 105, 
                    categoria: "transporte", 
                    descripcion: "pasajes de la semana", 
                    tipo: "gasto", 
                    userID: currentUserID
                }
                crearNuevoMovimiento(newMovimiento);
            }}>
                <Text>CREAR GASTO O INGRESO</Text>
            </TouchableOpacity>
        </View>
    );
}

const mapStateToprops = state => ({
    currentUserID: state.currentUserID
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToprops,mapDispatchToProps)(NewExpense);

const styles = StyleSheet.create({
    generalContainer: {
        backgroundColor: "#fff",
        flex: 1
    }
});
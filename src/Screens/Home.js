import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  FlatList,
  Dimensions,
  Picker,
} from "react-native";
import useMovimiento from "../hooks/useMovimiento";
import { connect } from "react-redux";
import { colors } from "../styles/styles";

/* import { applyMiddleware } from "redux";
var express = require("express");
var cors = require("cors");
var app = express(); */

const { height, width } = Dimensions.get("window");

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

const Home = ({ 
  currentUserID, 
  fillListGastos, 
  fillListIngresos,
  actualizarSaldoTotal,
  actualizarIngresoTotal, 
  actualizarGastoTotal,
  ingresosTotal,
  gastosTotal, 
  saldoTotal, 
  listGastos, 
  listIngresos,
  actualizarListaDeMovimientos }) => {
  const [
    , 
    recuperarListaDeMovimientos, 
    listaGastos, 
    listaIngresos, 
    totalIngesoState, 
    totalGastoState,
    totalSaldoState ] = useMovimiento();

  const [selectedValue, setSelectedValue] = useState("Gastos");
  //const [totalExpenditures, setTotalExpenditures] = useState(0);
  //const [totalRevenues, setTotalRevenues] = useState(0);
  //const [totalSaldoState, setTotalSaldoState] = useState(0);
  const [listExpenditures,setListExpenditures] = useState([]);
  const [listRevenues,setListRevenues] = useState([]);

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
    if(currentUserID !== ""){
      recuperarListaDeMovimientos(currentUserID);
      fillListGastos(listaGastos.current);
      fillListIngresos(listaIngresos.current);
    }
  }, [currentUserID]);// currentUserID, actualizarListaDeMovimientos

  return (
    <View style={styles.generalContainer}>
      <View
        style={{
          width: "100%",
          height: 150,
          backgroundColor: colors.BLUE_COLOR,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "50%",
            backgroundColor: colors.BLUE_COLOR,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text style={styles.text22Label}>
            Tu saldo actual
          </Text>
          <Text style={styles.text22Label}>
            {"$",totalSaldoState.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            width: "50%",
            backgroundColor: colors.BLUE_COLOR,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: "60%", color: colors.WHITE_COLOR }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Gastos" value="Gastos" />
            <Picker.Item label="Ingresos" value="Ingresos" />
          </Picker>
        </View>
      </View>
      <View
        style={{
          width: "90%",
          height: 75,
          backgroundColor: colors.WHITE_COLOR,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "40%",
            backgroundColor: colors.WHITE_COLOR,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            elevation: 10,
            borderRadius: 10,
          }}
        >
          <Text style={styles.textLabel}>Ingresos</Text>
          <Text style={styles.textLabel}>
            {" "}
            {"$ " + totalIngesoState.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            width: "40%",
            backgroundColor: colors.WHITE_COLOR,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            elevation: 10,
            borderRadius: 10,
          }}
        >
          <Text style={styles.textLabel}>Gastos</Text>
          <Text style={styles.textLabel}>
            {"$ " + totalGastoState.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={selectedValue === "Gastos" ? listGastos : selectedValue === "Ingresos" ? listIngresos : null}
          keyExtractor={(item) => item.id}
          extraData={selectedValue}
          renderItem={(item) => {
            return (
              <View>
                <BlockMovimiento movimiento={item.item} />
              </View>
            );
          }}
          style={{ width: "100%"}}
        />
      </View>
    </View>
  );
};

const BlockMovimiento = ({ movimiento }) => {
  //console.log("PROPS ---> ",props);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: colors.GRAY_1_COLOR,
        marginTop: 10,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          backgroundColor: colors.BLUE_COLOR,
          alignItems: "center",
        }}
      >
        <Text style={[styles.textLabel, { color: colors.WHITE_COLOR }]}>
          {movimiento.createdAt.substring(0, 10)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <View style={{ width: "70%", paddingLeft: 10 }}>
          <Text style={styles.textLabel}>
            {"Descripcion: " + movimiento.descripcion}
          </Text>

          <Text style={styles.textLabel}>
            {"Categoria: " + movimiento.categoria}
          </Text>

          <Text style={styles.textLabel}>{"Tipo: " + movimiento.tipo}</Text>
        </View>

        <View
          style={{
            width: "30%",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: 10,
          }}
        >
          <Text style={styles.textLabel}>
            {"$ " + movimiento.Monto.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToprops = (state) => ({
  currentUserID: state.currentUserID,
  actualizarListaDeMovimientos: state.refreshGetMovements,
  ingresosTotal: state.ingresosTotal,
  gastosTotal: state.gastosTotal,
  saldoTotal: state.saldoTotal,
  listGastos: state.listGastos,
  listIngresos: state.listIngresos
});

const mapDispatchToProps = (dispatch) => ({
  fillListGastos(listaGastos){
    dispatch({
      type: "LLENAR_LISTA_GASTOS",
      listaGastos
    });
  },
  fillListIngresos(listaIngresos){
    dispatch({
      type: "LLENAR_LISTA_INGRESOS",
      listaIngresos
    });
  },
  actualizarIngresoTotal(ingresoTotal){
    dispatch({
      type: "ACTUALIZAR_INGRESO_TOTAL",
      ingresoTotal
    });
  },
  actualizarGastoTotal(gastoTotal){
    dispatch({
      type: "ACTUALIZAR_GASTOS_TOTAL",
      gastoTotal
    });
  },
  actualizarSaldoTotal(saldoTotal){
    dispatch({
      type: "ACTUALIZAR_SALDO_TOTAL",
      saldoTotal
    });
  },
});

export default connect(mapStateToprops, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: colors.WHITE_COLOR,//colors.WHITE_COLOR
    //marginTop: currentHeight,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 100,
  },
  textLabel: {
    color: colors.BLUE_COLOR,
    fontSize: 16,
  },
  text22Label: {
    color: colors.WHITE_COLOR,
    fontSize: 22,
  },
  listContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: "82%",
    padding: 20
  }
});

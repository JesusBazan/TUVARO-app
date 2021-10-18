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

const Home = ({ currentUserID, actualizarListaDeMovimientos }) => {
  const [, recuperarListaDeMovimientos, listaMovimientos] = useMovimiento();
  const [selectedValue, setSelectedValue] = useState("java");
  const [totalExpenditures, setTotalExpenditures] = useState(0);
  const [totalRevenues, setTotalRevenues] = useState(0);

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
  }, [currentUserID, actualizarListaDeMovimientos]);

  useEffect(() => {
    handleCalculateTotal(listaMovimientos);
  }, [listaMovimientos]);

  const handleCalculateTotal = (transactions) => {
    /* console.log(
      "🚀 ~ file: Home.js ~ line 77 ~ handleCalculateTotal ~ transactions",
      typeof transactions
    ); */
    let totalExpenditures = 0;
    let totalRevenues = 0;
    if (transactions != undefined) {
      if (transactions == Object) {
        const data = transactions.data.listaMovimientos.items;
        data.forEach((element) => {
          if (element.Monto > 0) {
            if (element.tipo == "Gasto") {
              totalExpenditures = totalExpenditures + element.Monto;
            }
            if (element.tipo == "Ingreso") {
              totalRevenues = totalRevenues + element.Monto;
            }
          }
        });
      } else {
        transactions.forEach((element) => {
          if (element.Monto > 0) {
            if (element.tipo == "Gasto") {
              totalExpenditures = totalExpenditures + element.Monto;
            }
            if (element.tipo == "Ingreso") {
              totalRevenues = totalRevenues + element.Monto;
            }
          }
        });
      }
    } else {
      console.log("transactions is undefined");
    }
    setTotalExpenditures(totalExpenditures);
    setTotalRevenues(totalRevenues);
  };

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
          <Text style={[styles.textLabel, { color: colors.WHITE_COLOR }]}>
            Tu saldo actual
          </Text>
          <Text style={[styles.textLabel, { color: colors.WHITE_COLOR }]}>
            $5,000.00
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
            style={{ height: 50, width: "100%", color: colors.WHITE_COLOR }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
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
            {"$ " + totalRevenues.toFixed(2)}
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
            {"$ " + totalExpenditures.toFixed(2)}
          </Text>
        </View>
      </View>
      <FlatList
        data={listaMovimientos}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
            <View>
              <BlockMovimiento movimiento={item.item} />
            </View>
          );
        }}
        style={{ width: "90%" }}
      />
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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToprops, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: colors.WHITE_COLOR,
    //marginTop: currentHeight,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 100,
  },
  textLabel: {
    color: colors.BLUE_COLOR,
    fontSize: 14,
  },
});

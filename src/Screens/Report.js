import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import { Auth } from "aws-amplify";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import { connect } from "react-redux";

import axios from "axios";
import { colors } from "../styles/styles";
import { ScrollView } from "react-native-gesture-handler";
const { height, width } = Dimensions.get("window");

const dataChart = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const Report = ({ navigation, listaGastos, listaIngresos }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    //console.log("LISTA DE GASTOS ---> ", listaGastos);

    let array = [];
    listaGastos.map((element) => {
      let colorObj = getRandomColor();
      let newObj = {
        ...element,
        color: colorObj,
        legendFontColor: colorObj,
        legendFontSize: 11,
        name: element.descripcion || "test",
      };
      array.push(newObj);
    });
    setGastos(array);
    //console.log("LISTA DE INGRESOS ---> ", listaIngresos);
    let arrayIngresos = [];
    listaIngresos.map((element) => {
      let colorObj = getRandomColor();
      let newObj = {
        ...element,
        color: colorObj,
        legendFontColor: colorObj,
        legendFontSize: 11,
        name: element.descripcion || "test",
      };
      arrayIngresos.push(newObj);
    });
    setIngresos(arrayIngresos);
  }, []);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async function signOut() {
    try {
      await Auth.signOut();
      navigation.navigate("NavigationLogin");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async function hanldeFecthLisProductsFromAPI() {
    await axios
      .get("http://192.168.15.120:8010/api/productos/listproducts")
      .then(function (response) {
        if (response.data.length > 0) {
          setMessage("");
          setProducts(response.data);
          console.log(
            "🚀 ~ file: Report.js ~ line 38 ~ response.data",
            response.data
          );
        } else {
          setMessage("No hay datos");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function hanldeFecthLisProductsFromAPIByID(id) {
    await axios
      .get(`http://192.168.15.120:8010/api/productos/SearchProduct/${id}`)
      .then(function (response) {
        if (response.data.length > 0) {
          setMessage("");
          setProducts(response.data);
          console.log(
            "🚀 ~ file: Report.js ~ line 55 ~ response.data",
            response.data
          );
        } else {
          setMessage("No se encontraron resultados");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <ScrollView>
      <View style={styles.generalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Blance</Text>
        </View>
        <View style={styles.containerChart}>
          <Text style={styles.textTitle}>Gastos</Text>
          <PieChart
            data={gastos}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: getRandomColor(),
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 5,
              },
            }}
            accessor="Monto"
            backgroundColor="transparent"
            //paddingLeft="15"
          />
          <Text style={styles.textTitle}>Ingresos</Text>
          <PieChart
            data={ingresos}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: getRandomColor(),
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 5,
              },
            }}
            accessor="Monto"
            backgroundColor="transparent"
            //paddingLeft="15"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToprops = (state) => ({
  listaGastos: state.listGastos,
  listaIngresos: state.listIngresos,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToprops, mapDispatchToProps)(Report);

const styles = StyleSheet.create({
  generalContainer: {
    backgroundColor: colors.BLUE_COLOR,
    flex: 1,
    alignItems: "center",
    width: width,
  },
  textLabel: {
    color: colors.BLUE_COLOR,
    fontSize: 14,
  },
  header: {
    padding: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },
  containerChart: {
    backgroundColor: colors.GRAY_2_COLOR,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 100,
  },
  textTitle: {
    color: colors.BLUE_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
});

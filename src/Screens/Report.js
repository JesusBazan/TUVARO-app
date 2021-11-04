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
import { PieChart } from "react-native-chart-kit";

import axios from "axios";
import { colors } from "../styles/styles";
const { height, width } = Dimensions.get("window");

const dataChart = [
  { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
]

const Report = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    hanldeFecthLisProductsFromAPI();
  }, []);

  return (
    <View style={styles.generalContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Blance</Text>
      </View>
      <View style={styles.containerChart}>
        <PieChart
          data={dataChart}
          width={width}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    </View>
  );
};

export default Report;

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
    padding: 20
  },
  headerText: {
    color: "#fff",
    fontSize: 18
  },
  containerChart: {
    backgroundColor: colors.WHITE_COLOR,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 100
  }
});

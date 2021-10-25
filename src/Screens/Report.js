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

import axios from "axios";
import { colors } from "../styles/styles";
const { height, width } = Dimensions.get("window");

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
      <TextInput
        style={{
          width: "90%",
          height: 50,
          backgroundColor: colors.GRAY_2_COLOR,
          borderRadius: 5,
          paddingLeft: 10,
          color: colors.WHITE_COLOR,
          fontSize: 18,
          marginTop: 20,
        }}
        placeholder={"Buscar por ID {1,2,3,4}"}
        value={search}
        onChangeText={(value) => {
          setSearch(value);
          if (value == "") {
            hanldeFecthLisProductsFromAPI();
          }
        }}
        keyboardType="numeric"
        onSubmitEditing={() => {
          //setSearch("");
          hanldeFecthLisProductsFromAPIByID(search);
        }}
      />

      {message != "" ? (
        <Text style={{ color: "red" }}>{message} </Text>
      ) : (
        <View
          style={{
            width: "90%",
          }}
        >
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  width: "80%",
                  height: 100,
                  backgroundColor: "#F1C40F",
                  justifyContent: "center",
                  borderRadius: 20,
                  elevation: 10,
                  paddingLeft: 20,
                  marginHorizontal: "10%",
                  marginVertical: 10,
                }}
              >
                <Text style={styles.textLabel}>{item.id} </Text>
                <Text style={styles.textLabel}>{item.nombre} </Text>
                <Text style={styles.textLabel}>{item.descripcion} </Text>
              </View>
            )}
          />
        </View>
      )}
      <TouchableOpacity onPress={signOut}>
        <Text style={{ padding: 10 }}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  generalContainer: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    width: width,
  },
  textLabel: {
    color: colors.BLUE_COLOR,
    fontSize: 14,
  },
});

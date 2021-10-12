import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  Alert,
  Picker,
} from "react-native";
import { colors } from "../styles/styles";
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";

//HOOKS
import useMovimiento from "../hooks/useMovimiento";

const NewExpense = ({ currentUserID, actualizarListaDeMovimientos }) => {
  const [crearNuevoMovimiento] = useMovimiento();
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <View style={styles.generalContainer}>
      <View
        style={{
          width: "100%",
          height: "10%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather
          name="arrow-left"
          size={24}
          color={colors.WHITE_COLOR}
          style={{ marginLeft: 10 }}
          //onPress={() => navigation.goBack()}
        />
        <Text
          style={[
            styles.textLabel,
            { color: colors.WHITE_COLOR, fontSize: 18, marginLeft: "30%" },
          ]}
        >
          Ingreso
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Categoria</Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: "100%" }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Monto</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"$ 00.00"}
            //value={passwordState}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Fecha</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"19/09/2021"}
            //value={}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Descripción (opcional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"Prestamo para Jon Doe"}
            //value={}
          />
        </View>
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => {
            const newMovimiento = {
              Monto: 105,
              categoria: "transporte",
              descripcion: "pasajes de la semana",
              tipo: "gasto",
              userID: currentUserID,
            };
            crearNuevoMovimiento(newMovimiento);
            actualizarListaDeMovimientos();
          }}
        >
          <Text style={[styles.textLabel, { color: colors.WHITE_COLOR }]}>
            Registrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToprops = (state) => ({
  currentUserID: state.currentUserID,
});

const mapDispatchToProps = (dispatch) => ({
  actualizarListaDeMovimientos: () =>
    dispatch({
      type: "ACTUALIZAR_LISTA_DE_MOVIMIENTOS",
    }),
});

export default connect(mapStateToprops, mapDispatchToProps)(NewExpense);

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: colors.BLUE_COLOR,
    //marginTop: currentHeight,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formContainer: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    backgroundColor: colors.WHITE_COLOR,
    borderTopLeftRadius: 100,
    paddingTop: 100,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 15,
    backgroundColor: colors.GRAY_1_COLOR,
    borderRadius: 10,
    paddingLeft: 10,
  },
  textLabel: {
    color: colors.GRAY_5_COLOR,
    fontSize: 14,
  },
  textInput: {
    width: "100%",
  },
  btnSignUp: {
    width: "80%",
    height: 40,
    backgroundColor: colors.GREEN_1_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
});

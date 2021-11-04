import React, { useState, useEffect } from "react";
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

const newMovimiento = {
  Monto: 0,
  categoria: "",
  descripcion: "",
  tipo: "",
  userID: "",
};

const Categories = [
  "Escuela",
  "Transporte",
  "Despensa",
  "Gas",
  "Cuidados de la salud",
  "Ropa y calzado",
  "Cuidados personales",
];

const NewExpense = ({ currentUserID, actualizarListaDeMovimientos }) => {
  const [crearNuevoMovimiento] = useMovimiento();
  //const [selectedValue, setSelectedValue] = useState("java");
  const [formState, setFormState] = useState(newMovimiento);

  useEffect(() => {
    setFormState({ ...formState, userID: currentUserID });
  }, []);

  const setInput = (key, value) => setFormState({ ...formState, [key]: value });

  const addExpense = () => {
    const todo = { ...formState };
    crearNuevoMovimiento(todo);
    actualizarListaDeMovimientos();
  };

  return (
    <View style={styles.generalContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nuevo movimiento</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Categoria</Text>
          <Picker
            selectedValue={formState.categoria}
            style={{ height: 50, width: "100%" }}
            onValueChange={(itemValue, itemIndex) =>
              setFormState({ ...formState, categoria: itemValue })
            }
          >
            {Categories.map((item, index) => (
              <Picker.Item label={item} value={item} key={index} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Descripción (opcional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"Prestamo para Jon Doe"}
            value={formState.descripcion}
            onChangeText={(value) => setInput("descripcion", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Tipo</Text>
          <Picker
            selectedValue={formState.tipo}
            style={{ height: 50, width: "100%" }}
            onValueChange={(itemValue, itemIndex) =>
              setFormState({ ...formState, tipo: itemValue })
            }
          >
            <Picker.Item label="Gasto" value="Gasto" />
            <Picker.Item label="Ingreso" value="Ingreso" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Monto</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"$ 00.00"}
            value={formState.Monto}
            onChangeText={(value) => setInput("Monto", value)}
            keyboardType="numeric"
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Fecha</Text>
          <TextInput style={styles.textInput} placeholder={"19/09/2021"} />
        </View> */}

        <TouchableOpacity style={styles.btnSignUp} onPress={addExpense}>
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
    backgroundColor: colors.BLUE_COLOR,
    flex: 1,
    alignItems: "center",
    width: width,
  },
  formContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: colors.WHITE_COLOR,
    borderTopLeftRadius: 100,
    paddingTop: 50
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
  header: {
    padding: 20
  },
  headerText: {
    color: "#fff",
    fontSize: 18
  },
});

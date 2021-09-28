import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { colors } from "../styles/styles";
const { height, width } = Dimensions.get("window");
const { currentHeight } = StatusBar;
import { Feather } from "@expo/vector-icons";

const Register = ({ navigation }) => {
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
          onPress={() => navigation.goBack()}
        />
        <Text
          style={[
            styles.textLabel,
            { color: colors.WHITE_COLOR, fontSize: 18, marginLeft: "30%" },
          ]}
        >
          Registro
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Usuario</Text>
          <TextInput style={styles.textInput} placeholder={"test@gmail.com"} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput style={styles.textInput} placeholder={"test@gmail.com"} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Contraseña</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"* * * * * * * *"}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Confirmar contraseña</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"* * * * * * * *"}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={[styles.textLabel, { color: colors.WHITE_COLOR }]}>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: colors.BLUE_COLOR,
    marginTop: currentHeight,
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
    borderRadius: 5,
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
    backgroundColor: "#1BD173",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
});

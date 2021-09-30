import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
} from "react-native";
import { colors } from "../styles/styles";

const { height, width } = Dimensions.get("window");
const { currentHeight } = StatusBar;

import { Auth } from "aws-amplify";

const Login = ({ navigation }) => {

  const [emailState,setEmailState] = useState("");
  const [passwordState,setPasswordState] = useState("");

  const emailRef = useRef("");
  const passwordRef = useRef("");

  function onChangeTextEmail(value){
    setEmailState(value);
    emailRef.current = value;
  }

  function onChangeTextPassword(value){
    setPasswordState(value);
    passwordRef.current = value;
  }

  async function IniciarSesion() {
    try {
      const user = await Auth.signIn(emailRef.current,passwordRef.current);
      console.log("USUARIO ---> ",user);
      navigation.navigate("HomeTab");
    } catch (error) {
      console.log("ERROR AL INICIAR SESION ---> ",error);
    }
  }

  return (
    <View style={styles.generalContainer}>
      <View style={styles.formContainer}>
        <Text
          style={[
            styles.textLabel,
            { fontSize: 18, marginVertical: 50, fontWeight: "bold" },
          ]}
        >
          TUVARO
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput style={styles.textInput} placeholder={"test@gmail.com"} value={emailState} onChangeText={(val) => {onChangeTextEmail(val)}}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Contraseña</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"* * * * * * * *"}
            secureTextEntry={true}
            value={passwordState}
            onChangeText={(val) => {onChangeTextPassword(val)}}
          />
        </View>
        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={() => {
            IniciarSesion();
          }}
        >
          <Text style={[styles.textLabel, { color: colors.WHITE_COLOR }]}>
            Entrar
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={styles.textLabel}>¿Aún no tienes una cuenta? </Text>
          <Text
            style={[styles.textLabel, { color: colors.BLUE_COLOR }]}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Registrate
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

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
    height: "75%",
    alignItems: "center",
    backgroundColor: colors.WHITE_COLOR,
    borderTopLeftRadius: 100,
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
  btnSignIn: {
    width: "80%",
    height: 40,
    backgroundColor: colors.GREEN_1_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
});

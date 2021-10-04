import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { colors } from "../styles/styles";
const { height, width } = Dimensions.get("window");
const { currentHeight } = StatusBar;
import { Feather } from "@expo/vector-icons";

// ^ ------------------------------- AWS IMPORTS ------------------------------ */
import { Auth } from "aws-amplify";

const Register = ({ navigation }) => {

  const [emailState, setEmailState] = useState("");
  const [confirmarEmailState, setConfirmarEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmarPasswordState, setConfirmarPasswordState] = useState("");
  const [errorInputEmail,setErrorInputEmail] = useState(false);
  const [errorInputPassword,setErrorInputPassword] = useState(false);
  const [errorInputConfirmarEmail,setErrorConfirmarInputEmail] = useState(false);
  const [errorInputConfirmarPassword,setErrorConfirmarInputPassword] = useState(false);
  const [mensajeErrorEmail,setMensajeErrorEmail] = useState("introduce un correo valido");
  const [mensajeErrorContraseña,setMensajeErrorContraseña] = useState("la contraseña debe tener mayusculas, minusculas y numeros");
  const [mensajeErrorConfirmarContraseña,setMensajeErrorConfirmarContraseña] = useState("las contraseñas no coinciden");

  const emailRef = useRef("");
  const confirmarEmailRef = useRef("");
  const passwordRef = useRef("");
  const confirmarPasswordRef = useRef("");
  const inputsvalidos = useRef(true);

  function onChangeTextEmail(value) {
    setErrorInputEmail(false);
    setEmailState(value);
    emailRef.current = value;
  }

  function onChangeTextPassword(value) {
    setErrorInputPassword(false);
    setPasswordState(value);
    passwordRef.current = value;
  }

  function onChangeTextConfirmPassword(value) {
    setErrorConfirmarInputPassword(false);
    setConfirmarPasswordState(value);
    confirmarPasswordRef.current = value;
  }

  function onChangeTextConfirmEmail(value) {
    setConfirmarEmailState(value);
    confirmarEmailRef.current = value;
  }

  async function registrarUser() {
    try {

      validarInputs()
      if(inputsvalidos.current){
        const user = await Auth.signUp({
          username: emailRef.current,
          password: passwordRef.current,
        });
        console.log("USUARIO ---> ", user);
        navigation.navigate("ConfirmCode", { email: emailRef.current });
      }
      
    } catch (error) {
      console.log("ERROR AL REGISTRAR USUARIO ---> ", error);
      Alert.alert(error);
    }
  }

  function validarInputs(){

    if(emailRef.current === ""){
      inputsvalidos.current = false;
      setErrorInputEmail(true);
    }

    else if(passwordRef.current === ""){
      inputsvalidos.current = false;
      setErrorInputPassword(true);
    }

    else if(confirmarPasswordRef.current === ""){
      inputsvalidos.current = false;
      setErrorConfirmarInputPassword(true);
    }

    else if(confirmarPasswordRef.current !== passwordRef.current){
      inputsvalidos.current = false;
      setErrorConfirmarInputPassword(true);
    }

    else{
      inputsvalidos.current = true;
    }

  }

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
        <View style={errorInputEmail ? styles.inputContainerError : styles.inputContainer}>
          <Text style={styles.textLabel}>Correo</Text>
          <View style={{width: "90%", flexDirection: "row"}}>
            <TextInput
              style={styles.textInput}
              placeholder={"test@gmail.com"}
              value={emailState}
              onChangeText={(val) => {
                onChangeTextEmail(val);
              }}
            />
            {
              errorInputEmail ? 
              <Feather name="alert-circle" size={15} color="red" />
              : 
              null
            }
          </View>
          {
            errorInputEmail ? 
            <Text style={styles.textLabelError}>{mensajeErrorEmail}</Text>
            : 
            null
          }
        </View>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput 
          style={styles.textInput} 
          placeholder={"test@gmail.com"}
          value={confirmarEmailState}
          onChangeText={(val) => {
            onChangeTextConfirmEmail(val);
          }}/>
        </View> */}
        <View style={errorInputPassword ? styles.inputContainerError : styles.inputContainer}>
          <Text style={styles.textLabel}>Contraseña</Text>
          <View style={{width: "90%", flexDirection: "row"}}>
            <TextInput
              style={styles.textInput}
              placeholder={"* * * * * * * *"}
              secureTextEntry={true}
              value={passwordState}
              onChangeText={(val) => {
                onChangeTextPassword(val);
              }}
            />
            {
              errorInputPassword ? 
              <Feather name="alert-circle" size={15} color="red" />
              : 
              null
            }
          </View>
          {
            errorInputPassword ? 
            <Text style={styles.textLabelError}>{mensajeErrorContraseña}</Text>
            : 
            null
          }
        </View>
        <View style={errorInputConfirmarPassword ? styles.inputContainerError : styles.inputContainer}>
          <Text style={styles.textLabel}>Confirmar contraseña</Text>
          <View style={{width: "90%", flexDirection: "row"}}>
            <TextInput
              style={styles.textInput}
              placeholder={"* * * * * * * *"}
              secureTextEntry={true}
              value={confirmarPasswordState}
              onChangeText={(val) => {
                onChangeTextConfirmPassword(val);
              }}
            />
            {
              errorInputConfirmarPassword ? 
              <Feather name="alert-circle" size={15} color="red" />
              : 
              null
            }
          </View>
          {
            errorInputConfirmarPassword ? 
            <Text style={styles.textLabelError}>{mensajeErrorConfirmarContraseña}</Text>
            : 
            null
          }
        </View>
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => {
            registrarUser();
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
  inputContainerError: {
    width: "80%",
    marginBottom: 15,
    backgroundColor: colors.GRAY_1_COLOR,
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: "red",
    borderWidth: 2
  },
  textLabelError: {
    color: "red",
    fontSize: 10,
  },
});

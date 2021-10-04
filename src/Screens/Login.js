import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
  Image
} from "react-native";
import { colors } from "../styles/styles";
import { Feather, FontAwesome } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
const { currentHeight } = StatusBar;

import { Auth } from "aws-amplify";

const Login = ({ navigation }) => {

  const [errorInputEmail,setErrorInputEmail] = useState(false);
  const [erroInputPassword,setErroInputPassword] = useState(false);
  const [emailState,setEmailState] = useState("");
  const [passwordState,setPasswordState] = useState("");
  const [mensajeErrorEmail,setMensajeErrorEmail] = useState("introduce un correo valido");
  const [mensajeErrorPassword,setMensajeErrorPassword] = useState("contraseña incorrecta");

  const emailRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {navigation.navigate("HomeTab")})
      .catch(error => {console.log("ERROR CHECK USER ---> ", error)})
  }, [])

  function onChangeTextEmail(value){
    setErrorInputEmail(false);
    setEmailState(value);
    emailRef.current = value;
  }

  function onChangeTextPassword(value){
    setErroInputPassword(false);
    setPasswordState(value);
    passwordRef.current = value;
  }

  async function IniciarSesion() {
    try {
      setErrorInputEmail(false);
      setErroInputPassword(false);
      console.log("CREDENCIALES ---> ",emailRef.current," ",passwordRef.current);
      if(emailRef.current && passwordRef.current){
        const user = await Auth.signIn(emailRef.current,passwordRef.current);
        //console.log("USUARIO ---> ",user);
        navigation.navigate("HomeTab");
      }
      else{
        setErrorInputEmail(true);
        setErroInputPassword(true);
        setMensajeErrorEmail("introduce un correo valido");
        setMensajeErrorPassword("introduce una contraseña valida");
      }
      
    } catch (error) {
      console.log("ERROR AL INICIAR SESION ---> ",error);
      if(error.code === "UserNotFoundException"){
        switch (error.message) {

          

          case "User does not exist.":
            setErrorInputEmail(true);
            setMensajeErrorEmail("el correo no esta registrado");
            break;

          default:
            setErroInputPassword(true);
            setErrorInputEmail(true);
            break;
        }
      }
      else if(error.code === "NotAuthorizedException"){

        switch (error.message) {

          case "Incorrect username or password.":
            setErroInputPassword(true);
            setErrorInputEmail(true);
            setMensajeErrorEmail("correo o contraseña incorrectos");
            setMensajeErrorPassword("correo o contraseña incorrectos");
            break;
        
          default:
            setErroInputPassword(true);
            setErrorInputEmail(true);
            setMensajeErrorEmail("introduce un correo valido");
            setMensajeErrorPassword("introduce una contraseña valida");
            break;
        }
      }
    }
  }

  return (
    <View style={styles.generalContainer}>
      <StatusBar backgroundColor={colors.BLUE_COLOR} barStyle="light-content"/>
      <View style={{height: "30%"}}>
        <Image
          style={{width: 200, height: 200}}
          source={require('../../assets/tuvarologo.png')}
        />
      </View>
      <View style={styles.formContainer}>
        <Text
          style={[
            styles.textLabel,
            { fontSize: 26, marginVertical: 50 },
          ]}
        >
          TUVARO
        </Text>
        <View style={errorInputEmail ? styles.inputContainerError : styles.inputContainer}>
          <Text style={styles.textLabel}>Email</Text>
          <View style={{width: "90%", flexDirection: "row"}}>
            <TextInput style={styles.textInput} placeholder={"test@gmail.com"} value={emailState} onChangeText={(val) => {onChangeTextEmail(val)}}/>
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
        <View style={erroInputPassword ? styles.inputContainerError : styles.inputContainer}>
          <Text style={styles.textLabel}>Contraseña</Text>
          <View style={{width: "90%", flexDirection: "row"}}>
            <TextInput
              style={styles.textInput}
              placeholder={"* * * * * * * *"}
              secureTextEntry={true}
              value={passwordState}
              onChangeText={(val) => {onChangeTextPassword(val)}}
            />
            {
              erroInputPassword ? 
              <Feather name="alert-circle" size={15} color="red" />
              : 
              null
            }
          </View>
          {
            erroInputPassword ? 
            <Text style={styles.textLabelError}>{mensajeErrorPassword}</Text>
            : 
            null
          }
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
    //marginTop: currentHeight,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formContainer: {
    width: "100%",
    height: "60%",
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
  textLabelError: {
    color: "red",
    fontSize: 10,
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
  inputContainerError: {
    width: "80%",
    marginBottom: 15,
    backgroundColor: colors.GRAY_1_COLOR,
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: "red",
    borderWidth: 2
  },
});

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
  const [passwordState, setPasswordState] = useState("");

  const emailRef = useRef("");
  const passwordRef = useRef("");

  function onChangeTextEmail(value) {
    setEmailState(value);
    emailRef.current = value;
  }

  function onChangeTextPassword(value) {
    setPasswordState(value);
    passwordRef.current = value;
  }

  async function registrarUser() {
    try {
      console.log();
      const user = await Auth.signUp({
        username: emailRef.current,
        password: passwordRef.current,
      });
      console.log("USUARIO ---> ", user);
      navigation.navigate("ConfirmCode", { email: emailRef.current });
    } catch (error) {
      console.log("ERROR AL REGISTRAR USUARIO ---> ", error);
      Alert.alert(error);
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
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Usuario</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"test@gmail.com"}
            value={emailState}
            onChangeText={(val) => {
              onChangeTextEmail(val);
            }}
          />
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
            value={passwordState}
            onChangeText={(val) => {
              onChangeTextPassword(val);
            }}
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

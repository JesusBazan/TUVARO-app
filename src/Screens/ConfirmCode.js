import React, { useRef, useEffect, useState } from "react";
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
import { Auth } from "aws-amplify";

const Code = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
};

function ConfirmCode({ navigation, route }) {
  const [code, setCode] = useState(Code);
  const digit0 = useRef();
  const digit1 = useRef();
  const digit2 = useRef();
  const digit3 = useRef();
  const digit4 = useRef();
  const digit5 = useRef();

  const setInput = (key, value) => {
    setCode({ ...code, [key]: value });
  };

  async function confirmarCodigo() {
    try {
      let text = { ...code };

      let codeToSend =
        text[1] + text[2] + text[3] + text[4] + text[5] + text[6];

      console.log("CONFIRMAR ---> ", codeToSend, route.params.email);
      const data = await Auth.confirmSignUp(route.params.email, codeToSend);
      navigation.navigate("Login");
    } catch (error) {
      console.log("ERROR AL CONFIRMAR CODIGO ---> ", error);
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
          ConfirmCode
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Text
          style={[
            styles.textLabel,
            { marginBottom: 10, textAlign: "center", color: colors.BLUE_COLOR },
          ]}
        >
          Ingresa los 5 digitos enviados al {route.params.email}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit0}
            onChangeText={(text) => {
              if (text.length > 0) {
                digit1.current.focus();
              }
              setInput("1", text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit1}
            onChangeText={(text) => {
              if (text.length > 0) {
                digit2.current.focus();
              } else {
                digit0.current.focus();
              }
              setInput("2", text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit2}
            onChangeText={(text) => {
              if (text.length > 0) {
                digit3.current.focus();
              } else {
                digit1.current.focus();
              }
              setInput("3", text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit3}
            onChangeText={(text) => {
              if (text.length > 0) {
                digit4.current.focus();
              } else {
                digit2.current.focus();
              }
              setInput("4", text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit4}
            onChangeText={(text) => {
              if (text.length > 0) {
                digit5.current.focus();
              } else {
                digit3.current.focus();
              }
              setInput("5", text);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit5}
            onChangeText={(text) => {
              if (text.length <= 0) {
                digit4.current.focus();
              }
              setInput("6", text);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => {
            confirmarCodigo();
          }}
        >
          <Text style={[styles.textLabel, { color: colors.WHITE_COLOR }]}>
            Verificar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ConfirmCode;

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
    backgroundColor: colors.WHITE_COLOR,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textLabel: {
    color: colors.GRAY_5_COLOR,
    fontSize: 14,
  },
  textInput: {
    width: 30,
    height: 50,
    backgroundColor: colors.GRAY_1_COLOR,
    paddingLeft: 12,
    borderRadius: 10,
    color: colors.BLUE_COLOR,
  },
  btnSignUp: {
    width: "80%",
    height: 40,
    backgroundColor: colors.GREEN_1_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
});

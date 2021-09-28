import React, { useRef, useEffect } from "react";
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

function ConfirmCode({ navigation }) {
  const digit0 = useRef();
  const digit1 = useRef();
  const digit2 = useRef();
  const digit3 = useRef();
  const digit4 = useRef();

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
        <Text style={[styles.textLabel, { marginBottom: 10 }]}>
          Ingresa los 5 digitos enviados al test@gmail.com
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit0}
            onChangeText={(text) => {
              text.length > 0 ? digit1.current.focus() : null;
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit1}
            onChangeText={(text) => {
              text.length > 0 ? digit2.current.focus() : digit0.current.focus();
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit2}
            onChangeText={(text) => {
              text.length > 0 ? digit3.current.focus() : digit1.current.focus();
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit3}
            onChangeText={(text) => {
              text.length > 0 ? digit4.current.focus() : digit2.current.focus();
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"0"}
            keyboardType="numeric"
            maxLength={1}
            ref={digit4}
            onChangeText={(text) => {
              text.length > 0 ? null : digit3.current.focus();
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => {
            navigation.navigate("Login");
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

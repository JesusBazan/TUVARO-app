import React from "react";
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

const Login = ({ navigation }) => {
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
        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={() => {
            navigation.navigate("HomeTab");
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
  btnSignIn: {
    width: "80%",
    height: 40,
    backgroundColor: "#1BD173",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
});

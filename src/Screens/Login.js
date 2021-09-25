import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Login = ({navigation}) => {
    return(
        <View style={styles.generalContainer}>
            <TouchableOpacity onPress={() => {navigation.navigate("HomeTab")}}>
                <Text>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
                <Text>REGISTRO</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    generalContainer: {
        //backgroundColor: "red",
        flex: 1
    }
});
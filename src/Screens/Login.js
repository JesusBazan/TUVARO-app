import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Login = ({navigation}) => {
    return(
        <View style={styles.generalContainer}>
            <TouchableOpacity onPress={() => {navigation.navigate("Home")}}>
                <Text>LOGIN</Text>
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
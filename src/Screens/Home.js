import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Alert } from 'react-native';

const Home = () => {

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Salir", "¿Seguro que quieres salir de la aplicacion?", [
            {
                text: "No",
                onPress: () => null,
                style: "cancel",
            },
            { text: "Si", onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return(
        <View style={styles.generalContainer}>
            <Text>Home</Text>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    generalContainer: {
        backgroundColor: "#fff",
        flex: 1
    }
});
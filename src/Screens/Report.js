import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';

const Report = ({ navigation }) => {

    async function signOut() {
        try {
            await Auth.signOut();
            navigation.navigate("NavigationLogin")
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return(
        <View style={styles.generalContainer}>
            <Text>Report</Text>
            <TouchableOpacity onPress={signOut}>
                <Text style={{padding: 10}}>Cerrar sesion</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Report;

const styles = StyleSheet.create({
    generalContainer: {
        backgroundColor: "#fff",
        flex: 1
    }
});
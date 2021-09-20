import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Home = () => {
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
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const NewExpense = () => {
    return(
        <View style={styles.generalContainer}>
            <Text>New expense</Text>
        </View>
    );
}

export default NewExpense;

const styles = StyleSheet.create({
    generalContainer: {
        backgroundColor: "#fff",
        flex: 1
    }
});
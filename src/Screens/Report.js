import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Report = () => {
    return(
        <View style={styles.generalContainer}>
            <Text>Report</Text>
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
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const NewExpense = ({currentUserID}) => {
    return(
        <View style={styles.generalContainer}>
            <Text>{currentUserID}</Text>
        </View>
    );
}

const mapStateToprops = state => ({
    currentUserID: state.currentUserID
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToprops,mapDispatchToProps)(NewExpense);

const styles = StyleSheet.create({
    generalContainer: {
        backgroundColor: "#fff",
        flex: 1
    }
});
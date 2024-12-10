import React, { useState } from 'react';
import { datasource } from "./Data";
import { TextInput, View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001b43',
    },

    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
        color: '#fff',
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        marginTop: 10,
        marginHorizontal: 15,
        color: '#fff',
    },

    inputContainer: {
        borderWidth: 1,
        borderColor: '#5c5c5c',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor: '#fff',
    },

    dateContainer: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 15,
    },

    input: {
        fontSize: 16,
    },

    buttonContainer: {
        backgroundColor: '#FFA500',
        borderRadius: 8,
        paddingVertical: 15,
        marginTop: 20,
        marginHorizontal: 40,
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },

    deleteButtonContainer: {
        backgroundColor: '#FF5733',
        borderRadius: 8,
        paddingVertical: 15,
        marginTop: 10,
        marginHorizontal: 40,
        alignItems: 'center',
    },

    deleteButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

const Edit = ({ navigation, route }) => {
    const [type,] = useState(route.params.type);
    const [amount, setAmount] = useState(route.params.amount.toString());
    const [desc, setDesc] = useState(route.params.desc);
    const dateCreated = route.params.date;

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>EDIT</Text>

            <View>
                <Text style={styles.label}>Type: </Text>
                <View style={[styles.inputContainer, { backgroundColor: '#E0E0E0' }]}>
                    <Text style={[styles.input, { color: '#7F7F7F' }]}>
                        {type}
                    </Text>
                </View>


                <Text style={styles.label}>Amount ($):</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType='numeric'
                        placeholder="Enter Amount"
                    />
                </View>

                <Text style={styles.label}>Description:</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={desc}
                        onChangeText={setDesc}
                        placeholder="Enter Description"
                    />
                </View>

                <Text style={styles.label}>Date Created:</Text>
                <View style={[styles.dateContainer]}>
                    <Text style={[styles.input, { color: '#7F7F7F' }]}>{dateCreated}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    let numericAmount = parseFloat(amount);

                    if (isNaN(numericAmount)) {
                        Alert.alert("Invalid Input", "Please enter a valid amount.");
                        return;
                    }

                    let item = {
                        amount: numericAmount,
                        desc: desc,
                        date: dateCreated
                    };

                    let indexNum = type === 'Expense' ? 1 : 0;
                    datasource[indexNum].data[route.params.index] = item;
                    navigation.navigate("Home");
                }}
            >
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButtonContainer}
                onPress={() => {
                    let indexNum = type === 'Expense' ? 1 : 0;

                    Alert.alert("Are you sure?", '',
                        [
                            {
                                text: 'Yes', onPress: () => {
                                    datasource[indexNum].data.splice(route.params.index, 1);
                                    navigation.navigate("Home");
                                }
                            },
                            { text: 'No' }
                        ]
                    );
                }}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Edit;

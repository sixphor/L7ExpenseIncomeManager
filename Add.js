import React, {useState} from 'react';
import {datasource} from "./Data";
import {TextInput, View, Text, Button, StyleSheet, TouchableOpacity} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001b43',
    },

    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
        color: '#c2ffc5',

    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        marginHorizontal: 15,
        color: '#a1a1a1',
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
})

const Add = ({navigation}) => {
    const [type, setType] = useState('Income')
    const [amount, setAmount] = useState('')
    const [desc, setDesc] = useState('')
    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>ADD INCOME OR EXPENSE</Text>
            <View>
                <Text style={styles.label}>Type: </Text>
                <View style={styles.inputContainer}>
                <RNPickerSelect value={type}
                                onValueChange={(value) => setType(value)}
                                items={[
                                    {label: "Income", value: "Income"},
                                    {label: "Expense", value: "Expense"},
                ]} />
                </View>
                <Text style={styles.label}>Amount ($):</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder={'Enter Amount'}
                    />
                </View>
            </View>
            <Text style={styles.label}>Description:</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={desc}
                    onChangeText={setDesc}
                    placeholder={'Enter Description'}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                        const numericAmount = parseFloat(amount);

                        if (isNaN(numericAmount) || numericAmount <= 0) {
                            Alert.alert("Invalid Input", "Please enter a valid amount.");
                            return;
                        }
                        if (!desc.trim()) {
                            Alert.alert("Invalid Input", "Please enter a description.");
                            return;
                        }

                        let item = {
                            amount: numericAmount,
                            desc: desc,
                            date: new Date().toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            }),
                        };

                        let indexNum = type === 'Expense' ? 1 : 0;
                        datasource[indexNum].data.push(item);
                        navigation.navigate("Home");
                    }}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Add;

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SectionList, Alert} from 'react-native';
import {datasource} from "./Data.js";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001b43',
    },

    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 20,
        color: '#eab5ff',

    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        padding: 18,
        marginHorizontal: 10,
        backgroundColor: '#ffe5b4',
        borderRadius: 8,
        color: '#333',
    },

    dataContainer: {
        borderWidth: 3,
        borderColor: '#b5b5b5',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: '#123456'
    },

    moneyData: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#ffffff',
    },

    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

const Home = ({navigation}) => {
    const calculateTotals = () => {
        let totalIncome = 0;
        let totalExpense = 0;

        datasource.forEach((section) => {
            section.data.forEach((item) => {
                if (section.title === 'Income') {
                    totalIncome += item.amount;
                } else if (section.title === 'Expense') {
                    totalExpense += item.amount;
                }
            });
        });

        const surplus = totalIncome - totalExpense;

        Alert.alert(
            "Financial Summary",
            `Total Income: $${totalIncome}\nTotal Expenses: $${totalExpense}\nSurplus: $${surplus}`,
            [{text: "OK"}]
        );
    };

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity
                style={styles.dataContainer}
                onPress={() => {
                    navigation.navigate('Edit', {index: index, type: section.title, amount: item.amount, desc: item.desc, date: item.date});
                }}
            >
                <Text style={styles.moneyData}>${item.amount} - {item.desc}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>Income and Expense Tracker!</Text>
            <SectionList
                    sections={datasource}
                    renderItem={renderItem}
                    renderSectionHeader={({section: {title, bgColor}}) => (
                        <Text style={[styles.sectionTitle, {backgroundColor: bgColor || '#ffe5b4'}]}>
                            {title}
                        </Text>
                    )}
            />
            <View>
                <View style={{marginHorizontal: 10}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {navigation.navigate('Add')}}
                    >
                        <Text style={styles.buttonText}>Add Income / Expense</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 10}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={calculateTotals}
                    >
                        <Text style={styles.buttonText}>Check Total Income / Expenses</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default Home;

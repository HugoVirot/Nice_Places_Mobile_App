import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Notifications() {

    return (
        <View style={styles.container}>
            <Text style={styles.title_text}>Mes notifications</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 50,
    },
    title_text: {
        fontSize: 40,
        fontWeight: '900',
        marginBottom: 55,
    }
});
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';

export default function Counter() {
    const count = useSelector((state) => state.counter.value) // getter pour accéder au state
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <Text style={styles.title_text}>Favoris</Text>
            <Text style={styles.counter_text}>{count}</Text>
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
    },
    counter_text: {
        fontSize: 35,
        fontWeight: '900',
        margin: 15,
    },
    btn: {
        backgroundColor: '#086972',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    btn_text: {
        fontSize: 23,
        color: '#fff',
    },
});
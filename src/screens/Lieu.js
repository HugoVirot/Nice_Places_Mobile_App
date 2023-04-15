import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Link } from '@react-navigation/native'
import axios from 'axios'
import { getCategoryIcon } from '../utils/getCategoryIcon';
import { faEarthEurope, faGaugeSimpleHigh, faHourglassHalf, faLocation, faLocationDot, faLocationPin, faMapLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

const { width } = Dimensions.get('window');

export default function Lieu({ route, navigation }) {

    const [lieu, setLieu] = useState('');

    useEffect(() => {
        setLieu('')
        // on récupère les infos du lieu (voir pour les passer en props)
        axios.get("https://nice-places.fr/api/lieus/" + route.params.id)
            .then((response) => {
                setLieu(response.data.data)
            }).catch(() => { // message d'erreur pour l'utilisateur en cas d'échec de l'appel API
                alert("Une erreur s'est produite. Certains éléments peuvent ne pas être affichés. Vous pouvez essayer de recharger la page pour corriger le problème.")
            })
    }, [])

    return (
        <SafeAreaView style={stylesheet.container}>

            {lieu ?  // si lieu chargé

                <View style={stylesheet.mainView}>
                    <View style={stylesheet.iconAndTitle}>
                        {getCategoryIcon(lieu.categorie.id, lieu.categorie.couleur)}
                        <Text style={stylesheet.title}>{lieu.nom}</Text>
                    </View>

                    <ScrollView style={stylesheet.scrollView}>

                        <View style={stylesheet.iconAndInfo}>
                            <FontAwesomeIcon icon={faMapLocationDot} size={30} style={stylesheet.infoIcon} />
                            <View style={stylesheet.verticalDisplay}>
                                <Text style={[stylesheet.infoText, stylesheet.adressText]}>{lieu.adresse}</Text>
                                <Text style={stylesheet.infoText}>{lieu.code_postal} {lieu.ville}</Text>
                            </View>
                        </View>

                        <View style={stylesheet.iconAndInfo}>
                            <FontAwesomeIcon icon={faHourglassHalf} size={30} style={stylesheet.infoIcon} />
                            <Text style={stylesheet.infoText}>{lieu.temps}h en moyenne</Text>
                        </View>

                        <View style={stylesheet.iconAndInfo}>
                            <FontAwesomeIcon icon={faGaugeSimpleHigh} size={30} style={stylesheet.infoIcon} />
                            <Text style={stylesheet.infoText}>{lieu.difficulte}</Text>
                        </View>

                        <View style={stylesheet.iconAndInfo}>
                            <FontAwesomeIcon icon={faEarthEurope} size={30} style={stylesheet.infoIcon} />
                            <View style={stylesheet.verticalDisplay}>
                                <Text style={stylesheet.infoText}>latitude : {lieu.latitude}</Text>
                                <Text style={stylesheet.infoText}>longitude : {lieu.longitude}</Text>
                            </View>
                        </View>

                        <View style={stylesheet.iconAndInfo}>
                            <FontAwesomeIcon icon={faStar} size={30} style={stylesheet.starIcon} />
                            <Text style={stylesheet.infoText}>note moyenne : {lieu.note} / 10</Text>
                        </View>

                    </ScrollView>
                </View>

                : <Text style={stylesheet.loadingText}>chargement en cours...</Text> // en attendant
            }

        </SafeAreaView>
    )
}

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20
    },

    scrollView: {
        width: width,
        padding: 20,
        marginTop: 120
    },

    infoText: {
        fontFamily: 'Cooper',
        fontSize: 20,
        color: 'grey',
    },

    adressText: {
        width: 250
    },

    iconAndInfo: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },

    verticalDisplay: {
        display: 'flex',
        flexDirection: 'column'
    },

    image: {
        flex: 1,
        width: width,
        padding: 35,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    title: {  // "nom du lieu"
        fontSize: 30,
        color: '#1C6E8C',
        textAlign: 'center',
        fontWeight: '900',
        fontFamily: 'Cooper',
        marginLeft: 10
    },

    iconAndTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
        backgroundColor: 'white',
        width: width,
        height: 100,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0
    },

    infoIcon: {
        color: '#1C6E8C',
        marginRight: 20
    },

    starIcon: {
        color: 'yellow',
        marginRight: 20
    },

    loadingText: {
        fontFamily: 'Cooper',
        fontSize: 20,
        color: '#94D1BE',
        marginTop: 350
    }
});
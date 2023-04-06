import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageBackground, StyleSheet, Text, SafeAreaView, ScrollView, Dimensions, Button, Icon } from 'react-native';
import axios from 'axios';
import { storeLieux } from '../stores/lieuSlice';
import { Card } from '@rneui/themed';
import { Link } from '@react-navigation/native';
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { View } from 'react-native-web';
import { getCategoryIcon } from '../utils/getCategoryIcon';

const { width } = Dimensions.get('window');

export default function Lieux() {

    const dispatch = useDispatch()
    const lieux = useSelector((state) => state.lieu.lieux) // getter pour accéder au state

    useEffect(() => {
        axios.get('https://nice-places.fr/api/lieus')
            .then((response) => {
                dispatch(storeLieux(response.data.data))
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <SafeAreaView style={stylesheet.container}>

            <View style={stylesheet.iconAndTitle}>
                <FontAwesomeIcon icon={faLocationDot} size={50} style={stylesheet.locationDot} />
                <Text style={stylesheet.title}>Lieux</Text>
            </View>

            {lieux ?
                <ScrollView style={stylesheet.scrollView}>

                    {lieux.map(lieu => {
                        console.log(lieu);
                        return <Card containerStyle={{ padding: 0 }} key={lieu.id} style={stylesheet.card}>
                            <ImageBackground source={{
                                uri:
                                    'https://nice-places.fr/images/' + lieu.image_mise_en_avant[0].nom,
                            }} style={stylesheet.image}>

                                <View style={stylesheet.cardContent}>

                                    <View style={stylesheet.categoryAndRating}>

                                        {/* {icône catégorie} */}
                                        {getCategoryIcon(lieu.categorie.id, lieu.categorie.couleur)}

                                        {/* {étoile + note} */}
                                        <View style={stylesheet.starAndRating}>
                                            <FontAwesomeIcon icon={faStar} size={30} style={stylesheet.star} />
                                            <Text style={stylesheet.note}>{lieu.note}</Text>
                                        </View>

                                    </View>

                                    <Card.Title style={stylesheet.placeName}>{lieu.nom}</Card.Title>

                                    <Text style={stylesheet.placeAdress}>
                                        <FontAwesomeIcon icon={faLocationDot} size={30} style={stylesheet.locationDot} />
                                        {lieu.ville} ({lieu.code_postal.slice(0, 2)})
                                    </Text>

                                    <Link to={{ screen: 'Inscription' }} style={stylesheet.linkToPlaceButton}>
                                        <Text style={stylesheet.linkToPlaceText}>Voir le lieu</Text>
                                    </Link>

                                </View>

                            </ImageBackground>
                        </Card>
                    })}
                </ScrollView>

                : <Text style={stylesheet.loadingText}>chargement en cours...</Text>
            }

        </SafeAreaView >
    )
}

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 30
    },

    iconAndTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        paddingBottom: 10
    },

    title: {  // "liste des lieux"
        fontSize: 40,
        color: '#1C6E8C',
        textAlign: 'center',
        fontWeight: '900',
        fontFamily: 'Cooper',
        marginLeft: 10
    },

    cardContent: {
        display: 'flex',
        flexDirection: 'column',
    },

    image: {
        backgroundRepeat: "no-repeat",
        padding: 20,
        height: 275
    },

    scrollView: {
        width: width,
        paddingHorizontal: 10,
    },

    placeName: {
        height: 50,
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '900',
        marginBottom: 55,
        fontFamily: 'Cooper',
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },

    categoryAndRating: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },

    star: {
        color: 'gold',
        marginRight: 10
    },

    note: {
        fontFamily: 'Cooper',
        fontSize: 25,
        color: '#fff',
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },

    locationDot: {
        color: '#94D1BE',
    },

    starAndRating: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    placeAdress: {
        height: 50,
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '900',
        fontFamily: 'Cooper',
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },

    linkToPlaceButton: {
        backgroundColor: '#1C6E8C',
        padding: 6,
        borderRadius: 20,
        textAlign: 'center'
    },

    linkToPlaceText: {
        fontFamily: 'Cooper',
        fontSize: 20,
        color: '#fff',
        position: 'relative',
        bottom: 0
    },

    loadingText: {
        fontFamily: 'Cooper',
        fontSize: 20,
        color: '#94D1BE',
    }


});
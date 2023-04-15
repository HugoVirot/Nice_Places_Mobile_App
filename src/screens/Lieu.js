import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Link } from '@react-navigation/native'
import axios from 'axios'
import { getCategoryIcon } from '../utils/getCategoryIcon';
import { faEarthEurope, faGaugeSimpleHigh, faHourglassHalf, faMapLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import Carousel from 'react-native-reanimated-carousel';
import { createImagesSourcesArray } from '../utils/createImagesSourcesArray'

const { width } = Dimensions.get('window');

export default function Lieu({ route, navigation }) {

    const [lieu, setLieu] = useState('');

    useEffect(() => {
        // on récupère les infos du lieu (voir pour les passer en props)
        axios.get("https://nice-places.fr/api/lieus/" + route.params.id)
            .then((response) => {
                console.log(response.data.data);
                setLieu(response.data.data)
            }).catch(() => { // message d'erreur pour l'utilisateur en cas d'échec de l'appel API
                alert("Une erreur s'est produite. Certains éléments peuvent ne pas être affichés. Vous pouvez essayer de recharger la page pour corriger le problème.")
            })
    }, [route.params.id])

    return (
        <SafeAreaView style={stylesheet.container}>

            {lieu ?  // si lieu chargé

                <View>
                    <View style={stylesheet.iconAndTitle}>
                        {getCategoryIcon(lieu.categorie.id, lieu.categorie.couleur)}
                        <Text style={stylesheet.title}>{lieu.nom}</Text>
                        <View style={stylesheet.iconAndInfo}>
                            <FontAwesomeIcon icon={faStar} size={30} style={stylesheet.starIcon} />
                            <Text style={stylesheet.infoText}>{lieu.note}</Text>
                        </View>
                    </View>

                    <ScrollView style={stylesheet.scrollView}>

                        {/* pas d'image : image par défaut / 1 seule image : on l'affiche / plusieurs = carousel */}
                        {lieu.images.length == 0 ?
                            <Image
                                style={stylesheet.logo}
                                source={require('../../assets/defaultpicture.jpg')}
                                alt="image par défaut"
                            />
                            :
                            lieu.images.length == 1 ?
                                <Image
                                    style={stylesheet.singleImage}
                                    source={{ uri: 'https://nice-places.fr/images/' + lieu.images[0].nom }}
                                    alt="image par défaut"
                                />
                                :
                                <View style={{ flex: 1 }}>
                                    <Carousel
                                        loop
                                        width={width}
                                        height={width / 2}
                                        autoPlay={true}
                                        data={createImagesSourcesArray(lieu.images)}
                                        scrollAnimationDuration={1000}
                                        renderItem={({ item }) => (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    borderWidth: 1,
                                                    justifyContent: 'center',
                                                }}>
                                                <Image
                                                    style={stylesheet.carouselImage}
                                                    source={{ uri: item }}
                                                />
                                            </View>
                                        )}
                                    />
                                </View>
                        }

                        <View style={stylesheet.informations}>

                            <View style={stylesheet.iconAndInfo}>
                                <FontAwesomeIcon icon={faMapLocationDot} size={30} style={stylesheet.infoIcon} />
                                <View style={stylesheet.verticalDisplay}>
                                    <Text style={[stylesheet.infoText, stylesheet.adressText]}>{lieu.adresse}</Text>
                                    <Text style={[stylesheet.infoText, stylesheet.adressText]}>{lieu.code_postal} {lieu.ville}</Text>
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

                            <Text style={[stylesheet.infoText, stylesheet.description]}>{lieu.description}</Text>

                            <View style={stylesheet.iconAndInfo}>
                                <FontAwesomeIcon icon={faStar} size={30} style={stylesheet.starIcon} />
                                <Text style={stylesheet.infoText}>note moyenne : {lieu.note} / 10</Text>
                            </View>

                            {lieu.avis.length > 0 ? <Text>{lieu.avis.length} avis sur ce lieu</Text>
                                : <Text>Aucun avis sur ce lieu</Text>
                            }
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
    },

    title: {  // nom du lieu
        fontSize: 20,
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
        padding: 15,
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

    scrollView: {
        width: width,
        marginTop: 100
    },

    informations: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 20
    },

    singleImage: {
        width: width,
        height: 175,
        marginBottom: 20
    },

    carouselImage: {
        width: width,
        height: width / 2,
    },

    infoText: {
        fontFamily: 'Cooper',
        fontSize: 20,
        color: 'grey',
    },

    description: {
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: "#1C6E8C"
    },

    adressText: {
        width: 250
    },

    iconAndInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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

    infoIcon: {
        color: '#1C6E8C',
        marginRight: 20
    },

    starIcon: {
        color: 'yellow',
        marginLeft: 10,
        marginRight: 10
    },

    loadingText: {
        fontFamily: 'Cooper',
        fontSize: 20,
        color: '#94D1BE',
        marginTop: 350
    }
});
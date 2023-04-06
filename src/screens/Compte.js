import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dimensions, ImageBackground, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { faUser, faPen, faStar, faEnvelope, faPlus, faPaperPlane, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Link } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Counter() {
    // const count = useSelector((state) => state.counter.value) // getter pour accéder au state
    // const dispatch = useDispatch()

    return (
        <SafeAreaView style={stylesheet.container}>

            <ImageBackground source={require('../../assets/montagne-fleuve.jpg')} resizeMode="cover" style={stylesheet.image}>

                <View style={stylesheet.iconAndTitle}>
                    <FontAwesomeIcon icon={faUser} size={60} style={stylesheet.userIcon} />
                    <Text style={stylesheet.title}>Mon Compte</Text>
                </View>

                <View style={stylesheet.iconAndOption}>
                    <FontAwesomeIcon icon={faPen} size={60} style={stylesheet.optionIcon} />
                    <Link to={{ screen: 'ModifCompte' }} style={stylesheet.optionText}>
                        <Text >Modifier mes infos</Text>
                    </Link>
                </View>

                <View style={stylesheet.iconAndOption}>
                    <FontAwesomeIcon icon={faStar} size={70} style={stylesheet.optionIcon} />
                    <Link to={{ screen: 'Favoris' }} style={stylesheet.optionText}>
                        <Text >Mes favoris</Text>
                    </Link>
                </View>

                <View style={stylesheet.iconAndOption}>
                    <FontAwesomeIcon icon={faEnvelope} size={70} style={stylesheet.optionIcon} />
                    <Link to={{ screen: 'Notifications' }} style={stylesheet.optionText}>
                        <Text>Mes notifications</Text>
                    </Link>
                </View>

                <View style={stylesheet.iconAndOption}>
                    <FontAwesomeIcon icon={faPlus} size={70} style={stylesheet.optionIcon} />
                    <Link to={{ screen: 'ProposerLieu' }} style={stylesheet.optionText}>
                        <Text>Proposer un lieu</Text>
                    </Link>
                </View>

                <View style={stylesheet.iconAndOption}>
                    <FontAwesomeIcon icon={faPaperPlane} size={70} style={stylesheet.optionIcon} />
                    <Link to={{ screen: 'LieuxPostes' }} style={stylesheet.optionText}>
                        <Text>Mes lieux postés</Text>
                    </Link>
                </View>

                <View style={stylesheet.iconAndOption}>
                    <FontAwesomeIcon icon={faUserXmark} size={70} style={stylesheet.optionIcon} />
                    <Link to={{ screen: 'Favoris' }} style={stylesheet.deleteAccountText}>
                        <Text>Supprimer mon compte</Text>
                    </Link>
                </View>

            </ImageBackground>

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

    image: {
        flex: 1,
        width: width,
        padding: 35,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    userIcon: {
        color: '#94D1BE',
    },

    title: {  // "liste des lieux"
        fontSize: 40,
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

    iconAndOption: {
        flexDirection: 'row',
    },

    optionIcon: {
        color: 'white',
        marginRight: 20
    },

    optionText: {
        color: 'white',
        width: 275,
        fontSize: 25,
        fontFamily: 'Cooper',
        backgroundColor: '#94D1BE',
        padding: 15,
        borderRadius: 20,
        textAlign: 'center',
        marginBottom: 30
    },

    deleteAccountText: {
        color: 'white',
        width: 275,
        fontSize: 25,
        fontFamily: 'Cooper',
        backgroundColor: '#a83832',
        padding: 15,
        borderRadius: 20,
        textAlign: 'center',
        marginBottom: 30
    }

});
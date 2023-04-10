import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, ImageBackground, StyleSheet, Text, View, SafeAreaView, Modal, Button, Pressable, TouchableOpacity } from 'react-native';
import { faUser, faPen, faStar, faEnvelope, faPlus, faPaperPlane, faUserXmark, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Link } from '@react-navigation/native'
import { logOutUser } from '../stores/userSlice'
import axios from 'axios'

const { width } = Dimensions.get('window');

export default function Compte({ navigation: { navigate } }) {

    const id = useSelector(state => state.user.id)
    const [deleteSuccess, setDeleteSuccess] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch()

    const deleteAccount = () => {
        axios.delete('https://nice-places.fr/api/users/' + id)
            .then(() => {
                // on masque le modal
                setModalVisible(!modalVisible)

                // message de succès     
                setDeleteSuccess('Compte supprimé avec succès !')

                // déconnexion de l'utilisateur (= reset state)
                dispatch(logOutUser())

                // on enlève le message de succès (pour prochain affichage compte) et on renvoie sur l'accueil
                setTimeout(() => {
                    setDeleteSuccess('')
                    navigate('Accueil') // https://reactnavigation.org/docs/navigation-prop/
                }, 2500)
            })
            .catch(() => console.log("erreur"))
    }

    return (
        <SafeAreaView style={stylesheet.container}>

            <ImageBackground source={require('../../assets/montagne-fleuve.jpg')} resizeMode="cover" style={stylesheet.image}>

                <View style={stylesheet.iconAndTitle}>
                    <FontAwesomeIcon icon={faUser} size={60} style={stylesheet.userIcon} />
                    <Text style={stylesheet.title}>Mon Compte</Text>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal fermé.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={stylesheet.centeredView}>
                        <View style={stylesheet.modalView}>
                            <Text style={stylesheet.modalText}>Etes-vous sûr de vouloir supprimer votre compte ?</Text>
                            <View style={stylesheet.modalButtons}>
                                <Pressable
                                    style={[stylesheet.cancelButton, stylesheet.modalButton]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={stylesheet.buttonText}>Non, annuler</Text>
                                </Pressable>
                                <Pressable
                                    style={[stylesheet.confirmationButton, stylesheet.modalButton]}
                                    onPress={() => deleteAccount()}>
                                    <Text style={stylesheet.buttonText}>Oui, supprimer le compte</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* fenêtre message de succès*/}
                {deleteSuccess ? <Text style={stylesheet.deleteSuccessDisplay}>
                    <FontAwesomeIcon icon={faCheckCircle} size={100} style={stylesheet.deleteSuccessIcon} />
                    <Text style={stylesheet.deleteSuccessText}>{deleteSuccess}</Text>
                </Text> : <Text></Text>}

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
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={stylesheet.deleteAccountText}>Supprimer mon compte</Text>
                    </TouchableOpacity>
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

    deleteAccountButton: {
        width: 230,
        backgroundColor: '#a83832',
    },

    deleteAccountText: {
        color: 'white',
        width: 230,
        fontSize: 25,
        fontFamily: 'Cooper',
        backgroundColor: '#a83832',
        padding: 15,
        borderRadius: 20,
        textAlign: 'center',
        marginBottom: 30
    },

    deleteSuccessDisplay: {
        padding: 15,
        backgroundColor: '#94D1BE',
        color: 'white',
        fontSize: 40,
        height: 300,
        width: width,
        fontWeight: '900',
        textAlign: 'center',
        position: 'absolute',
        zIndex: 1,
        top: '30%',
        left: 0,
        fontFamily: 'Cooper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    deleteSuccessIcon: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 40
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#a83832',
        fontSize: 20,
        fontWeight: '900',
    },

    modalButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        paddingBottom: 10
    },

    modalButton: {
        fontSize: 20,
        padding: 20,
        borderRadius: 20,
        zIndex: 0.5
    },

    cancelButton: {
        backgroundColor: '#a83832',
    },

    confirmationButton: {
        backgroundColor: '#94D1BE',
    },

    buttonText: {
        color: 'white',
        fontWeight: '900'
    }
});
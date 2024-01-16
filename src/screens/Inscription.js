import React, { useState } from 'react';
import { Modal, ImageBackground, StyleSheet, Alert, Pressable, Text, View, Dimensions, TextInput } from 'react-native';
const { width } = Dimensions.get('window');
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Inscription({ navigation: { navigate } }) {

    const [pseudoSaisi, setPseudoSaisi] = useState('');
    const [emailSaisi, setEmailSaisi] = useState('');
    const [mdpSaisi, setMdpSaisi] = useState('');
    const [mdpConfirmSaisi, setMdpConfirmSaisi] = useState('');

    const [pseudoError, setPseudoError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mdpError, setMdpError] = useState('');
    const [mdpConfirmError, setMdpConfirmError] = useState('');

    const [registerErrors, setRegisterErrors] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const handleRegister = () => {
        // si il y avait des erreurs de validation, on les supprime
        if (registerErrors) {
            setRegisterErrors('')
        }

        // on vérifie si un pseudo, un email et un mot de passe ont bien été saisis
        if (!pseudoSaisi) {
            setPseudoError('Pseudo requis')
        } else {
            setPseudoError('')
        }

        if (!emailSaisi || !emailSaisi.includes('@') || !emailSaisi.includes('.')) {
            setEmailError('E-mail manquant ou incorrect')
        } else {
            setEmailError('')
        }

        if (!mdpSaisi) {
            setMdpError('mot de passe requis')
        } else {
            setMdpError('')
        }

        // si confirmation pas saisie ou différente du mot de passe (s'il est saisi)
        if (!mdpConfirmSaisi || mdpSaisi && mdpConfirmSaisi !== mdpSaisi) {
            setMdpConfirmError('confirmation manquante ou incorrecte')
        }
        // sinon, si tout est rempli est bon, on efface les éventuels anciens messages d'erreur
        else if (pseudoSaisi && emailSaisi && mdpSaisi) {
            setMdpConfirmError('')

            //puis on tente l'inscription avec un appel api qui transmet les infos saisies
            axios.post('https://nice-places.fr/api/register', {
                pseudo: pseudoSaisi.trim(),  // trim enlève les espaces en début et fin de saisie
                email: emailSaisi.trim(),
                password: mdpSaisi,
                password_confirmation: mdpConfirmSaisi
            })
                .then(response => {
                    console.log(response);

                    // on enregistre un message de succès (affiché ensuite)
                    setRegisterSuccess('Inscription réussie !')

                    // on réinitialise tous les champs
                    setPseudoSaisi('')
                    setEmailSaisi('')
                    setMdpSaisi('')
                    setMdpConfirmSaisi('')

                    // on enlève le message de succès et on renvoie sur l'accueil
                    setTimeout(() => {
                        setRegisterSuccess('')
                        navigate('Accueil') // https://reactnavigation.org/docs/navigation-prop/
                    }, 2500)

                    // si l'inscription échoue : on affiche la ou les erreurs rencontrée(s)
                }).catch((error) => {

                    Object.values(error.response.data.errors).forEach(value => {
                        // on transforme chaque tableau de messages d'erreurs en string et on l'ajoute
                        let oldRegisterErrors = registerErrors
                        setRegisterErrors(oldRegisterErrors += value.toString());
                    })
                    // on affiche les erreurs en console et on rend le modal visible (message de succès)
                    console.log(registerErrors);
                    setModalVisible(true)
                })
        }
    }

    return (
        <View style={stylesheet.container}>
            <ImageBackground source={require('../../assets/ponton-lac.jpg')} resizeMode="cover" style={stylesheet.image}>

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
                            <Text style={stylesheet.modalText}>{registerErrors}</Text>
                            <Pressable
                                style={stylesheet.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={stylesheet.textStyle}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {registerSuccess ? <Text style={stylesheet.registerSuccessDisplay}>
                    <FontAwesomeIcon icon={faCheckCircle} size={100} style={stylesheet.registerSuccessIcon} />
                    <Text style={stylesheet.registerSuccessText}>{registerSuccess}</Text>
                </Text> : <Text></Text>}

                <Text style={stylesheet.title}>Inscription</Text>

                <View style={stylesheet.formulaire}>
                    {pseudoError ? <Text style={stylesheet.errorDisplay}>{pseudoError}</Text> : <Text></Text>}
                    <TextInput
                        style={stylesheet.input}
                        placeholder='pseudo'
                        placeholderTextColor={'grey'}
                        //placeholderTextSize = 20px
                        onChangeText={(text) => setPseudoSaisi(text)}
                        value={pseudoSaisi}
                    />

                    {emailError ? <Text style={stylesheet.errorDisplay}>{emailError}</Text> : <Text></Text>}
                    <TextInput
                        style={stylesheet.input}
                        placeholder='email'
                        placeholderTextColor={'grey'}
                        //placeholderTextSize = 20px
                        onChangeText={(text) => setEmailSaisi(text)}
                        value={emailSaisi}
                    />

                    {mdpError ? <Text style={stylesheet.errorDisplay}>{mdpError}</Text> : <Text></Text>}
                    <Text style={stylesheet.criteresMdp}>Votre mot de passe doit comporter au moins 8 caractères. Il contenir au moins une
                        lettre, un chiffre, une minuscule, une majuscule et un caractère spécial parmi ! @ # $ % ^ & * ?.</Text>
                    <TextInput
                        style={stylesheet.input}
                        placeholder='mot de passe'
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                        onChangeText={(text) => setMdpSaisi(text)}
                        value={mdpSaisi}
                    />

                    {mdpConfirmError ? <Text style={stylesheet.errorDisplay}>{mdpConfirmError}</Text> : <Text></Text>}
                    <TextInput
                        style={stylesheet.input}
                        placeholder='confirmez le mot de passe'
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                        onChangeText={(text) => setMdpConfirmSaisi(text)}
                        value={mdpConfirmSaisi}
                    />

                    <TouchableOpacity
                        style={stylesheet.loginButton}
                        onPress={handleRegister}>
                        <Text style={stylesheet.loginText}>valider</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    )
}

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 50,
    },

    image: {
        flex: 1,
        width: width,
        padding: 50
    },

    title: {  // "inscription"
        fontSize: 40,
        color: '#1C6E8C',
        textAlign: 'center',
        fontWeight: '900',
        marginBottom: 80,
        fontFamily: 'Cooper',
    },

    formulaire: {
        justifyContent: 'center', alignItems: 'center'
    },

    btn: {
        backgroundColor: '#086972',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },

    input: {
        height: 45,
        width: 300,
        color: '#1C6E8C',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: 20,
        fontFamily: 'Cooper',
        fontSize: 18,
        paddingLeft: 20,
        borderRadius: 10,
    },

    criteresMdp: {
        fontFamily: 'Cooper',
        textAlign: 'center',
        fontSize: 12,
        padding: 10,
        borderRadius: 10,
        color: 'white',
        backgroundColor: '#1C6E8C',
    },

    loginButton: {
        backgroundColor: '#94D1BE',
        padding: 10,
        borderRadius: 20,
        width: 250,
        textAlign: 'center'
    },

    loginText: {
        fontFamily: 'Cooper',
        fontSize: 20,
        color: '#fff',
    },

    errorDisplay: {
        padding: 15,
        backgroundColor: '#a83832',
        color: 'white',
        fontSize: 16,
        height: 60,
        width: 250,
        fontWeight: '900',
        textAlign: 'center',
    },

    registerErrorDisplay: {
        padding: 15,
        backgroundColor: '#a83832',
        color: 'white',
        fontSize: 20,
        width: width,
        fontWeight: '900',
        textAlign: 'center',
        position: 'absolute',
        top: '25%',
        zIndex: 1,
        left: 0
    },

    registerSuccessDisplay: {
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
        justifyContent: 'center'
    },

    registerSuccessIcon: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 40
    },

    registerSuccessText: {
        textAlign: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        margin: 20,
        backgroundColor: '#a83832',
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

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        padding: 10,
        backgroundColor: '#1C6E8C',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
});
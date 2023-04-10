import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, ImageBackground, StyleSheet, Alert, Pressable, Text, View, Dimensions, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function ModifCompte({ navigation: { navigate } }) {

    const id = useSelector(state => state.user.id)
    const pseudo = useSelector(state => state.user.pseudo)
    const email = useSelector(state => state.user.email)

    const [pseudoSaisi, setPseudoSaisi] = useState(pseudo);
    const [emailSaisi, setEmailSaisi] = useState(email);
    const [mdpSaisi, setMdpSaisi] = useState('');
    const [newMdpSaisi, setNewMdpSaisi] = useState('');
    const [newMdpConfirmSaisi, setNewMdpConfirmSaisi] = useState('');

    const [pseudoError, setPseudoError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mdpError, setMdpError] = useState('');
    const [newMdpError, setNewMdpError] = useState('');
    const [newMdpConfirmError, setNewMdpConfirmError] = useState('');

    const [updateErrors, setUpdateErrors] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const updateAttempt = () => {
        // si il y avait des erreurs de validation, on les supprime
        setUpdateErrors('')
        setPseudoError('')
        setEmailError('')
        setMdpError('')
        setNewMdpError('')
        setNewMdpConfirmError('')

        // si problème sur le pseudo, on affiche une erreur
        if (!pseudoSaisi) {
            setPseudoError('Pseudo requis')
        } else {
            setPseudoError(null)
        }

        // si problème sur l'email, on affiche une erreur
        if (!emailSaisi || !emailSaisi.includes('@') || !emailSaisi.includes('.')) {
            setEmailError('E-mail manquant ou incorrect')
        } else {
            setEmailError(null)
        }

        // si new mdp saisi mais pas l'actuel
        if (newMdpSaisi && !mdpSaisi) {
            setMdpError('mot de passe actuel requis')
        }

        // si mdp actuel saisi mais pas le nouveau
        if (!newMdpSaisi && mdpSaisi) {
            setNewMdpError('nouveau mot de passe requis')
        }

        // si new mdp saisi et confirmation différente du new mot de passe
        if (newMdpSaisi && newMdpConfirmSaisi !== newMdpSaisi) {
            setNewMdpConfirmError('confirmation manquante ou incorrecte')
        }

        // 2 possibilités => pseudo et email saisis seuls OU tous champs remplis
        if (pseudoSaisi && emailSaisi && !mdpSaisi && !newMdpSaisi && !newMdpConfirmSaisi
            || pseudoSaisi && emailSaisi && mdpSaisi && newMdpSaisi && newMdpConfirmSaisi) {

            //  appel api qui transmet les infos saisies
            axios.put('https://nice-places.fr/api/users/' + id, {
                pseudo: pseudoSaisi,
                email: emailSaisi,
                oldPassword: mdpSaisi ? mdpSaisi : null,
                password: newMdpSaisi ? newMdpSaisi : null,
                password_confirmation: newMdpConfirmSaisi ? newMdpConfirmSaisi : null
            })
                .then(response => {
                    console.log(response);

                    // message de succès + effacement des saisies     
                    setUpdateSuccess('Modification réussie !')
                    setMdpSaisi('')
                    setNewMdpSaisi('')
                    setNewMdpConfirmSaisi('')

                    // on enlève le message de succès et on renvoie sur l'accueil
                    setTimeout(() => {
                        setUpdateSuccess(null)
                        navigate('Accueil') // https://reactnavigation.org/docs/navigation-prop/
                    }, 2500)

                    // si elle échoue : on affiche la ou les erreurs rencontrée(s)
                }).catch((error) => {

                    Object.values(error.response.data.errors).forEach(value => {
                        // on transforme chaque tableau de messages d'erreurs en string et on l'ajoute
                        let oldupdateErrors = updateErrors
                        setUpdateErrors(oldupdateErrors += value.toString());
                    })

                    console.log(updateErrors);
                    setModalVisible(true)
                })
        }
    }

    return (
        <View style={stylesheet.container}>
            <ImageBackground source={require('../../assets/ponton-lac.jpg')} resizeMode="cover" style={stylesheet.image}>

                <View style={stylesheet.iconAndTitle}>
                    <FontAwesomeIcon icon={faPen} size={60} style={stylesheet.userIcon} />
                    <Text style={stylesheet.title}>Modifier mes infos</Text>
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
                            <Text style={stylesheet.modalText}>{updateErrors}</Text>
                            <Pressable
                                style={stylesheet.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={stylesheet.textStyle}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {/* fenêtre message de succès*/}
                {updateSuccess ? <Text style={stylesheet.updateSuccessDisplay}>
                    <FontAwesomeIcon icon={faCheckCircle} size={100} style={stylesheet.updateSuccessIcon} />
                    <Text style={stylesheet.updateSuccessText}>{updateSuccess}</Text>
                </Text> : <Text></Text>}

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

                    <Text style={stylesheet.blueText}>Modifier le mot de passe</Text>

                    <Text style={stylesheet.blueText}>saisissez d'abord votre mot de passe actuel</Text>

                    {mdpError ? <Text style={stylesheet.errorDisplay}>{mdpError}</Text> : <Text></Text>}

                    <TextInput
                        style={stylesheet.input}
                        placeholder='mot de passe actuel'
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                        onChangeText={(text) => setMdpSaisi(text)}
                        value={mdpSaisi}
                    />

                    {newMdpError ? <Text style={stylesheet.errorDisplay}>{newMdpError}</Text> : <Text></Text>}

                    <Text style={stylesheet.criteresMdp}>Votre mot de passe doit comporter au moins 8 caractères. Il contenir au moins une
                        lettre, un chiffre, une minuscule, une majuscule et un caractère spécial parmi ! @ # $ % ^ & * ?.</Text>
                    <TextInput
                        style={stylesheet.input}
                        placeholder='mot de passe'
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                        onChangeText={(text) => setNewMdpSaisi(text)}
                        value={newMdpSaisi}
                    />

                    {newMdpConfirmError ? <Text style={stylesheet.errorDisplay}>{newMdpConfirmError}</Text> : <Text></Text>}
                    <TextInput
                        style={stylesheet.input}
                        placeholder='confirmez le mot de passe'
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                        onChangeText={(text) => setNewMdpConfirmSaisi(text)}
                        value={newMdpConfirmSaisi}
                    />

                    <TouchableOpacity
                        style={stylesheet.loginButton}
                        onPress={updateAttempt}>
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
        backgroundColor: 'red',
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

    blueText: {
        fontSize: 25,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '900',
        marginBottom: 20,
        fontFamily: 'Cooper',
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
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

    updateErrorDisplay: {
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

    updateSuccessDisplay: {
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
        fontFamily: 'Cooper'
    },

    updateSuccessIcon: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 40
    },

    updateSuccessText: {
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
})
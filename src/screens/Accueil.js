import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ImageBackground, StyleSheet, Image, Text, View, Dimensions, TextInput, Button } from 'react-native';
import { storeUserData, setUserAsLoggedIn } from '../stores/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
library.add(faCheckCircle);
const { width } = Dimensions.get('window');

export default function Accueil() {

  const dispatch = useDispatch()                        // pb : token = empty string (state de départ)

  const [emailSaisi, setEmailSaisi] = useState('');
  const [mdpsaisi, setMdpSaisi] = useState('');

  const [emailError, setEmailError] = useState('');
  const [mdpError, setMdpError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const userLoggedIn = useSelector((state) => state.user.userLoggedIn) // getter pour accéder au state

  const loginAttempt = () => {
    // on vérifie si un email et un mot de passe ont bien été saisis
    if (!emailSaisi.trim()) {
      setEmailError('E-mail requis')
    }

    if (!mdpsaisi.trim()) {
      setMdpError('mot de passe requis')
    }

    // si c'est bon, on efface les éventuels anciens messages d'erreur
    if (emailSaisi.trim() && mdpsaisi.trim()) {
      setEmailError(null)
      setMdpError(null)

      //puis on tente la connexion
      axios.post('https://nice-places.fr/api/login', { email: emailSaisi.trim(), password: mdpsaisi.trim() })
        .then(response => {
          console.log(response);

          // si elle réussit : stockage des données utilisateur reçues dans le userStore
          dispatch(storeUserData(response.data.data))

          // récupération des notifications de l'utilisateur qu'on stocke également dans le userStore

          // message de succès "vous êtes connecté"     
          setLoginSuccess('Vous êtes connecté(e)')

          setTimeout(() => {
            // on enlève le message
            setLoginSuccess(null)
            // on marque l'utilisateur comme connecté
            // dispatch(setUserAsLoggedIn())
          }, 2500)

          // si elle échoue : on affiche la ou les erreurs rencontrée(s)
        }).catch(() => {
          setLoginError('l\'e-mail n\'existe pas ou le mot de passe est incorrect')
        })
    }
  }

  return (
    <View style={stylesheet.container}>
      <ImageBackground source={require('../../assets/ponton-lac.jpg')} resizeMode="cover" style={stylesheet.image}>

        {/* **************************logo et slogan******************* */}
        <Image
          style={stylesheet.logo}
          source={require('../../assets/logo_nice_places.png')}
        />
        <Text style={stylesheet.greenText}>sorties nature</Text>
        <Text style={stylesheet.blueText}>près de chez vous</Text>

        {/* **************************partie connexion******************* */}

        {loginSuccess ? <Text style={stylesheet.loginSuccessDisplay}>
              <FontAwesomeIcon icon={faCheckCircle} size={100} style={stylesheet.loginSuccessIcon} />
              <Text style={stylesheet.loginSuccessText}>{loginSuccess}</Text>
            </Text> : <Text></Text>}

        {/* **************************si user pas connecté ******************* */}
        {!userLoggedIn || loginSuccess ?

          <View>
            {loginError ? <Text style={stylesheet.loginErrorDisplay} > {loginError}</Text> : <Text></Text>}

            <Text style={stylesheet.title}>Connexion</Text>

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
            <TextInput
              style={stylesheet.input}
              placeholder='mot de passe'
              placeholderTextColor={'grey'}
              onChangeText={(text) => setMdpSaisi(text)}
              value={mdpsaisi}
            />

            <Button
              style={stylesheet.btn}
              title="en route !"
              fontFamily='Cooper'
              buttonStyle={{ fontFamily: 'Cooper' }}
              onPress={loginAttempt}
              color="#94D1BE"
            />

            {/* **************************affichage si déjà connecté******************* */}
          </View>
          : <View><Text style={ stylesheet.welcomeText }>Bienvenue sur Nice Places !</Text></View>}
      </ImageBackground>
    </View >
  )
}

const stylesheet = StyleSheet.create({

  logo: {
    width: 300,
    height: 60,
    textAlign: 'center',
    marginBottom: 10
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    width: width,
    fontFamily: 'Cooper'
  },

  image: {
    flex: 1,
    width: width,
    padding: 50
  },

  greenText: {   // styles du texte "sorties nature"
    color: '#94D1BE',
    fontSize: 25,
    fontFamily: 'Cooper',
    textAlign: 'left'
  },

  blueText: {  // styles du texte "près de chez vous"
    color: '#1C6E8C',
    fontSize: 25,
    marginBottom: 190,
    fontFamily: 'Cooper',
    textAlign: 'right'
  },

  blueTitle: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 55,
  },

  title: {  // "connexion"
    fontSize: 35,
    color: '#1C6E8C',
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 20,
    fontFamily: 'Cooper'
  },

  errorDisplay: {
    padding: 15,
    backgroundColor: '#a83832',
    color: 'white',
    fontSize: 20,
    height: 50,
    fontWeight: '900',
    textAlign: 'center',
  },

  loginErrorDisplay: {
    padding: 15,
    backgroundColor: '#a83832',
    color: '#1C6E8C',
    fontSize: 20,
    height: 100,
    width: width,
    fontWeight: '900',
    textAlign: 'center',
    position: 'absolute',
    top: '25%',
    left: 0
  },

  loginSuccessDisplay: {
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

  loginSuccessIcon: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 40
  },

  loginSuccessText: {
    textAlign: 'center',
  },

  // styles du formulaire

  formStyle: {
    // textAlign: 'center',
    width: width,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 35,
  },
  label: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    height: 45,
    color: '#1C6E8C',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 20,
    fontFamily: 'Cooper',
    fontSize: 18,
    paddingLeft: 20
  },

  btn: {
    backgroundColor: '#086972',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    fontFamily: 'Cooper'
  },
  btn_text: {
    fontSize: 23,
    color: '#fff',
    fontFamily: 'Cooper'
  },

  welcomeText: {
    backgroundColor: '#1C6E8C',
    padding: 30,
    borderRadius: 20,
    fontFamily: 'Cooper',
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  }
});
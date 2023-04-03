import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ImageBackground, StyleSheet, Image, Text, View, Dimensions, TextInput, Button } from 'react-native';
const { width } = Dimensions.get('window');
import { useLogInUserQuery } from '../api/apiUserSlice'
import axios from 'axios';

export default function Accueil() {

  // const pseudo = useSelector((state) => state.user.pseudo) // getter pour accéder au state
  const dispatch = useDispatch()
  const [emailSaisi, setEmailSaisi] = useState('');
  const [mdpsaisi, setMdpSaisi] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mdpError, setMdpError] = useState('');

  // const {
  //   success
  // } = useLogInUserQuery()

  const handleLogin = () => {
    if (emailSaisi.trim()) {
      console.log({ emailSaisi });
    } else {
      setEmailError('E-mail requis')
    }
    if (mdpsaisi.trim()) {
      console.log({ mdpsaisi });
    } else {
      setMdpError('mot de passe requis')
    }

    if (emailSaisi.trim() && mdpsaisi.trim()) {
      setEmailError(null)
      setMdpError(null)

      // on initialise la protection CSRF Sanctum via cette route
      axios.get('https://nice-places.fr/sanctum/csrf-cookie')

        .then(() => {
          // on tente la connexion
          axios.post('https://nice-places.fr/api/login', { email: emailSaisi, password: mdpsaisi })
            .then(response => {
              console.log(response);
              // si elle réussit : stockage des données utilisateur reçues dans le localstorage via le userStore
              // this.storeUserData(response.data.data)
              // // récupération des notifications de l'utilisateur qu'on stocke également dans le userStore
              // this.getNotifications()
              // // redirection vers un composant affichant le message de succès "vous êtes connecté"             
              // this.$router.push('/successmessage/home/' + response.data.message)
              // // si elle échoue : on affiche la ou les erreurs rencontrée(s)
            }).catch((error) => {
              alert("error")
            })

          // si la requête d'initialisation de la protection CSRF a échoué, on affiche ce message
        }).catch(() => {
          alert("Problème d'authentification'. Merci de recharger la page. Réessayez plus tard ou contactez l'administrateur si le problème persiste.")
        })

    }
  };
  return (
    <View style={stylesheet.container}>
      <ImageBackground source={require('../../assets/ponton-lac.jpg')} resizeMode="cover" style={stylesheet.image}>
        <Image
          style={stylesheet.logo}
          source={require('../../assets/logo_nice_places.png')}
        />
        <Text style={stylesheet.greenText}>sorties nature</Text>
        <Text style={stylesheet.blueText}>près de chez vous</Text>

        <Text style={stylesheet.title}>Connexion</Text>

        {/* <Text>{success}</Text> */}

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
          onPress={handleLogin}
          color="#94D1BE"
        />
      </ImageBackground>
    </View>
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
});
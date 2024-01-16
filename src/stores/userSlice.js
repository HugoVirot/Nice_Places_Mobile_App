import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    pseudo: "",
    email: "",
    id: "",
    departement: "",
    region: "",
    token: "",
    role: "",
    userLoggedIn: false,
    geolocationAnswered: false,
    userPosition: "",
    userPlaces: "",
    favoris: "",
    notifications: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // stocke les info utilisateur renvoyées par l'API dans le state après une connexion réussie
        storeUserData: (state, action) => {

            const { id, pseudo, email, departement, role, token } = action.payload

            const userLoggedIn = true
            const region = departement ? departement.region.nom : null

            // ajouter le header Authorization qui contient le token
            axios.defaults.headers.common.Authorization = `Bearer ${token}`

            // retourner une copie du state contenant les infos utilisateur 
            return {
                ...state,
                pseudo,
                email,
                id,
                departement,
                region,
                token,
                role,
                userLoggedIn
            }

        },
        logOutUser: (state, action) => {
            // on retire le header Authorization qui contient le token
            delete axios.defaults.headers.common['Authorization'];
            // on renvoie le state initial
            return initialState
        }
    },
})

// Action creators are generated for each case reducer function
export const { storeUserData, logOutUser } = userSlice.actions

export default userSlice.reducer
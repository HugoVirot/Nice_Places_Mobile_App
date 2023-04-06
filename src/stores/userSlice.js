//Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer 
//functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action 
//creators and the reducer function for the whole slice.

//Redux requires that we write all state updates immutably, by making copies of data and updating the copies. 
//However, Redux Toolkit's createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic 
//that becomes correct immutable updates.

// slice = reducer qui peut modifier directement le state (en apparence)
// la librairie Immer permet de créer une copie modifiée (pas de modif directe)
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    pseudo: "",
    email: "",
    id: "",
    departement: "",
    region: "",
    token: "test",
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
    },
})

// Action creators are generated for each case reducer function
export const { storeUserData } = userSlice.actions

export default userSlice.reducer
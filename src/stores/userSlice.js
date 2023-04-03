//Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer 
//functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action 
//creators and the reducer function for the whole slice.

//Redux requires that we write all state updates immutably, by making copies of data and updating the copies. 
//However, Redux Toolkit's createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic 
//that becomes correct immutable updates.

// slice = reducer qui peut modifier directement le state (en apparence)
// la librairie Immer permet de créer une copie modifiée (pas de modif directe)
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pseudo: "",
    email: "",
    id: "",
    departement: "",
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
        storeUserData: (state, action) => {
            state.pseudo = action.payload.pseudo
            state.email = action.payload.email
            state.id = action.payload.id
            // state.departement = action.payload.departement
            // state.region = action.payload.departement ? action.payload.departement.region.nom : null
            // state.role = action.payload.role

            // si token présent dans userData (= connexion, pas présent si modif infos)
            if (action.payload.token) {
                // on stocke le token dans le store
                state.token = action.payload.token
                // pour transmettre le token (créé par l'API) avec chaque requête si connecté
                axios.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`
                // on définit le statut de l'utilisateur : il est connecté
                state.userLoggedIn = true
            }
        },
        // *********************exemples*************************
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
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
    lieux: "",
    categories: "",
    departements: "",
    regions: "",
}

export const lieuSlice = createSlice({
    name: 'lieu',
    initialState,
    reducers: {
        // stocke les lieux dans le state
        storeLieux: (state, action) => {

            console.log(action.payload);
            const lieux = action.payload
            // retourne une copie du state contenant les lieux
            return {
                ...state,
                lieux
            }

        },
    },
})

// Action creators are generated for each case reducer function
export const { storeLieux } = lieuSlice.actions

export default lieuSlice.reducer
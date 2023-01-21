import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: 'application',
    initialState: {
        table: [],
        serialNumbers: [],
        isAuthenticate: false,
        index: -1,
    },
    reducers: {
        login: (state) => {
            state.isAuthenticate = true;
        },
        logOut: (state) => {
            state.isAuthenticate = false;
        },
        addInstall: (state, action) => {
            state.table.push(action);
        },
        remove: (state, action) => {
            const { item } = action.payload;
            // splice method is used to add or remove elements form specific index
            //findIndex method return index of true condition ok!
            state.table.splice(state.table.findIndex((tablet) => tablet.key === item), 1);
        },
        addSerial: (state, action) => {
            state.serialNumbers.push(action.payload);
            state.serialNumbers = state.serialNumbers.map(v => Object.assign(v, { label: v.serialNumber, value: v.serialNumber }))
        },
        removeSerial: (state, action) => {
            state.serialNumbers.splice(state.serialNumbers.findIndex((number) => number.serialNumber === action.payload), 1)
        },
        findIndex: (state, action) => {
            let index = state.serialNumbers.findIndex((obj => obj.serialNumber === action.payload));
            state.index = index;
        },
        updateData: (state, action) => {
            state.serialNumbers[state.index].serialNumber = action.payload;
            state.serialNumbers[state.index].label = action.payload;
            state.serialNumbers[state.index].value = action.payload
        }
    }

}
)

export const { login, addInstall, remove, addSerial, removeSerial, findIndex, updateData, logOut } = cartSlice.actions;
export default cartSlice.reducer;


import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dniCliente: "",
    articulos:[ ],
    formaPago: "",
    subTotal: "",
    recargo: "",
    descuento: "",
    total: ""
};

export const ventaSlice = createSlice({
    name: "venta",
    initialState: initialState,
    reducers: {
        addArticulo : (state, action) => {
            state.articulos.push(action.payload);
        },
        addCliente: (state, action) => {
            state.dniCliente = action.payload;
        } 
    }
});

export const {addArticulo, addCliente} = ventaSlice.actions

export default ventaSlice.reducer
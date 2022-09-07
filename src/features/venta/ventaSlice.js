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
        },
        deleteArticulo: (state, action) => {
            //const index = state.articulos.findIndex(index => index.key === action.payload);
            state.articulos.splice(action.payload, 1);
        },
        setSubtotal: (state, action) => {
            state.subTotal = action.payload;
        }
    }
});

export const {addArticulo, addCliente, deleteArticulo, setSubtotal} = ventaSlice.actions

export default ventaSlice.reducer
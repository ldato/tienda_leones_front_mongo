import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dniCliente: "",
    articulos: [],
    formaPago: 1,
    subTotal: "",
    recargo: 0,
    descuento: 0,
    total: ""
};

export const ventaSlice = createSlice({
    name: "venta",
    initialState: initialState,
    reducers: {
        addArticulo: (state, action) => {
            state.articulos.push(action.payload);
        },
        addCliente: (state, action) => {
            state.dniCliente = action.payload;
        },
        deleteArticulo: (state, action) => {
            state.articulos.splice(action.payload, 1);
        },
        setSubtotal: (state, action) => {
            state.subTotal = action.payload;
        },
        setFormaPago: (state, action) => {
            state.formaPago = action.payload;
            if (state.formaPago === 1) {
                state.total = state.subTotal * 1;
            }
            if (state.formaPago === 2) {
                state.total = state.subTotal * 1.35;
            }
        },
        setTotal: (state, action) => {
            state.total = action.payload
        },
        setRecargo: (state, action) => {
            state.recargo = state.total - state.subTotal;
        }
    }
});

export const {
    addArticulo,
    addCliente,
    deleteArticulo,
    setSubtotal,
    setFormaPago,
    setTotal,
    setRecargo } = ventaSlice.actions

export default ventaSlice.reducer
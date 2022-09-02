import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    "dniCliente": "",
    "articulos":[
        {
            "articulo": "", 
            "cantidad": "", 
            "precioUnitario": "", 
            "subTotalProducto": ""
        }
            ],
    "formaPago": "",
    "subTotal": "",
    "recargo": "",
    "descuento": "",
    "total": ""
};

export const ventaSlice = createSlice({
    name: "venta",
    initialState: initialState
});

export default ventaSlice.reducer
import { configureStore } from '@reduxjs/toolkit';
import ventaReducer from '../features/venta/ventaSlice'

export const store = configureStore({
    reducer: {
        venta: ventaReducer
    },
})


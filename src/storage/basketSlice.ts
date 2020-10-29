/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { StateData } from './common'

export interface BasketItem {
    groupId: string,
    id: string,
    units: number
}

export interface BasketStatus extends StateData{
    value: Record<string, BasketItem>
}

const initState: BasketStatus = {
    value: {},
    status: 'empty',
}

export const {
    actions: {
        setBasket,
        addProduct,
        deleteProduct,
    },
    reducer: basketReducer,
} = createSlice({
    name: 'basket',
    initialState: initState,
    reducers: {
        setBasket: (state, { payload }: {payload:BasketStatus}) => payload,
        addProduct: (state: BasketStatus,
            { payload }: { payload: {id: string, units: number, groupId: string} }) => {
            const { id, units, groupId } = payload
            if (units > 0) {
                const basketExistingItem = state.value[id]
                if (basketExistingItem) {
                    basketExistingItem.units = units
                } else {
                    state.value[id] = { id, groupId, units }
                }
            } else {
                delete state.value[id]
            }
        },
        deleteProduct: (state: BasketStatus, { payload }: { payload: {id: string} }) => {
            if (state.value[payload.id]) delete state.value[payload.id]
        },
    },
})

export const basketSelector = ({ basket }: { basket: BasketStatus }): BasketStatus => basket

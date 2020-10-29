import { createSlice } from '@reduxjs/toolkit'
import { StateData } from './common'

export interface Item {
    name: string,
    price: number,
    id: string,
    units: number
}

export interface Group {
    name: string,
    id: string,
    items: Item[]
}

export interface WareStatus extends StateData{
    value?: Group[]
}

const initState: WareStatus = {
    value: undefined,
    status: 'empty',
}

export const {
    actions: {
        setWare,
    },
    reducer: wareReducer,
} = createSlice({
    name: 'ware',
    initialState: initState,
    reducers: {
        setWare: (state, { payload }: {payload:WareStatus}) => payload,
    },
})

export const wareSelector = ({ ware }: { ware: WareStatus }): WareStatus => ware

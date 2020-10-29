/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { StateData } from './common'

export interface changeRatioStatus extends StateData{
    value: number
}

const initState: changeRatioStatus = {
    value: 1,
    status: 'empty',
}

export const {
    actions: {
        setChangeRatio,
        setChangeRatioValue,
    },
    reducer: changeRatioReducer,
} = createSlice({
    name: 'changeRatio',
    initialState: initState,
    reducers: {
        setChangeRatio: (state, { payload }: {payload:changeRatioStatus}) => payload,
        setChangeRatioValue: (state, { payload }: {payload: number}) => {
            state.value = payload
        },
    },
})

export const changeRatioSelector = (
    { changeRatio }: { changeRatio: changeRatioStatus },
): changeRatioStatus => changeRatio

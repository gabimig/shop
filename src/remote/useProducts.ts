import { Dispatch } from '@reduxjs/toolkit'
import { setChangeRatioValue } from '../storage/changeRatioSlice'
import { setWare } from '../storage/wareSlice'
import ProductsRemote from './productsRemote'

const chargeProductsAndRatio = (dispatch: Dispatch) => () => {
    try {
        ProductsRemote.getAppState().then((ware) => {
            dispatch(setWare({
                status: 'success',
                value: ware,
            }))
            const ratio = Math.floor(Math.random() * 60) + 20
            dispatch(setChangeRatioValue(ratio))
        })
    } catch (e) {
        dispatch(setWare({
            status: 'error',
            errorMsg: e.toString(),
        }))
    }
}

const useProducts = () => async (dispatch: Dispatch): Promise<void> => {
    chargeProductsAndRatio(dispatch)()
    setInterval(chargeProductsAndRatio(dispatch), 15000)
}

export default useProducts

import {
    Button, createStyles, Grid, makeStyles,
} from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Add, Remove } from '@material-ui/icons'
import { Item } from '../../storage/wareSlice'
import { addProduct } from '../../storage/basketSlice'
import { changeRatioSelector } from '../../storage/changeRatioSlice'

const useStyles = makeStyles(() => createStyles({
    item: {
        border: '1px solid #999999',
    },
    nameItem: {
        textAlign: 'left',
        paddingLeft: '10px',
    },
    addButton: {
        color: 'white',
        backgroundColor: '#111111',
        padding: '2px 8px',
        borderRadius: 0,
        marginTop: 2,
    },
    modifyContainer: {
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
    },
    modifyButton: {
        cursor: 'pointer',
    },
    quantity: {
        textAlign: 'center',
        width: '3em',
    },
}))

interface ProductProps{
    item: Item
    groupId: string
    unitsInBsaket: number
}

const Product = ({ item, unitsInBsaket, groupId }: ProductProps): React.ReactElement => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { value: ratio } = useSelector(changeRatioSelector)
    const convertedPrice = (item.price * ratio).toFixed()

    const handleAdd = (addition: number) => {
        const newValue = unitsInBsaket + addition
        if (newValue <= item.units) {
            dispatch(addProduct({
                id: item.id,
                units: newValue,
                groupId,
            }))
        }
    }

    return (
        <Grid container className={classes.item}>
            <Grid item xs={8}>
                <h4 className={classes.nameItem}>{item.name}</h4>
            </Grid>
            <Grid item xs={2}>
                <div style={{ height: '50%' }}>
                    {`${item.price} $ - ${convertedPrice} ₽`}
                </div>
                <div style={{ height: '50%' }}>{`${item.units} u`}</div>
            </Grid>
            <Grid item xs={2}>
                <div style={{ height: '50%' }}>
                    { unitsInBsaket === 0
                        ? (
                            <Button
                              variant="contained"
                              size="small"
                              disableElevation
                              className={classes.addButton}
                              onClick={() => handleAdd(1)}
                            >
                                Add
                            </Button>
                        )
                        : (
                            <Button
                              variant="contained"
                              size="small"
                              disableElevation
                              className={classes.addButton}
                              onClick={() => handleAdd(-unitsInBsaket)}
                            >
                                Remove
                            </Button>
                        )}
                </div>
                <div>
                    <div className={classes.modifyContainer}>
                        {unitsInBsaket > 0
                            ? (
                                <>
                                    <Remove
                                      className={classes.modifyButton}
                                      onClick={() => handleAdd(-1)}
                                    />
                                    <input
                                      className={classes.quantity}
                                      value={unitsInBsaket}
                                      readOnly
                                    />
                                    <Add
                                      className={classes.modifyButton}
                                      onClick={() => handleAdd(1)}
                                    />
                                </>
                            )
                            : <></>}
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Product

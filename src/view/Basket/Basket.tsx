import { createStyles, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { basketSelector } from '../../storage/basketSlice'
import { Group, Item, wareSelector } from '../../storage/wareSlice'
import ItemBasket from './ItemBasket'

const useStyles = makeStyles(() => createStyles({
    container: {
        backgroundColor: '#FFFFFF',
        paddingRight: 5,
        borderLeft: '1px solid #111111',
    },
    backGrey: {
        height: '100%',
        padding: '0% 8%',
        backgroundColor: '#DDDDDD',
    },
    shop: {
        textAlign: 'center',
        paddingLeft: '10px',
    },
    header: {
        padding: '1px 0',
        backgroundColor: '#111111',
        color: 'white',
    },
    side: {
        position: 'fixed',
        height: '100%',
        width: '20%',
    },
    backToShop: {
        color: 'black',
        height: '4em',
    },
}))

const Basket = (): React.ReactElement => {
    const classes = useStyles()
    const { value: basketValue } = useSelector(basketSelector)
    const ware = useSelector(wareSelector)
    const wareList = ware.value ? ware.value : []
    const accumug: Record<string, Group> = {}
    const groupItemsMap = wareList.reduce((acc, group): Record<string, Group> => {
        acc[group.id] = group
        return acc
    }, accumug)
    const accumu: Record<string, Item> = {}
    const wareItemsMap = wareList.reduce((acc, group): Record<string, Item> => {
        group.items.forEach((item) => { acc[item.id] = item })
        return acc
    }, accumu)
    const items = Object.entries(basketValue).map(([k, basket]) => ({
        item: wareItemsMap[k],
        basket,
    }))

    return (
        <div className={classes.backGrey}>
            <Grid className={classes.container} container>
                <Grid item xs={12} className={classes.backToShop}>
                    <Link
                      to="/"
                      style={{ textDecoration: 'none', color: 'black', textAlign: 'center' }}
                    >
                        <h2>Go back to shop</h2>
                    </Link>
                </Grid>
                <Grid item xs={12} className={classes.shop}>
                    {items.map(({ item, basket }) => (
                        <ItemBasket
                          key={item.id}
                          item={item}
                          unitsInBsaket={basket.units}
                          group={groupItemsMap[basket.groupId]}
                        />
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}

export default Basket

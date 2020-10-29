import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { Group, wareSelector } from '../../storage/wareSlice'
import { basketSelector } from '../../storage/basketSlice'
import SideMenu from '../SideMenu/SideMenu'
import Product from './Product'

const useStyles = makeStyles(() => createStyles({
    container: {
        backgroundColor: '#FFFFFF',
        paddingRight: 5,
        borderLeft: '1px solid #111111',
    },
    backGrey: {
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
}))

const Home = (): React.ReactElement => {
    const classes = useStyles()
    const ware = useSelector(wareSelector)
    const basket = useSelector(basketSelector)

    if (ware.value) {
        // const refs = ware.value.map(() => useRef(null))

        const generateProductsList = (group: Group) => (
            <div key={group.id} id={`group-${group.id}`}>
                <div className={classes.header}>
                    <h3>{group.name}</h3>
                </div>
                <Grid container>
                    {group.items.map((item) => {
                        let units = 0
                        const basketItem = basket.value[item.id]
                        if (basketItem) units = basketItem.units
                        return (
                            <Product
                              key={item.id}
                              item={item}
                              unitsInBsaket={units}
                              groupId={group.id}
                            />
                        )
                    })}
                </Grid>
            </div>
        )

        const groups = ware.value.map(generateProductsList)
        return (
            <div className={classes.backGrey}>
                <Grid className={classes.container} container>
                    <Grid item xs={3}>
                        <div className={classes.side}>
                            <SideMenu groups={ware.value} />
                        </div>
                    </Grid>

                    <Grid item xs={9} className={classes.shop}>
                        {groups}
                    </Grid>
                </Grid>
            </div>
        )
    }
    return <h2>No content</h2>
}

export default Home

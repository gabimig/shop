import React from 'react'
import {
    AppBar, Toolbar, Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#303030',
        // zIndex: theme.zIndex.drawer + 1,
        // zIndex: theme.zIndex.drawer + 1,
        // transition: theme.transitions.create(['width', 'margin'], {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        // }),
    },
    basketIcon: {
        cursor: 'pointer',
    },
}))

// type envetF = {handleMenuClick(e: any):void}

const Header = (): React.ReactElement => {
    const classes = useStyles()
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Link
                  className={classes.title}
                  to="/"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                    <Typography variant="h6">
                        Shop
                    </Typography>
                </Link>

                <Link
                  to="Basket"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                    <ShoppingBasketIcon
                      className={classes.basketIcon}
                      fontSize="large"
                    />
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header

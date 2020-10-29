import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import {
    createStyles, Grid, makeStyles, Theme,
} from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import Home from './Home/Home'
import theme from './themeConfig'
import Header from './Header/Header'
import Basket from './Basket/Basket'
import store from '../storage/store'
import useProducts from '../remote/useProducts'

const useStyles = makeStyles((th: Theme) => createStyles({
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(8),
        position: 'absolute',
        left: 0,
        width: '100%',
        minHeight: '100%',
        height: '100%',
    },
    toolbar: th.mixins.toolbar,
}))
const App = (): React.ReactElement => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex' }}>
                <MyRouter />
            </div>
        </ThemeProvider>
    </Provider>
)

const MyRouter = (): React.ReactElement => {
    const dispatch = useDispatch()
    const classes = useStyles()
    dispatch(useProducts())
    return (
        <BrowserRouter>
            <Header />
            <Grid container>
                <div className={classes.content}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/Basket" component={Basket} />
                    </Switch>
                </div>
            </Grid>

        </BrowserRouter>
    )
}

export default App

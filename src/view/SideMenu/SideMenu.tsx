import React from 'react'
import {
    createStyles,
    Grid,
    makeStyles,
} from '@material-ui/core'
import { Group } from '../../storage/wareSlice'

const useStyles = makeStyles(() => createStyles({
    container: {
        borderRight: '1px solid black',
        height: '100%',
    },
    item: {
        borderTop: '1px solid #999999',
        height: '4em',
        paddingLeft: 5,
        color: 'black',
        textDecoration: 'none',
        '&:first-child': {
            borderTop: '1px solid #FFFFFF',
        },
        '&:hover': {
            backgroundColor: '#111111',
            color: 'white',
            cursor: 'pointer',
        },
    },
}))

interface SideMenuProps{
    groups: Group[]
}

const SideMenu = ({ groups }: SideMenuProps): React.ReactElement => {
    const classes = useStyles()
    const handleScrollTo = (ref: string) => {
        window.location.href = `#${ref}`
        window.scrollTo({
            top: window.scrollY - 64,
        })
    }

    return (
        <div className={classes.container}>
            {groups.map((g) => (
                <Grid
                  className={classes.item}
                  key={g.id}
                  onClick={() => handleScrollTo(`group-${g.id}`)}
                >
                    <h3>{g.name}</h3>
                </Grid>
            ))}

        </div>
    )
}

export default SideMenu

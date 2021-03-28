import React, { Fragment } from "react"
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import ItemPost, { SmallItemPost } from "../components/ItemPost"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'space-around',
        },
        gridList: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            transform: 'translateZ(0)',
            margin: 10,
        },
    }),
);

export default function ItemsView({ items }) {
    const classes = useStyles();
    const theme = useTheme();
    const lgSize = useMediaQuery(theme.breakpoints.up('lg'))
    const mdSize = useMediaQuery(theme.breakpoints.only('md'))

    if (items) {
        if (lgSize) {
            return (
                <Grid container className={classes.root}>
                    <GridList cellHeight="auto" className={classes.gridList} cols={4}>
                        {items.map((item, index) => {
                            return (
                                <GridListTile key={index} rows={1}>
                                    <ItemPost item={item} key={index} />
                                </GridListTile>
                            )
                        })}
                    </GridList>
                </Grid>
            )
        }
        else if (mdSize) {
            return (
                <Grid container className={classes.root}>
                    <GridList cellHeight="auto" className={classes.gridList} cols={3}>
                        {items.map((item, index) => {
                            return (
                                <GridListTile key={index} rows={1}>
                                    <ItemPost item={item} key={index} />
                                </GridListTile>
                            )
                        })}
                    </GridList>
                </Grid>
            )
        }
        return (
            <Grid container className={classes.root}>
                <GridList cellHeight="auto" className={classes.gridList} cols={1}>
                    {items.map((item, index) => {
                        return (
                            <GridListTile key={index} rows={1}>
                                <SmallItemPost item={item} key={index} />
                            </GridListTile>
                        )
                    })}
                </GridList>
            </Grid>
        )
    }
    return null
}
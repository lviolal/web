import React from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ReactGA from 'react-ga'
import moment from 'moment'
import wotgImage from '../images/wotg.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'space-around'
        },
        gridList: {
            maxWidth: 450,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            transform: 'translateZ(0)'
        },
        largeRoot: {
            backgroundColor: '#262626'
        },
        largeMedia: {
            maxHeight: 300,
            objectFit: 'contain'
        },
        largeContent: {
            color: 'white'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
            color: 'white'
        },
        cover: {
            maxWidth: 151,
            maxHeight: 151,
            objectFit: 'contain'
        },
        divider: {
            backgroundColor: 'white',
            margin: 5
        },
    }),
);

function BlogPost(data: any) {
    const classes = useStyles();
    const date = moment(data.item.pubDate, "YYYY-MM-DD").format("D MMM YYYY")

    function handleClick() {
        ReactGA.outboundLink(
            {
                label: data.item.website
            },
            function () {
                console.log("Link Clicked " + data.item.website)
            },
        );
    }

    return (
        <Box border={2} style={{ color: 'white' }}>
            <Card className={classes.largeRoot}>
                <CardActionArea href={"/blog/" + data.item.author} onClick={handleClick}>
                    <CardMedia
                        component="img"
                        image={wotgImage}
                        alt={data.item.title}
                        className={classes.largeMedia}
                    />
                </CardActionArea>
                <Divider variant='middle' className={classes.divider} />
                <CardContent className={classes.largeContent}>
                    <Typography>
                        <Box fontWeight='fontWeightBold'>
                            {data.item.title}
                        </Box>
                    </Typography>
                    <Typography>
                        <Box fontWeight='fontWeightLight'>
                            {data.item.website}
                        </Box>
                        <Box fontWeight='fontWeightLight'>
                            Updated: {date.toString()}
                        </Box>
                        <Box fontWeight='fontWeightLight'>
                            {data.item.author}
                        </Box>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default function AuthorBlogView({ items }) {
    const classes = useStyles();
    if (items) {
        return (
            <Grid container className={classes.root}>
                <GridList cellHeight="auto" className={classes.gridList}>
                    {items.map((item, index) => {
                    <GridListTile key={index} cols={2} rows={1}>
                       <BlogPost item={item} key={index} />
                   </GridListTile> 
                    })}
                </GridList>
            </Grid>
        )
    }
    return null
}
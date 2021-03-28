import React from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import TestCard, { LargeTestCard } from "../components/TestCard"

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Typography from '@material-ui/core/Typography'
import ItemPost, { SmallItemPost } from "./ItemPost"
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'


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
    }),
);

function cardBorderColor(cardType: string) {
    switch (cardType) {
        case 'news':
            return '#8B8BBF'
        case 'caption':
            return '#EA7271'
        case 'story':
            return '#9FC3D1'
        case 'comic':
            return '#CDC37C'
        case 'deviantart':
            return '#A5CF87'
        case 'nonfict':
            return '#FCC282'
        default:
            return '#8B8BBF'
    }
}


export default function ItemsView({ items }) {
    const classes = useStyles();

    const captions = items.filter((item) => { return item.tag === 'caption' })
    const comics = items.filter((item) => { return item.tag === 'comic' })
    const deviantart = items.filter((item) => { return item.tag === 'deviantart' })
    const news = items.filter((item) => { return item.tag === 'news' })
    const stories = items.filter((item) => { return item.tag === 'story' })
    const nonfict = items.filter((item) => { return item.tag === 'nonfict' })
    const wotgblog = items.filter((item) => { return item.tag === 'wotgblog' })

    return (
        <Grid container className={classes.root}>
            {captions.length > 0 ?
                <GridList cellHeight="auto" className={classes.gridList}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: cardBorderColor('caption'), textAlign: 'center' }}>
                        <Link href="/captions" color="inherit">
                            Captions
                        </Link>
                    </Typography>
                    {captions.map((caption, index) => {
                        if (index === 0) {
                            return (
                                <GridListTile key={index} cols={2} rows={1}>
                                    <ItemPost item={caption} key={index} />
                                </GridListTile>
                            )
                        }
                        return (
                            <GridListTile key={index} cols={2} rows={1}>
                                <SmallItemPost item={caption} key={index} />
                            </GridListTile>
                        )
                    })}
                    {captions.length > 4 ?
                        <Button href='/captions' variant="outlined" style={{ backgroundColor: cardBorderColor('caption'), margin: 20 }}>More</Button>
                        : null}
                </GridList>
                : null}
            {comics.length > 0 ? <GridList cellHeight="auto" className={classes.gridList}>
                <Typography gutterBottom variant="h5" component="h2" style={{ color: cardBorderColor('comic'), textAlign: 'center' }}>
                    <Link href="/comics" color="inherit">
                        Comics
                        </Link>
                </Typography>
                {comics.map((comic, index) => {
                    if (index === 0) {
                        return (
                            <GridListTile key={index} cols={2} rows={1}>
                                <ItemPost item={comic} key={index} />
                            </GridListTile>
                        )
                    }
                    return (
                        <GridListTile key={index} cols={2} rows={1}>
                            <SmallItemPost item={comic} key={index} />
                        </GridListTile>
                    )
                })}
                {comics.length > 4 ?
                    <Button href='/comics' variant="outlined" style={{ backgroundColor: cardBorderColor('comic'), margin: 20 }}>More</Button>
                    : null}
            </GridList> : null}
            {stories.length > 0 ? <GridList cellHeight="auto" className={classes.gridList}>
                <Typography gutterBottom variant="h5" component="h2" style={{ color: cardBorderColor('story'), textAlign: 'center' }}>
                    <Link href="/stories" color="inherit">
                        Stories
                        </Link>
                </Typography>
                {stories.map((story, index) => {
                    if (index === 0) {
                        return (
                            <GridListTile key={index} cols={2} rows={1}>
                                <ItemPost item={story} key={index} />
                            </GridListTile>
                        )
                    }
                    return (
                        <GridListTile key={index} cols={2} rows={1}>
                            <SmallItemPost item={story} key={index} />
                        </GridListTile>
                    )
                })}
                {stories.length > 4 ?
                    <Button href='/stories' variant="outlined" style={{ backgroundColor: cardBorderColor('stories'), margin: 20 }}>More</Button>
                    : null}
            </GridList> : null}
            {deviantart.length > 0 ?
                <GridList cellHeight="auto" className={classes.gridList}>
                    <Typography align='left' variant="h5" style={{ color: cardBorderColor('deviantart'), textAlign: 'center' }}>
                        <Link href="/deviantart" color="inherit">
                            DeviantArt
                        </Link>
                    </Typography>
                    {deviantart.map((art, index) => {
                        if (index === 0) {
                            return (
                                <GridListTile key={index} cols={2} rows={1}>
                                    <ItemPost item={art} key={index} />
                                </GridListTile>
                            )
                        }
                        return (
                            <GridListTile key={index} cols={2} rows={1}>
                                <SmallItemPost item={art} key={index} />
                            </GridListTile>
                        )
                    })}
                    {deviantart.length > 4 ?
                        <Button href='/deviantart' variant="outlined" style={{ backgroundColor: cardBorderColor('deviantart'), margin: 20 }}>More</Button>
                        : null}
                </GridList>
                : null}
            {nonfict.length > 0 ?
                <GridList cellHeight="auto" className={classes.gridList}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: cardBorderColor('nonfict'), textAlign: 'center' }}>
                        <Link href="/non-fiction" color="inherit">
                            Non Fiction
                        </Link>
                    </Typography>
                    {nonfict.map((caption, index) => {
                        if (index === 0) {
                            return (
                                <GridListTile key={index} cols={2} rows={1}>
                                    <ItemPost item={caption} key={index} />
                                </GridListTile>
                            )
                        }
                        return (
                            <GridListTile key={index} cols={2} rows={1}>
                                <SmallItemPost item={caption} key={index} />
                            </GridListTile>
                        )
                    })}
                    {nonfict.length > 4 ?
                        <Button href='/non-fiction' variant="outlined" style={{ backgroundColor: cardBorderColor('nonfict'), margin: 20 }}>More</Button>
                        : null}
                </GridList>
                : null}
            {news.length > 0 ? <GridList cellHeight="auto" className={classes.gridList}>
                <Typography gutterBottom variant="h5" component="h2" style={{ color: cardBorderColor('news'), textAlign: 'center' }}>
                    <Link href="/news" color="inherit">
                        News
                    </Link>
                </Typography>
                {news.map((news, index) => {
                    if (index === 0) {
                        return (
                            <GridListTile key={index} cols={2} rows={1}>
                                <ItemPost item={news} key={index} />
                            </GridListTile>
                        )
                    }
                    return (
                        <GridListTile key={index} cols={2} rows={1}>
                            <SmallItemPost item={news} key={index} />
                        </GridListTile>
                    )
                })}
                {news.length > 4 ?
                    <Button href='/news' variant="outlined" style={{ backgroundColor: cardBorderColor('news'), margin: 20 }}>More</Button>
                    : null}
            </GridList> : null}
            {wotgblog.length > 0 ?
                <GridList cellHeight="auto" className={classes.gridList}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: cardBorderColor('wotgblog'), textAlign: 'center' }}>
                        <Link href="/blog" color="inherit">
                            World of TG Blog
                        </Link>
                    </Typography>
                    {wotgblog.map((caption, index) => {
                        if (index === 0) {
                            return (
                                <GridListTile key={index} cols={2} rows={1}>
                                    <ItemPost item={caption} key={index} />
                                </GridListTile>
                            )
                        }
                        return (
                            <GridListTile key={index} cols={2} rows={1}>
                                <SmallItemPost item={caption} key={index} />
                            </GridListTile>
                        )
                    })}
                    {wotgblog.length > 4 ?
                        <Button href='/blog' variant="outlined" style={{ backgroundColor: cardBorderColor('wotgblog'), margin: 20 }}>More</Button>
                        : null}
                </GridList>
                : null}
        </Grid>
    )
}
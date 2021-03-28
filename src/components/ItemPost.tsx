import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ReactGA from 'react-ga'
import moment from 'moment';
import wotgImage from '../images/wotg.png'
import fictionmania from '../images/fictionmania.png'
import tgcomics from '../images/tgcomics.png'


const useStyles = makeStyles((theme) => ({
  largeRoot: {
    backgroundColor: '#262626'
  },
  largeMedia: {
    height: 250,
    objectFit: 'contain'
  },
  largeContent: {
    color: 'white'
  },
  root: {
    display: 'flex',
    backgroundColor: '#262626'
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
    objectFit:'contain'
  },
  divider: {
    backgroundColor: 'white',
    margin: 5
  },
}));

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

export default function ItemPost(data: any) {
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

  let target = "_blank"
  let href = data.item.link
  let image = data.item.image
  if (data.item.tag === "wotgblog"){
    target = ""
    href = "/blog/"+data.item.author+"/"+data.item.guid
    image = wotgImage
  }
  if (data.item.image === "https://wotg-prod.s3.amazonaws.com/tgcomics.png") {
    image = tgcomics
  }

  if (data.item.image === "https://wotg-prod.s3.amazonaws.com/fictionmania.png") {
    image = fictionmania
  }


  return (
    <Box border={2} style={{ color: cardBorderColor(data.item.tag) }}>
      <Card className={classes.largeRoot}>
        <CardActionArea href={href} target={target} onClick={handleClick}>
          <CardMedia
            component="img"
            image={image}
            alt={data.item.title}
            className={classes.largeMedia}
          />
          <Divider variant='middle' className={classes.divider} />
          <CardContent className={classes.largeContent}>
            <Typography>
              <Box fontWeight='fontWeightBold'>
              {data.item.website}
              </Box>
            </Typography>
            <Typography>
              <Box fontWeight='fontWeightLight'>
              {data.item.title}
              </Box>
              <Box fontWeight='fontWeightLight'>
                Updated: {date.toString()}
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export function SmallItemPost(data: any) {
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

  let target = "_blank"
  let href = data.item.link
  let image = data.item.image
  if (data.item.tag === "wotgblog"){
    target = ""
    href = "/blog/"+data.item.author+"/"+data.item.guid
    image = wotgImage
  }

  if (data.item.image === "https://wotg-prod.s3.amazonaws.com/tgcomics.png") {
    image = tgcomics
  }

  if (data.item.image === "https://wotg-prod.s3.amazonaws.com/fictionmania.png") {
    image = fictionmania
  }
  return (
    <Box border={2} style={{ color: cardBorderColor(data.item.tag), marginBottom: 5 }}>
    <Card>
      <CardActionArea href={href} target={target} onClick={handleClick}>
        <div className={classes.root}>
          <CardMedia
            component="img"
            className={classes.cover}
            image={image}
            alt={data.item.title}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
            <Typography>
                <Box fontWeight='fontWeightBold'>
                  {data.item.website}
                </Box>
              </Typography>
              <Typography>
                <Box fontWeight='fontWeightLight'>
                  {data.item.title}
                </Box>
              </Typography>
              <Typography>
                <Box fontWeight='fontWeightLight'>
                Updated: {date.toString()}
                </Box>
              </Typography>
            </CardContent>
          </div>
        </div>
      </CardActionArea>
    </Card>
    </Box>
  )
}
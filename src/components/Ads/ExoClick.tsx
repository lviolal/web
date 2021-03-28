import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import ReactGA from 'react-ga'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles({
  root: {
    margin: 20,
    textAlign: 'center',
    backgroundColor: '#212121',
    maxHeight: 150,
  }
})

function handleClick() {
  ReactGA.outboundLink(
    {
      label: 'ExoClick'
    },
    function () {
      console.log("Sponsor Clicked: " + "ExoClick")
    },
  )
}

export default function ExoClick() {
  const classes = useStyles()
  const theme = useTheme()
  const xlSize = useMediaQuery(theme.breakpoints.only('xl'))
  const lgSize = useMediaQuery(theme.breakpoints.only('lg'))
  const mdSize = useMediaQuery(theme.breakpoints.only('md'))
  const smSize = useMediaQuery(theme.breakpoints.only('sm'))
  const xsSize = useMediaQuery(theme.breakpoints.only('xs'))

  if (xlSize) {
    console.log("XL Size")
  } else if (lgSize) {
    console.log("LG Size")
  } else if (mdSize) {
    console.log("MD Size")
  } else if (smSize) {
    console.log("SM Size")
  } else if (xsSize) {
    console.log("XS Size")
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          style={{ padding: 5 }}
          id='testCard'
        />
      </CardActionArea>
    </Card>
  )
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import ReactGA from 'react-ga'
import sapphireFoxx from '../../images/sapphireFoxxBanner.jpg'

const useStyles = makeStyles({
  root: {
    margin: 20,
    textAlign: 'center',
    backgroundColor: '#212121',
    maxHeight: 150
  }
})

export default function FoxxSponsorBanner() {
  const classes = useStyles()

  function handleClick() {
    ReactGA.outboundLink(
      {
        label: 'Foxx'
      },
      function () {
        console.log("Sponsor Clicked: " + "Foxx")
      },
    );
  }

  return (
    <Card className={classes.root}>
      <CardActionArea href="https://www.sapphirefoxx.com" target="_blank" onClick={handleClick}>
      <CardMedia
              component="img"
              image={sapphireFoxx}
              alt='Sapphire Foxx'
              style={{padding: 5}}

            />
      </CardActionArea>
    </Card>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import ReactGA from 'react-ga'
import roanyer from '../../images/roanyerTop.jpg'

const useStyles = makeStyles({
  root: {
    margin: 20,
    textAlign: 'center',
    backgroundColor: '#212121',
    maxHeight: 150
  }
});

export default function RoanyerSponsorBannerTop() {
  const classes = useStyles();

  function handleClick() {
    ReactGA.outboundLink(
      {
        label: 'Roanyer'
      },
      function () {
        console.log("Sponsor Clicked: " + "Roanyer")
      },
    );
  }

  return (
    <Card className={classes.root}>
      <CardActionArea href="http://www.roanyer.com/?tracking=5fe1969c02ee8" target="_blank" onClick={handleClick}>
      <CardMedia
              component="img"
              image={roanyer}
              alt='Roanyer'
              style={{ padding: 5}}
            />
      </CardActionArea>
    </Card>
  );
}

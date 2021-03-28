import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import ReactGA from 'react-ga'
import openTGC from '../../images/opentgc.png'

const useStyles = makeStyles({
  root: {
    margin: 20,
    textAlign: 'center',
    backgroundColor: '#212121',
    maxHeight: 150
  }
});

export default function OTGCSponsorBanner() {
  const classes = useStyles(); 

  function handleClick() {
    ReactGA.outboundLink(
      {
        label: 'OpenTGC'
      },
      function () {
        console.log("Sponsor Clicked: " + "OpenTGC")
      },
    );
  }

  return (
    <Card className={classes.root}>
      <CardActionArea href="https://opentgc.com/?utm_source=wotg&utm_medium=banner&utm_campaign=wotg" target="_blank" onClick={handleClick}>
      <CardMedia
              component="img"
              image={openTGC}
              alt='OpenTGC'
              style={{padding: 5}}
            />
      </CardActionArea>
    </Card>
  );
}

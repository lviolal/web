import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    borderRadius: 3,
    border: 5,
    borderColor: 'green',
    backgroundColor: '#262626',
    '&:hover': {
      backgroundColor: 'blue',
    }
  },
  media: {
    height: 140,
  },
  image: {
    maxWidth: 150,
  },
  system: {
    borderRadius: 10,
    borderColor: 'blue',
    backgroundColor: '#262626',
    '&:hover': {
      backgroundColor: 'blue',
    }
  },
  testRoot: {
    display: 'flex',
  },
  testDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  testContent: {
    flex: '1 0 auto',
  },
  testCover: {
    maxWidth: 151,
  },
});

function cardBorderColor(cardType: string) {
  switch (cardType) {
    case 'caption':
      return '#EA7271'
    case 'story':
      return '#A5CF87'
    case 'comic':
      return '#9FC3D1'
    case 'deviantart':
      return '#CDC37C'
    case 'nonfict':
      return '#FCC282'
    default:
      return '#8B8BBF'
  }
}

export function LargeTestCard() {
  const classes = useStyles();
return (
  <Box border={1} style={{ color: cardBorderColor('deviantart') }}>
  <Card className={classes.root}>
    <CardActionArea>
      <CardMedia
        component='img'
        className={classes.media}
        image="https://wotg.s3.amazonaws.com/wotg.png"
        alt=""
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Large Test Card
      </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
      </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Share
    </Button>
      <Button size="small" color="primary">
        Learn More
    </Button>
    </CardActions>
  </Card>
</Box>
)
}

export default function TestCard() {
  const classes = useStyles();

  return (
    <Box border={1} style={{ color: cardBorderColor('deviantart') }}>
      <Card className={classes.testRoot}>
      <CardMedia
        className={classes.testCover}
        image="https://wotg.s3.amazonaws.com/wotg.png"
        title="Live from space album cover"
      />
      <div className={classes.testDetails}>
        <CardContent className={classes.testContent}>
          <Typography component="h5" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>
      </div>
    </Card>
    </Box>
  );
}

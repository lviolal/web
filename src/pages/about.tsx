import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#262626',
    color: 'white'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  contact: {
    margin: 10,
    textAlign: 'center'
  },
}))

const AboutPage: React.FC = () => {
  const classes = useStyles()
  return (
    <Layout>
      <SEO title="TG About" />
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5" align="center" >
                  What we are all about
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.contact}>                    
                  This is striving to be the worlds greatest collection of TG Sites.
                <br />
                  {'Staying up to date and relavant is very important so if you see anything missing please contant me and let me know!'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
              <Typography align="center" >                    
                <Button size="large" href="/contact" style={{color: 'white'}}>Contact</Button>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Container>
    </Layout>
  )
}

export default AboutPage
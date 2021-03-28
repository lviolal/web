import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ReactMarkdown from 'react-markdown'
import { Base64 } from 'js-base64';

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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  contact: {
    margin: 10,
    textAlign: 'center'
  },
}))

const input = Base64.atob('CiMgUHJvbW90ZSB5b3VyIGNvbnRlbnQgb24gV29ybGQgb2YgVEcKCldvcmxkIG9mIFRHIHN0cml2ZXMgdG8gYmUgdGhlIGxhcmdlc3QgY29sbGVjdGlvbiBvZiBURyBjb250ZW50IGFjcm9zcyB0aGUgd2ViIHNvIGFkZCB5b3VyIHNpdGUgdG9kYXkhCgpUaGUgYmVzdCB3YXkgYW5kIEZSRUUgd2F5IHRvIGdldCB5b3VyIHNpdGUgaW5jbHVkZWQgaXMgdG8gY2hlY2sgaWYgaXQgaGFzIHNvbWUgdHlwZSBvZiBmZWVkIHRvIGFjY2Vzcy4gRWl0aGVyIFJTUyBvciBBVE9NIHhtbCBmZWVkcyBhcmUgdGhlIG1vc3QgcG9wdWxhciBidXQgaWYgSSBjYW4gaG9vayBpbnRvIGFuIEFQSSB0aGF0IHdvcmtzIHRvbyEKCklmIHlvdSB3YW50IG1vcmUgZXhwb3N1cmUgdGhhbiBqdXN0IHRoZSBub3JtYWwgbGlzdCB0aGVyZSBpcyBhbHNvIGFkIHNwYWNlIGF2YWlsYWJsZS4gQmFubmVyIGFkcyBhbmQgc3BvbnNvciBwb3N0IGFkcyBhcmUgbGltaXRlZCBidXQgd2lsbCBnZXQgeW91IG1vcmUgY2xpY2tzIG9uIHlvdXIgc2l0ZS4KCkZvciBtb3JlIGluZm8gb3IgdG8gZ2V0IHlvdXIgd2Vic2l0ZSBhZGRlZCwgaGVhZCBvbiBvdmVyIHRvIHRoZSBjb250YWN0IHBhZ2UgYW5kIHJlYWNoIG91dCE=')

const PromotionPage: React.FC = () => {
  const classes = useStyles()
  return (
    <Layout>
      <SEO title="TG Advertise" />
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{textAlign: 'center'}}>
              <ReactMarkdown source={input}/>
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

export default PromotionPage
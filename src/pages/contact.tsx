import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AWS from 'aws-sdk'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from "@material-ui/core/FormControl";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    '& label': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
  formControl: {
    '& label': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:hover': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    '&:Mui-focused': {
      borderColor: 'white'
    },
    '& .MuiSelect-icon': {
      color: 'white'
    }
  },
  icon: {
    borderColor: 'white',
    color: 'white',
  },
  buttonRoot: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const ContactPage: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [open, setOpen] = useState(false);
  const [emailResponse, setEmailResponse] = useState('')
  const [subject, setSubject] = useState('Question');

  const handleClick = () => {
    AWS.config.update({
      region: 'us-east-1',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.GATSBY_AWS_COGNITO_POOL_ID
      })
    })
    let params = {
      Destination: {
        ToAddresses: [
          'john@worldoftg.com'
        ]
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: "Name: " + name + " Email: " + email + " Comment: " + comment
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      Source: 'john@worldoftg.com',
      ReplyToAddresses: [email]
    }
    let sendEmail = new AWS.SES().sendEmail(params).promise()
    sendEmail.then(() => {
      setOpen(true)
    }).catch((error) => {
      setEmailResponse("Error " + error)
      setOpen(true)
    })
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setEmailResponse("")
    setOpen(false);
  }
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSubject(event.target.value as string);
  };


  return (

    <Layout>
      <SEO title="TG Contact" />
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Contact
        </Typography>
          <form className={classes.form} noValidate={false}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  className={classes.root}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
                <Select
                  labelId="subject-label"
                  id="subject-select"
                  value={subject}
                  onChange={handleChange}
                  className={classes.select}
                  inputProps={{className:classes.icon}}
                >
                  <MenuItem value={'Question'}>Question</MenuItem>
                  <MenuItem value={'Missing Content'}>Missing Content</MenuItem>
                  <MenuItem value={'Advertise'}>Advertise</MenuItem>
                  <MenuItem value={'Bug/Error'}>Bug/Error</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
                </FormControl>
               
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  id="outlined-textarea"
                  label="Comment"
                  required
                  fullWidth
                  placeholder="Enter comment here"
                  multiline
                  variant="outlined"
                  rows={10}
                  onChange={(event) => setComment(event.currentTarget.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              className={classes.buttonRoot}
              onClick={handleClick}
            >
              Send
          </Button>
          </form>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {emailResponse === "" ? (
          <Alert onClose={handleClose} severity="success">
            Email Sent
          </Alert>
        ) : (
            <Alert onClose={handleClose} severity="error">
              {emailResponse}
            </Alert>
          )}

      </Snackbar>
    </Layout>
  );
}

export default ContactPage

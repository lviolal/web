import React, { useState, Fragment } from "react"

import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/react-hooks'
import _ from 'lodash'
import * as queries from '../graphql/queries'
import gql from 'graphql-tag'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { DiscussionEmbed } from "disqus-react"
import ReactMarkdown from 'react-markdown'
import { Base64 } from 'js-base64';
import wotgImage from '../images/wotg.png'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#262626',
    color: 'white',
    width: '80%'
  },
  media: {
    height: 140,
  },
});

function BlogPost({post}) {
  const classes = useStyles();

  const disqusConfig = {
    shortname: 'world-of-tg',
    config: 
    { 
      url: window.location.href,
      identifier: post.guid,
      title: post.title,
    },
}

const input = Base64.atob(post.body)

  return (
    <Fragment>
    <SEO title={"TG Blog Post " + post.title}/>
    <Card className={classes.root}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={wotgImage}
        title={post.title}
      />
      <CardContent>
        <ReactMarkdown source={input}/>
        <DiscussionEmbed {...disqusConfig} />
      </CardContent>
    </CardActionArea>
  </Card>
  </Fragment>
  )
}

const GET_POST = gql(queries.post);

export default function AuthorBlogPost({guid}) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      guid: guid,
    },
  })
  
  return (
    <Fragment>
      <Grid container style={{ justifyContent: 'center' }}>
          {loading ? (
            <CircularProgress style={{ color: 'white' }} />
          ) : data ? (
              <BlogPost post={data.post} />
          ) : null}
      </Grid>
      </Fragment>
  )
}
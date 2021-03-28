import React, { useState, Fragment } from "react"

import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/react-hooks'
import _ from 'lodash'
import * as queries from '../graphql/queries'
import gql from 'graphql-tag'
import AuthorBlogView from "../components/AuthorBlogView"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    maxHeight: 100,
    margin: 20,
    textAlign: 'center',
    backgroundColor: '#262626',
    color: 'white'
  }
});

const GET_LIST_POSTS = gql(queries.posts);

export default function AuthorBlog({author}) {
  const classes = useStyles();
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)
  const { loading, error, data, fetchMore } = useQuery(GET_LIST_POSTS, {
    variables: {
      author: author,
      offset: 0,
      limit: limit
    },
  })

  console.log(data)
  if (global.window) {
    global.window.scrollTo(0,0)
  }
  function loadMore() {
    const offset = (page + 1) * limit
    fetchMore({
      variables: {
        author: author,
        offset: offset,
        limit: limit
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setPage(page + 1)
        return Object.assign({}, prev, {
          posts: [...fetchMoreResult.posts]
        });
      }
    })
  }

  function loadLess() {
    const offset = (page - 1) * limit
    fetchMore({
      variables: {
        author: author,
        offset: offset,
        limit: limit
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setPage(page - 1)
        return Object.assign({}, prev, {
          posts: [...fetchMoreResult.posts]
        });
      }
    })
  }

  return (
    <Fragment>
      <SEO title={author + "'s Blog"} />
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
          {author + "'s Blog"}
        </CardContent>
        </CardActionArea>
      </Card>
      <Grid container spacing={3} style={{ justifyContent: 'center' }}>
        <Fragment>
          {loading ? (
            <CircularProgress style={{ color: 'white' }} />
          ) : data ? (
            <Fragment>
              <AuthorBlogView items={data.posts} />
              {page === 0 ? null:               
              <Button variant="outlined" onClick={() => loadLess()} style={{ backgroundColor: 'white', margin: 20 }}>
                Back
              </Button>}
              {data.posts.length < limit ? null : <Button variant="outlined" onClick={() => loadMore()} style={{ backgroundColor: 'white', margin: 20 }}>
                Next
              </Button>}
            </Fragment>
          ) : null}
        </Fragment>
      </Grid>
      </Fragment>
  )
}
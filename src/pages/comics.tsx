import React, { useState, Fragment } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/react-hooks'
import _ from 'lodash'
import * as queries from '../graphql/queries'
import gql from 'graphql-tag'
import ItemsView from "../components/ItemsView"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactGA from 'react-ga'
import TopAdvertisement from '../components/TopAdvertisement'
import BottomAdvertisement from "../components/BottomAdvertisement"
import Container from '@material-ui/core/Container'

const useStyles = makeStyles({
  root: {
    maxHeight: 100,
    margin: 20,
    textAlign: 'center',
    backgroundColor: '#262626',
    color: 'white'
  }
});

const GET_LIST_ITEMS = gql(queries.items);

const ComicsPage: React.FC = () => {
  const classes = useStyles();
  const [limit, setLimit] = useState(25)
  const [page, setPage] = useState(0)
  const { loading, error, data, fetchMore } = useQuery(GET_LIST_ITEMS, {
    variables: {
      tag: 'comic',
      offset: 0,
      limit: limit
    },
  })

  if (global.window) {
    global.window.scrollTo(0, 0)
  }

  function changeLimit() {
    if (limit === 25) {
      ReactGA.event(
        {
          category: 'Limit',
          action: 'Click',
          label: "Limit: All"
        },
      )
      setLimit(1000)
    } else {
      ReactGA.event(
        {
          category: 'Limit',
          action: 'Click',
          label: "Limit: 25"
        },
      )
      setLimit(25)
    }
  }

  function loadMore() {
    ReactGA.event(
      {
        category: 'Load',
        action: 'Click',
        label: "Load More"
      },
    )
    const offset = (page + 1) * limit
    fetchMore({
      variables: {
        tag: 'comic',
        offset: offset,
        limit: limit
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setPage(page + 1)
        return Object.assign({}, prev, {
          items: [...fetchMoreResult.items]
        });
      }
    })
  }

  function loadLess() {
    ReactGA.event(
      {
        category: 'Load',
        action: 'Click',
        label: "Load Less"
      },
    )
    const offset = (page - 1) * limit
    fetchMore({
      variables: {
        tag: 'comic',
        offset: offset,
        limit: limit
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setPage(page - 1)
        return Object.assign({}, prev, {
          items: [...fetchMoreResult.items]
        });
      }
    })
  }

  return (
    <Layout>
      <SEO title="TG Comics" />
      <TopAdvertisement />
      <Container maxWidth='md'>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              TG Comics
        </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root}>
          <CardActionArea onClick={() => changeLimit()}>
            <CardContent>
              {limit === 25 ? "Show All" : "Show 25"}
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
      <Container maxWidth='lg'>
        <Grid container spacing={3} style={{ justifyContent: 'center' }}>
          <Fragment>
            {loading ? (
              <CircularProgress style={{ color: 'white' }} />
            ) : data ? (
              <Fragment>
                <ItemsView items={data.items} />
                <Container style={{ textAlign: 'center' }}>
                  {page === 0 ? null :
                    <Button variant="outlined" onClick={() => loadLess()} style={{ backgroundColor: '#CDC37C', margin: 20 }}>
                      Back
              </Button>}
                  {data.items.length < limit ? null : <Button variant="outlined" onClick={() => loadMore()} style={{ backgroundColor: '#CDC37C', margin: 20 }}>
                    Next
              </Button>}
                </Container>
              </Fragment>
            ) : null}
          </Fragment>
        </Grid>
      </Container>
      <BottomAdvertisement />
    </Layout>
  )
}


export default ComicsPage
import React, { useState, Fragment } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import * as queries from '../graphql/queries'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import ItemsView from "../components/ItemsView"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import SearchFilterModal from '../components/SearchFilterModal'
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

const GET_SEARCH_RESULTS = gql(queries.searchItems)

const SearchPage: React.FC = () => {
  const classes = useStyles();

  const [limit, setLimit] = useState(25)
  const [page, setPage] = useState(0)
  const [queryVariables, setQueryVariables] = React.useState({ sort: "DESC", tags: null, sources: null, offset: null, limit: null })
  const [showModal, setShowModal] = useState(false)
  const { loading, error, data, fetchMore } = useQuery(GET_SEARCH_RESULTS, {
    variables: queryVariables,
    fetchPolicy: 'network-only'
  })

  if (global.window) {
    global.window.scrollTo(0, 0)
  }


  function closeModal(args: any) {
    if (!args) {
      setShowModal(false)
      return
    }
    if (args.sources.length === 0) {
      args.sources = null
    }
    if (args.tags.length === 0) {
      args.tags = null
    }
    if (args) {
      setQueryVariables({
        sort: args.sort,
        tags: args.tags,
        sources: args.sources,
        offset: 0,
        limit: limit
      })
    }
    setPage(0)
    setShowModal(false)
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
        offset: offset,
        limit: limit,
        sort: queryVariables.sort,
        sources: queryVariables.sources,
        tags: queryVariables.tags
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setPage(page + 1)
        return Object.assign({}, prev, {
          searchItems: [...fetchMoreResult.searchItems]
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
        offset: offset,
        limit: limit,
        sort: queryVariables.sort,
        sources: queryVariables.sources,
        tags: queryVariables.tags
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setPage(page - 1)
        return Object.assign({}, prev, {
          searchItems: [...fetchMoreResult.searchItems]
        });
      }
    })
  }

  return (
    <Layout>
      <SEO title="TG Search" />
      <TopAdvertisement />
      <Container maxWidth='md'>
        <Card className={classes.root}>
          <CardActionArea onClick={() => setShowModal(true)} >
            <CardContent>
              <Typography>
                TG Search
            </Typography>
              <Typography>
                Click to show options
            </Typography>
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
          {loading ? (
            <CircularProgress style={{ color: 'white' }} />
          ) : data ? (
            <Fragment>
              <ItemsView items={data.searchItems} />
              <Container style={{ textAlign: 'center' }}>
                {page === 0 ? null :
                  <Button variant="outlined" onClick={() => loadLess()} style={{ backgroundColor: 'white', margin: 20 }}>
                    Prev
              </Button>}
                {data.searchItems.length < limit ? null : <Button variant="outlined" onClick={() => loadMore()} style={{ backgroundColor: 'white', margin: 20 }}>
                  Next
              </Button>}
              </Container>
            </Fragment>) : null}
        </Grid>
      </Container>
      <SearchFilterModal showModal={showModal} closeModal={closeModal} />
      <BottomAdvertisement />
    </Layout>
  )
}


export default SearchPage
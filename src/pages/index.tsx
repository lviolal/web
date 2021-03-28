import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useQuery } from '@apollo/react-hooks'
import _ from 'lodash'
import * as queries from '../graphql/queries'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import HomePageView from "../components/HomePageView"
import TopAdvertisement from '../components/TopAdvertisement'
import BottomAdvertisement from "../components/BottomAdvertisement"

const useStyles = makeStyles({
  root: {
    margin: 20,
    textAlign: 'center',
    backgroundColor: '#262626',
    color: 'white'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
})

const GET_RECENT_CAPTIONS = gql(queries.homePageQuery)

const IndexPage: React.FC = () => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_RECENT_CAPTIONS, {
    variables: {
      tags: ["caption", "deviantart", "story", "news", "comic", "nonfict", "wotgblog"]
    }
  })

  return (
    <Layout>
      <SEO title="TG Home" />
      <TopAdvertisement/>
      {loading ? (
        <Grid container style={{ justifyContent: 'center' }}>
          <CircularProgress style={{ color: 'white' }} />
        </Grid>
      ) : data ? (
        <HomePageView items={data.homePageQuery} />
      ) : null}
      <BottomAdvertisement/>
    </Layout>
  )
}

export default IndexPage
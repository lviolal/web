import React from "react"

import Layout from "../components/layout"
import _ from 'lodash'
import { Router } from "@reach/router"
import BlogList from '../components/BlogList'
import AuthorBlog from '../components/AuthorBlog'
import AuthorBlogPost from '../components/AuthorBlogPost'



const BlogHomePage: React.FC = () => {
  return (
    <Layout>
        <Router>
          <BlogList path='/blog'/>
          <AuthorBlog path='/blog/:author'/>
          <AuthorBlogPost path='blog/:author/:guid'/>
        </Router>
    </Layout>
  )
}


export default BlogHomePage
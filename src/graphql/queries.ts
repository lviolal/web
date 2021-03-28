// tslint:disable
// this is an auto generated file. This will be overwritten

export const feed = `query Feed {
  feed {
    author
    description
    guid
    image
    link
    pubDate
    title
  }
}
`;
export const homePageQuery = `query HomePageQuery($tags: [String!]!) {
  homePageQuery(tags: $tags) {
    author
    description
    guid
    image
    link
    pubDate
    source
    tag
    title
    website
  }
}
`;
export const item = `query Item($guid: String!) {
  item(guid: $guid) {
    author
    description
    guid
    image
    link
    pubDate
    source
    tag
    title
    website
  }
}
`;
export const items = `query Items($limit: Int, $offset: Int, $tag: String) {
  items(limit: $limit, offset: $offset, tag: $tag) {
    author
    description
    guid
    image
    link
    pubDate
    source
    tag
    title
    website
  }
}
`;
export const post = `query Post($guid: String!) {
  post(guid: $guid) {
    author
    body
    description
    guid
    image
    link
    pubDate
    title
  }
}
`;
export const posts = `query Posts($author: String!) {
  posts(author: $author) {
    author
    body
    description
    guid
    image
    link
    pubDate
    title
  }
}
`;
export const searchItems = `query SearchItems(
  $limit: Int
  $offset: Int
  $sort: String!
  $sources: [String!]
  $tags: [String!]
) {
  searchItems(
    limit: $limit
    offset: $offset
    sort: $sort
    sources: $sources
    tags: $tags
  ) {
    author
    description
    guid
    image
    link
    pubDate
    source
    tag
    title
    website
  }
}
`;
export const sources = `query Sources($tags: [String!]) {
  sources(tags: $tags) {
    link
    pubDate
    rssType
    source
    sourceImage
    tag
    title
  }
}
`;

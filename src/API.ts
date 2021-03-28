/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateSourceMutationVariables = {
  link: string,
  pubDate: string,
  rssType: string,
  source: string,
  sourceImage: string,
  tag: string,
  title: string,
};

export type CreateSourceMutation = {
  createSource:  {
    __typename: "WOTGSource",
    link: string,
    pubDate: string,
    rssType: string,
    source: string,
    sourceImage: string,
    tag: string,
    title: string,
  } | null,
};

export type FeedQuery = {
  feed:  Array< {
    __typename: "WOTGFeed",
    author: string | null,
    description: string | null,
    guid: string,
    image: string | null,
    link: string | null,
    pubDate: string | null,
    title: string,
  } | null > | null,
};

export type HomePageQueryQueryVariables = {
  tags: Array< string >,
};

export type HomePageQueryQuery = {
  homePageQuery:  Array< {
    __typename: "WOTGItem",
    author: string,
    description: string,
    guid: string,
    image: string,
    link: string,
    pubDate: string,
    source: string,
    tag: string,
    title: string,
    website: string,
  } | null > | null,
};

export type ItemQueryVariables = {
  guid: string,
};

export type ItemQuery = {
  item:  {
    __typename: "WOTGItem",
    author: string,
    description: string,
    guid: string,
    image: string,
    link: string,
    pubDate: string,
    source: string,
    tag: string,
    title: string,
    website: string,
  } | null,
};

export type ItemsQueryVariables = {
  limit?: number | null,
  offset?: number | null,
  tag?: string | null,
};

export type ItemsQuery = {
  items:  Array< {
    __typename: "WOTGItem",
    author: string,
    description: string,
    guid: string,
    image: string,
    link: string,
    pubDate: string,
    source: string,
    tag: string,
    title: string,
    website: string,
  } | null > | null,
};

export type PostQueryVariables = {
  guid: string,
};

export type PostQuery = {
  post:  {
    __typename: "WOTGPost",
    author: string,
    body: string,
    description: string,
    guid: string,
    image: string | null,
    link: string | null,
    pubDate: string,
    title: string,
  } | null,
};

export type PostsQueryVariables = {
  author: string,
};

export type PostsQuery = {
  posts:  Array< {
    __typename: "WOTGPost",
    author: string,
    body: string,
    description: string,
    guid: string,
    image: string | null,
    link: string | null,
    pubDate: string,
    title: string,
  } | null > | null,
};

export type SearchItemsQueryVariables = {
  limit?: number | null,
  offset?: number | null,
  sort: string,
  sources?: Array< string > | null,
  tags?: Array< string > | null,
};

export type SearchItemsQuery = {
  searchItems:  Array< {
    __typename: "WOTGItem",
    author: string,
    description: string,
    guid: string,
    image: string,
    link: string,
    pubDate: string,
    source: string,
    tag: string,
    title: string,
    website: string,
  } | null > | null,
};

export type SourcesQueryVariables = {
  tags?: Array< string > | null,
};

export type SourcesQuery = {
  sources:  Array< {
    __typename: "WOTGSource",
    link: string,
    pubDate: string,
    rssType: string,
    source: string,
    sourceImage: string,
    tag: string,
    title: string,
  } | null > | null,
};

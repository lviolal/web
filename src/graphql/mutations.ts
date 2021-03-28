// tslint:disable
// this is an auto generated file. This will be overwritten

export const createSource = `mutation CreateSource(
  $link: String!
  $pubDate: String!
  $rssType: String!
  $source: String!
  $sourceImage: String!
  $tag: String!
  $title: String!
) {
  createSource(
    link: $link
    pubDate: $pubDate
    rssType: $rssType
    source: $source
    sourceImage: $sourceImage
    tag: $tag
    title: $title
  ) {
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

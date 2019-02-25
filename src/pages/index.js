import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

//import Image from "../components/image"
//import Link from 'gatsby-link'

const IndexPage = (props) => {
  let items = props.data.allBiorxivPaper.edges;

  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  items = items.filter( item => {
    const date = new Date(item.node.first_posted);
    return (date >= startDate);
  });

  items = items.reverse();
  items = items.slice(0, 2);

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      {items.map((item, i) => {
        const dat = item.node;

        let authors_str = dat.authors;

        if(authors_str.length > 100) {
          authors_str = authors_str.substr(0, 100) + '...'
        }

        return (
          <div key={i}>
            <h1><a href={dat.biorxiv_url}>{dat.title}</a></h1>
            <p>{authors_str}</p>
            <p>First Posted: {dat.first_posted}, Category: {dat.category}, Downloads: {dat.downloads}</p>
            <p>{dat.abstract}</p>
          </div>
        )
      })}
    </Layout>
  );
};

export default IndexPage

export const query = graphql`
  query BiorxivPaperQuery {
    allBiorxivPaper(
      sort: {
        fields: [first_posted]
        order: DESC
      }
    ) {
      edges {
        node {
          id
          biorxiv_url
          title
          authors
          first_posted
          category
          downloads
          abstract
        }
      }
    }
  }
`;

// IGNORE
//items = _.filter(items, o => moment().subtract(30, "days").isSameOrBefore(moment(o.node.first_posted)));

//items = _.filter(items, o => o.node.category === 'bioinformatics');
//console.log(items);

// items = items.sort(function compare(a, b) {
//   const dateA = new Date(a.first_posted);
//   const dateB = new Date(b.first_posted);
//   return dateA - dateB;
// });
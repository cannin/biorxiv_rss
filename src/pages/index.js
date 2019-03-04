import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"

const Papers = (props) => {
  let items = props.items;
  //console.log(JSON.stringify(props));

  const hasItems = (items.length > 0) ? true : false;

  if (hasItems) {
    return (
      items.map((item, i) => {
        const dat = item.node;

        let authors_str = dat.authors;
        const max_char = 90;
        //authors_str = _.prune(authors_str, max_char, ', ...');
        //console.log(authors_str);

        if(authors_str.length > max_char) {
          //trim the string to the maximum length
          authors_str = authors_str.substr(0, max_char);

          //re-trim if we are in the middle of a word
          authors_str = authors_str.substr(0, Math.min(authors_str.length, authors_str.lastIndexOf(",")))
          authors_str = authors_str + ", ...";
        }

        return (
          <div key={i}>
            <h2><a href={dat.biorxiv_url}>{dat.title}</a></h2>
            <h3>{authors_str}</h3>
            <h4>Posted: {dat.first_posted}, Category: {dat.category}, Downloads: {dat.downloads}</h4>
            <p>{dat.abstract}</p>
          </div>
        )
      })
    )
  }

  return (
    <div key={0}>
      <h2 className={"error"}><Image /> No articles today <Image /></h2>
    </div>
  );
}

const IndexPage = (props) => {
  let items = props.data.allBiorxivPaper.edges;

  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 31);

  let endDate = new Date();
  endDate.setDate(endDate.getDate() - 30);

  items = items.filter( item => {
    const date = new Date(item.node.first_posted);
    return (date >= startDate && date <= endDate);
  });

  //items = items.reverse();
  if(items.length > 5) {
    items = items.slice(0, 5);
  }

  //items = [];
  //console.log(items.length);

  return (
    <Layout>
      <SEO title="Home" keywords={[`biorxiv`, `bioinformatics`, `systems biology`, `cancer biology`]} />
      {
        <Papers items={items} />
      }
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

/*
(items) => {
  if(items.length === 0) {
    console.log("A");

    return (
      <div key={0}>
        <h2>No articles today. Check back tomorrow. <img alt="test tube" src="images/test_tube.png" /></h2>
      </div>
    )
  } else {
    console.log("B");

    items.map((item, i) => {
      const dat = item.node;

      let authors_str = dat.authors;
      authors_str = _.prune(authors_str, 70, ', ...');

      return (
        <div key={i}>
          <h2><a href={dat.biorxiv_url}>{dat.title}</a></h2>
          <h4>{authors_str}</h4>
          <p>Posted: {dat.first_posted}, Category: {dat.category}, Downloads: {dat.downloads}</p>
          <p>{dat.abstract}</p>
        </div>
      )
    })
  }
}*/

const axios = require("axios");
const crypto = require("crypto");
const _ = require("underscore");

const categories = [
  'biochemistry', 'bioinformatics', 'biophysics',
  'cancer-biology', 'cell-biology', 'clinical-trials',
  'genetics', 'genomics', 'immunology',
  'molecular-biology', 'pharmacology-and-toxicology', 'systems-biology'];

const category_str = categories.join('&category=')

// https://api.rxivist.org/v1/papers?metric=downloads&page_size=250&timeframe=lastmonth&category=biochemistry&category=bioinformatics&category=biophysics&category=cancer-biology&category=cell-biology&category=clinical-trials&category=genetics&category=genomics&category=immunology&category=molecular-biology&category=pharmacology-and-toxicology&category=systems-biology

exports.sourceNodes = ({ actions }) => {
  const { createNode } = actions
  return new Promise((resolve, reject) => {

    const url = `https://api.rxivist.org/v1/papers?metric=downloads&page_size=250&timeframe=lastmonth&category=${category_str}`;
    axios.get(url).then(res => {

      // map into these results and create nodes
      res.data.results.map((item, i) => {

        let authors = _.pluck(item.authors, 'name');
        authors = authors.join(', ');

        // Create your node object
        const node = {
          // Required fields
          id: item.id.toString(),
          parent: `__SOURCE__`,
          internal: {
            type: `BiorxivPaper`, // name of the graphQL query --> allRandomUser {}
            // contentDigest will be added just after
            // but it is required
          },
          children: [],

          // Other fields that you want to query with graphQL
          title: item.title,
          downloads: item.metric,
          biorxiv_url: item.biorxiv_url,
          category: item.category,
          abstract: item.abstract,
          first_posted: item.first_posted,
          authors: authors
          // etc...
        }

        // Get content digest of node. (Required field)
        const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(node)).digest(`hex`)
        // add it to node
        node.internal.contentDigest = contentDigest

        // Create node with the gatsby createNode() API
        createNode(node)
      })
      resolve()
    })
  })
}
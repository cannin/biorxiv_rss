import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { FaRssSquare } from "react-icons/fa"

import Header from "./header"
import "./layout.css"

import onLinkClick from "../components/onLinkClick"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
            longDescription
            biorxiv_categories
            siteUrl
            twitter_username
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteMetadata={data.site.siteMetadata}  />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer name="footer">
            Presented each day are the top 5 downloaded <a href="https://www.biorxiv.org">bioRxiv</a> articles from 15 days ago aggregated over the following categories: { data.site.siteMetadata.biorxiv_categories.join(', ') } <br/>
            Copyright: {new Date().getFullYear()}. Built with {` `} <a href="https://www.gatsbyjs.org">Gatsby</a> and <a href="https://rxivist.org">Rxivist</a>. <a onClick={() => onLinkClick('rss')} href="rss.xml" target="_blank" rel="noopener noreferrer"><FaRssSquare /> RSS Feed</a>. <br/>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout


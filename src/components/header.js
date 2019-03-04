import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FaTwitterSquare, FaFacebookSquare, FaEnvelopeSquare } from 'react-icons/fa';

const Header = ({ siteMetadata }) => (
  <header
    style={{
      background: `#c50000`,
      marginBottom: `1rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1rem 1rem`,
        textAlign: `center`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteMetadata.title}<br/>{siteMetadata.description}
        </Link>
      </h1>
      <h2 style={{
        color: `white`,
        textDecoration: `none`,
        paddingTop: 10
      }}>
        <a
          className={'icon'}
          href={ "https://twitter.com/intent/tweet?source=" + siteMetadata.siteUrl +
          "&text=" + siteMetadata.title + ": " + siteMetadata.description +
          "&via=" + siteMetadata.twitter_username + " " + siteMetadata.siteUrl }
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitterSquare />
        </a>
        <a
          className={'icon'}
          href={ "https://www.facebook.com/sharer/sharer.php?u=" + siteMetadata.siteUrl +
          "&quote=" + siteMetadata.title + ": " + siteMetadata.description + " " + siteMetadata.siteUrl }
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare />
        </a>
        <a
          className={'icon'}
          href={ "mailto:?subject=" + siteMetadata.title +
          "&body=" + siteMetadata.title + ": " + siteMetadata.description + " " + siteMetadata.siteUrl }
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelopeSquare />
        </a>
      </h2>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

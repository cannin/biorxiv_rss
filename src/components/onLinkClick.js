import ReactGA from "react-ga"

const onLinkClick = (link) => {
  console.log('debug: ' + JSON.stringify(link));

  ReactGA.event({
    category: 'link',
    action: link
  })
};

export default onLinkClick
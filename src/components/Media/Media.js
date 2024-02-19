import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { hexToRgb, makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components

import styles from "assets/jss/material-kit-pro-react/components/mediaStyle.js";
import { grayColor, title } from "assets/jss/material-kit-pro-react";
import { blackColor } from "assets/jss/material-kit-pro-react";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  media: {
    display: "flex",
    //WebkitBoxAlign: "start",
    alignItems: "flex-start",
    "& p": {
      //color: grayColor[0],
      fontSize: "1rem",
      lineHeight: "1.6em"
    },
    "& $media $mediaBody": {
      paddingRight: "0px"
    }
  },
  mediaLink: {
    padding: "10px",
    float: "left !important"
  },
  mediaAvatar: {
    margin: "0 auto",
    width: "64px",
    height: "64px",
    overflow: "hidden",
    borderRadius: "50%",
    marginRight: "15px",

    "& img": {
      width: "100%"
    }
  },
  mediaBody: {
    paddingRight: "10px",
    flex: "1"
  },
  mediaHeading: {
    marginTop: "10px",
    marginBottom: "10px",
    fontWeight: 'bold',
    "& small": {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  },
  mediaFooter: {
    "& button, & a": {
      marginBottom: "20px"
    },
    "&:after": {
      display: "table",
      content: '" "',
      clear: "both"
    }
  }
}));

export default function Media(props) {
  const {
    avatarLink,
    avatar,
    avatarAlt,
    title,
    body,
    footer,
    innerMedias,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <div {...rest} className={classes.media}>
      <a className={classes.mediaLink}>
        <div className={classes.mediaAvatar}>
          <img src={avatar} alt={avatarAlt} />
        </div>
      </a>
      <div className={classes.mediaBody}>
        {title !== undefined ? (
          <Typography variant="subtitle1" className={classes.mediaHeading}>{title}</Typography>
        ) : null}
        <Typography noWrap={false} variant="p">
          {body}
        </Typography>

        <div className={classes.mediaFooter}>{footer}</div>
        {innerMedias !== undefined
          ? innerMedias.map(prop => {
            return prop;
          })
          : null}
      </div>
    </div>
  );
}

Media.defaultProps = {
  avatarLink: "#",
  avatarAlt: "..."
};

Media.propTypes = {
  avatarLink: PropTypes.string,
  avatar: PropTypes.string,
  avatarAlt: PropTypes.string,
  title: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  innerMedias: PropTypes.arrayOf(PropTypes.object)
};

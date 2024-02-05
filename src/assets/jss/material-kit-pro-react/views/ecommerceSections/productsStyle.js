import {
  section,
  container,
  cardTitle,
  coloredShadow,
  mlAuto,
  mrAuto,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

import customCheckboxRadioSwitch from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const styles = {
  ...customCheckboxRadioSwitch,
  ...tooltipsStyle,
  checkRoot: {
    padding: "14px",
    "&:hover": {
      backgroundColor: "unset"
    }
  },
  coloredShadow,
  mlAuto,
  mrAuto,
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important"
  },
  cardDescription: {
    color: grayColor[0],
    textAlign: "center"
  },
  container: {
    ...container
  },
  description: {
    color: grayColor[0]
  },
  section: {
    ...section,
    marginTop: "36px"
  },
  priceContainer: {
    display: "inline-flex"
  },
  price: {
    fontSize: "18px",
    color: grayColor[22]
  },
  pullRight: {
    float: "right"
  },
  cardHeaderImage: {
    position: "relative",
    padding: "0",
    zIndex: "1",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "-30px",
    borderRadius: "6px",
    "& img": {
      width: "100%",
      borderRadius: "6px",
      pointerEvents: "none"
    },
    "& a": {
      display: "block"
    }
  },
  justifyContentBetween: {
    WebkitBoxPack: "justify!important",
    justifyContent: "space-between !important"
  },
  customExpandPanel: {
    maxHeight: "273px",
    overflowY: "scroll",
    "&  label": {
      display: "block"
    }
  },
  priceSlider: {
    fontWeight: "500"
  },
  refineButton: {
    margin: "-3px 0"
  },
  cardBodyRefine: {
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  textLeft: {
    textAlign: "left"
  },
  prods: {
    justifyContent: 'center',
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '120px',
    paddingBottom: '20px'
  },
  baner: {
    height: '100%',
    minWidth: '250px',
    marginTop: '30px',
  },
  cracha: {
    height: '305px',
    maxWidth: '280px',
    marginBottom: '20px'
  },
  papelCarrossel: {
    justifyContent: 'center',
  },
};

export default styles;

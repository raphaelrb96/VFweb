import { title, grayColor } from "assets/jss/material-kit-pro-react.js";

const productStyle = {
  section: {
    padding: "10px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "20px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: grayColor[0]
  }
};

export default productStyle;

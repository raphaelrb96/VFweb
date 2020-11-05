import styles from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.js";

import React from "react";

import classNames from "classnames";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import Share from "@material-ui/icons/Share";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Schedule from "@material-ui/icons/Schedule";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Subject from "@material-ui/icons/Subject";
import WatchLater from "@material-ui/icons/WatchLater";
import People from "@material-ui/icons/People";
import Business from "@material-ui/icons/Business";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Delete from "@material-ui/icons/Delete";
import Bookmark from "@material-ui/icons/Bookmark";
import Refresh from "@material-ui/icons/Refresh";
import Receipt from "@material-ui/icons/Receipt";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Info from "components/Typography/Info.js";
import Danger from "components/Typography/Danger.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Rose from "components/Typography/Rose.js";
import Button from "components/CustomButtons/Button.js";

import {loginGoogle, loginFace} from "index.js";

const useStyles = makeStyles(styles);


export default function MyCardLogin(props) {

  const [activeRotate1, setActiveRotate1] = React.useState("");
  const [activeRotate2, setActiveRotate2] = React.useState("");
  const [activeRotate3, setActiveRotate3] = React.useState("");
  const classes = useStyles();
  React.useEffect(() => {
    if (window) {
      window.addEventListener("resize", addStylesForRotatingCards);
    }
    addStylesForRotatingCards();
    return function cleanup() {
      if (window) {
        window.removeEventListener("resize", addStylesForRotatingCards);
      }
    };
  });
  const addStylesForRotatingCards = () => {
    var rotatingCards = document.getElementsByClassName(classes.cardRotate);
    for (let i = 0; i < rotatingCards.length; i++) {
      var rotatingCard = rotatingCards[i];
      var cardFront = rotatingCard.getElementsByClassName(classes.front)[0];
      var cardBack = rotatingCard.getElementsByClassName(classes.back)[0];
      cardFront.style.height = "unset";
      cardFront.style.width = "unset";
      cardBack.style.height = "unset";
      cardBack.style.width = "unset";
      var rotatingWrapper = rotatingCard.parentElement;
      var cardWidth = rotatingCard.parentElement.offsetWidth;
      var cardHeight = rotatingCard.children[0].children[0].offsetHeight;
      rotatingWrapper.style.height = cardHeight + "px";
      rotatingWrapper.style["margin-bottom"] = 30 + "px";
      cardFront.style.height = "unset";
      cardFront.style.width = "unset";
      cardBack.style.height = "unset";
      cardBack.style.width = "unset";
      cardFront.style.height = cardHeight + 35 + "px";
      cardFront.style.width = cardWidth + "px";
      cardBack.style.height = cardHeight + 35 + "px";
      cardBack.style.width = cardWidth + "px";
    }
  };


	return(

				<div
                  className={
                    classes.rotatingCardContainer +
                    " " +
                    classes.manualRotate +
                    " " +
                    activeRotate1
                  }>

                  <Card className={classes.cardRotate}>

                    <div className={classes.front}>
                      <CardBody  className={classes.cardBodyRotate}>
                        <h6
                          className={classNames(classes.cardCategory, classes.textInfo)}
                        >
                          AREA VIP
                        </h6>

                        <a href="#pablo">
                          <h3 className={classes.cardTitle}>
                            Faça seu login
                          </h3>
                        </a>

                        <p className={classNames(classes.cardCategory, classes.textInfo)}>
                          <b>E não se preocupe mais com taxa de entrega...</b>
                        </p>
                        <br/>
                        <Button round color="verde"  onClick={() =>
                              setActiveRotate1(classes.activateRotate)
                            }>
                          <Subject /> Entrar
                        </Button>

                      
                      </CardBody>
                    </div>

                    <div className={classes.back}>
                      <CardBody className={classes.cardBodyRotate}>
                        <h5 className={classes.cardTitle}>Seus dados estão seguros</h5>
                        <p className={classes.cardDescription}>
                          Pedimos sua identificação atraves das redes sociais para manter um relacionamento mais seguro. So teremos acesso a dados públicos como: e-mail, nome, foto do perfil...
                        </p>
                        <div className={classes.textCenter}>
                          <Button onClick={() => {
                          	loginGoogle();
                          }} style={{
                          	marginRight: '16px',
                          }} round justIcon color="google">
                            <i className="fab fa-google" />
                          </Button>
                          
                          <Button onClick={() => {
                            loginFace();
                          }} round justIcon color="facebook">
                            <i className="fab fa-facebook" />
                          </Button>
                        </div>
                        <Button link onClick={() => setActiveRotate1("")}>
                          <Refresh /> Voltar...
                        </Button>
                      </CardBody>
                    </div>

                  </Card>
                </div>


	);
}
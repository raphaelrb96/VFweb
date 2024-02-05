/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
import Face from "@material-ui/icons/Face";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import image from "assets/img/bg0.jpg";

import {loginFaceMaster, loginGoogleMaster, isRevendedor, anonimato, abrirPaginaRevenda} from "index.js";

const useStyles = makeStyles(loginPageStyle);

let zap = '';

let handlerZap = event => {
  zap = event.target.value;
}

let analizarLogin = (tipo) => {

    if (tipo === 1) {
        loginGoogleMaster();
    } else {
        loginFaceMaster();
    }

}

export default function LoginPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="AmaCompras"
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    style={{
                      backgroundColor: '#e00000',
                    }}
                    plain
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Escolha uma forma de Login</h4>
                  </CardHeader>
                  <h4 style={{
                    marginLeft: '14px',
                    marginRight: '14px',
                    marginTop: '16px',
                    marginBottom: '20px'
                  }} className={classes.textCenter}>Faça a Autenticação para poder revender nossos produtos</h4>
                  
                  <p className={classes.description + " " + classes.textCenter}>
                    Seus dados estão seguros
                  </p>
                  <CardBody signup>
                    <p className={classes.description + " " + classes.textCenter}>
                      Pedimos sua identificação atraves das redes sociais para manter um relacionamento mais seguro. So teremos acesso a dados públicos como: e-mail, nome, foto do perfil...
                    </p>

                    

                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button simple style={{
                      color: '#e00000',
                    }} size="lg">
                      Escolha uma forma de Login
                    </Button>

                    <div className={classes.socialLine}>
                      
                      
                      <Button
                        round 
                        justIcon
                        color="facebook"
                        className={classes.iconButtons}
                        onClick={() => (analizarLogin(2))}
                      >
                        <i className="fab fa-facebook" />
                      </Button>

                      <Button
                        round
                        justIcon
                        color="google"
                        className={classes.iconButtons}
                        onClick={() => (analizarLogin(1))}
                      >
                        <i className="fab fa-google" />
                      </Button>


                    </div>

                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

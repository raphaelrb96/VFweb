/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import SectionFeatures from "views/SectionsPage/Sections/SectionFeatures.js";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";

// Sections for this page
import SectionProduct from "./Sections/SectionProduct.js";
import SectionTeam from "./Sections/SectionTeam.js";
import SectionWork from "./Sections/SectionWork.js";

import Pb from 'views/my/Pb';


import {solicitacaoRevendedor, abrirLogin, mUser, isRevendedor, abrirPainelRevendas, interfaceMain} from "index.js";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const useStyles = makeStyles(landingPageStyle);

const smoothScroll = target => {
    var targetScroll = document.getElementById(target);
    scrollTo(document.documentElement, targetScroll.offsetTop, 3000);
  };


class RevendedorPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       loading: true,
       revendedor: false,
       anonimo: true
    };
    this.carregarUser = this.carregarUser.bind(this);
  }

  carregarUser(user) {
    getFirestore()
    .collection("Revendedores")
    .doc('amacompras')
    .collection('ativos')
    .doc(user.uid)
    .onSnapshot(doc => {
      if (doc === null || doc === undefined) {
        this.setState({
          loading: false,
          revendedor: false,
          anonimo: user.isAnonymous
        });
      } else {

        if (doc.exists) {

          this.setState({
            loading: false,
            revendedor: true,
            anonimo: user.isAnonymous
          });

        } else {

          this.setState({
            loading: false,
            revendedor: false,
            anonimo: user.isAnonymous
          });

        }
        
        
      }
    });
  }

  componentDidMount() {

    if (mUser === null || mUser === undefined) {
      getAuth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          
          this.carregarUser(user);

        }
      });
    } else {
      this.carregarUser(mUser);
    }
    

  }


  render() {

    let classes = this.props.class;

    if (this.state.loading) {
      return(<Pb />);
    } else {

      if (this.state.revendedor) {
         abrirPainelRevendas();
      } else if (this.state.anonimo) {
         //abrirLogin();
      } else {

        

      }

      return (
          <div>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <div className={classes.container}>
                <SectionProduct />
                <SectionTeam />
                <SectionFeatures />
                <SectionWork />
                <div id="workama" >
                </div>
              </div>
            </div>
            
          </div>
        );

    }

  }


}

export default function LandingPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();

  return(<RevendedorPage class={classes} /> );

  
}

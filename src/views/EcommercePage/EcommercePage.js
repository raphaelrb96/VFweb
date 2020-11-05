/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Footer from "components/Footer/Footer.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionLatestOffers from "views/EcommercePage/Sections/SectionLatestOffers.js";
import SectionProducts from "views/EcommercePage/Sections/SectionProducts.js";
import SectionBlog from "views/EcommercePage/Sections/SectionBlog.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import Mail from "@material-ui/icons/Mail";

import Pb from 'views/my/Pb';
import Rodape from 'views/my/Rodape';
import {mFirebase, listaProdutosPrincipal} from 'index.js';

import ContainerBusca from "views/my/ContainerBusca";


import firebase from 'firebase';

import ecommerceHeader from "assets/img/examples/ecommerce-header.jpg";
import face1 from "assets/img/faces/card-profile6-square.jpg";
import face2 from "assets/img/faces/christian.jpg";
import face3 from "assets/img/faces/card-profile4-square.jpg";
import face4 from "assets/img/faces/card-profile1-square.jpg";
import face5 from "assets/img/faces/marc.jpg";
import face6 from "assets/img/faces/kendall.jpg";
import face7 from "assets/img/faces/card-profile5-square.jpg";
import face8 from "assets/img/faces/card-profile2-square.jpg";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceStyle.js";

const useStyles = makeStyles(styles);

export let produtos = new Array();

function misturar(array) {
  var m = array.length, t, i;

  while (m) {
    
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

class AmaCompras extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pb: true,
      soProduto: false,
      produtos: [],
      promos: [],
      catgAtual: '-1'
    };
    this.handlerCategoria = this.handlerCategoria.bind(this);
    this.handlerPesquisa = this.handlerPesquisa.bind(this);

  }

  handlerPesquisa(search) {

    firebase.firestore().collection("produtos")
        .where('tag.' + search.toLowerCase(), '==', true)
        .where("disponivel", "==", true)
        .get()
        .then(querySnapshot => {

          let prods = querySnapshot.docs;
          //listaProdutosPrincipal = prods;
          let tamanho = querySnapshot.size;

          let promocoes = Array();

          for (var i = 0; i < prods.length; i++) {
            let objeto = prods[i];
            
            promocoes.push(objeto);
            if (promocoes.length >= 3) {
              break;
            }
          }

          this.setState({
            pb: false,
            soProduto: true,
            produtos: prods,
            promos: promocoes,
          });


        }).catch(error => {
          console.log(error.message);
        });

        this.setState({
          pb: true
        });
  }

  handlerCategoria(cat) {
    console.log('handlerCategoria: categorias.' + cat);
    firebase.firestore().collection("produtos")
        .where('categorias.' + cat, '==', true)
        .where("disponivel", "==", true)
        .get()
        .then(querySnapshot => {

          let prods = querySnapshot.docs;
          //listaProdutosPrincipal = prods;
          let tamanho = querySnapshot.size;

          let promocoes = Array();

          for (var i = 0; i < prods.length; i++) {
            let objeto = prods[i];
            promocoes.push(objeto);

            if (promocoes.length >= 3) {
              break;
            }
          }

          this.setState({
            pb: false,
            soProduto: true,
            produtos: prods,
            promos: promocoes,
          });


        }).catch(error => {
          console.log(error.message);
        });

        this.setState({
          pb: true
        });
  }

  componentDidMount() {
    firebase.firestore().collection("produtos")
        .where("disponivel", "==", true)
        .get()
        .then(querySnapshot => {

          let prods = querySnapshot.docs;
          //listaProdutosPrincipal = prods;
          let tamanho = querySnapshot.size;

          prods = misturar(prods);

          let promocoes = Array();

          for (var i = 0; i < prods.length; i++) {
            let objeto = prods[i];
            if (objeto.get('promocional')) {
              promocoes.push(objeto);
            }

            if (promocoes.length >= 3) {
              break;
            }
          }

          this.setState({
            pb: false,
            produtos: prods,
            promos: promocoes,
          });


        }).catch(error => {
          console.log(error.message);
        });
  }




  render() {

    let {pb, produtos, promos, soProduto} = this.state;
    let {classes} = this.props;

    window.scrollTo(0, 0);



    if (pb) {

      return(<Pb />);


    } else {


      let urlParams = new URLSearchParams(window.location.search);

      if (urlParams.has('catg')) {

        let catg = urlParams.get('catg');

        console.log(catg);

        if (this.state.catgAtual !== catg) {

          this.handlerCategoria(catg);

          this.setState({
            catgAtual: catg
          });
        }

        

      }


      if (soProduto) {
        return(
          <div>
          
            <div>
              
              <SectionProducts soProdutos={true} list={produtos} />

              <ContainerBusca pesquisar={this.handlerPesquisa} categoria={this.handlerCategoria} />
              <br/>
            </div>
            
          </div>
        );
      }


      let elementTopo = null;

      if (promos.length >= 3) {
        elementTopo = <SectionLatestOffers list={promos} />;
      }


      return(

        <div>
          
          <div style={{padding: '18px'}}>
            <ContainerBusca pesquisar={this.handlerPesquisa} categoria={this.handlerCategoria} />

            <SectionLatestOffers list={promos} />
            <SectionProducts list={produtos} />
            <br/>
          </div>
          
        </div>

      );

      

    }

  }

}

export default function EcommercePage() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>

      <AmaCompras classes={classes} />

      <Rodape />
    </div>
  );
}

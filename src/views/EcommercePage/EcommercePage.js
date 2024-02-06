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
//import { listaProdutosPrincipal } from 'index.js';

import ContainerBusca from "views/my/ContainerBusca";



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
import { collection, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

const useStyles = makeStyles(styles);

const firebaseConfig = {
  apiKey: "AIzaSyAtMQ-oTpBa3YNeLf8DTRYdKWDQxMXFuvE",
  authDomain: "venda-favorita.firebaseapp.com",
  databaseURL: "https://venda-favorita.firebaseio.com",
  projectId: "venda-favorita",
  storageBucket: "venda-favorita.appspot.com",
  messagingSenderId: "978500802251",
  appId: "1:978500802251:web:1aad0e093739f59969ed4e",
  measurementId: "G-EK2ZQP9BKK"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

    const q = query(collection(db, "produtos"), where('tag.' + search.toLowerCase(), '==', true), where("disponivel", "==", true), limit(300));

    getDocs(q).then(querySnapshot => {

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

    const q = query(collection(db, "produtos"), where('categorias.' + cat, '==', true), where("disponivel", "==", true), limit(300));
    
    getDocs(q).then(querySnapshot => {

        let prods = querySnapshot.docs;
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

    const q = query(collection(db, "produtos"), orderBy("timeUpdate", "desc"), limit(100));

    getDocs(q).then(querySnapshot => {

      let prods = querySnapshot.docs;
      //listaProdutosPrincipal = prods;
      let tamanho = querySnapshot.size;
      let disponiveis = [];

      for (var i = 0; i < prods.length; i++) {
        let objeto = prods[i];
        if (objeto.data().disponivel) {
          disponiveis.push(objeto);
        }
      }

      this.setState({
        pb: false,
        produtos: disponiveis,
        promos: disponiveis.slice(0, 3)
      });


    }).catch(error => {
      console.log(error.message);
    });
  }




  render() {

    const { pb, produtos, promos, soProduto } = this.state;
    const { classes } = this.props;

    window.scrollTo(0, 0);

    if (pb) {
      return (<Pb />);
    } else {

      let urlParams = new URLSearchParams(window.location.search);

      if (urlParams.has('catg')) {
        let catg = urlParams.get('catg');

        if (this.state.catgAtual !== catg) {
          this.handlerCategoria(catg);
          this.setState({
            catgAtual: catg
          });
        }
      }


      const ContentFinal = () => {
        const elementTopo = promos.length >= 3 ? <SectionLatestOffers list={promos} /> : null;
        const elementTopoFinal = soProduto ? null : elementTopo;
        return (
          <div>
            <div style={{ padding: '16px' }}>
              <ContainerBusca pesquisar={this.handlerPesquisa} categoria={this.handlerCategoria} />
              <SectionProducts soProdutos={soProduto} list={produtos} />
              <br />
            </div>
          </div>
        );
      };

      return <ContentFinal />;

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

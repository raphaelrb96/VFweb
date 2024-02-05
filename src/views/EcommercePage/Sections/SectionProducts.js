import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// plugin that creates slider
import Slider from "nouislider";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui icons
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Cached from "@material-ui/icons/Cached";
import Subject from "@material-ui/icons/Subject";
import Check from "@material-ui/icons/Check";
// core components
import Accordion from "components/Accordion/Accordion.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import Paper from '@material-ui/core/Paper';



import suit1 from "assets/img/examples/suit-1.jpg";
import suit2 from "assets/img/examples/suit-2.jpg";
import suit3 from "assets/img/examples/suit-3.jpg";
import suit4 from "assets/img/examples/suit-4.jpg";
import suit5 from "assets/img/examples/suit-5.jpg";
import suit6 from "assets/img/examples/suit-6.jpg";
import color1 from "assets/img/examples/color1.jpg";
import color3 from "assets/img/examples/color3.jpg";
import color2 from "assets/img/examples/color2.jpg";
import dg3 from "money.png";
import fundo from "assets/img/fundo.png";
import dg1 from "assets/img/dg1.jpg";

import Grid from '@material-ui/core/Grid';

import { mUser, isRevendedor, mUid, ganheDinheiro } from 'index.js';

import Produto from "views/my/Produto.js"
import Carrossel from 'views/my/Carrossel.js';
import MyCardLogin from 'views/my/MyCardLogin.js';
import Cracha from 'views/my/Cracha.js';

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";
import { Typography } from "@material-ui/core";
import { getFirestore } from "firebase/firestore";

const useStyles = makeStyles(theme => ({
  ...styles,
  resultPesquisa: {
    marginBottom: theme.spacing(3),
    marginLeft: 2
  }
}));

class CardGanheDinheiro extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    const classes = this.props.classes;

    return (

      <GridItem md={12} sm={12}>
        <Card background style={{ backgroundImage: `url(${dg3})` }}>
          <CardBody background>
            <h6 className={classNames(classes.cardCategory, classes.textInfo)}>
              DINHEIRO !
            </h6>
            <a href="#pablo">
              <h3 className={classes.cardTitle}>Ganhe com a Venda Favorita</h3>
            </a>
            <p className={classes.description}>
              Trabalhe de casa na nossa plataforma vendendo produtos ou gerenciando vendedores !
            </p>
            <Button onClick={() => (ganheDinheiro())} round color="white">
              <Subject /> Saiba mais
            </Button>
          </CardBody>
        </Card>
      </GridItem>
    );


  }


}

class CardMiniCarteira extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      totalComissoes: 0,
      pb: true,
    }

    this.carregarComissoes = this.carregarComissoes.bind(this);
  }


  carregarComissoes(usr) {
    const db = getFirestore();
    db.settings({ timestampsInSnapshots: true });

    db.collection('MinhasRevendas')
      .doc('Usuario')
      .collection(usr.uid)
      .where("pagamentoRecebido", "==", false)
      .onSnapshot(querySnapshot => {


        if (querySnapshot === null || querySnapshot === undefined) {


          this.setState({
            lista: [],
            totalComissoes: 0,
            pb: false
          });



        } else {

          let prodsCart = querySnapshot.docs;

          if (prodsCart.length === 0) {


            this.setState({
              lista: [],
              totalComissoes: 0,
              pb: false
            });



          } else {

            let somaTT = 0;

            prodsCart.map(item => {
              if (item.get('statusCompra') !== 3) {
                let precoTT = item.get('comissaoTotal');
                somaTT = somaTT + precoTT;
              }
            });

            this.setState({
              lista: prodsCart,
              totalComissoes: somaTT,
              pb: false
            });

          }

        }


      });
  }


  componentDidMount() {

    /*

    if (mUser === null || mUser === undefined) {

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          
          this.carregarComissoes(user);

        }
      });

    } else {

      this.carregarComissoes(mUser);

    }
    */


  }


  render() {

    const classes = this.props.classes;

    return (

      <GridItem md={12} sm={12}>
        <Card background style={{ backgroundImage: `url(${dg3})` }}>
          <CardBody background>
            <h6
              className={classNames(classes.cardCategory, classes.textInfo)}
            >
              ACESSO LIBERADO
            </h6>
            <a href="#pablo">
              <h3 className={classes.cardTitle}>Comece a ganha dinheiro AGORA</h3>
            </a>
            <p className={classes.description}>
              Você ja faz parte da VendaFavorita. Ao completar 100 reais em comissões você poderá solicitar a transferencia do dinheiro para sua conta.
            </p>
            <br />
            <Button href="/revendedor" round color="white">
              <Subject /> Painel do Revendor
            </Button>
          </CardBody>
        </Card>
      </GridItem>

    );

  }


}

class ContainerCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      revendedor: false
    }
  }

  componentDidMount() {
    if (mUid === null || mUid.length === 0) {
      return;
    }
    getFirestore()
      .collection("Revendedores")
      .doc('amacompras')
      .collection('ativos')
      .doc(mUid)
      .onSnapshot(doc => {
        if (doc === null || doc === undefined) {
          console.log('Não é revendedor');
        } else {

          if (doc.exists) {
            console.log('É revendedor');

            this.setState({
              revendedor: true
            });

          } else {
            console.log('Não é revendedor');

          }


        }
      });
  }

  render() {

    if (this.state.revendedor) {
      return (<CardMiniCarteira classes={this.props.classes} />);
    } else {
      return (<CardGanheDinheiro classes={this.props.classes} />);
    }


  }

}



export default function SectionProducts(props) {

  const [checked, setChecked] = React.useState([1, 9, 27]);
  const [priceRange, setPriceRange] = React.useState([101, 790]);


  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const classes = useStyles();

  const lista = props.list;

  let cardUsuario = <MyCardLogin />;


  if (mUser !== null && !mUser.isAnonymous) {
    cardUsuario = <Cracha />;
  }

  const ContentTitle = () => {
    if(!props.soProdutos) {
      return null;
    }

    return(
      <Typography variant="body1" className={classes.resultPesquisa}>
        {`${lista.length} Produtos Encontrados`}
      </Typography>
    )
  };


  const contentCards = !props.soProdutos ? (
    <GridContainer>

      <GridItem
        className={classes.baner}
        xs={12}
        sm={12}
        md={8}
        lg={8}
        xl={8}>
        <ContainerCard classes={classes} />
      </GridItem>

      <GridItem md={4} sm={8} xs={10}>
        {cardUsuario}
      </GridItem>

    </GridContainer>
  ) : null;

  const contentSpacing = !props.soProdutos ? (
    <div className={classes.prods}>
      <br />
      <br />
      <br />
      <h2 className={classes.prods}>Mais produtos</h2>
      <br />
      <br />
    </div>
  ) : null;


  const ContentFinal = () => {


    return (
      <div className={classes.section}>

        <div className={classes.container}>

          <ContentTitle />

          <GridContainer className={classes.prods} >

            <GridItem md={12} sm={12}>
              <Grid container spacing={1} >
                {lista.map((item, i) => (
                  <Produto indice={i} lista={lista} capa={item.get('imgCapa')} nome={item.get('prodName')} id={item.get('idProduto')} prod={item.data()} />
                ))}
              </Grid>
            </GridItem>

          </GridContainer>
          <br />

        </div>

        <br />
        <br />
        <br />

      </div>
    );
  };

  return <ContentFinal />;


}

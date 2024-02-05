/*eslint-disable*/
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
// @material-ui/core components
import { emphasize, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LocalShipping from "@material-ui/icons/LocalShipping";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Accordion from "components/Accordion/Accordion.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from '@material-ui/core/CardMedia';

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

import { autoPlay, bindKeyboard, virtualize } from 'react-swipeable-views-utils';


import Pb from 'views/my/Pb';
import Rodape from 'views/my/Rodape';

import SectionPricing from 'views/PricingPage/Sections/SectionPricing';

// images
import cardProduct1 from "assets/img/examples/card-product1.jpg";
import cardProduct3 from "assets/img/examples/card-product3.jpg";
import cardProduct4 from "assets/img/examples/card-product4.jpg";
import cardProduct2 from "assets/img/examples/card-product2.jpg";
import product1 from "assets/img/examples/product1.jpg";
import product2 from "assets/img/examples/product2.jpg";
import product3 from "assets/img/examples/product3.jpg";
import product4 from "assets/img/examples/product4.jpg";

import { produtos } from "views/EcommercePage/EcommercePage.js";

import { revenderProduto, isRevendedor, abrirPaginaRevenda } from "index.js";
import { Breadcrumbs, Button, Card, Chip, Grid, Typography, withStyles } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { CATEGORIA_LIST } from "views/NovaInterface/Navegador";
import { abriCategoria } from "index";
import SectionValores from "./SectionValores";
import { SubHead } from "./SubHead";
import SplitButton from "views/my/SplitButton";
import { BottomSheet } from "react-spring-bottom-sheet";
import { SectionVariantes } from "./SectionVariantes";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { mApp } from "index";
import { getAuth } from "firebase/auth";

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

const useStyles = makeStyles(theme => ({
  ...productStyle,
  section: {
    marginTop: '16px'
  },
  contanerGrid: {
    [theme.breakpoints.up('md')]: {
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    paddingBottom: '30px',
  },
  acordion: {
    display: 'none',
    height: 0
  },
  imagem: {
    width: '100%',
    height: "auto",
    [theme.breakpoints.down('md')]: {
      minHeight: "500px",
      objectFit: 'cover'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: "450px",
      objectFit: 'cover'
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: "370px",
      objectFit: 'cover'
    },
    marginTop: '30px',
    borderRadius: '12px',
    padding: 4
  },
  mainPrice: {
    ...productStyle.mainPrice,
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontWeight: "200",
    marginTop: "12px",

  },
  containerImg: {
  },
  contanerMain: {
    marginTop: 80,
    padding: '6px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '60px',
      paddingRight: '60px',
      padding: '20px'
    }
  },
  marginMain: {
    marginTop: '32px'
  },
  navegacao: {
    marginBottom: theme.spacing(0)
  },
  mainRaised: {
    padding: "4px",
    borderRadius: "12px",
  },
  main: {
    ...productStyle.main
  },
  title: {
    ...productStyle.title,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.h4.fontSize
    }
  }
}));

const AutoPlaySwipeableViews = bindKeyboard(autoPlay(SwipeableViews));

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(4),
    color: theme.palette.grey[900],
    fontWeight: theme.typography.fontWeightRegular,
    marginBottom: 3,
    marginTop: 3,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);


function componentsOff() {

  let componetVariavel = (<Button
    color="verdin"
    round
    onClick={() => (abrirPaginaRevenda())}
    style={{
      display: "block",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "60px"
    }}
  >
    Ganhar dinheiro revendendo
  </Button>);

  let compNulo = (

    <div >
      <br />
      <br />
      <h3 className={classNames(classes.title, classes.textCenter)}>
        Ganhe dinheiro atravez desse produto ...
      </h3>

    </div>

  );

  const BtnAntigo = (
    <Button onClick={() => (revenderProduto(documento, idP))} style={{
      marginRight: '20px',
    }} round color="verde">
      <ShoppingCart /> Vender agora &nbsp;
    </Button>
  );


};

//Functions
const analizarUrl = () => {

  if (produtos.length > 0) {

  } else {

    return null;

  }

  let urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('id')) {
    let i, itemOfc;
    for (i = 0; i < produtos.length; i++) {
      let item = produtos[i];
      if (item.get('idProduto') === urlParams.get('id')) {
        itemOfc = item;
        break;
      }
    }
    return itemOfc;
  }

  return null;
};

const trackerPixel = (produto) => {


  let produtoAtual = produto;
  let idProduto = produtoAtual.get('idProduto');
  let listaNova = Array();
  let foto = produtoAtual.get('imgCapa');
  let nome = produtoAtual.get('prodName');
  let valor = produtoAtual.get('prodValor');
  let descr = produtoAtual.get('descr');
  let urlNova = window.location.href + '/?id=' + idProduto;




  let objContentId = [idProduto];


  window.fbq('track', 'ViewContent', {
    content_name: nome,
    content_category: 'produtos',
    value: valor,
    currency: 'BRL',
    content_ids: objContentId,
    content_type: 'product',
  });


  logEvent(getAnalytics(), 'view_item', {
    items: [
      {
        price: valor,
        name: nome,
        id: idProduto,
        creative_slot: foto,
        creative_name: foto
      }
    ]
  });

  let objj = {
    "@context": "https://schema.org",
    "@type": "Product",
    "productID": objContentId,
    "name": nome,
    "description": descr,
    "url": urlNova,
    "image": foto,
    "brand": "facebook",
    "offers": [
      {
        "@type": "Offer",
        "price": valor,
        "priceCurrency": "BRL",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  listaNova.push(objj);

  window.fbq('track', 'Microdata', { "JSON-LD": listaNova });

};

const getDocumentData = (produto, idModoPreco, modoPreco, min, valor, comissao, obs) => {
  let mProduto = produto;
  let documento = {
    caminhoImg: mProduto.get('imgCapa'),
    idProdut: mProduto.get('idProduto'),
    labo: mProduto.get('fabricante'),
    produtoName: mProduto.get('prodName'),
    quantidade: min,
    valorTotal: (valor * min),
    valorUni: valor,
    valorUniComComissao: valor,
    valorTotalComComissao: (valor * min),
    comissaoUnidade: comissao,
    comissaoTotal: (comissao * min),
    idModoPreco: idModoPreco,
    modoPreco: modoPreco,
    quantidadeMinima: min,
    obs: obs
  };
  return documento;
};

const getUsuario = async () => {
  const docmRef = doc(db, "Usuario", getAuth().currentUser.uid);
  const resultDoc = await getDoc(docmRef);

  return resultDoc.data();
};

//Components
function ImagemComp({ path, classes }) {
  return <img className={classes.imagem} src={path} />
};

function Descricao({ desc }) {
  return (
    <Accordion
      active={0}
      onChange={() => { }}
      iconFalse
      collapses={[
        {
          title: "Descrição",
          content: (
            <p>
              {desc}
            </p>
          )
        }

      ]}
    />
  );
};

function Detalhes({ classes }) {

  window.scrollTo(0, 0);

  const [state, setState] = useState({
    usuario: null,
    produto: null,
    pb: true,
    obs: ''
  });

  let cor = '';

  const { pb, produto, obs, usuario } = state;

  useEffect(() => {

    const obj = analizarUrl();

    if (obj !== null) {

      setState({
        obs: obs,
        pb: false,
        produto: obj,
      });

      return;

    }

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('id')) {

      const refDoc = doc(db, "produtos", urlParams.get('id'));
      getDoc(refDoc).then(async (doc) => {

        if (doc.exists()) {

          const usuario = await getUsuario();

          setState({
            pb: false,
            produto: doc,
            usuario: usuario
          });

        }

      }).catch(error => {
        setState({
          pb: false,
          produto: null,
        });
      });



    } else {
      setState({
        obs: obs,
        pb: false,
        produto: null,
      });
    }


  }, []);


  if (pb) return <Pb />;
  if (!produto || !produto.data()) return null;


  const changeModelo = (string) => {
    //console.log(string);
    cor = string;
  };

  const handleClick = () => { };

  const clickPedido = (id, nome, min, valor, comissao) => {
    const docFinal = getDocumentData(produto, id, nome, min, valor, comissao, cor);
    const idP = produto.data().idProduto;
    revenderProduto(docFinal, idP);
  };


  trackerPixel(produto);

  const { cores, categorias, descr, imagens } = produto.data();
  const idCategoria = (produto.data() && categorias) ? Number(Object.getOwnPropertyNames(categorias)[0]) : 0;
  const categ = idCategoria === 0 ? 'Variedades' : CATEGORIA_LIST[idCategoria];

  console.log(state);

  return (
    <div className={classes.contanerMain}>

      <Breadcrumbs className={classes.navegacao} aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Inicio"
          onClick={handleClick}
        />
        <StyledBreadcrumb component="a" label="Categorias" onClick={handleClick} />
        <StyledBreadcrumb
          label={categ}
          onClick={() => abriCategoria(idCategoria)}
        />
      </Breadcrumbs>

      <SubHead
        title="INFORMAÇÕES"
      />

      <Card elevation={4} className={classNames(classes.main, classes.mainRaised)}>
        <Grid container className={classes.contanerGrid}>
          <GridItem lg={6} md={6} xs={12}>
            <AutoPlaySwipeableViews enableMouseEvents>
              {imagens.map(path => (
                <ImagemComp path={path} classes={classes} />
              ))}
            </AutoPlaySwipeableViews>
          </GridItem>

          <GridItem lg={6} md={6} xs={12}>
            <Typography variant="h3" className={classes.title}>{produto.get('prodName')}</Typography>
            {
              //<Typography variant="h5" className={classes.mainPrice}> R${produto.get('prodValor')},00 </Typography>
            }

            <Descricao desc={descr} />



          </GridItem>
        </Grid>
      </Card>

      {
        cores && cores.length > 1
          ?
          <SectionVariantes modelos={cores} listener={changeModelo} />
          :
          null
      }



      <SectionValores click={clickPedido} usuario={usuario} produto={produto.data()} />


    </div>
  );


}


//Main
export default function ProductPage() {
  const [colorSelect, setColorSelect] = React.useState("0");
  const [sizeSelect, setSizeSelect] = React.useState("0");

  const classes = useStyles();

  return (
    <div className={classes.productPage}>

      <div className={classes.section}>

        <div className={classes.container}>

          <Detalhes classes={classes} />

        </div>

      </div>

      <Rodape />
    </div>
  );
}

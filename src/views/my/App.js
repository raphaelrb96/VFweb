import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { createMuiTheme } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import MeuAppBar from './MeuAppBar.js';
import Detalhes from './Detalhes.js';
import Carrossel from './Carrossel.js';
import Carteira from './Carteira.js';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Rodape from './Rodape.js';
import GanheDinheiro from './GanheDinheiro.js';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import {Helmet} from 'react-helmet';

const mainFeaturedPost = {
  title: 'Ganhe dinheiro com a Ocashop',
  description:
    "Faça parte do nosso grupo restrito e ganhe dinheiro sem sair de casa.",
  image: './money.png',
  imgText: 'Ganhe dinheiro',
  linkText: 'VAGAS LIMITADAS ...',
};


function Meio() {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const containerMeio = clsx(classes.container, classes.minibaner);

  return(
    <Container maxWidth="lg" className={containerMeio}>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center" spacing={2}>

            {/* Chart */}
            <Grid
              item
              lg={4}
              sm={6}
              xl={4}
              xs={12}>


              <Carteira class={classes} />

            </Grid>

            <Grid item lg={4}
              sm={6}
              xl={4}
              xs={12}>
              <Paper className={classes.baner}>
                <Carrossel/>
              </Paper>
            </Grid>
              <Grid item xl={12} lg={12} md={12} >
                <GanheDinheiro className={classes.ganhar} post={mainFeaturedPost} />
              </Grid>
          </Grid>
          
          
        </Container>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(2),
  },
  
  heroContent: {
    padding: theme.spacing(1.5, 0, 1.5),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '120px',
    paddingBottom: '20px'
  },
  cardMedia: {
    paddingTop: '26.25%',
    [theme.breakpoints.up('md')] : {
        minHeight: '220px',
    }, 
    [theme.breakpoints.up('sm')] : {
        minHeight: '170px',
    },
    [theme.breakpoints.down('sm')] : {
      minHeight: '120px'
    }
  },
  cardContent: {
    flexGrow: 1,
    maxHeight: '70px',
    [theme.breakpoints.down('sm')] : {
      marginBottom: '30px',
    },
    [theme.breakpoints.up('sm')] : {
      marginBottom: '20px',
    }
  },
  toolbar: {
    background: '#04705c'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    minWidth: '250px',
  },
  baner: {
    height: '100%',
    minWidth: '250px',
    marginTop: theme.spacing(1),
  },
  minibaner:{
    flex:1,
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    maxheight: 240,
  },
  abrirDetalhe: {
    textColor: '#3dbea7',
  },
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    background: '#3dbea7',
    height: 40,
    width: 40,
    marginTop: theme.spacing(1),
  },
  iconc: {
    background: '#3dbea7',
    height: 20,
    width: 20
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  pesquisaText: {
    color: '#3dbea7',
  },
  ganhar: {
    marginTop: '30px',
    minHeight: '200px',
    width: '100%',
  },
  espaco: {
    width: '50px',
  },
  possoAjudar: {
    marginBottom: '20px',
  },
  ajudaText: {
    color: '#04705c',
  },
}));


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let size = 0;
let lista = Array();
let isAnonimo = true;

function abrirDetalhe(i) {

  let produtoAtual = lista[i];
    let idProduto = produtoAtual.get('idProduto');
   const elemento = <Detalhes size={size} produtos={lista} isAnonimo={isAnonimo} index={i} />
   ReactDOM.render(elemento, document.getElementById('root'));
   let listaNova = Array();
   let foto = produtoAtual.get('imgCapa');
    let nome = produtoAtual.get('prodName');
    let valor = produtoAtual.get('prodValor');
    let descr = produtoAtual.get('descr');
    let valorAntigo = produtoAtual.get('valorAntigo');
   let objj = {
    "@context": "https://schema.org",
          "@type": "Product",
          "productID": idProduto,
          "name": nome,
          "description": descr,
          "url": window.location.href,
          "image": foto,
          "brand":"facebook",
          "offers": [
            {
            "@type":"Offer",
            "price":valor,
            "priceCurrency":"BRL",
            "itemCondition":"https://schema.org/NewCondition",
            "availability":"https://schema.org/InStock"
            }
          ]
   };
   listaNova.push(objj);
   window.fbq('track', 'Microdata', {"JSON-LD": listaNova});
   window.history.pushState("detalhes", "Detalhes", "/?prod=" + idProduto);
}

export default function App(props) {
  
  const classes = useStyles();

  size = props.size;
  lista = props.produtos;
  isAnonimo = props.isAnonimo;

  if (lista === null || lista === undefined) {
    console.log('lista null');
  } else {
    console.log('lista: ' + size + ' ..');
  }

  

  return (
    <React.Fragment>
      <Helmet>
         <title>
           Ocashop
         </title>
         <meta
            name="description"
            content="Loja online de variedades em Manaus"
          />
       </Helmet>
      <main>
        {/* Hero unit */}
        <Meio />
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {

              lista.map((card, i) => (

              <Grid item key={card} xs={6} sm={3} md={3}>
                <Card className={classes.card} onClick={() => abrirDetalhe(i)} >
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.get('imgCapa')}
                    title={card.get('prodName')}
                  />
                  <CardContent className={classes.cardContent}>
          
                    <p>
                       {card.get('prodName').substring(0, 40)}
                    </p>
                    
                  </CardContent>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

      

      </main>



      {/* Footer */}
      <Rodape />
      {/* End footer */}

    </React.Fragment>
  );

}
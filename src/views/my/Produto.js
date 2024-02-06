import React from 'react';
import AppBar from '@material-ui/core/AppBar';
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
import ProductPage from "views/ProductPage/ProductPage.js";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { CATEGORIA_LIST } from 'views/NovaInterface/Navegador';
import { Box, Button } from '@material-ui/core';
import { grayColor } from 'assets/jss/material-kit-pro-react';


const useStyles = makeStyles(theme => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      //marginBottom: '30px',
      height: '36px',
      fontSize: '12px',
      lineHeight: '12px',
    },
    [theme.breakpoints.up('sm')]: {
      //marginBottom: '20px',

    },
    [theme.breakpoints.up('xl')]: {
      //marginBottom: '20px',
    },
    height: '45px',
    fontSize: '15px',
    lineHeight: '15px',
    overflow: "hidden",
  },
  card: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    //minWidth: '120px',
    backgroundColor: 'white',
    cursor: 'pointer',
    alignItems: 'bottom',
    [theme.breakpoints.up('md')]: {
      width: '95%',
      marginBottom: '16px'
    },
  },
  cardMedia: {
    paddingTop: '26.25%',
    [theme.breakpoints.up('lg')]: {
      height: '400px',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '400px',
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: '320px'
    },
    [theme.breakpoints.up('xs')]: {
      minHeight: '240px',
    }
  },
  cardContent: {
    height: '100%',
    marginRight: '4px',
    marginLeft: '4px',
    marginTop: '6px',
    padding: '6px',
    marginBottom: '0px',
    flexDirection: 'column',

  },
  btnContainer: {
    [theme.breakpoints.down('xs')]: {
      //marginBottom: '30px',
      //display: 'none',
      height: '30px',

    },
    '&:hover': {
      backgroundColor: 'white'
    },
    marginTop: '14px',
    marginBottom: theme.spacing(1),
    color: grayColor[1]

  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

  }
}));

function abrirDetalhe(i, lista, hist) {

  let produtoAtual = lista[i];
  let idProduto = produtoAtual.get('idProduto');
  //const elemento = <Detalhes size={size} produtos={lista} isAnonimo={isAnonimo} index={i} />
  //ReactDOM.render(elemento, document.getElementById('root'));
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
}



export default function Produto(props) {

  const classes = useStyles();

  const { nome, capa, prod } = props;

  const title = nome.length > 40 ? String(nome).toUpperCase().substring(0, 40) + '...' : String(nome).toUpperCase();



  const idCategoria = prod.categorias ? Number(Object.getOwnPropertyNames(prod.categorias)[0]) : -1;
  const categ = idCategoria !== -1 ? CATEGORIA_LIST[idCategoria] : null;


  return (

    <Grid item xs={6} sm={6} md={4}>

      <Link className={classes.container} to={'/produto/?id=' + props.id} >
        <Card className={classes.card} >
          <CardMedia
            className={classes.cardMedia}
            image={capa}
            title={nome}
          />
          <Box className={classes.cardContent}>
            {
              categ ?
                <Typography variant="caption" gutterBottom>
                  <strong>
                    {categ}
                  </strong>
                </Typography>
                :
                null
            }

            <Typography variant='body2' className={classes.title}>
              {title}
            </Typography>
            <Button className={classes.btnContainer} variant='outlined' gutterBottom onClick={() => { }} fullWidth color="white">
              DETALHES
            </Button>

          </Box>

        </Card>

      </Link>

    </Grid>


  );

}
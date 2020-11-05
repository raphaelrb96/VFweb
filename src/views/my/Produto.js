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
import ProductPage from "views/ProductPage/ProductPage.js";
import {Redirect} from "react-router-dom";
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '120px',
    paddingBottom: '20px',
    cursor: 'pointer',
  },
  cardMedia: {
    paddingTop: '26.25%',
    [theme.breakpoints.up('md')] : {
        height: '320px',
    },
    [theme.breakpoints.down('sm')] : {
      height: '190px'
    }
  },
  cardContent: {
    flexGrow: 1,
    marginRight: '16px',
    marginLeft: '16px',
    [theme.breakpoints.down('sm')] : {
      marginBottom: '30px',
      height: '32px',
    },
    [theme.breakpoints.up('sm')] : {
      marginBottom: '20px',
      height: '20px',
    }
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
}



export default function Produto(props) {

	const classes = useStyles();


  let title = '';

  if (props.nome.length > 15) {
    title = props.nome.substring(0, 15) + ' ...';
  } else {
    title = props.nome;
  }

  return (

    <Grid item xs={6} sm={4} md={4}>

        <Link to={'/produto/?id=' + props.id} >
                <Card className={classes.card} >
                  <CardMedia
                    className={classes.cardMedia}
                    image={props.capa}
                    title={props.nome}
                  />
                  <div className={classes.cardContent}>
          
                    <h5>
                       {title}
                    </h5>
                    
                  </div>
                  
                </Card>

        </Link>
                
    </Grid>


  );

}
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import MeuTolbar from './MeuTolbar.js';
import CardMedia from '@material-ui/core/CardMedia';
import Rodape from './Rodape.js';
import {addToCart, mFirebase} from './index';
import {Helmet} from 'react-helmet';
import MetaTags from 'react-meta-tags';



let size = 0;
let lista = Array();
let isAnonimo = true;


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.grey,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(12, 1, 4),
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    minHeight: '250px'
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  bt: {
  	background: '#3dbea7',
  	cursor: 'pointer', '&:hover, &:focus, &:active': {
  		background: '#04705c'
  	},
  },
  prec: {
  	marginLeft: 'auto',
  	marginRight: 'auto',
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

function DescricaoProduto(props) {
  const classes = useStyles();
  return(
      <Grid item xs={12}>
        <Card>
                <CardHeader
                  title="Descrição"
                  titleTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <Typography component="h6" variant="h6" align="start" >
                    {props.descr}
                  </Typography>
                </CardContent>
        </Card>
      </Grid>
  );
}

function ImagemProduto(props){

	const classes = useStyles();

	return(

		<Grid item xs={12} sm={12} md={8}>
              <Card>
                <CardHeader
                  title="Foto"
                  titleTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardMedia
                    className={classes.cardMedia}
                    image={props.foto}
                    title="imagem"
                  />
              </Card>
            </Grid>

	);

} 

function Titulo(props) {
	const classes = useStyles();

	return(
		<Container maxWidth="sm" component="main" className={classes.heroContent}>
	        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
	          {props.nome}
	        </Typography>
	     </Container>
	);

}




function Preco(props) {

	const classes = useStyles();

	let mProduto = props.produto;

	let idP = mProduto.get('idProduto');

	let documento = {
		caminhoImg: mProduto.get('imgCapa'),
		idProdut: mProduto.get('idProduto'),
		labo: mProduto.get('fabricante'),
		produtoName: mProduto.get('prodName'),
		quantidade: 1,
		valorTotal: mProduto.get('prodValor'),
		valorUni: mProduto.get('prodValor')
	};

  let elemento = null;

  if (props.precoAntigo !== null && props.precoAntigo !== undefined && props.precoAntigo !== 0) {
    elemento = <s>
                    <Typography component="h5" variant="h5" align="center" >
                      {props.precoAntigo + ',00'}
                    </Typography>
                  </s>;
  }

	return(

		<Grid className={classes.prec} item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title="Preço"
                  titleTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  {elemento}
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {props.preco + ',00'}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button fullWidth color="primary" variant="contained" className={classes.bt} onClick={()=>{addToCart(documento, idP)}}>
                    Comprar
                  </Button>
                </CardActions>
              </Card>
            </Grid>

	);
}

export default function detalhe(props) {


	size = props.size;
    lista = props.produtos;
    isAnonimo = props.isAnonimo;

    let produtoAtual = lista[props.index];
    let foto = produtoAtual.get('imgCapa');
    let nome = produtoAtual.get('prodName');
    let valor = produtoAtual.get('prodValor');
    let descr = produtoAtual.get('descr');
    let idProduto = produtoAtual.get('idProduto');
    let valorAntigo = produtoAtual.get('valorAntigo');

    let listaIds = Array();
    listaIds.push(idProduto);
   				
  	window.fbq('track', 'ViewContent', {
        content_name: nome,
        content_category: 'produtos',
  	    value: valor,
  	    currency: 'BRL',
  	    content_ids: idProduto,
  	    content_type: 'product',
  	});  

    mFirebase.analytics().logEvent('view_item', {
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

  const schema = {
    
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


	return(

		 <Container>
       <Helmet>
         <title>
           {nome}
         </title>
         
         <script type="application/ld+json">{JSON.stringify(schema)}</script>
       </Helmet>
			 <MeuTolbar size={size} produtos={lista} isAnonimo={isAnonimo} />

			 <Titulo nome={nome} />

		     <Container maxWidth="md" component="main">
	        	<Grid container spacing={3} alignItems="flex-start">
	        		<ImagemProduto foto={foto} />
	        		<Preco preco={valor} produto={produtoAtual} precoAntigo={valorAntigo} />
              <DescricaoProduto descr={descr} />
	        	</Grid>
	         </Container>

	         <Rodape />
         </Container>

	);

}


import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from "components/CustomButtons/Button.js";
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
import Paper from '@material-ui/core/Paper';
import Pb from 'views/my/Pb';
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import classNames from "classnames";
import CardBody from "components/Card/CardBody.js";

// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";


import { revenderProduto } from "index.js";
import ContainerBusca from 'views/my/ContainerBusca';
import { getFirestore } from 'firebase/firestore';


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
  },
  cardMedia: {
    paddingTop: '26.25%',
    [theme.breakpoints.up('md')]: {
      minHeight: '300px',
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: '300px',
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '360px'
    }
  },
  cardContent: {
    flexGrow: 1,

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
  minibaner: {
    flex: 1,
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
}));

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


function Title(props) {
  return (
    <h3 style={{ color: '#060D51', textAlign: 'center' }} >
      <b>
        {props.children}
      </b>
    </h3>
  );
}


class ItemGridProduto extends React.Component {

  constructor(props) {
    super(props);
    let item = props.produto;
    this.state = {
      imgCapa: item.get('imgCapa'),
      prodName: item.get('prodName'),
      idProduto: item.get('idProduto'),
      comissao: item.get('comissao'),
      valorTotal: (item.get('prodValor')),
      item: item
    };
    this.revender = this.revender.bind(this);
    this.aumentar = this.aumentar.bind(this);
    this.diminuir = this.diminuir.bind(this);
  }


  revender() {

    let obj = {
      caminhoImg: this.state.imgCapa,
      idProdut: this.state.idProduto,
      labo: this.state.item.get('fabricante'),
      produtoName: this.state.prodName,
      quantidade: 1,
      valorTotal: this.state.item.get('prodValor'),
      valorUni: this.state.item.get('prodValor'),
      valorUniComComissao: this.state.valorTotal,
      valorTotalComComissao: this.state.valorTotal,
      comissaoUnidade: this.state.comissao,
      comissaoTotal: this.state.comissao
    };

    revenderProduto(obj, obj.idProdut);

  }

  aumentar() {
    if (this.state.comissao < 50) {
      let atualCom = this.state.comissao + 1;
      this.setState({
        comissao: atualCom,
        valorTotal: (this.state.item.get('prodValor') + atualCom)
      });
    }
  }

  diminuir() {
    if (this.state.comissao > 5) {
      let atualCom = this.state.comissao - 1;
      this.setState({
        comissao: atualCom,
        valorTotal: (this.state.item.get('prodValor') + atualCom)
      });
    }
  }

  render() {

    const classes = this.props.class;

    let nomeString = this.state.prodName;
    if (nomeString.length > 25) {
      nomeString = this.state.prodName.substring(0, 25) + '...'
    }

    return (
      <Grid item xs={12} sm={4} md={4}>
        <Card className={classes.card} >
          <CardMedia
            className={classes.cardMedia}
            image={this.state.imgCapa}
            title={this.state.prodName}
          />
          <CardContent className={classes.cardContent}>

            <Typography gutterBottom variant="h5" component="h2">
              R$ {this.state.comissao},00
            </Typography>

            <Typography>
              {nomeString}
            </Typography>
            <br />
            <Typography gutterBottom>
              <strong>
                Valor de venda: R$ {this.state.valorTotal},00
              </strong>
            </Typography>

            <Button onClick={() => (this.revender())} fullWidth color="verdin">
              REVENDER
            </Button>

          </CardContent>

        </Card>
      </Grid>
    );

  }

}

let textPesquisa = '';

let setTextPesquisa = valor => {
  textPesquisa = valor.target.value;
};

class ProdContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pb: true,
      produtos: [],
    }
  }


  handlerPesquisa(search) {

    if (search.length < 1) return;

    getFirestore().collection("produtos")
      .where('tag.' + search.toLowerCase(), '==', true)
      .where("disponivel", "==", true)
      .get()
      .then(querySnapshot => {

        let prods = querySnapshot.docs;
        //listaProdutosPrincipal = prods;
        let tamanho = querySnapshot.size;

        let promocoes = Array();

        this.setState({
          pb: false,
          produtos: prods,
        });


      }).catch(error => {
        console.log(error.message);
      });

    this.setState({
      pb: true
    });
  }


  componentDidMount() {
    if (this.state.produtos.length > 0) {
      return;
    }

    getFirestore()
      .collection("produtos")
      .where("disponivel", "==", true)
      .limit(100)
      .get()
      .then(querySnapshot => {

        let prods = querySnapshot.docs;
        //listaProdutosPrincipal = prods;
        let tamanho = querySnapshot.size;

        prods = misturar(prods);

        this.setState({
          pb: false,
          produtos: prods,
        });


      }).catch(error => {
        console.log(error.message);
      });
  }

  render() {

    const classes = this.props.class;
    let produtos = this.state.produtos;

    if (this.state.pb) {
      return (<Pb />);
    } else {
      return (

        <div>

          <br />

          <ContainerBusca pesquisar={this.handlerPesquisa} />

          <br />


          <Container className={classes.cardGrid} maxWidth="md">

            <Grid container spacing={2}>
              {produtos.map(item => (
                <ItemGridProduto class={classes} produto={item} />
              ))}
            </Grid>
          </Container>
        </div>
      );
    }

  }

}

export default function GridProdutosRevendas() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <br />
      <br />
      <ProdContainer class={classes} />
    </React.Fragment>
  );

}
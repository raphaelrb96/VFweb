/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import Header from "components/Header/Header.js";
import HeaderLinksCart from "views/my/HeaderLinksCart.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import ItemCarrinho from "views/my/ItemCarrinho.js";

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";
import cartnull from "assets/img/cartnull.png";

import Pb from 'views/my/Pb';
import {mFirebase, mUser, mUid} from 'index.js';



import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import {interfaceMain, abrirCheckput} from "index.js";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const useStyles = makeStyles(shoppingCartStyle);



class CarrinhoVazio extends React.Component {


  constructor(props) {
    super(props);

  }


  render() {


    return(

      <div>

        <h4 style={{marginTop: "40px", textAlign: "center"}} >Seu carrinho está vazio... </h4>

        <img style={{marginTop: "40px", marginRight: "auto", marginLeft: "auto", display: "block", width: "98%", maxWidth: "600px"}} src={require("assets/img/cartnull.png")} />

      </div>

    );


  }


}


class CartContent extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      valorTotal: 0,
      pb: true
    }

    this.carregarCart = this.carregarCart.bind(this);
  }

  carregarCart(usr) {

    console.log(mUid);

    const db = getFirestore();
    db.settings({timestampsInSnapshots: true});

    db.collection('carComprasActivy')
            .doc('usuario')
            .collection(usr.uid)
            .onSnapshot(querySnapshot => {


              if (querySnapshot === null || querySnapshot === undefined) {


                this.setState({
                    lista: [],
                    valorTotal: 0,
                    pb: false
                  });



              } else {

                let prodsCart = querySnapshot.docs;

                if (prodsCart.length === 0) {


                  this.setState({
                    lista: [],
                    valorTotal: 0,
                    pb: false
                  });

                  this.props.onTrigger(prodsCart);


                } else {

                  let somaTT = 0;

                  prodsCart.map(item => {
                    let precoTT = item.get('quantidade') * item.get('valorUni');
                    somaTT = somaTT + precoTT;
                  });

                  this.props.onTrigger(prodsCart);

                  this.setState({
                    lista: prodsCart,
                    valorTotal: somaTT,
                    pb: false
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
          
          this.carregarCart(user);

        }
      });
    } else {
      this.carregarCart(mUser);
    }
    

  }


  render() {

    let {lista, valorTotal, pb} = this.state;
    let classes = this.props.clas;

    if (pb) {

      return(<Pb />);


    } else {


      if (valorTotal === 0) {


        return( <CarrinhoVazio /> );


      } else {

        return(

          <div>

            <h3 style={{marginTop: "40px"}} className={classes.cardTitle}>Itens do carrinho</h3>

            {lista.map((item, i) => (
              <ItemCarrinho onChange={this.props.onTrigger} valUnidade={item.get('valorUni')} quantidade={item.get('quantidade')} nome={item.get('produtoName')} item={item} indice={i} list={lista} />
            ))}


            

          </div>

        );

      }

    }


  }


}

class CartContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    }
    this.mudarTotal = this.mudarTotal.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  mudarTotal(listaCart) {
    let somaTT = 0;

    listaCart.map(item => {
      let precoTT = item.get('quantidade') * item.get('valorUni');
      somaTT = somaTT + precoTT;
    });

    this.setState({
      total: somaTT
    });

  }

  checkout() {
    if(this.state.total > 0) {
      abrirCheckput(this.state.total);
    }
  }

  render() {

    let componentTotal = null;
    let classes = this.props.clas;

    if (this.state.total > 0) {
      componentTotal = <h4 style={{marginRight: "20px"}} >Total: <b> {this.state.total},00</b></h4>;
    }

    return(
      <div>
      
        <AppBar position="fixed" style={{
              top: 0,
              bottom: "auto",
              backgroundColor: "#060D51",
              paddingTop: "7px",
              paddingBottom: "7px",
            }} >
          <Toolbar>
            <IconButton onClick={() => (interfaceMain())} edge="start" color="inherit" aria-label="back">
              <ArrowBackIcon />
            </IconButton>
            
            
            <div style={{
                flexGrow: 1,
              }} />

            {componentTotal}
            <Button

              style={{
                backgroundColor: "#1A237E",
                color: "#fff",
                position: "relative",
                fontWeight: "400",
                fontSize: "12px",
                textTransform: "uppercase",
                lineHeight: "20px",
                textDecoration: "none",
                margin: "0px",
                display: "inline-flex",
              }}
              onClick={() => this.checkout()}
              color={window.innerWidth < 960 ? "white" : "white"}
              target="_blank"
              round>
              <CheckOutlinedIcon className={classes.icons} /> Comprar Agora
            </Button>
          </Toolbar>
        </AppBar>


        

        <div style={{marginTop: "100px"}} className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Card plain>
              <CardBody plain>


                <CartContent onTrigger={this.mudarTotal} clas={classes} />
                

                
                
              </CardBody>
            </Card>
          </div>
        </div>
        
      </div>
    );

  }

}

export default function ShoppingCartPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();

  return (
    <CartContainer clas={classes} />
  );
}

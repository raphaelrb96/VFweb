import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import Pb from 'views/my/Pb';
import {mFirebase, mUser, mUid, removerDaRevenda, atualizarProdutoRevenda, voltar, finalizarRevenda} from 'index.js';



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

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import pricingStyle from "assets/jss/material-kit-pro-react/views/pricingSections/pricingStyle.js";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const useStyles = makeStyles(pricingStyle);

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


class ItemRevenda extends React.Component {

	constructor(props) {
		super(props);
		let comTotal = props.comissao * props.quantidade;
		this.state = {
			comissaoUnidade: props.comissao,
			comissaoTotal: comTotal,
			quantidade: props.quantidade,
			valorTotalComComissao: props.totalComComissao,
			valorTotal: props.valorTotal
		};

		this.aumentar = this.aumentar.bind(this);
		this.diminuir = this.diminuir.bind(this);
		this.remover = this.remover.bind(this);

	}

	aumentar () {
		let item = this.props.item;
		let quant = item.get('quantidade') + 1;
		let vf = quant * item.get('valorUni');

		let totalComComissao = item.get('valorUniComComissao') * quant;
		let totalDaComissao = item.get('comissaoUnidade') * quant;

		let resposta = {
				caminhoImg: item.get('caminhoImg'),
				idProdut: item.get('idProdut'),
				labo: item.get('labo'),
				produtoName: item.get('produtoName'),
				quantidade: quant,
				valorTotal: vf,
				valorUni: item.get('valorUni'),
				valorUniComComissao: item.get('valorUniComComissao'),
				valorTotalComComissao: totalComComissao,
				comissaoUnidade: item.get('comissaoUnidade'),
				comissaoTotal: totalDaComissao
		};

		atualizarProdutoRevenda(resposta, this.props.item.get('idProdut'));
		this.setState({
			comissaoTotal: totalDaComissao,
			quantidade: quant,
			valorTotalComComissao: totalComComissao,
			valorTotal: vf
		});
	}

	diminuir () {

		if (this.props.item.get('quantidade') > 1) {

			let item = this.props.item;
			let quant = item.get('quantidade') - 1;
			let vf = quant * item.get('valorUni');

			let totalComComissao = item.get('valorUniComComissao') * quant;
			let totalDaComissao = item.get('comissaoUnidade') * quant;

			let resposta = {
				caminhoImg: item.get('caminhoImg'),
				idProdut: item.get('idProdut'),
				labo: item.get('labo'),
				produtoName: item.get('produtoName'),
				quantidade: quant,
				valorTotal: vf,
				valorUni: item.get('valorUni'),
				valorUniComComissao: item.get('valorUniComComissao'),
				valorTotalComComissao: totalComComissao,
				comissaoUnidade: item.get('comissaoUnidade'),
				comissaoTotal: totalDaComissao
			};

			atualizarProdutoRevenda(resposta, this.props.item.get('idProdut'));

			this.setState({
				comissaoTotal: totalDaComissao,
				quantidade: quant,
				valorTotalComComissao: totalComComissao,
				valorTotal: vf
			});

		}
	}

	remover () {
	  removerDaRevenda(this.props.item.get('idProdut'));
	}

	render() {

		let classes = this.props.classes;

		return(

			<GridItem style={{
				marginRight: '0px',
				marginLeft: '0px'
			}} md={4} sm={4}>
	          <Card raised pricing>
	            <CardBody pricing>
	              <h6
	              >
	                Item {this.props.position + 1}
	              </h6>
	              <img style={{
	              	height: '150px',
	              	width: '150px'
	              }} src={this.props.foto} />
	              <h1 >
	                <small>R$</small>{this.state.valorTotalComComissao},00
	              </h1>
	              <ul>
	                <li>
	                  {this.props.item.get('produtoName').substring(0, 30)}
	                </li>
	                <li>
	                  Quantidade: {this.state.quantidade}
	                </li>
	                <li>
	                  <b>R$ {this.state.comissaoTotal},00</b> de lucro
	                </li>
	                
	              </ul>
	              <div style={{marginTop: "25px"}} >
                        <Button
                          style={{marginRight: "20px"}}
                          color="verdin"
                          size="sm"
                          onClick={() => (this.diminuir())}
                          round
                        >
                          <Remove />
                        </Button>
                        
                        <Button
                          color="verdin"
                          size="sm"
                          onClick={() => (this.aumentar())}
                          round
                        >
                          <Add />
                        </Button>

                   </div>
                   <div style={{marginTop: "35px"}} >
                   	  <Button
                          onClick={() => (this.remover())}
                          style={{float: "center"}}
                          color="transparent"
                          size="sm"
                          round
                        >
                          Remover
                      </Button>
                   </div>
	            </CardBody>
	          </Card>
	        </GridItem>

		);


	}

}

class ListaRevenda extends React.Component {

	constructor(props) {
		super(props);
	    this.state = {
	      lista: [],
	      valorTotal: 0,
	      pb: true
	    }

	    this.carregarRevendas = this.carregarRevendas.bind(this);
	}

	carregarRevendas(usr) {
		const db = getFirestore();
	    db.settings({timestampsInSnapshots: true});

	    db.collection('listaRevendas')
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



		                } else {

		                  let somaTT = 0;

		                  prodsCart.map(item => {
		                    let precoTT = item.get('quantidade') * item.get('valorUniComComissao');
		                    somaTT = somaTT + precoTT;
		                  });


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
	          
	          this.carregarRevendas(user);

	        }
	      });
	    } else {
	      this.carregarRevendas(mUser);
	    }
	}

	render() {

		let classes = this.props.classes;
		let {lista, valorTotal, pb} = this.state;

		let componentTotal = null;
		let componentPrincipal = null;

		if (pb) {
			componentPrincipal = <Pb />
		} else {
			if (valorTotal === 0) {
				componentPrincipal = <CarrinhoVazio />
			} else {
				componentPrincipal = (
					lista.map((item, i) => (
		              <ItemRevenda comissao={item.get('comissaoUnidade')} totalComComissao={item.get('valorTotalComComissao')} valUnidade={item.get('valorUni')} quantidade={item.get('quantidade')} foto={item.get('caminhoImg')} nome={item.get('produtoName')} item={item} position={i} list={lista} />
		            ))
				);
			}
		}

	    if (this.state.valorTotal > 0) {
	      componentTotal = <h4 style={{marginRight: "20px"}} >Total: <b> {this.state.valorTotal},00</b></h4>;
	    }

		return(

			<div>
				<AppBar position="fixed" style={{
		              top: 0,
		              bottom: "auto",
		              backgroundColor: "#e00000",
		              paddingTop: "7px",
		              paddingBottom: "7px",
		            }} >
		          <Toolbar>
		            <IconButton onClick={() => {
		            	voltar();
		            }} edge="start" color="inherit" aria-label="back">
		              <ArrowBackIcon />
		            </IconButton>
		            
		            
		            <div style={{
		                flexGrow: 1,
		              }} />

		            {componentTotal}
		            <Button
		              onClick={() => {
		              	finalizarRevenda();
		              }}
		              style={{
		                backgroundColor: "#ff0000",
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
		              color={window.innerWidth < 960 ? "white" : "white"}
		              target="_blank"
		              round>
		              <CheckOutlinedIcon /> Concluir Venda
		            </Button>
		          </Toolbar>
		        </AppBar>

		        <div style={{marginTop: "40px"}} >
		          <div className={classes.pricingSection}>

		          	  <h3 style={{marginTop: "20px", marginBottom: "40px"}} className={classNames(classes.features, classes.textCenter, classes.cardTitle)}>Carrinho do Revendedor</h3>

				      <GridContainer style={{marginRight: "15px", marginLeft: "15px"}}>

				        {componentPrincipal}

				      </GridContainer>
				    </div>
		        </div>


			</div>

		);


	}

}


export default function CarrinhoRevendas(props) {

  const classes = useStyles();

  let valor = props.valor;

  return (
    <ListaRevenda classes={classes} />
  );
}
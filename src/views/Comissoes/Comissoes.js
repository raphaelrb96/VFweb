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
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
// @material-ui/core components
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";

import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import Pb from 'views/my/Pb';
import {mFirebase, mUser, mUid, removerDaRevenda, atualizarProdutoRevenda, abrirFormulario, voltar, finalizarRevenda, abrirLogin} from 'index.js';

import {
  title,
  main,
  mainRaised,
  mrAuto,
  mlAuto,
  container,
  description,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

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

import Container from '@material-ui/core/Container';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const useStyles2 = makeStyles({
  depositContext: {
    flex: 1,
  },
  
  btIndisp: {
    color: "gray",
  },
});

function Title(props) {
  return (
    <h3 style={{color: '#060D51'}} >
      <b>
      {props.children}
      </b>
    </h3>
  );
}

const useStyles = makeStyles(pricingStyle);

function getStatus(s) {

  if (s === 1) {
    return 'Confirmando';
  } else if (s === 2) {
    return 'Confirmada';
  } else if (s === 3) {
    return 'Cancelada';
  } else if (s === 4) {
    return 'Saiu pra entrega';
  } else if (s === 5) {
    return 'Concluida';
  } else {
    return 'Aguarde';
  }

}


function FinancaComissoes(props) {
  const classes = useStyles2();

  
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Typography component="p" variant="h4">
        R${props.total},00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {props.texto}
      </Typography>
      <div>
        <Link className={classes.btIndisp}>
        	Pagamento no sábado
        </Link>
      </div>
    </React.Fragment>
  );
}

class ItemComissaoVenda extends React.Component {

	constructor(props) {
		super(props);

	}


	render() {


		let daS = new Date(this.props.date);
     	let da = daS.toLocaleDateString() + ' às ' + daS.toLocaleTimeString();

		return(

			<GridItem style={{
				marginRight: '0px',
				marginLeft: '0px'
			}} md={3} sm={3}>
	          <Card raised pricing>
	            <CardBody pricing>
	              <h6
	              >
	                {da}
	              </h6>
	              <h2 >
	                <small>R$</small>{this.props.comissao},00
	              </h2>
	              <ul>

	              	<li>
	                  <b>{this.props.status}</b>
	                </li>

	                <li>
	                  {this.props.nome}
	                </li>
	                <li>
	                  {this.props.telefone}
	                </li>
	                
	                
	              </ul>
	              
	            </CardBody>
	          </Card>
	        </GridItem>

		);


	}

}

class ItemComissaoAfiliados extends React.Component {

	constructor(props) {
		super(props);
		

	}

	render() {

		let daS = new Date(this.props.date);
     	let da = daS.toLocaleDateString() + ' às ' + daS.toLocaleTimeString();

		return(

			<GridItem style={{
				marginRight: '0px',
				marginLeft: '0px'
			}} xs={12} md={4} sm={3}>
	          <Card raised pricing>
	            <CardBody pricing>
	              <h6
	              >
	                {da}
	              </h6>
	              <h2 >
	                <small>R$</small>{this.props.comissao},00
	              </h2>
	              <ul>

	              	<li>
	                  <b>{this.props.status}</b>
	                </li>
	                <li>
	                  {this.props.title}
	                </li>
	                <li>
	                  {this.props.descricao}
	                </li>
	               
	              </ul>
	              
	            </CardBody>
	          </Card>
	        </GridItem>

		);


	}

}


class ContentMain extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			usuario: null,
			minhasVendas: [],
			totalComissoesVendas: 0,
			comissoesAfiliados: [],
			totalComissoesAfilidados: 0,
	        totalAReceber: 0,
	        pb: true,
		};

		this.carregarComissoes = this.carregarComissoes.bind(this);
		this.verificarRegistro = this.verificarRegistro.bind(this);
		this.carregarComissoesAfiliados = this.carregarComissoesAfiliados.bind(this);

	}


	componentDidMount() {

	    

	    if (mUser === null || mUser === undefined || mUser.isAnonymous) {

	      getAuth().onAuthStateChanged(user => {
	        if (user) {
	          // User is signed in.

	          if (user.isAnonymous) {
	          	abrirLogin();
	          } else {
	          	this.verificarRegistro(user);
	          }
	          
	          

	        }
	      });

	    } else {
	    	if (mUser.isAnonymous) {
	    		abrirLogin();
	    	} else {
	    		this.verificarRegistro(mUser);
	    	}
	      

	    }
	    
	    
	}

	verificarRegistro(usr) {

		console.log('verificarRegistro');

		getFirestore()
	      .collection("Usuario")
	      .doc(usr.uid)
	      .get()
	      .then(doc => {
	        if (doc === null || doc === undefined) {
	          abrirFormulario();
	          console.log('abrirFormulario');
	        } else {

	        	if (doc.get('userName') === null || doc.get('userName') === undefined) {
	        		abrirFormulario();
	          		console.log('abrirFormulario');
	        	} else {

	        		if (doc.get('userName').length > 0) {
	        			console.log(doc.get('userName'));
	        			this.setState({
							usuario: doc
						});
	        			this.carregarComissoes(usr);
	        			console.log('carregarComissoes');
	        		} else {
	        			abrirFormulario();
	          			console.log('abrirFormulario');
	          			return;
	        		}

	        		
	        	}

	        	
	        }
	      });
	}

	carregarComissoes(usr) {
	    const db = getFirestore();
	      db.settings({timestampsInSnapshots: true});

	      db.collection('MinhasRevendas')
	              .doc('Usuario')
	              .collection(usr.uid)
	              .orderBy("hora", "desc")
	              .onSnapshot(querySnapshot => {


	                if (querySnapshot === null || querySnapshot === undefined) {


	                  this.setState({
							minhasVendas: [],
					        totalComissoesVendas: 0,
						});



	                } else {

	                  let prodsCart = querySnapshot.docs;

	                  if (prodsCart.length === 0) {


	                    this.setState({
							minhasVendas: [],
					        totalComissoesVendas: 0,
						});



	                  } else {

	                    let somaTT = 0;

	                    prodsCart.map(item => {
	                      if (item.get('statusCompra') === 5) {


	                      		if (item.get('pagamentoRecebido') === false) {

									let precoTT = item.get('comissaoTotal');
	                        		somaTT = somaTT + precoTT;

	                      		}

	                        
	                      }
	                    });

	                    let uv = prodsCart[0].get('hora');

	                    this.setState({
							minhasVendas: prodsCart,
					        totalComissoesVendas: somaTT,
						});

	                  }

	                }

	                this.carregarComissoesAfiliados(usr);

	              });
	}


	carregarComissoesAfiliados(usr) {

	  	const db = getFirestore();
	    db.settings({timestampsInSnapshots: true});


	  	let ref = db.collection('MinhasComissoesAfiliados').doc('Usuario').collection(usr.uid);

	  	ref.orderBy("hora", "desc").onSnapshot(querySnapshot => {

	  		if (querySnapshot === null || querySnapshot === undefined) {


	  			this.setState({
	  				pb: false
	  			});


	  		} else {

	  			let comissoesDeAfiliados = querySnapshot.docs;

	  			if (comissoesDeAfiliados.length === 0) {


	                    this.setState({
							pb: false
						});



	            } else {


	            	let somaComAfil = 0;

	            	comissoesDeAfiliados.map(item => {


	            		if (item.get('statusComissao') === 5) {


	                      		if (item.get('pagamentoRecebido') === false) {

									let precoTT = item.get('comissao');
	                        		somaComAfil = somaComAfil + precoTT;

	                      		}

	                        
	                      }


	            	});


	            	let tudo = somaComAfil + this.state.totalComissoesVendas;


	            	this.setState({
						pb: false,
						comissoesAfiliados: comissoesDeAfiliados,
						totalComissoesAfilidados: somaComAfil,
						totalAReceber: tudo
					});


	            }


	  		}

	  	});


	}

	render() {

		let {classes} = this.props;

		let listComissoesVendas = (


			this.state.minhasVendas.map((item, i) => (

			

				<ItemComissaoVenda comissao={item.get('comissaoTotal')} date={item.get('hora')} status={getStatus(item.get('statusCompra'))} nome={item.get('nomeCliente')} telefone={item.get('phoneCliente')} />

			))

		);

		let listComissoesAfiliados = (


			this.state.comissoesAfiliados.map((item, i) => (

				

				<ItemComissaoAfiliados comissao={item.get('comissao')} date={item.get('hora')} status={getStatus(item.get('statusComissao'))} descricao={item.get('descricao')} title={item.get('titulo')} />

			))

		);


		return(

			<div>

				<Container maxWidth="lg" style={{paddingTop: '10px', paddingBottom: '30px',}} >

					<Grid container spacing={3}>

							<Grid item xs={12} md={4} lg={4}>
				              <Paper style={{height: 280, padding: '20px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
				                <FinancaComissoes title="Total à receber" total={this.state.totalAReceber} texto="Tudo que você tem a receber juntando vendas e afiliados" />
				              </Paper>
				            </Grid>

				            <Grid item xs={12} md={4} lg={4}>
				              <Paper style={{height: 280, padding: '20px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
				                <FinancaComissoes title="Revendas" total={this.state.totalComissoesVendas} texto="Esse é o valor da sua comissão pelas revendas que você gerou na VendaFavorita" />
				              </Paper>
				            </Grid>

				            <Grid item xs={12} md={4} lg={4}>
				              <Paper style={{height: 280, padding: '20px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
				                <FinancaComissoes title="Afiliados" total={this.state.totalComissoesAfilidados} texto="Esse é o valor da sua comissão gerada pela sua rede de afiliados" />
				              </Paper>
				            </Grid>

					</Grid>
				</Container>

				<div style={{marginTop: "20px"}} >
			        <div className={classes.pricingSection}>

			          	<h3 style={{marginTop: "20px", marginBottom: "40px"}} className={classNames(classes.features, classes.textCenter, classes.cardTitle)}>Comissões de Revendas</h3>

					    <GridContainer style={{marginRight: "15px", marginLeft: "15px"}}>

					        {listComissoesVendas}

					    </GridContainer>
					</div>
			    </div>

			    <div style={{marginTop: "20px"}} >
			        <div className={classes.pricingSection}>

			          	<h3 style={{marginTop: "20px", marginBottom: "40px"}} className={classNames(classes.features, classes.textCenter, classes.cardTitle)}>Comissões de Afiliados</h3>

					    <GridContainer style={{marginRight: "15px", marginLeft: "15px"}}>

					        {listComissoesAfiliados}

					    </GridContainer>
					</div>
			    </div>

			</div>


			

		);


	}


}


export default function Comissoes(props) {

  const classes = useStyles();


  return <ContentMain classes={classes} />;
}
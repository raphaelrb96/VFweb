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
import CardAvatar from "components/Card/CardAvatar.js";
// @material-ui/core components
import Face from "@material-ui/icons/Face";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";

import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import Pb from 'views/my/Pb';
import InputAdornment from "@material-ui/core/InputAdornment";
import {mFirebase, mUser, mUid, removerDaRevenda, atualizarProdutoRevenda, abrirFormulario, voltar, finalizarRevenda, abrirLogin} from 'index.js';

import MiniPb from 'views/my/MiniPb';

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
import CustomInput from "components/CustomInput/CustomInput.js";
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

import {
	WhatsappShareButton,
	WhatsappIcon
} from 'react-share';
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

function verificarAfiliado (confirmado) {

	if (confirmado) {
		return 'Confirmado';
	} else {
		return 'Aguardando confirmação';
	}

}


class ItemAfiliado extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return(

			<GridItem style={{
				marginRight: '0px',
				marginLeft: '0px'
			}} xs={12} md={4} sm={3}>
	          <Card raised pricing>
	            <CardBody pricing>
	 
	              <CardAvatar 
	                  style={{
	                  	  marginTop: '30px',
	                  	  marginBottom: '30px',
	                      width: '80px',
	                      height: '80px'
	                  }} profile plain>
	                      <img src={this.props.img} />
	              </CardAvatar>

	              <h5>
	                {this.props.nome}
	              </h5>
	              <ul>

	              	<li>
	                  <b>{verificarAfiliado(this.props.admConfirmado)}</b>
	                </li>
	                <li>
	                  @{this.props.apelido}
	                </li>
	                <li>
	                  {this.props.numero}
	                </li>
	               
	              </ul>
	              
	            </CardBody>
	          </Card>
	        </GridItem>

		);


	}

}

let apelidoNovoUsuario = '';

let setApelido = valor => {
  apelidoNovoUsuario = valor.target.value;
};

class ContentAfiliados extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			usuario: null,
			meusAfiliados: [],
	        pb: true,
		};

		this.carregarAfiliados = this.carregarAfiliados.bind(this);
		this.verificarRegistro = this.verificarRegistro.bind(this);

		this.verificarNovoAfiliado = this.verificarNovoAfiliado.bind(this);
		this.registrarAfiliacao = this.registrarAfiliacao.bind(this);

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

	verificarNovoAfiliado() {


	  	if (this.state.usuario.get('userName') === apelidoNovoUsuario) {

	  		alert('Insira outro apelido');

	  	} else {

	  		this.setState({
		  		validandoAfiliado: true
		  	});

	  		getFirestore()
		      .collection("Usuario")
		      .where("userName", "==", apelidoNovoUsuario)
		      .get()
		      .then(querySnapshot => {

		      	if (querySnapshot === null || querySnapshot === undefined) {
		            alert('Nenhum usuario encontrado com esse apelido');
		            this.setState({
				  		validandoAfiliado: false
				  	});
		        } else {
		        	//usuario encontrado 
		        	if (querySnapshot.size > 0) {

		        		let userAtual = querySnapshot.docs[0];

		        		if (userAtual === undefined) {

		        			alert('Nenhum usuario encontrado com esse apelido');
			            	this.setState({
						  		validandoAfiliado: false
						  	});

		        		} else {

		        			if (userAtual.get('admConfirmado') === true) {

				            	alert('Esse usuario ja possui um adm');
				            	this.setState({
							  		validandoAfiliado: false
							  	});

				            } else {


				            	if (userAtual.get('usernameAdm') === undefined || userAtual.get('usernameAdm') === null || userAtual.get('usernameAdm').length === 0 || userAtual.get('usernameAdm') === '') {

									//let refUser = firebase.firestore().collection("Usuario").doc(userAtual.uid);
				            		this.registrarAfiliacao(userAtual.ref);

				            	} else {
				            		alert('Esse usuario ja possui uma solicitação');
				            		this.setState({
								  		validandoAfiliado: false
								  	});
				            	}

				            	
				            }
		        		}

			        } else {

			            //apelido nao existe
			            alert('Nenhum usuario encontrado com esse apelido');
			            this.setState({
						  		validandoAfiliado: false
						  	});

			        }
		        }
		      });

	  	}


	}

	registrarAfiliacao(ref) {

	  	  let objAdm = {
	  	  	uidAdm: this.state.usuario.get('uid'),
	  	  	usernameAdm: this.state.usuario.get('userName'),
	  	  	nomeAdm: this.state.usuario.get('nome'),
	  	  	pathFotoAdm: this.state.usuario.get('pathFoto')
	  	  };

	  	  ref.update(objAdm).then(() => {
	  	  		alert('Solicitação enviada com sucesso. Aguarde a confirmação');
	  	  		this.setState({
						  		validandoAfiliado: false
						  	});
	  	  })

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
	        			this.carregarAfiliados(usr);
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

	carregarAfiliados(usr) {
	    const db = firebase.firestore();
	      db.settings({timestampsInSnapshots: true});

	      db.collection('Usuario')
	              .where("uidAdm", "==", usr.uid)
	              .onSnapshot(querySnapshot => {


	                if (querySnapshot === null || querySnapshot === undefined) {


	                  this.setState({
							meusAfiliados: [],
					        pb: false
						});



	                } else {

	                  let prodsCart = querySnapshot.docs;

	                  if (prodsCart.length === 0) {


	                    this.setState({
							meusAfiliados: [],
					        pb: false
						});



	                  } else {

	                    this.setState({
							meusAfiliados: prodsCart,
					        pb: false
						});

	                  }

	                }


	              });
	}



	render() {

		let {classes} = this.props;


		let linkAtual = 'https://vendafavorita.web.app/';

			if (this.state.usuario !== null && this.state.usuario !== undefined) {
				linkAtual = 'https://vendafavorita.web.app/cadastro/?adm=' + this.state.usuario.get('userName');
			}


			let elemento = (
				<Button
					onClick={this.verificarNovoAfiliado}
					color="verde"
					block
					className={classes.subscribeButton}>
					    Cadastrar
			    </Button>
			);

			if (this.state.validandoAfiliado) {
				elemento = (
					<MiniPb />
				);
			}

		if (this.state.pb) {
				return(
					<Container maxWidth="lg" className={classes.container}>
			          <Grid container spacing={3}>
			          	<Pb />
			          </Grid>
			        </Container>
				);
			}

		let listaAfiliados = (


			this.state.meusAfiliados.map((item, i) => (

			

				<ItemAfiliado img={item.get('pathFoto')} nome={item.get('nome')} admConfirmado={item.get('admConfirmado')} apelido={item.get('userName')} numero={item.get('celular')} />

			))

		);



		return(

			<div>

				<div className={classes.container}>
					          <GridContainer>
					            <GridItem
					              xs={12}
					              sm={6}
					              md={6}
					              className={classNames(classes.mlAuto, classes.mrAuto)}
					            >
					              <div className={classes.textCenter}>
					              	<h1 className={classes.title}>Cadastro de Revendedores</h1>
					              	<br/>
					                <p className={classes.description}>
					                  Ganhe dinheiro sem trabalhar! Convide pessoas para VendaFavorita e ganhe comissões sempre que essas pessoas fizerem vendas.
					                </p>
					                <p className={classes.description}>
					                	Insira abaixo o apelido do usuario que você quer cadastrar na sua rede !
					                </p>
					              </div>
					              <Card raised className={classes.card}>
					                <CardBody className={classes.cardBody}>
					                  <form>
					                    <GridContainer>
					                      <GridItem xs={12} sm={6} md={6} lg={8}>
					                        <CustomInput
					                          id="emailPreFooter"
					                          formControlProps={{
					                            fullWidth: true,
					                            className: classes.cardForm
					                          }}
					                          inputProps={{
					                            startAdornment: (
					                              <InputAdornment position="start">
					                                <Face />
					                              </InputAdornment>
					                            ),
					                            placeholder: "Insira o apelido aqui...",
					                            onChange: (setApelido)
					                          }}
					                        />
					                      </GridItem>
					                      <GridItem style={{maxHeight: '70px'}} xs={12} sm={6} md={6} lg={4}>
					                        {elemento}
					                      </GridItem>
					                     
					                    </GridContainer>
					                  </form>
					                </CardBody>
					              </Card>

					              <div style={{marginTop: '45px'}} className={classes.textCenter}>

					              	<h5>Compartilhar link de Recrutamento</h5>
					              	
					              </div>

					              <div style={{marginTop: '25px'}} className={classes.textCenter}>

									<WhatsappShareButton url={linkAtual} title="" separator="" >
					              		<WhatsappIcon size={32} round/>
					              	</WhatsappShareButton>

					              </div>

					            </GridItem>
					          </GridContainer>
					        </div>


				<div style={{marginTop: "20px"}} >
			        <div className={classes.pricingSection}>

			          	<h3 style={{marginTop: "40px", marginBottom: "70px"}} className={classNames(classes.features, classes.textCenter, classes.cardTitle)}>Meus Afiliados</h3>

					    <GridContainer style={{marginRight: "15px", marginLeft: "15px"}}>

					        {listaAfiliados}

					    </GridContainer>
					</div>
			    </div>

			

			</div>


			

		);


	}


}


export default function MeusAfiliados(props) {

  const classes = useStyles();


  return <ContentAfiliados classes={classes} />;
}
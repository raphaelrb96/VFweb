/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import CardBody from "components/Card/CardBody.js";
import Container from '@material-ui/core/Container';
import CustomInput from "components/CustomInput/CustomInput.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-pro-react/views/ecommerceStyle.js";


import {mUser, isRevendedor, mUid, mApelido, mPathFoto, mCelular, mNome} from 'index.js';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 280,
  },
  containerMain: {
    ...container,
    zIndex: "2"
  },
  main,
  mainRaised,
  mrAuto,
  mlAuto,
  textCenter: {
    textAlign: "center !important"
  },
  brand: {
    "& h1, & h4": {
      color: whiteColor
    }
  }
}));


class ContainerAdicionarAfiliado extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			pb: true,
			apelidoAfiliado: '',
			meuUid: '',
			meuApelido: '',
			meuNome: '',
			minhaFoto: '',
		}

		this.setApelido = this.setApelido.bind(this);
		this.adicionar = this.adicionar.bind(this);
		this.verificarUsuario = this.verificarUsuario.bind(this);
		this.verificarApelido = this.verificarApelido.bind(this);

	}


	setApelido(valor) {
		this.setState({
			apelidoAfiliado: valor.target.value
		}); 
	}


	verificarUsuario() {

		if (mApelido.length > 0 && mCelular.length > 0) {

			this.verificarApelido();

			return;

		}


		firebase.firestore()
	      .collection("Usuario")
	      .doc(mUid)
	      .onSnapshot(doc => {
	        
	        if (doc === null || doc === undefined) {
	          //cadastrar Usuario
	        } else {

	          mApelido = doc.get('userName');
	          mPathFoto = doc.get('pathFoto');
	          mCelular = doc.get('celular');


	        }
	      });

	}


	verificarApelido() {

		firebase.firestore()
	      .collection("Usuario")
	      .where('userName', '==', this.state.apelidoAfiliado)
	      .then(querySnapshot => {
	      	let doc = querySnapshot.docs[0];
	      	if (doc === null || doc === undefined) {
	          //usuario nao existe
	        } else {

	        	let uidAtual = doc.get('uid');

	          if (uidAtual === mUid) {

	          	//proprio uid do usuario

	          } else {
	          	//o usuario existe


	          	if (doc.get('admConfirmado') === true) {

	          		//o usuario ja possui um adm

	          	} else {

	          		//tudo certo para cadastro
	          		this.adicionar(mUid, mApelido, mPathFoto, mNome, doc.ref);

	          	}

	          	


	          }


	        }
	      });


	}


	adicionar(uid, username, path, nome, referencia) {

		referencia.update({
			uidAdm: uid,
			usernameAdm: username,
			nomeAdm: nome,
			pathFotoAdm: path
		}).then(() => {
			//cadastro concluido, falta o revendedor aceitar
		})


	}


	render() {


		return(


			<div>
				
				<GridContainer>

	              <GridItem
	                xs={12}
	                sm={12}
	                md={10}
	                className={classNames(classes.mlAuto, classes.mrAuto)}>

	                

	                <Card raised className={classes.card}>
	                  <CardBody className={classes.cardBody}>
	                    <form>
	                      <GridContainer>
	                        <GridItem xs={12} sm={6} md={6} lg={8}>
	                          <CustomInput
	                            formControlProps={{
	                              fullWidth: true,
	                            }}
	                            inputProps={{
	                              startAdornment: (
	                                <InputAdornment position="start">
	                                  <SearchSharpIcon />
	                                </InputAdornment>
	                              ),
	                              placeholder: "Insira o apelido do revendedor...",
	                              onChange: (this.setApelido)
	                            }}
	                          />
	                        </GridItem>
	                        <GridItem xs={12} sm={6} md={6} lg={4}>
	                          <Button
	                            style={{
	                              marginTop: "20px"
	                            }}
	                            color="verdin"
	                            block
	                            onClick={() => (
	                              this.handlerPesquisa(textPesquisa)
	                            )}
	                          >
	                            Adicionar
	                          </Button>
	                        </GridItem>
	                      </GridContainer>
	                    </form>
	                  </CardBody>
	                </Card>

	              </GridItem>

	          </GridContainer>


			</div>


		);


	}


}

export default function ContainerAfiliacao () {

	const classes = useStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

}
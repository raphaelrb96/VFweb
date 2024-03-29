import React, { useEffect, useState } from "react";
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

import { Button as MyButton } from "@material-ui/core";

import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import Pb from 'views/my/Pb';
import InputAdornment from "@material-ui/core/InputAdornment";
import { mFirebase, mUser, mUid, removerDaRevenda, atualizarProdutoRevenda, abrirFormulario, voltar, finalizarRevenda, abrirLogin } from 'index.js';

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

import { collection, doc, getDoc, getDocs, getFirestore, limit, query, updateDoc, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Box, ButtonBase } from "@material-ui/core";


const firebaseConfig = {
	apiKey: "AIzaSyAtMQ-oTpBa3YNeLf8DTRYdKWDQxMXFuvE",
	authDomain: "venda-favorita.firebaseapp.com",
	databaseURL: "https://venda-favorita.firebaseio.com",
	projectId: "venda-favorita",
	storageBucket: "venda-favorita.appspot.com",
	messagingSenderId: "978500802251",
	appId: "1:978500802251:web:1aad0e093739f59969ed4e",
	measurementId: "G-EK2ZQP9BKK"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




const useStyles = makeStyles(theme => ({
	//...pricingStyle,
	containerItem: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center'
	},
	textCenter: {
		textAlign: "center"
	},
	contentCenter: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},
	container: {
		paddingTop: theme.spacing(12)
	},
	avatar: {
		width: 60,
		height: 60,
		marginTop: theme.spacing(3)
	},
	btnWhats: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '16px'
	},
	txtBtn: {
		paddingLeft: '10px',
		paddingRight: '8px',
		color: '#fff'
	},
	containerBtn: {

	}
}));


class ItemAfiliado extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (

			<GridItem style={{
				marginRight: '0px',
				marginLeft: '0px'
			}} xs={12} md={6} lg={4} sm={6}>
				<Card pricing>
					<Box className={this.props.classes.containerItem} pricing>

						<Avatar className={this.props.classes.avatar}>
							{this.props.nome.substring(0, 2)}
						</Avatar>

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

					</Box>
				</Card>
			</GridItem>

		);


	}

}



const verificarAfiliado = (confirmado) => {

	if (confirmado) {
		return 'Confirmado';
	} else {
		return 'Aguardando confirmação';
	}

};

const carregarAfiliados = async (usr) => {


	const q = query(collection(db, 'Usuario'), where("uidAdm", "==", usr.uid));
	const querySnapshot = await getDocs(q);

	if (!querySnapshot) {

		return null;
	}

	const qDocs = querySnapshot.docs;

	if (!qDocs) {

		return null;
	}

	let list = [];

	qDocs.forEach(item => {
		const data = item.data();
		list.push(data);
	});

	return list;

};

const verificarRegistro = async (usr) => {

	const refDocUsuario = doc(db, 'Usuario', usr.uid);
	const docSnap = await getDoc(refDocUsuario);
	const docUsuario = docSnap.exists() ? docSnap.data() : null;

	if (docUsuario.userName === null || docUsuario.userName === undefined) {
		return null;
	} else {
		if (docUsuario.userName.length > 0) {
		} else {
			return null;
		}
	}

	return docUsuario;
};



function ContainerTopo({ classes, state, setState }) {

	const apelidoNovoUsuario = String(state.apelidoNovoUsuario).toLowerCase();


	const buscarUsuarioPorApelido = async (apelidoNovoUsuario) => {
		const q = query(collection(db, 'Usuario'), where("userName", "==", apelidoNovoUsuario), limit(400));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot) return null;

		const qDocs = querySnapshot.docs;
		if (!qDocs) return null;

		if (querySnapshot.size > 0) {

			return querySnapshot.docs[0];
		} else {
			return null;
		}

	};

	const registrarAfiliacao = (ref) => {
		let objAdm = {
			uidAdm: state.usuario.uid,
			usernameAdm: state.usuario.userName,
			nomeAdm: state.usuario.nome,
			pathFotoAdm: state.usuario.pathFoto
		};

		updateDoc(ref, objAdm).then(() => {
			alert('Solicitação enviada com sucesso. Aguarde a confirmação');
			setState((prevState) => ({
				...prevState,
				validandoAfiliado: false
			}));
			window.location.reload();
		});
	};

	const verificarNovoAfiliado = async () => {

		if (apelidoNovoUsuario === '') {
			alert('Insira um apelido');
			return;
		}


		if (state.usuario.userName === apelidoNovoUsuario) {

			alert('Insira outro apelido');

		} else {


			setState((prevState) => ({
				...prevState,
				validandoAfiliado: true
			}));

			const resultUser = await buscarUsuarioPorApelido(apelidoNovoUsuario);


			if (!resultUser) {

				alert('Nenhum usuario encontrado com esse apelido');

				setState((prevState) => ({
					...prevState,
					validandoAfiliado: false
				}));

			} else {

				const userAtual = resultUser.data();

				if (userAtual.admConfirmado) {

					alert('Esse usuario ja possui um adm');
					setState((prevState) => ({
						...prevState,
						validandoAfiliado: false
					}));

				} else {

					if (userAtual.usernameAdm === undefined || userAtual.usernameAdm === null || userAtual.usernameAdm.length === 0 || userAtual.usernameAdm === '') {

						registrarAfiliacao(resultUser.ref);

					} else {

						alert('Esse usuario ja possui uma solicitação');
						setState((prevState) => ({
							...prevState,
							validandoAfiliado: false
						}));

					}

				}
			}

		}


	};

	const copiarLink = () => {
		navigator.clipboard.writeText(linkAtual);
		alert('Link Copiado');
	};

	const setApelido = (e) => {
		if (!e.target.value) return;
		e.persist();
		setState((prevState) => ({
			...prevState,
			apelidoNovoUsuario: e?.target?.value
		}));
	};

	let elemento = (
		<Button
			onClick={verificarNovoAfiliado}
			color="verdin"
			type="submit"
			block
			className={classes.subscribeButton}>
			Cadastrar
		</Button>
	);

	if (state.validandoAfiliado) {
		elemento = (
			<MiniPb />
		);
	}


	let linkAtual = 'https://vendafavorita.web.app/';

	if (state.usuario !== null && state.usuario !== undefined) {
		linkAtual = 'https://vendafavorita.web.app/cadastro/?adm=' + state.usuario.userName;
	}


	return (
		<Container className={classes.container}>
			<GridContainer container>
				<Grid item
					xs={10}
					md={8}
					className={classNames(classes.mlAuto, classes.mrAuto)}>

					<div className={classes.textCenter}>
						<Typography variant="h4" className={classes.title}>
							Cadastro de Revendedores
						</Typography>
						<br />
						<Typography variant="p" className={classes.description}>
							Ganhe dinheiro sem trabalhar! Convide pessoas para VendaFavorita e ganhe comissões sempre que essas pessoas fizerem vendas.
						</Typography>
						<Typography variant="p" className={classes.description}>
							Insira abaixo o apelido do usuario que você quer cadastrar na sua rede !
						</Typography>
					</div>

					<Card className={classes.card}>
						<CardBody className={classes.cardBody}>
							<form onSubmit={() => verificarNovoAfiliado()}>
								<GridContainer>
									<GridItem xs={12} sm={6} md={6} lg={8}>
										<CustomInput
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
												onChange: setApelido,
												defaultValue: state.apelidoNovoUsuario
											}}
										/>
									</GridItem>
									<GridItem style={{ maxHeight: '70px' }} xs={12} sm={6} md={6} lg={4}>
										{elemento}
									</GridItem>

								</GridContainer>
							</form>
						</CardBody>
					</Card>

					<div style={{ marginTop: '45px' }} className={classes.textCenter}>

						<Typography variant="subtitle1">Compartilhar link de Recrutamento</Typography>

					</div>

					<Box style={{ marginTop: '25px', flexDirection: 'column' }} className={classNames(classes.textCenter, classes.contentCenter)}>

						<WhatsappShareButton url={linkAtual} className={classes.btnWhats} style={{ backgroundColor: '#25d366', padding: 10, borderRadius: 16 }} title="" separator="" >
							<WhatsappIcon size={32} round />
							<Typography className={classes.txtBtn}>ENVIAR  LINK</Typography>
						</WhatsappShareButton>

						<MyButton onClick={() => copiarLink()} color="#1A237E" variant="text">
							COPIAR  LINK
						</MyButton>

					</Box>

				</Grid>
			</GridContainer>
		</Container>
	);
};


function ContentAfiliados({ classes, state, setState }) {


	if (state.pb) {
		return (
			<Container maxWidth="lg" className={classes.container}>
				<Grid container spacing={3}>
					<Pb />
				</Grid>
			</Container>
		);
	}

	return (

		<div>

			<ContainerTopo state={state} setState={setState} classes={classes} />

			{
				state.meusAfiliados.length > 0
					?
					<Box className={classes.pricingSection}>

						<Typography variant="h6" style={{ marginTop: "70px", marginBottom: "30px" }} className={classNames(classes.features, classes.textCenter, classes.cardTitle)}>
							Meus Afiliados
						</Typography>

						<GridContainer style={{ marginRight: "5px", marginLeft: "5px" }}>

							{state.meusAfiliados.map((item, i) => (

								<ItemAfiliado img={item.pathFoto} nome={item.nome} admConfirmado={item.admConfirmado} apelido={item.userName} numero={item.celular} classes={classes} />

							))}

						</GridContainer>
					</Box>
					:
					null
			}





		</div>
	);

};


export default function MeusAfiliados(props) {

	const classes = useStyles();

	const [state, setState] = useState({
		usuario: null,
		meusAfiliados: [],
		pb: true,
		apelidoNovoUsuario: ''
	});

	console.log(state.apelidoNovoUsuario)

	useEffect(() => {
		window.scrollTo(0, 0);
		getAuth().onAuthStateChanged(async usr => {
			if (usr) {

				if (usr.isAnonymous) {
					abrirLogin();
				} else {

					const docUsuario = await verificarRegistro(usr);

					if (!docUsuario) {
						abrirFormulario();
						return;
					}

					const meusAfiliados = await carregarAfiliados(usr);
					console.log(meusAfiliados)
					const data = meusAfiliados ? meusAfiliados : [];

					setState((prevState) => ({
						...prevState,
						meusAfiliados: data,
						pb: false,
						usuario: docUsuario
					}));

				}

			} else {
				abrirLogin();
			}

		});
	}, []);


	return <ContentAfiliados classes={classes} state={state} setState={setState} />;
};
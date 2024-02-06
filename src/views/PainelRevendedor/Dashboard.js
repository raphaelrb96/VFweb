/*eslint-disable*/
import React, { useEffect, useState } from "react";
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
// sections for this page
import HeaderLinksRevenda from "components/Header/HeaderLinksRevenda.js";
import Box from '@material-ui/core/Box';

// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import Mail from "@material-ui/icons/Mail";
import Face from "@material-ui/icons/Face";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import Pb from 'views/my/Pb';
import MiniPb from 'views/my/MiniPb';
import Rodape from 'views/my/Rodape';

import {
	WhatsappShareButton,
	WhatsappIcon
} from 'react-share';

import GridProdutosRevendas from 'views/PainelRevendedor/GridProdutosRevendas.js';
import MiniCarteira from 'views/PainelRevendedor/MiniCarteira.js';
import UltimasVendas from 'views/PainelRevendedor/UltimasVendas.js';
import ComissoesAfiliados from 'views/PainelRevendedor/ComissoesAfiliados';
import CrachaRevendedor from 'views/PainelRevendedor/CrachaRevendedor';

import { mFirebase, listaProdutosPrincipal, abrirFormulario } from 'index.js';
import { mUser, isRevendedor, mUid, mUsuarioRegistrado, abrirLogin, abrirListaRevenda } from 'index.js';


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


import styles from "assets/jss/material-kit-pro-react/views/ecommerceStyle.js";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { SubHead } from "views/ProductPage/SubHead";

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
		paddingTop: theme.spacing(1),
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

/*
class DashContentOff extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			revendas: [],
			totalAReceber: 0,
			pb: true,
			ultimaVenda: 0,
			comissaoAfilidados: 0,
			comissoes: [],
			usuario: null,
			validandoAfiliado: false
		};

		this.carregarComissoes = this.carregarComissoes.bind(this);
		this.verificarRegistro = this.verificarRegistro.bind(this);
		this.carregarComissoesAfiliados = this.carregarComissoesAfiliados.bind(this);
		this.verificarNovoAfiliado = this.verificarNovoAfiliado.bind(this);
		this.registrarAfiliacao = this.registrarAfiliacao.bind(this);
		this.copiarLink = this.copiarLink.bind(this);

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
							this.carregarComissoes(usr);
							console.log('carregarComissoes');
						} else {
							abrirFormulario();
							console.log('abrirFormulario');
						}


					}

					this.setState({
						usuario: doc
					});


				}
			});
	}

	carregarComissoes(usr) {
		const db = getFirestore();
		db.settings({ timestampsInSnapshots: true });

		db.collection('MinhasRevendas')
			.doc('Usuario')
			.collection(usr.uid)
			.orderBy("hora", "desc")
			.onSnapshot(querySnapshot => {


				if (querySnapshot === null || querySnapshot === undefined) {


					this.setState({
						revendas: [],
						totalAReceber: 0,
						ultimaVenda: 0
					});



				} else {

					let prodsCart = querySnapshot.docs;

					if (prodsCart.length === 0) {


						this.setState({
							revendas: [],
							totalAReceber: 0,
							ultimaVenda: 0
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
							revendas: prodsCart,
							totalAReceber: somaTT,
							ultimaVenda: uv
						});

					}

				}

				this.carregarComissoesAfiliados(usr);

			});
	}


	carregarComissoesAfiliados(usr) {

		const db = getFirestore();
		db.settings({ timestampsInSnapshots: true });


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


					let tudo = somaComAfil + this.state.totalAReceber;


					this.setState({
						pb: false,
						comissoes: comissoesDeAfiliados,
						comissaoAfilidados: somaComAfil,
						totalAReceber: tudo
					});


				}


			}

		});


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

	copiarLink() {

		let linkAtual = 'https://vendafavorita.web.app/cadastro/?adm=' + this.state.usuario.get('userName');
		let title = 'Convite do @' + this.state.usuario.get('userName');
		let texto = ''

		navigator.clipboard.writeText(linkAtual);

		if (navigator.share !== undefined) {
			navigator.share({
				title: title,
				text: texto,
				url: linkAtual
			}).then(() => {

			});
			console.log('Compartilhar');
		}

		//alert('Link copiado');

	}

	render() {

		const classes = this.props.class;

		const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
			return (
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Pb />
					</Grid>
				</Container>
			);
		}

		return (

			<Container maxWidth="lg" className={classes.container}>
				<Grid container spacing={3}>

					<Grid item xs={12}>
						<GridProdutosRevendas />
					</Grid>
				</Grid>
			</Container>

		);

	}

}
*/

let apelidoNovoUsuario = '';

let setApelido = valor => {
	apelidoNovoUsuario = valor.target.value;
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

const getFeedDocument = async () => {
	const refDoc = doc(db, 'Feed', 'Main');
	const docSnap = await getDoc(refDoc);
	const docData = docSnap.exists() ? docSnap.data() : null;
	return docData;
};

function DashContent({ state, setState, classes }) {


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

		<Container maxWidth="lg" className={classes.container}>

			<Grid container spacing={3}>

				<Grid item xs={12}>
					<SubHead
						title="INFORMAÇÕES"
					/>
					<GridProdutosRevendas state={state} setState={setState} />
				</Grid>
			</Grid>
		</Container>

	);
};

export default function Dashboard() {


	const [state, setState] = useState({
		usuario: null,
		feed: null,
		pb: true,
		revendas: [],
		totalAReceber: 0,
		ultimaVenda: 0,
		comissaoAfilidados: 0,
		comissoes: [],
		validandoAfiliado: false,
		apelidoNovoUsuario: ''
	});

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

					const docFeed = await getFeedDocument();

					setState((prevState) => ({
						...prevState,
						usuario: docUsuario,
						feed: docFeed,
						pb: false
					}));
				}

			} else {
				abrirLogin();
			}

		});
	}, []);

	const classes = useStyles();

	//const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


	const cabecalho = (
		<div className={classes.textCenter}>
			<br />
			<h1 className={classes.title}>Venda Favorita</h1>

			<Button
				onClick={() => {
					abrirListaRevenda();
				}}
				style={{
					backgroundColor: "#1A237E",
					color: "#fff",
					position: "relative",
					fontWeight: "400",
					fontSize: "12px",
					textTransform: "uppercase",
					lineHeight: "20px",
					textDecoration: "none",
					marginTop: "20px",
					marginBottom: "20px",
					display: "inline-flex",
				}}
				color={window.innerWidth < 960 ? "white" : "white"}
				target="_blank"
				round>
				<CheckOutlinedIcon /> Carrinho do Revendedor
			</Button>

		</div>
	);

	return (

		<div>

			<DashContent classes={classes} state={state} setState={setState} />
			<Rodape />

		</div>

	);

}
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import Pb from 'views/my/Pb';
import { mFirebase, mUser, mUid, removerDaRevenda, atualizarProdutoRevenda, voltar, interfaceMain, finalizarRevenda } from 'index.js';

import Rodape from 'views/my/Rodape';

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
import { limparCart } from "index";
import { upperString } from "util/FormatString";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, List, ListItem, ListItemText, MenuItem, TextField, ThemeProvider, createTheme } from "@material-ui/core";
import { collection, doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { grayColor } from "assets/jss/material-kit-pro-react";
import { SubHead } from "views/ProductPage/SubHead";
import { getListEntrega } from "util/Listas";
import { getListaGarantia } from "util/Listas";
import { getListPagamentos } from "util/Listas";
import { getListParcelamento } from "util/Listas";


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
	...pricingStyle,
	toolbar: {
		top: 0,
		backgroundColor: "#060D51",
	},
	toolbarButton: {
		backgroundColor: "#1A237E",
		color: "#fff",
		position: "relative",
		fontWeight: "400",
		fontSize: "12px",
		textTransform: "uppercase",
		lineHeight: "20px",
		textDecoration: "none",
		margin: "0px",
		display: "none",
	},
	gridContainerMain: {
		marginRight: "15px",
		marginLeft: "15px",
	},
	containerItemPedido: {
		backgroundColor: 'red',
		display: 'flex',
		flex: 1,
		width: '100%'
	},
	cardResumo: {
		height: 'auto',
		width: '100%',
		borderRadius: 16,
		marginTop: 0
	},
	containerCardResumo: {
		padding: 0,
		margin: 0,
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(1),
		[theme.breakpoints.down("sm")]: {
			paddingLeft: theme.spacing(0),
			paddingRight: theme.spacing(0),
		}
	},
	cardResumoContent: {
		height: 'auto',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(4),
		paddingTop: theme.spacing(3),
		justifyContent: 'center'
	},
	pricingSection: {
		...pricingStyle.pricingSection,
		marginTop: 0,
		paddingTop: 0,
		marginBottom: 0,
		paddingBottom: 0
	},
	contentItemProd: {
		textAlign: 'start',
		alignItems: 'center',
	},
	gridItemMain: {
		paddingRight: '10px',
		paddingLeft: '10px',
		borderRadius: 16,
		marginBottom: 12,
		marginTop: 0
	},
	gridContentItemProd: {
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(1),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		[theme.breakpoints.up("sm")]: {
			paddingTop: theme.spacing(3),
			paddingRight: theme.spacing(3),
		}
	},
	gridImagemItemProd: {
		paddingTop: theme.spacing(2),
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		paddingBottom: theme.spacing(2),
		maxHeight: '300px',
		[theme.breakpoints.down("sm")]: {
			maxHeight: '300px'
		}
	},
	valorUnd: {
		fontFamily: `"Roboto Slab", "Times New Roman", serif`,
		color: grayColor[1],
		fontWeight: "500",
	},
	gridValorItemProd: {
		paddingTop: theme.spacing(2),
	},
	quantidadeText: {
		marginTop: theme.spacing(1),
		fontFamily: `"Roboto Slab", "Times New Roman", serif`,
		color: grayColor[1],
		fontSize: '12px'
	},
	spacingBtnQuantidade: {
		width: theme.spacing(2)
	},
	btnQuantidade: {
		borderRadius: 16
	},
	containerBtnQuantidade: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	cardGarantia: {
		minHeight: '120px',
		borderRadius: 16,
		marginTop: 0
	},
	cardGarantiaContent: {
		paddingTop: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	cardEntrega: {
		minHeight: '120px',
		borderRadius: 16,
		marginTop: 0
	},
	cardEntregaContent: {
		paddingTop: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	containerCardEntrega: {
		marginTop: 0,
		[theme.breakpoints.up("sm")]: {
			paddingRight: theme.spacing(1.5)
		}
	},
	containerCardGarantia: {
		marginTop: 0,
		[theme.breakpoints.up("sm")]: {
			paddingLeft: theme.spacing(1.5)
		}
	},
	cardVazio: {
		borderRadius: 16,
		marginTop: 0
	},
	selectEntrega: {
		width: '100%',
		backgroundColor: 'white',
		marginTop: theme.spacing(1.5)
	},
	selectPagamento: {
		marginTop: theme.spacing(1),
		width: '100%',
		backgroundColor: 'white',
	},
	selectParcelamento: {
		marginTop: theme.spacing(4),
		width: '100%',
		backgroundColor: 'white',
	},
	btnContinuar: {
		borderRadius: 12,
		marginTop: theme.spacing(6),
		fontSize: 16,
		paddingTop: 6,
		paddingBottom: 6,
		height: 60
	},
	formCheck: {
		paddingLeft: 16,
		paddingTop: 6,
		color: '#000',
		fontSize: 18,
		fontWeight: 'bold'
	},
	titleHead: {
		paddingLeft: theme.spacing(3),
		color: '#fff'
	},
	listItem: {
		padding: theme.spacing(1, 0),

	},
	listItemTitle: {
		paddingRight: theme.spacing(3)
	},
	total: {
		fontWeight: '700',
	},
	title: {
		marginTop: theme.spacing(2),
	},
	titleTabela: {
		marginTop: theme.spacing(1)
	},
	titleItemProd: {
		lineHeight: '24px',
		paddingTop: '4px',
		paddingBottom: '10px',
		[theme.breakpoints.down("xs")]: {
			fontSize: theme.typography.subtitle2.fontSize,
			lineHeight: '18px',
		}
	}
}));

const theme = createTheme({
	palette: {
		background: {
			default: '#fff'
		},
		primary: {
			main: '#ccc'
		},
		secondary: {
			light: '#004dcf',
			main: '#1A237E',
			dark: '#060D51',
		},
		inherit: {
			main: '#9a9a9a',
			light: '#ccc',
			dark: '#3C4858'
		}
	},
	overrides: {
		MuiMenuItem: {
			root: {
				backgroundColor: '#fff',
			},
			'&$selected': {
				backgroundColor: '#FFF'
			},
		},
		MuiTextField: {
			root: {
				backgroundColor: '#fff',
				// input label when focused
				"& label.Mui-focused": {
					color: '#1A237E',
					backgroundColor: '#fff'
				},
				// focused color for input with variant='outlined'
				"& .MuiOutlinedInput-root": {
					"&.Mui-focused fieldset": {
						borderColor: '#1A237E',
					},
					"&.Mui-focused": {
						backgroundColor: '#ffffff',

					},
				},
			},
			required: {
				backgroundColor: '#FFF'
			},
		},
		MuiIcon: {
			root: {
				fontSize: 40
			}
		},
		MuiButton: {
			colorInherit: {
				color: '#9a9a9a'
			}
		}
	},
});

const getUsuario = async () => {
	const docmRef = doc(db, "Usuario", getAuth().currentUser.uid);
	const resultDoc = await getDoc(docmRef);

	return resultDoc.data();
};

const carregarRevendas = (usr, listener) => {
	const docRef = collection(db, 'listaRevendas', 'usuario', usr.uid);

	onSnapshot(docRef, querySnapshot => {
		if (querySnapshot === null || querySnapshot === undefined) {

			listener({
				list: [],
				total: 0,
			});

		} else {

			let prodsCart = querySnapshot.docs;

			if (prodsCart.length === 0) {

				listener({
					list: [],
					total: 0,
				});

			} else {

				let somaTT = 0;
				prodsCart.map(item => {
					let precoTT = item.get('quantidade') * item.get('valorUniComComissao');
					somaTT = somaTT + precoTT;
				});

				listener({
					list: prodsCart,
					total: somaTT,
				});

			}


		}
	});
};

const calcularItens = (list) => {


	let somaTT = 0;
	list.map(item => {
		let precoTT = item.get('quantidade') * item.get('valorUniComComissao');
		somaTT = somaTT + precoTT;
	});

	return somaTT;
};

const calcularComissao = (list) => {


	let somaTT = 0;
	list.map(item => {
		let precoTT = item.get('quantidade') * item.get('comissaoUnidade');
		somaTT = somaTT + precoTT;
	});

	return somaTT;
};

const calcularTotal = (list, state) => {

	const { pb, entrega, garantia, pagamento, parcelamento } = state;

	let somaTT = calcularItens(list);

	const listPagamento = getListPagamentos();
	const listaParcelamento = getListParcelamento(somaTT);
	const listEntrega = getListEntrega();
	const listGarantia = getListaGarantia(somaTT);

	const entregaSelecionada = listEntrega[entrega];
	const garantiaSelecidonada = listGarantia[garantia];
	const pagamentoSelecionada = listPagamento[pagamento];
	const parcelamentoSelecionado = listaParcelamento[parcelamento];

	const valorGarantia = garantiaSelecidonada.valor;
	const valorEntrega = entregaSelecionada.valor;
	const taxaParcela = parcelamentoSelecionado.total;



	let totalCalculo = valorGarantia + valorEntrega + somaTT;

	if (pagamentoSelecionada.id === 6
		|| pagamentoSelecionada.id === 2
		|| pagamentoSelecionada.id === 3) {
		totalCalculo = totalCalculo + taxaParcela;
	}

	return totalCalculo;
};

function CarrinhoVazio({ classes }) {
	return (
		<Card className={classes.cardVazio}>
			<div>

				<h4 style={{ marginTop: "40px", textAlign: "center" }} >Seu carrinho está vazio... </h4>

				<img style={{ marginTop: "20px", marginRight: "auto", marginLeft: "auto", display: "block", width: "48%", maxWidth: "600px" }} src={require("assets/img/cartnull.png")} />

			</div>
		</Card>
	)
}

function ContainerTopTeste({ classes, state, setState }) {

	const { pagamento, parcelamento, entrega, garantia, valorTotal } = state;

	const totalItens = calcularItens(state.lista);

	const listPagamento = getListPagamentos();
	const listaParcelamento = getListParcelamento(totalItens);
	const listEntrega = getListEntrega();
	const listGarantia = getListaGarantia(totalItens);

	const entregaSelecionada = listEntrega[entrega];
	const garantiaSelecidonada = listGarantia[garantia];
	const pagamentoSelecionada = listPagamento[pagamento];
	const parcelamentoSelecionado = listaParcelamento[parcelamento];

	const changePagamento = (event) => {
		const { value } = event.target;
		setState((prevState) => ({
			...prevState,
			pagamento: value
		}));
	};

	const changeParcelas = (event) => {
		const { value } = event.target;
		setState((prevState) => ({
			...prevState,
			parcelamento: value
		}));
	};

	const changeEntrega = (event) => {
		const { value } = event.target;
		setState((prevState) => ({
			...prevState,
			entrega: value
		}));
	};

	const changeGarantia = (event) => {
		const { value } = event.target;
		setState((prevState) => ({
			...prevState,
			garantia: value
		}));
	};

	const isEnable = () => {
		if (pagamentoSelecionada.id === 6
			|| pagamentoSelecionada.id === 2
			|| pagamentoSelecionada.id === 3) {
			return false;
		}
		return true;
	};

	return (

		<Grid xs={12} item container>

			<Grid item xs={12} sm={6} className={classes.containerCardEntrega}>
				<SubHead
					title="Frete e Envio"
				/>
				<Card className={classes.cardEntrega}>
					<div className={classes.cardEntregaContent}>
						<TextField
							select
							className={classes.selectEntrega}
							label="Taxa de Entrega"
							value={entregaSelecionada.id}
							onChange={changeEntrega}
							helperText={entregaSelecionada.descricao}
							variant="outlined">

							{listEntrega.map(item => (
								<MenuItem value={item.id}>
									{item.titulo}: {item.valorString}
								</MenuItem>
							))}

						</TextField>
					</div>
				</Card>
			</Grid>

			<Grid item xs={12} sm={6} className={classes.containerCardGarantia}>
				<SubHead
					title="Extensão da Garantia"
				/>
				<Card className={classes.cardGarantia}>
					<div className={classes.cardGarantiaContent}>
						<TextField
							select
							className={classes.selectEntrega}
							label="Opções de Garantia"
							value={garantiaSelecidonada.id}
							onChange={changeGarantia}
							helperText={garantiaSelecidonada.descricao}
							variant="outlined">

							{listGarantia.map(item => (
								<MenuItem value={item.id}>
									{item.titulo}: {item.valorString}
								</MenuItem>
							))}


						</TextField>
					</div>
				</Card>
			</Grid>

			<Grid item xs={12} sm={6} className={classes.containerCardEntrega}>
				<SubHead
					title="Formas de Pagamento"
				/>
				<Card className={classes.cardEntrega}>
					<div className={classes.cardEntregaContent}>
						<TextField
							select
							className={classes.selectEntrega}
							label="Opções de Pagamento"
							value={pagamentoSelecionada.pos}
							onChange={changePagamento}
							helperText={pagamentoSelecionada.descricao}
							variant="outlined">

							{listPagamento.map(item => (
								<MenuItem value={item.pos}>
									{item.titulo}: {item.valorString}
								</MenuItem>
							))}

						</TextField>
					</div>
				</Card>
			</Grid>

			<Grid item xs={12} sm={6} className={classes.containerCardGarantia}>
				<SubHead
					title="Parcelamento"
				/>
				<Card className={classes.cardGarantia}>
					<div className={classes.cardGarantiaContent}>
						<TextField
							select
							disabled={isEnable()}
							className={classes.selectEntrega}
							label="Opções de parcelas"
							value={parcelamentoSelecionado.pos}
							onChange={changeParcelas}
							helperText={parcelamentoSelecionado.descricao}
							variant="outlined">

							{listaParcelamento.map(item => (
								<MenuItem value={item.pos}>
									{item.titulo}: {item.valorString}
								</MenuItem>
							))}


						</TextField>
					</div>
				</Card>
			</Grid>


		</Grid>

	);
}

function ItemRevenda({ classes, comissao, totalComComissao, valUnidade, quantidade, foto, nome, list, item, position }) {

	const aumentar = () => {
		const quant = item.get('quantidade') + 1;
		const vf = quant * item.get('valorUni');

		const totalComComissao = item.get('valorUniComComissao') * quant;
		const totalDaComissao = item.get('comissaoUnidade') * quant;

		const resposta = {
			caminhoImg: item.get('caminhoImg'),
			idProdut: item.get('idProdut'),
			labo: item.get('labo'),
			produtoName: item.get('produtoName'),
			quantidade: quant,
			valorTotal: totalComComissao,
			valorUni: item.get('valorUni'),
			valorUniComComissao: item.get('valorUniComComissao'),
			valorTotalComComissao: totalComComissao,
			comissaoUnidade: item.get('comissaoUnidade'),
			comissaoTotal: totalDaComissao,
			idModoPreco: item.get('idModoPreco'),
			modoPreco: item.get('modoPreco'),
			quantidadeMinima: item.get('quantidadeMinima'),
			obs: item.get('obs')
		};

		atualizarProdutoRevenda(resposta, item.get('idProdut'));

	};

	const diminuir = () => {

		const minimo = item.get('quantidadeMinima') ? item.get('quantidadeMinima') : 1;

		if (item.get('quantidade') > minimo) {

			const quant = item.get('quantidade') - 1;
			const vf = quant * item.get('valorUni');

			const totalComComissao = item.get('valorUniComComissao') * quant;
			const totalDaComissao = item.get('comissaoUnidade') * quant;

			const resposta = {
				caminhoImg: item.get('caminhoImg'),
				idProdut: item.get('idProdut'),
				labo: item.get('labo'),
				produtoName: item.get('produtoName'),
				quantidade: quant,
				valorTotal: totalComComissao,
				valorUni: item.get('valorUni'),
				valorUniComComissao: item.get('valorUniComComissao'),
				valorTotalComComissao: totalComComissao,
				comissaoUnidade: item.get('comissaoUnidade'),
				comissaoTotal: totalDaComissao,
				idModoPreco: item.get('idModoPreco'),
				modoPreco: item.get('modoPreco'),
				quantidadeMinima: item.get('quantidadeMinima'),
				obs: item.get('obs')
			};

			atualizarProdutoRevenda(resposta, item.get('idProdut'));



		}
	};

	const remover = () => {
		removerDaRevenda(item.get('idProdut'));
	};

	const sObs = upperString(item.get('obs'));
	const modoPreco = item.get('modoPreco') ? item.get('modoPreco') : `Varejo`;

	return (
		<Grid item lg={12} xs={12}>
			<Card className={classes.gridItemMain} pricing>
				<CardBody pricing>
					<Grid justifyContent="center" container>
						<Grid xs={5} sm={4} md={4} className={classes.gridImagemItemProd} item>

							<img style={{
								height: '100%',
								width: '100%',
								objectFit: 'cover',
								borderRadius: 16
							}} src={foto} />
						</Grid>

						<Grid className={classes.gridContentItemProd} xs={7} sm={4} md={4} item>
							<Box className={classes.contentItemProd}>


								<Typography color="primary" variant="caption">
									{modoPreco}
								</Typography>
								<Typography className={classes.titleItemProd} variant="h6">
									{upperString(nome.substring(0, 30))}
								</Typography>

								<Typography variant="body2">
									{sObs ? sObs : 'Modelo Unico'}
								</Typography>

								<Typography component="p" variant="caption">
									<b>R$ {comissao * quantidade},00</b> DE LUCRO

								</Typography>

							</Box>

						</Grid>

						<Grid xs={12} sm={4} md={4} className={classes.gridValorItemProd} item>
							<Typography className={classes.valorUnd} variant="h3">
								<Box component="small">R$</Box>{valUnidade * quantidade}
							</Typography>
							<Typography className={classes.quantidadeText} variant="body2">
								{quantidade} <Box component="small">UNIDADES</Box>
							</Typography>

							<div className={classes.containerBtnQuantidade} style={{ marginTop: "16px" }} >
								<Button
									className={classes.btnQuantidade}
									variant="outlined"
									size="sm"
									onClick={() => (diminuir())}
									round
								>
									<Remove />
								</Button>
								<Box className={classes.spacingBtnQuantidade} />
								<Button
									className={classes.btnQuantidade}
									variant="outlined"
									size="sm"
									onClick={() => (aumentar())}
									round
								>
									<Add />
								</Button>

							</div>

							<div style={{ marginTop: "20px" }} >
								<ThemeProvider theme={theme}>
									<Button
										onClick={() => (remover())}
										style={{ float: "center" }}
										color="primary"
										size="sm"
										round
									>
										Remover
									</Button>
								</ThemeProvider>

							</div>
						</Grid>

					</Grid>



				</CardBody>
			</Card>
		</Grid>
	)
}

function ListaRevenda({ state, classes }) {


	const { lista, valorTotal, pb } = state;

	if (pb) return <Pb />

	if (valorTotal === 0 || lista.length === 0) {
		return <CarrinhoVazio classes={classes} />
	}

	return (
		<>
			{lista.map((item, i) => {
				return <ItemRevenda key={i} classes={classes} comissao={item.get('comissaoUnidade')} totalComComissao={item.get('valorTotalComComissao')} valUnidade={item.get('valorUni')} quantidade={item.get('quantidade')} foto={item.get('caminhoImg')} nome={item.get('produtoName')} item={item} position={i} list={lista} />
			})}
		</>
	);
}

function AppBarRevenda({ valorTotal, classes }) {
	return (
		<AppBar position="fixed" className={classes.toolbar}>
			<Toolbar>
				<IconButton onClick={() => interfaceMain()} edge="start" style={{ color: '#fff' }} color="secondary" aria-label="back">
					<ArrowBackIcon />
				</IconButton>

				<Typography noWrap variant="subtitle2" className={classes.titleHead}>
					Novo Pedido
				</Typography>

				<div style={{ flexGrow: 1 }} />

				<Typography variant="subtitle2" style={{ marginRight: "20px", color: '#fff' }} >Total: <b> {valorTotal.toFixed(0)},00</b></Typography>

			</Toolbar>
		</AppBar>
	);
};

function BotaoLimpar({ setState, state, classes }) {

	const { lista, valorTotal, pb } = state;

	if (pb) return null;

	return (
		<Grid item style={{ marginRight: '0px', marginLeft: '0px', display: 'flex', justifyContent: 'center' }} xs={12}>

			<Button
				style={{ marginTop: "16px", marginBottom: "40px", borderRadius: 16 }}
				color="inherit"
				variant="outlined"
				onClick={() => {

					window?.scrollTo(0, 0);

					if(lista.length === 0) return;

					setState((prevState) => ({
						...prevState,
						pb: true,
						entrega: 0,
						garantia: 0,
						pagamento: 2,
						parcelamento: 0,
						valorTotal: 0
					}));
					limparCart(lista);
				}}
				round >
				Limpar Carrinho
			</Button>
		</Grid>
	)
}

function BotaoAdicionarMais({ setState, state, classes }) {

	const { lista, valorTotal, pb } = state;

	if (pb) return null;

	return (
		<Grid item style={{ marginRight: '0px', marginLeft: '0px', display: 'flex', justifyContent: 'center' }} xs={12}>

			<Button
				style={{ marginTop: "40px", marginBottom: "4px", borderRadius: 16 }}
				color="inherit"
				variant="outlined"
				onClick={() => {
					interfaceMain();
				}}
				round >
				Adicionar Mais Itens
			</Button>
		</Grid>
	)
}

function ResumoContent({ classes, state, setState }) {

	const { pagamento, parcelamento, entrega, garantia, valorTotal } = state;

	const totalItens = calcularItens(state.lista);

	const listPagamento = getListPagamentos();
	const listaParcelamento = getListParcelamento(totalItens);
	const listEntrega = getListEntrega();
	const listGarantia = getListaGarantia(totalItens);

	const entregaSelecionada = listEntrega[entrega];
	const garantiaSelecidonada = listGarantia[garantia];
	const pagamentoSelecionada = listPagamento[pagamento];
	const parcelamentoSelecionado = listaParcelamento[parcelamento];

	const totalComissao = calcularComissao(state.lista);

	function TaxaParcelamento() {

		if (pagamentoSelecionada.id !== 6
			&& pagamentoSelecionada.id !== 2
			&& pagamentoSelecionada.id !== 3) {
			return null;
		}

		return (
			<ListItem className={classes.listItem}>
				<ListItemText primary="Taxa do cartão" />
				<Typography variant="subtitle1" className={classes.total}>
					R${parcelamentoSelecionado.total.toFixed(0)},00
				</Typography>
			</ListItem>
		);
	};

	function Tabela() {
		return (
			<Box style={{ padding: 6 }}>
				<Typography variant="subtitle1" className={classes.titleTabela} gutterBottom>
					Detalhes
				</Typography>
				<List disablePadding>

					{state.lista.map(product => (
						<ListItem className={classes.listItem} key={product.idProdut}>
							<ListItemText className={classes.listItemTitle} primary={product.get('produtoName')} secondary={'Quantidade: ' + product.get('quantidade')} />
							<Typography variant="body2">{'R$' + product.get('valorTotalComComissao') + ',00'}</Typography>
						</ListItem>
					))}

					<ListItem className={classes.listItem}>
						<ListItemText primary="Taxa de entrega" />
						<Typography variant="subtitle1" className={classes.total}>
							{entregaSelecionada.valorString}
						</Typography>
					</ListItem>

					<ListItem className={classes.listItem}>
						<ListItemText primary="Garantia" />
						<Typography variant="subtitle1" className={classes.total}>
							{garantiaSelecidonada.valorString}
						</Typography>
					</ListItem>

					<TaxaParcelamento />

					<ListItem className={classes.listItem}>
						<ListItemText primary="Comissão" />
						<Typography variant="subtitle1" className={classes.total}>
							R${Number(totalComissao).toFixed(0)},00
						</Typography>
					</ListItem>

					<ListItem className={classes.listItem}>
						<ListItemText primary="Total à pagar" />
						<Typography variant="subtitle1" className={classes.total}>
							R${Number(valorTotal).toFixed(0)},00
						</Typography>
					</ListItem>

				</List>
			</Box>
		);
	};

	return (
		<ThemeProvider theme={theme}>

			<Tabela />
			<Button
				className={classes.btnContinuar}
				variant="contained"
				fullWidth
				size="large"
				startIcon={<CheckOutlinedIcon fontSize="large" />}
				color="secondary"
				onClick={() => finalizarRevenda({pagamento, parcelamento, entrega, garantia})}>
				Continuar
			</Button>
		</ThemeProvider>
	);
};

export default function CarrinhoRevendas(props) {

	const [state, setState] = useState({
		lista: [],
		valorTotal: 0,
		pb: true,
		entrega: 0,
		garantia: 0,
		pagamento: 2,
		parcelamento: 0,
		usuario: null
	});

	const { lista, valorTotal, pb, entrega, garantia, pagamento, parcelamento } = state;
	const classes = useStyles();


	useEffect(() => {

		window?.scrollTo(0, 0);

		getAuth().onAuthStateChanged(user => {
			console.log('Auth ' + user)
			if (user) {
				// User is signed in.

				//const usuario = getUsuario();

				carregarRevendas(user, async ({ list, total }) => {

					console.log(list.length, list.length)

					const listaVazia = list.length === 0;

					if (listaVazia) {
						//window?.scrollTo(0, 0);

						setState((prevState) => ({
							...prevState,
							lista: [],
							valorTotal: 0,
							pb: false,
						}));

						return;
					}


					const totalCalculo = calcularTotal(list, state);

					setState((prevState) => ({
						...prevState,
						lista: list,
						valorTotal: listaVazia ? 0 : totalCalculo,
						pb: false,
					}));


				});

				return carregarRevendas;

			}
		});
	}, []);

	useEffect(() => {
		console.log('recalcular total');

		const totalCalculo = calcularTotal(lista, state);

		setState((prevState) => ({
			...prevState,
			valorTotal: totalCalculo,
		}));


	}, [garantia, entrega, parcelamento, pagamento]);


	return (
		<ThemeProvider theme={theme}>
			<Container>
				<AppBarRevenda valorTotal={valorTotal} classes={classes} />



				<Grid>

				</Grid>


				<Grid container style={{ marginTop: "80px", marginBottom: "0px" }} xs={12} alignContent="flex-start" alignItems="flex-start" justifyContent="flex-start" className={classes.pricingSection}>


					<Grid xs={12} md={8} lg={8} item container>



						<SubHead
							title="Produtos do Pedido"
						/>
						<ListaRevenda state={state} classes={classes} />



						<ContainerTopTeste state={state} setState={setState} classes={classes} />





					</Grid>

					<Grid xs={12} md={4} lg={4} className={classes.containerCardResumo} item>
						<SubHead
							title="Resumo do Pedido"
						/>
						<Card className={classes.cardResumo}>
							<div className={classes.cardResumoContent}>
								<ResumoContent classes={classes} setState={setState} state={state} />


							</div>

						</Card>

						<BotaoAdicionarMais setState={setState} state={state} classes={classes} />
						<BotaoLimpar setState={setState} state={state} classes={classes} />

					</Grid>

				</Grid>

				<Rodape />

			</Container>
		</ThemeProvider>
	);
}
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
// @material-ui/core components
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";

import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import Pb from 'views/my/Pb';
import { mFirebase, mUser, mUid, removerDaRevenda, atualizarProdutoRevenda, abrirFormulario, voltar, finalizarRevenda, abrirLogin } from 'index.js';

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
import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { interfaceMain } from "index";

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

const useStyles2 = makeStyles(theme => ({
	depositContext: {
		flex: 1,
		alignItems: 'flex-end',
		marginTop: '10px'
	},

	btIndisp: {
		color: "gray",
	},
}));

const useStyles = makeStyles(theme => ({
	...pricingStyle,
}));

const getStatus = (s) => {

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

const getComissoes = async (uid) => {
	const q = query(collection(db, 'MinhasRevendas', 'Usuario', uid), orderBy("hora", "desc"), limit(400));
	const querySnapshot = await getDocs(q);

	if (!querySnapshot) return null;

	const prods = querySnapshot.docs;
	if (!prods) return null;

	const tamanho = querySnapshot.size;

	let list = [];
	let total = 0;

	for (let i = 0; i < tamanho; i++) {
		const item = prods[i];
		const data = item.data();

		if (item.statusCompra === 5) {


			if (item.pagamentoRecebido === false) {

				let precoTT = item.comissaoTotal;
				total = total + precoTT;

			}


		}

		list.push(data);
	}

	return { list, total };
};

const getBonus = async (uid) => {
	const q = query(collection(db, 'MinhasComissoesAfiliados', 'Usuario', uid), orderBy("hora", "desc"), limit(400));
	const querySnapshot = await getDocs(q);

	if (!querySnapshot) return null;

	const qDocs = querySnapshot.docs;
	if (!qDocs) return null;

	const tamanho = querySnapshot.size;

	let list = [];
	let total = 0;

	for (let i = 0; i < tamanho; i++) {
		const item = qDocs[i];
		const data = item.data();

		if (item.statusComissao === 5) {

			if (item.pagamentoRecebido === false) {

				let precoTT = item.comissao;
				total = total + precoTT;

			}

		}

		list.push(data);
	}

	return { list, total };
};

function Title(props) {
	return (
		<h3 style={{ color: '#060D51' }} >
			<b>
				{props.children}
			</b>
		</h3>
	);
};

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
			
		</React.Fragment>
	);
};

class ItemComissaoVenda extends React.Component {

	constructor(props) {
		super(props);

	}


	render() {


		let daS = new Date(this.props.date);
		let da = daS.toLocaleDateString() + ' às ' + daS.toLocaleTimeString();

		return (

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

		return (

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

function ContentMain({ classes, state }) {

	const listComissoesVendas = (


		state.minhasVendas.map((item, i) => (



			<ItemComissaoVenda comissao={item.comissaoTotal} date={item.hora} status={getStatus(item.statusCompra)} nome={item.nomeCliente} telefone={item.phoneCliente} />

		))

	);

	const listComissoesAfiliados = (


		state.comissoesAfiliados.map((item, i) => (



			<ItemComissaoAfiliados comissao={item.comissao} date={item.hora} status={getStatus(item.statusComissao)} descricao={item.descricao} title={item.titulo} />

		))

	);


	return (

		<div>

			<Container maxWidth="lg" style={{ paddingTop: '80px', paddingBottom: '0px', }} >

				<Grid container spacing={3}>

					<Grid item xs={12} md={4} lg={4}>
						<Card raised style={{ height: 280, padding: '20px', display: 'flex', overflow: 'auto', flexDirection: 'column', backgroundColor: '#fff' }}>
							<FinancaComissoes title="Total à receber" total={state.totalAReceber} texto="Tudo que você tem a receber juntando vendas e afiliados" />
						</Card>
					</Grid>

					<Grid item xs={12} md={4} lg={4}>
						<Card raised style={{ height: 280, padding: '20px', display: 'flex', overflow: 'auto', flexDirection: 'column', backgroundColor: '#fff' }}>
							<FinancaComissoes title="Revendas" total={state.totalComissoesVendas} texto="Esse é o valor da sua comissão pelas revendas que você gerou na VendaFavorita" />
						</Card>
					</Grid>

					<Grid item xs={12} md={4} lg={4}>
						<Card raised style={{ height: 280, padding: '20px', display: 'flex', overflow: 'auto', flexDirection: 'column', backgroundColor: '#fff' }}>
							<FinancaComissoes title="Afiliados" total={state.totalComissoesAfilidados} texto="Esse é o valor da sua comissão gerada pela sua rede de afiliados" />
						</Card>
					</Grid>

				</Grid>
			</Container>

			<div style={{ marginTop: "20px" }} >
				<div className={classes.pricingSection}>

					<h3 style={{ marginTop: "20px", marginBottom: "40px" }} className={classNames(classes.features, classes.textCenter, classes.cardTitle)}>Comissões de Revendas</h3>

					<GridContainer style={{ marginRight: "15px", marginLeft: "15px" }}>

						{listComissoesVendas}

					</GridContainer>
				</div>
			</div>

			<div style={{ marginTop: "20px" }} >
				<div className={classes.pricingSection}>

					<h3 style={{ marginTop: "20px", marginBottom: "40px" }} className={classNames(classes.features, classes.textCenter, classes.cardTitle)}>Comissões de Afiliados</h3>

					<GridContainer style={{ marginRight: "15px", marginLeft: "15px" }}>

						{listComissoesAfiliados}

					</GridContainer>
				</div>
			</div>

		</div>




	);
};


export default function Comissoes(props) {

	const classes = useStyles();

	const [state, setState] = useState({
		usuario: null,
		minhasVendas: [],
		totalComissoesVendas: 0,
		comissoesAfiliados: [],
		totalComissoesAfilidados: 0,
		totalAReceber: 0,
		pb: true,
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

					const resultComissoes = await getComissoes(usr.uid);
					const listComissoes = resultComissoes ? resultComissoes.list : [];
					const totalComissoes = resultComissoes ? resultComissoes.total : 0;

					const resultBonus = await getBonus(usr.uid);
					const listBonus = resultBonus ? resultBonus.list : [];
					const totalBonus = resultBonus ? resultBonus.total : 0;

					setState((prevState) => ({
						...prevState,
						pb: false,
						usuario: docUsuario,
						minhasVendas: listComissoes,
						comissoesAfiliados: listBonus,
						totalComissoesVendas: totalComissoes,
						totalComissoesAfilidados: totalBonus,
						totalAReceber: (totalBonus + totalComissoes)
					}));
				}

			} else {
				abrirLogin();
			}

		});
	}, []);


	return <ContentMain classes={classes} state={state} />;
}
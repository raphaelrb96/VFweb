import React from "react";

import {
	container,
	title,
	mlAuto,
	mrAuto,
	description
} from "assets/jss/material-kit-pro-react.js";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import Mail from "@material-ui/icons/Mail";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";

import { Link } from "react-router-dom";


import bg7 from "assets/img/bg7.jpg";

import styles from "assets/jss/material-kit-pro-react/views/componentsSections/preFooter.js";

import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ComputerIcon from '@material-ui/icons/Computer';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PetsIcon from '@material-ui/icons/Pets';
import BuildIcon from '@material-ui/icons/Build';
import WidgetsIcon from '@material-ui/icons/Widgets';
import GamesIcon from '@material-ui/icons/Games';
import PowerIcon from '@material-ui/icons/Power';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ScrollMenu from 'react-horizontal-scrolling-menu';
import { whiteColor } from "assets/jss/material-kit-pro-react";


let celularCat = <PhoneAndroidIcon />;
let computadorCat = <ComputerIcon />;
let videogameCat = <GamesIcon />;
let petCat = <PetsIcon />;
let eletCat = <PowerIcon />;
let ferrCat = <BuildIcon />;
let diversCat = <WidgetsIcon />;

const catList = [

	{
		name: 'SmartWatch',
		icon: celularCat,
		key: '1'
	},
	{
		name: 'Caixas de som',
		icon: computadorCat,
		key: '2'
	},
	{
		name: 'Eletronicos',
		icon: eletCat,
		key: '3'
	},
	{
		name: 'Maquina de cabelo',
		icon: petCat,
		key: '4'
	},
	{
		name: 'Automotivos',
		icon: eletCat,
		key: '15'
	},
	{
		name: 'Video Game',
		icon: videogameCat,
		key: '16'
	},
	{
		name: 'Computador',
		icon: computadorCat,
		key: '18'
	},
	{
		name: 'Ferramentas',
		icon: ferrCat,
		key: '18'
	}

];

let textPesquisa = '';

let setTextPesquisa = valor => {
	textPesquisa = valor.target.value;
};


const useStyles = makeStyles(theme => ({
	title,
	mlAuto,
	mrAuto,
	description,
	icon: {
		marginRight: theme.spacing(2),
	},
	container: {
		paddingTop: theme.spacing(8),
		[theme.breakpoints.up('md')]: {
			paddingTop: theme.spacing(18),
			paddingBottom: theme.spacing(16),
		},
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
		paddingLeft: 12,
		paddingRight: 12,
		marginTop: 36,
		marginBottom: 36
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
	cardBody: {
		padding: "15px",
		"& form": {
			marginBottom: "0"
		},
	},
	cardForm: {
		paddingLeft: 12,
		paddingRight: 12,
		paddingBottom: 8
		
	},
	textCenter: {
		textAlign: "center !important"
	},
	white: {
		backgroundColor: whiteColor
	},
}));


const CategoriaItem = props => {
	console.log(props.id);
	return (
		<GridItem onClick={() => props.click(props.id)} style={{ marginRight: '10px', marginLeft: '10px' }} xs={3} md={1} sm={1}>
			<Link>
				<Card profile plain>
					<div style={{ marginLeft: '0', marginRight: '0', display: 'inline-block', textAlign: "center", justifyContent: "center" }} >
						{props.icone}
					</div>
					<h6 style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: "center", justifyContent: "center" }} >{props.text}</h6>
				</Card>
			</Link>
		</GridItem>
	);
};


const CategoriaList = list => {
	return (
		list.map(item => {
			const { name, icon, key } = item;
			return <CategoriaItem text={name} icone={icon} id={key} />
		})
	);
};

const onSelect = key => {
	console.log('click: ' + key);
}

// fazer seleção dos icones para as categorias
export default function ContainerBusca(props) {

	let menu = <CategoriaList list={catList} />;

	const classes = useStyles();

	return (
		<GridContainer>

			<GridItem xs={12} sm={12} md={10} className={classNames(classes.mlAuto, classes.mrAuto, classes.container)}>

				<div className={classNames(classes.textCenter)}>
					<h1 className={classes.title}>Venda Favorita</h1>
					<h4 className={classes.description}>
						Encontre cliente e vendedores para nossos produtos, e ganhe comissões em dinheiro
					</h4>
				</div>

				<Card className={classes.card}>
					<CardBody className={classes.cardBody}>
						<form onSubmit={() => props.pesquisar(textPesquisa)}>
							<GridContainer>
								<GridItem xs={12} sm={6} md={6} lg={8}>
									<CustomInput
										formControlProps={{
											fullWidth: true,
											className: classes.cardForm,
										}}

										inputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SearchSharpIcon />
												</InputAdornment>
											),
											placeholder: "Pesquisar por Produto...",
											onChange: (setTextPesquisa)
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={6} md={6} lg={4}>
									<Button
										style={{
											top: 0
										}}
										type="submit"
										color="verdin"
										block
										onClick={() => props.pesquisar(textPesquisa)}
										className={classes.subscribeButton}
									>
										Pesquisar
									</Button>
								</GridItem>
							</GridContainer>
						</form>
					</CardBody>
				</Card>

			</GridItem>

		</GridContainer>
	);
}


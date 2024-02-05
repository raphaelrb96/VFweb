import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import InfoArea from 'components/InfoArea/InfoArea';
import { Favorite, LocalShipping, VerifiedUser } from '@material-ui/icons';
import classNames from 'classnames';
import { Box, Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
	...productStyle,
	footer: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		paddingBottom: theme.spacing(6),
		minWidth: '250px',
		paddingTop: '0px',
		marginTop: 0
	},
	textCenter: {
		...productStyle.textCenter,
		textAlign: 'center',
		marginBottom: theme.spacing(6),
		[theme.breakpoints.down('sm')]: {
			marginBottom: theme.spacing(12),
		}
	}
}));

function Copyright() {

	const classes = useStyles();

	return (
		<Box className={classes.footer}>
			<Box className={classNames(classes.features, classes.textCenter)}>
				<Grid justifyContent='center' spacing={1} container >
					<Grid item md={3} >
						<InfoArea
							title="Entrega Fácil"
							description="Entregamos no mesmo dia para a maioria dos bairros de Manaus. Em breve estaremos fazendo entrega tambem para o interior."
							icon={LocalShipping}
							iconColor="danger"
							vertical
						/>
					</Grid>
					<Grid item md={3} >
						<InfoArea
							title="Venda Segura"
							description="Disponibilizamos 7 dias para você testar a qualidade de qualquer um dos nossos produtos... Em casos de defeito de fabricação, trocamos o produto !"
							icon={VerifiedUser}
							iconColor="danger"
							vertical
						/>
					</Grid>
					<Grid item md={3} >
						<InfoArea
							title="A melhor opção"
							description="Alem do serviço de compra, nós abrimos espaço para qualquer cliente poder gerar uma renda extra apartir da nossa empresa !"
							icon={Favorite}
							iconColor="danger"
							vertical
						/>
					</Grid>
				</Grid>
			</Box>
			<Typography variant="h6" align="center" gutterBottom>
				(92) 99193-3525
			</Typography>
			<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
				Manaus - AM
			</Typography>
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="">
					VendaFavorita
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Box>
	);
}

export default function main() {

	return (

		<Copyright />
	);


}
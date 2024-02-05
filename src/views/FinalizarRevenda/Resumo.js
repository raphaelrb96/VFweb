import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import { objectCompraFinal } from 'views/FinalizarRevenda/Finalizacao.js';


const useStyles = makeStyles(theme => ({
	listItem: {
		padding: theme.spacing(1, 0),
	},
	total: {
		fontWeight: '700',
	},
	title: {
		marginTop: theme.spacing(2),
	},
}));


export default function Resumo({ state, setState }) {

	const { document } = state;

	const classes = useStyles();

	let products = document.listaDeProdutos;
	let totalFinal = document.valorTotal;
	let nomeCliente = document.nomeCliente;
	let endereco = document.adress + ', ' + document.complemento;
	let pagForma = document.pagamentoFinal.titulo;
	let juros = document.parcelaFinal.total;

	let elementoTaxa = null;
	let elementoDetalhesPag = null;

	if (document.pagamentoFinal.id === 3
		|| document.pagamentoFinal.id === 2
		|| document.pagamentoFinal.id === 6) {

		elementoTaxa = (
			<ListItem className={classes.listItem}>
				<ListItemText primary="Taxa do cartão" />
				<Typography variant="subtitle1" className={classes.total}>
					R${juros.toFixed(0)},00
				</Typography>
			</ListItem>
		);

		elementoDetalhesPag = (
			<>
				<Typography gutterBottom>{document.parcelaFinal.descricao}</Typography>
				<Typography gutterBottom>Acrescimo: {document.parcelaFinal.totalString}</Typography>
			</>
		)

	}

	return (

		<React.Fragment>
			<Typography variant="h6" style={{ marginBottom: 20 }} gutterBottom>
				Resumo da Venda
			</Typography>
			<List disablePadding>
				{products.map(product => (
					<ListItem className={classes.listItem} key={product.idProdut}>
						<ListItemText primary={product.get('produtoName')} secondary={'Quantidade: ' + product.get('quantidade')} />
						<Typography variant="body2">{'R$' + product.get('valorTotalComComissao') + ',00'}</Typography>
					</ListItem>
				))}

				<ListItem className={classes.listItem}>
					<ListItemText primary="Taxa de entrega" />
					<Typography variant="subtitle1" className={classes.total}>
						{document.entregaFinal.valorString}
					</Typography>
				</ListItem>

				<ListItem className={classes.listItem}>
					<ListItemText primary="Garantia" />
					<Typography variant="subtitle1" className={classes.total}>
						{document.garantiaFinal.valorString}
					</Typography>
				</ListItem>

				{elementoTaxa}


				<ListItem className={classes.listItem}>
					<ListItemText primary="Comissão" />
					<Typography variant="subtitle1" className={classes.total}>
						R${document.comissaoTotal},00
					</Typography>
				</ListItem>

				<ListItem className={classes.listItem}>
					<ListItemText primary="Total à pagar" />
					<Typography variant="subtitle1" className={classes.total}>
						R${totalFinal.toFixed(0)},00
					</Typography>
				</ListItem>

			</List>
			<Grid container spacing={2}>

				<Grid item xs={12} sm={6}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						Detalhes da Entrega
					</Typography>
					<Typography gutterBottom>{nomeCliente}</Typography>
					<Typography gutterBottom>{document.phoneCliente}</Typography>
					<Typography gutterBottom>{endereco}</Typography>

				</Grid>

				<Grid item container direction="column" xs={12} sm={6}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						Detalhes do Pagamento
					</Typography>
					<Typography gutterBottom>{pagForma}</Typography>
					<Typography gutterBottom>{document.pagamentoFinal.valorString}</Typography>
					{elementoDetalhesPag}
				</Grid>
			</Grid>
		</React.Fragment>

	);


}
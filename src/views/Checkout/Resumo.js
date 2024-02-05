import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import {objectCompraFinal} from 'views/Checkout/ComprarAgora.js';


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


export default function Resumo() {


	const classes = useStyles();

	let products = objectCompraFinal.listaDeProdutos;
	let totalFinal = objectCompraFinal.valorTotal;
	let nomeCliente = objectCompraFinal.userNome;
	let endereco = objectCompraFinal.adress + ', ' + objectCompraFinal.complemento;

	let pagForma = 'Dinheiro';

	if (objectCompraFinal.formaDePagar === 1) {
		pagForma = 'Débito';
	} else if (objectCompraFinal.formaDePagar === 2) {
		pagForma = 'Crédito';
	} else {
		pagForma = 'Dinheiro';
	}

	return(

		<React.Fragment>
	      <Typography variant="h6" gutterBottom>
	        Resumo da compra
	      </Typography>
	      <List disablePadding>
	        {products.map(product => (
	          <ListItem className={classes.listItem} key={product.idProdut}>
	            <ListItemText primary={product.get('produtoName')} secondary={ 'Quantidade: ' + product.get('quantidade')} />
	            <Typography variant="body2">{ 'R$ ' + product.get('valorTotal') + ',00'}</Typography>
	          </ListItem>
	        ))}
	        <ListItem className={classes.listItem}>
	          <ListItemText primary="Taxa de entrega" />
	          <Typography variant="subtitle1" className={classes.total}>
	            GRÁTIS
	          </Typography>
	        </ListItem>
	        <ListItem className={classes.listItem}>
	          <ListItemText primary="Total" />
	          <Typography variant="subtitle1" className={classes.total}>
	            R${totalFinal},00
	          </Typography>
	        </ListItem>
	      </List>
	      <Grid container spacing={2}>

	        <Grid item xs={12} sm={6}>
	          <Typography variant="h6" gutterBottom className={classes.title}>
	            Detalhes da Entrega
	          </Typography>
	          <Typography gutterBottom>{nomeCliente}</Typography>
	          <Typography gutterBottom>{endereco}</Typography>
	          
	        </Grid>

	        <Grid item container direction="column" xs={12} sm={6}>
	          <Typography variant="h6" gutterBottom className={classes.title}>
	            Detalhes do Pagamento
	          </Typography>
	          <Typography gutterBottom>{pagForma}</Typography>
	        </Grid>
	      </Grid>
	    </React.Fragment>

	);


}
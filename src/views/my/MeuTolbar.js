import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MeuAppBar from './MeuAppBar';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {returnInterfaceMain} from './index'




const stilo = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    paddingRight: 24, 
    background: '#e00000',
  },
}));

let size = 0;
let lista = Array();
let isAnonimo = true;

export default function meutoolbar(props) {

	const classes = stilo();

	
	size = props.size;
    lista = props.produtos;
    isAnonimo = props.isAnonimo;

	return(
		<AppBar>
		    <Toolbar className={classes.toolbar}>
		        <IconButton
		            edge="start"
		            color="inherit"
		            aria-label="voltar"
		            onClick={returnInterfaceMain}
		            className={classes.icon}>
		            <ArrowBackIcon />
		          </IconButton>
		        <Typography variant="h6" color="inherit" noWrap>
		            Voltar
		        </Typography>
		    </Toolbar>
		</AppBar>
	);

}



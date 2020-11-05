import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import {atualizarProdutoCarrinho, abrirCart, removeToCart} from './index';
import {setListaCompras} from './index';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ReactDOM from 'react-dom';


const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '90%',
    height: 128,
  },
  control: {
    padding: theme.spacing(2),
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  rootList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  itemList: {
  	width: '100%',
    padding: theme.spacing(1, 0),
  },
  rootQuantidade: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  marginName: {
  	marginRight: '100px',
  }
}));

let valorTotal = 0;




class NovoItem extends React.Component {

	constructor (props) {

		super(props);
		let q = props.item.quantidade;
		let vu = props.item.valorUni;
		this.vf = q * vu;

		this.state = {
						quantidade: q, 
						valorTotal: this.vf
					};
		this.handlerChange = this.handlerChange.bind(this);

	}

	handlerChange(event) {
		let quant = event.target.value;
		let v = this.props.item.valorUni;
		let vf = v * quant;
		valorTotal = vf;
		this.setState({
			quantidade: quant, 
			valorTotal: vf
		});

		let item = this.props.item;

		let resposta = {
				caminhoImg: item.caminhoImg,
				idProdut: item.idProdut,
				labo: item.labo,
				produtoName: item.produtoName,
				quantidade: quant,
				valorTotal: vf,
				valorUni: item.valorUni
		};

	
		this.props.onChange(this.props.indice, quant, item.idProdut);
		if (quant == 0) {

		} else {
			atualizarProdutoCarrinho(resposta, this.props.item.idProdut);
		}
		
	}

	render() {


			console.log(this.props.item.produtoName + ': ' + this.state.valorTotal);

			return(


					<ListItem className={this.props.classes.itemList} >
				        <ListItemAvatar>
				            <Avatar src={this.props.item.caminhoImg} />
				        </ListItemAvatar>

				        <ListItemText className={this.props.classes.marginName} primary={'' + this.props.item.valorTotal + ',00'} secondary={''+ this.props.item.produtoName} />

				       

				       <ListItemSecondaryAction>

				       	   <form className={this.props.classes.rootQuantidade} autoComplete="off">
				       	   	    <FormControl className={this.props.classes.margin}>
							        <InputLabel htmlFor="age-customized-native-simple">
							        	
							        </InputLabel>
							        <NativeSelect
							          value={this.props.item.quantidade}
							          onChange={this.handlerChange}
							          input={<BootstrapInput name="age" id="age-customized-native-simple" />}
							        >
							          <option value={0}>0</option>
							          <option value={1}>1</option>
							          <option value={2}>2</option>
							          <option value={3}>3</option>
							        </NativeSelect>
							      </FormControl>
				       	   </form>
					       
				        </ListItemSecondaryAction>

				    </ListItem>


				);

	}

	

}

function removerProduto(i, lista, id) {
	let novaLista = Array();
	for(let x = 0; x < lista.length; x++) {
		if (x === i) {

		} else {
			let item = lista[x];
			let obj = {
				caminhoImg: item.caminhoImg,
				idProdut: item.idProdut,
				labo: item.labo,
				produtoName: item.produtoName,
				quantidade: item.quantidade,
				valorTotal: item.valorTotal,
				valorUni: item.valorUni
			};
			novaLista.push(obj);
			console.log('indice ' + x + ', quantidade:' + item.quantidade);
		}
	}

	setListaCompras(novaLista);
	removeToCart(id);
	console.log(id);
	return novaLista;
}

function criarNovaLista(indice, antigaLista, q) {

	let novaLista = Array();

	for (var i = 0; i < antigaLista.length; i++) {
		let item = antigaLista[i];
		if (indice === i) {
			let tot = item.valorUni * q;
			let obj = {
				caminhoImg: item.caminhoImg,
				idProdut: item.idProdut,
				labo: item.labo,
				produtoName: item.produtoName,
				quantidade: q,
				valorTotal: tot,
				valorUni: item.valorUni
			};
			novaLista.push(obj);
		} else {
			let obj = {
				caminhoImg: item.caminhoImg,
				idProdut: item.idProdut,
				labo: item.labo,
				produtoName: item.produtoName,
				quantidade: item.quantidade,
				valorTotal: item.valorTotal,
				valorUni: item.valorUni
			};
			novaLista.push(obj);
		}
	}

	setListaCompras(novaLista);

	return novaLista;
}

function Total(props) {

	return(
		<ListItem className={props.classes.listItem}>
	          <ListItemText primary="Total" />
	          <Typography variant="subtitle1" className={props.classes.total}>
	            {'' + props.preco + ',00'}
	          </Typography>
	        </ListItem>
	);
}

class Cart extends React.Component {



	constructor(props) {
		super(props)
	
		this.lista = props.lista;

		this.soma = 0;

		props.lista.map(item => {
			let tt = item.valorUni * item.quantidade;
			this.soma = this.soma + tt;
		});

		this.state = {
			total: this.soma,
			list: props.lista
		};

		this.handerTrigger = this.handerTrigger.bind(this);
	}

	handerTrigger(i, q, id) {

		if (q == 0) {
			console.log('0');
			let newList = Array();
			newList = removerProduto(i, this.state.list, id);
			if (newList.length == 0) {
				abrirCart();
			}
			this.soma = 0;
			newList.map((item,index) => {


				let tt = item.valorUni * item.quantidade;
				this.soma = this.soma + tt;

			});

			this.setState({
				total: this.soma,
				list: newList
			});
		} else {



			this.soma = 0;
			valorTotal = 0;
			let newList = Array();
			newList = criarNovaLista(i, this.state.list, q);
			
			
			newList.map((item,index) => {


				let tt = item.valorUni * item.quantidade;
				this.soma = this.soma + tt;

			});


			this.setState({
				total: this.soma,
				list: newList
			});

		}


	}
	

	render() {

		return(

		<React.Fragment>
	      <Typography variant="h6" gutterBottom>
	        Meu pedido
	      </Typography>
	      <List disablePadding >
	        {this.state.list.map((item,i) => (
	        	<NovoItem item={item} indice={i} classes={this.props.classes} onChange={this.handerTrigger} />

	        ))}
	        <Total preco={this.state.total} classes={this.props.classes} />
	      </List>
	    </React.Fragment>

		);
	}

	

}

function CartContainer (props) {
	const classes = useStyles();
	let lista = props.lista;

	return(
		<Cart lista={lista} classes={classes} />
	);
}

export default function carrinho(props) {

	let lista = props.lista;


	return(
		<CartContainer lista={lista} />
	);

}
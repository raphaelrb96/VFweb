import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Pb from './Pb';
import MeuAppBar from './MeuAppBar';
import Final from './Final';
import firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ComputerIcon from '@material-ui/icons/Computer';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PetsIcon from '@material-ui/icons/Pets';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import BuildIcon from '@material-ui/icons/Build';
import WidgetsIcon from '@material-ui/icons/Widgets';
import Detalhes from './Detalhes.js';

import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

let listaProdutosPrincipal = Array();
let tamanho = 0;
let anonimato = true;
export let mFirebase;
export let mUser;
export let listaCompras = Array();

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyAJ52BXLUj_Jiq9yJ91indygVi27IrbSRE",
  authDomain: "ocapop-69f44.firebaseapp.com",
  databaseURL: "https://ocapop-69f44.firebaseio.com",
  projectId: "ocapop-69f44",
  storageBucket: "ocapop-69f44.appspot.com",
  messagingSenderId: "237281954777",
  appId: "1:237281954777:web:215eac98785e183dfae7c8",
  measurementId: "G-4CDZGKX2YN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let auth = () => {
	firebase.auth().onAuthStateChanged(
	user => {
		
	  if (user) {
	    // User is signed in.
	    mUser = user;
	    try {
          let app = firebase.app();
          mFirebase = firebase;         
          if (user.isAnonymous) {
		    	//usuario 'visitante', ou que ainda nao fez login
		    	anonimato = true;
		    	updateInterface(firebase, true);
		    } else {
		    	//usuario logado
		    	anonimato = false;
		    	updateInterface(firebase, false);
		    }

        } catch (e) {
          erro(e.message);
        }

	  } else {
	  	// user saiu ou ocorreu algum erro
	  	loginAnonimo();
	  }
	},
	erro => {
		// user saiu ou ocorreu algum erro
		loginAnonimo();
	}
	);
}

auth();


let erro = error =>  {
	if (error === null || error === undefined) {
		error = 'Erro';
	}
	alert(error);
}

let loginAnonimo = () => {
	firebase.auth().signInAnonymously().catch(error => {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  if (errorCode === 'auth/operation-not-allowed') {
	    alert('Libere o login anonimo no Firebase Console.');
	  } else {
	    erro(errorMessage);
	  }
	});
}

let showInterfaceMain = (tamanho, prods, isAnonimo) => {

	let urlParams = new URLSearchParams(window.location.search);

	if (urlParams.has('prod')) {
		let i;
		for (i = 0; i < prods.length; i++) {
			let item = prods[i];
			if (item.get('idProduto') === urlParams.get('prod')) {
				break;
			}
		}
		const elemento = <Detalhes size={tamanho} produtos={prods} isAnonimo={isAnonimo} index={i} />
   		ReactDOM.render(elemento, document.getElementById('root'));
	} else if (urlParams.has('carrinho')) {
		abrirCart();
	} else if (urlParams.has('cat')) {
		
		if (listaProdutosPrincipal === null || listaProdutosPrincipal === undefined || listaProdutosPrincipal.length == 0) {
			updateInterface(firebase, anonimato);
		} else {
			let listaCateg = Array();
			for (var i = 0; i < listaProdutosPrincipal.length; i++) {
				let produto = listaProdutosPrincipal[i];
				let prodCateg = produto.get('categorias');
				for(var key in prodCateg) {
					if (key === urlParams.get('cat')) {
						listaCateg.push(produto);
					}
				}
				
			}

			listaCateg = misturar(listaCateg);

			const element = <App size={tamanho} produtos={listaCateg} isAnonimo={isAnonimo} />

			ReactDOM.render(element, document.getElementById('conteudo'));
		}

	} else {
		const element = <App size={tamanho} produtos={prods} isAnonimo={isAnonimo} />

		ReactDOM.render(element, document.getElementById('conteudo'));
	}
	window.fbq('init', '2638954186391320');
      window.fbq('track', 'PageView');
	
}

export function limparListaDeCompra () {
	if (listaCompras === null || listaCompras === undefined) {
		return;
	}
	listaCompras = null;
	listaCompras = Array();
}

export function setListaCompras (listOn) {
	listaCompras = listOn;
}

export function addObjcEmLista (obj) {
	listaCompras.push(obj);
}

export function atualizarProdutoCarrinho (obj, idProdut) {

	console.log('atualizarProdutoCarrinho');

	const db = firebase.firestore();

	db.collection('carComprasActivy')
		.doc('usuario')
		.collection(mUser.uid)
		.doc(idProdut)
		.set(obj);
}

export function addToCart(documento, idProd) {
	const db = firebase.firestore();
	db.settings({timestampsInSnapshots: true});

	addObjcEmLista(documento);

	db.collection('carComprasActivy')
		.doc('usuario')
		.collection(mUser.uid)
		.doc(idProd)
		.set(documento);

	let listaIds = Array();
    listaIds.push(documento.idProdut);

	
	window.fbq('track', 'AddToCart', {
	    value: documento.valorUni,
	    currency: 'BRL',
	    contents: [
	        {
	            id: documento.idProdut,
	            quantity: 1
	        }
	    ],
	    content_ids: listaIds,
	    content_type: 'product',
	}); 

	mFirebase.analytics().logEvent('add_to_cart', {
                items: [
                  {
                    price: documento.valorUni,
                    name: documento.produtoName,
                    id: documento.idProdut,
                    creative_slot: documento.caminhoImg,
                    creative_name: documento.caminhoImg
                  }
                ],
                currency: 'BRL',
                value: documento.valorUni
              }); 

	abrirCart();
}

export function removeToCart (idProdut) {

	console.log('removeToCart');

	const db = firebase.firestore();

	db.collection('carComprasActivy')
		.doc('usuario')
		.collection(mUser.uid)
		.doc(idProdut)
		.delete();
}

function reformarLista(antigaLista) {

	let novaLista = Array();

	for (var i = 0; i < antigaLista.length; i++) {
		let item = antigaLista[i];
		let obj = {
				caminhoImg: item.get('caminhoImg'),
				idProdut: item.get('idProdut'),
				labo: item.get('labo'),
				produtoName: item.get('produtoName'),
				quantidade: item.get('quantidade'),
				valorTotal: item.get('valorTotal'),
				valorUni: item.get('valorUni')
			};
		novaLista.push(obj);
	}

	listaCompras = novaLista;

	return novaLista;
}

export function abrirCart() {

	if (mUser === undefined || mUser === null) {
		auth();
		return;
	} else if (listaProdutosPrincipal === null || listaProdutosPrincipal.length == 0) {
		updateInterface(firebase, anonimato);
		return;
	}


	if (listaCompras.length >= 1 && listaCompras !== null && listaCompras !== undefined) {
		window.fbq('track', 'InitiateCheckout');
		mFirebase.analytics().logEvent('begin_checkout', {currency: 'BRL', value: 0});

		ReactDOM.render(<Final lista={listaCompras} /> , document.getElementById('root'));

	} else {
		
		ReactDOM.render(<Pb />, document.getElementById('root'));


		const db = firebase.firestore();
		db.settings({timestampsInSnapshots: true});

		db.collection('carComprasActivy')
						.doc('usuario')
						.collection(mUser.uid)
						.get()
						.then(querySnapshot => {

							if (querySnapshot === null || querySnapshot === undefined) {
								returnInterfaceMain();
								
							} else {

								let prods = reformarLista(querySnapshot.docs);
								let tamanho = querySnapshot.size;


								if (tamanho == 0) {
									alert('Seu carrinho de compras está vazio.');
									returnInterfaceMain();

								} else {
									window.fbq('track', 'InitiateCheckout');
									ReactDOM.render(<Final lista={prods} /> , document.getElementById('root'));

								}

							}

						})
						.catch(error => {
							returnInterfaceMain();
						});
	}
}

export function returnInterfaceMain () {



	window.history.pushState("ocashop", "Ocashop", "/");


	ReactDOM.render(<MeuAppBar />, document.getElementById('root'));


	const elem = <App size={tamanho} produtos={listaProdutosPrincipal} isAnonimo={anonimato} />;

	setTimeout(()=> {
		if (document.getElementById('conteudo') === null || document.getElementById('conteudo') === undefined) {
			returnInterfaceMain();
			return;
		}
		ReactDOM.render(elem, document.getElementById('conteudo'));
	}, 300);

	
}


let updateInterface = (firebase, isAnonimo) => {

	const db = firebase.firestore();
	db.settings({timestampsInSnapshots: true});

	db.collection("produtos")
		.limit(100)
		.get()
		.then(querySnapshot => {
			let prods = querySnapshot.docs;
			tamanho = querySnapshot.size;

			console.log(tamanho);
			console.log(prods);
		
			listaProdutosPrincipal = querySnapshot.docs;

			if (listaProdutosPrincipal === null || listaProdutosPrincipal === undefined) {
				console.log('lista result nulla');
			} else {
				showInterfaceMain(tamanho, listaProdutosPrincipal, isAnonimo);
			}

			

		})
		.catch(error => {
			erro(error.message);
		});

}

function misturar(array) {
  var m = array.length, t, i;

  while (m) {
    
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export const navegarCategoria = (categoria) => {
	if (listaProdutosPrincipal === null || listaProdutosPrincipal === undefined || listaProdutosPrincipal.length == 0) {
		updateInterface(firebase, anonimato);
	} else {
		let listaCateg = Array();
		for (var i = 0; i < listaProdutosPrincipal.length; i++) {
			let produto = listaProdutosPrincipal[i];
			let prodCateg = produto.get('categorias');
			for(var key in prodCateg) {
				if (key === categoria) {
					listaCateg.push(produto);
				}
			}
			
		}

		listaCateg = misturar(listaCateg);

		showInterfaceMain(listaCateg.length, listaCateg, mUser.isAnonymous);

		 window.history.pushState("detalhes", "Detalhes", "/?cat=" + categoria);

		console.log('Atualizado');

	}
}

export const mainListItems = (
  <div>
    <ListItem button onClick={abrirCart}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Meu Carrinho" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Categorias</ListSubheader>
    <ListItem button onClick={() => navegarCategoria('1')}>
      <ListItemIcon>
        <PhoneAndroidIcon />
      </ListItemIcon>
      <ListItemText primary="Celular" />
    </ListItem>
    <ListItem button onClick={() => navegarCategoria('2')}>
      <ListItemIcon>
        <ComputerIcon />
      </ListItemIcon>
      <ListItemText primary="Computador" />
    </ListItem>
    <ListItem button onClick={() => navegarCategoria('3')}>
      <ListItemIcon>
        <SportsEsportsIcon />
      </ListItemIcon>
      <ListItemText primary="Video Game" />
    </ListItem>
    <ListItem button onClick={() => navegarCategoria('4')}>
      <ListItemIcon>
        <PetsIcon />
      </ListItemIcon>
      <ListItemText primary="Petshop" />
    </ListItem>
    <ListItem button onClick={() => navegarCategoria('15')}>
      <ListItemIcon>
        <EmojiObjectsIcon />
      </ListItemIcon>
      <ListItemText primary="Eletronicos" />
    </ListItem>
    <ListItem button onClick={() => navegarCategoria('16')}>
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Ferramentas" />
    </ListItem>
    <ListItem button onClick={() => navegarCategoria('18')}>
      <ListItemIcon>
        <WidgetsIcon />
      </ListItemIcon>
      <ListItemText primary="Diversos" />
    </ListItem>
  </div>
); 

ReactDOM.render(<MeuAppBar />, document.getElementById('root'));

ReactDOM.render(<Pb />, document.getElementById('conteudo'));

if (window.fbq === null) {
	console.log('fbq null');
} else if (window.fbq === undefined) {
	console.log('fbq undefined');
} else {
	console.log('fbq ok');
}
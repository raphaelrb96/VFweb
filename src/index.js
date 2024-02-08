import { withRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";

import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import BlogPostPage from "views/BlogPostPage/BlogPostPage.js";
import BlogPostsPage from "views/BlogPostsPage/BlogPostsPage.js";
import ComponentsPage from "views/ComponentsPage/ComponentsPage.js";
import ContactUsPage from "views/ContactUsPage/ContactUsPage.js";
import EcommercePage from "views/EcommercePage/EcommercePage.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import PresentationPage from "views/PresentationPage/PresentationPage.js";
import PricingPage from "views/PricingPage/PricingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import ProductPage from "views/ProductPage/ProductPage.js";
import SectionsPage from "views/SectionsPage/SectionsPage.js";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import ErrorPage from "views/ErrorPage/ErrorPage.js";
import ComprarAgora from "views/Checkout/ComprarAgora.js";
import Dashboard from 'views/PainelRevendedor/Dashboard.js';
import CarrinhoRevendas from "views/Revendas/CarrinhoRevendas.js";
import Finalizacao from "views/FinalizarRevenda/Finalizacao.js";
import PainelAfiliados from "views/MeusAfiliados/PainelAfiliados.js";
import Cadastro from "views/Cadastro/Cadastro.js";
import ActivityMain from "views/NovaInterface/ActivityMain.js";

import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc, writeBatch } from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInAnonymously } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

export let listaProdutosPrincipal = Array();
export let totalCheckout = 0;
let tamanho = 0;
export let anonimato = true;
export let mUser = null;
export let mUid = '';
export let mApelido = '';
export let mPathFoto = '';
export let mCelular = '';
export let mUsuarioRegistrado = false;
export let mNome = '';
export let listaCompras = Array();

export let isRevendedor = false;

export let hist = createBrowserHistory();

// Your web app's Firebase configuration

export const firebaseConfig = {
  apiKey: "AIzaSyAtMQ-oTpBa3YNeLf8DTRYdKWDQxMXFuvE",
  authDomain: "venda-favorita.firebaseapp.com",
  databaseURL: "https://venda-favorita.firebaseio.com",
  projectId: "venda-favorita",
  storageBucket: "venda-favorita.appspot.com",
  messagingSenderId: "978500802251",
  appId: "1:978500802251:web:1aad0e093739f59969ed4e",
  measurementId: "G-EK2ZQP9BKK"
};

// Initialize Firebase
export const mApp = initializeApp(firebaseConfig);
const firedb = getFirestore(mApp);

let auth = () => {
  getAuth().onAuthStateChanged(
    user => {

      if (user) {
        // User is signed in.
        try {
          mUser = user;
          mUid = user.uid;
          verificarUsuario();
          authRevenda();
          if (user.isAnonymous) {
            //usuario 'visitante', ou que ainda nao fez login
            anonimato = true;
            //updateInterface(firebase, true);
            console.log('usuario anonimo');

          } else {
            //usuario logado
            anonimato = false;
            //updateInterface(firebase, false);
            console.log('usuario logado');
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


export let verificarUsuario = () => {


  if (mUser.isAnonymous) {

    console.log('anonimato');
    return;

  }

  const docm = doc(firedb, "Usuario", mUid);

  onSnapshot(docm, doc => {

    if (doc === null || doc === undefined) {
      //cadastrar Usuario
      //abrirFormulario();
      mUsuarioRegistrado = false;
      console.log('Cadastar user');

    } else {

      if (doc.get('userName') === null || doc.get('userName') === undefined) {
        mUsuarioRegistrado = false;

        //abrirFormulario();
        console.log('Cadastrar user');
      } else {

        mApelido = doc.get('userName');
        mPathFoto = doc.get('pathFoto');
        mCelular = doc.get('celular');
        mNome = mUser.displayName;
        mUsuarioRegistrado = true;
        console.log('user cadastrado: ' + mApelido);

      }

    }
  });


}


let authRevenda = () => {

  const refDoc = doc(firedb, "Revendedores", 'amacompras', 'ativos', mUid);

  onSnapshot(refDoc, doc => {
    if (doc === null || doc === undefined) {
      console.log('Não é revendedor');
      isRevendedor = false;
    } else {

      if (doc.exists) {
        console.log('É revendedor');
        isRevendedor = true;

        if (isRevendedor && !anonimato && window.location.pathname === '/login') {
          abrirPaginaRevenda();
          console.log('abrir painel');
        }



      } else {
        console.log('Não é revendedor');
        isRevendedor = false;
      }


    }
  });
}

auth();

export let solicitacaoRevendedor = (nome, zap, obs, user) => {


  if (zap.length < 7) {
    erro('Insira os 8 digitos do seu whatsapp');
    return;
  }

  let obj = {
    nome: user.displayName,
    zap: zap,
    obs: obs,
    userName: user.displayName,
    email: user.email,
    foto: user.photoURL,
    uid: user.uid,
    timestamp: Date.now()
  };

  const refDoc = doc(firedb, 'Revendedores', 'amacompras', 'ativos', mUid);
  setDoc(refDoc, obj);

  abrirPainelRevendas();

}

let erro = error => {
  if (error === null || error === undefined) {
    error = 'Erro';
  }
  alert(error);
}

export function revenderProduto(documento, idProd) {


  const refDoc = doc(firedb, 'listaRevendas', 'usuario', mUid, idProd);
  setDoc(refDoc, documento);

  abrirListaRevenda();

}

export function addToCart(documento, idProd) {

  const refDoc = doc(firedb, 'carComprasActivy', 'usuario', mUid, idProd);
  setDoc(refDoc, documento);

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

  getAnalytics().logEvent('add_to_cart', {
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

let loginAnonimo = () => {
  signInAnonymously(getAuth()).catch(error => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === 'auth/operation-not-allowed') {

    } else {
      erro(errorMessage);
    }
  });
}

export let loginGoogle = () => {
  let providerGoogle = new GoogleAuthProvider();
  getAuth().languageCode = 'pt';
  getAuth().signInWithPopup(providerGoogle).then(result => {
    let user = result.user;
    console.log(user.displayName);
    window.location.reload();
  }).catch(error => {

  });
}

export let loginGoogleMaster = () => {
  let providerGoogle = new GoogleAuthProvider();
  getAuth().languageCode = 'pt';
  getAuth().signInWithPopup(providerGoogle).then(result => {
    let user = result.user;
    mUid = user.uid;
    abrirPainelRevendas();
    //solicitacaoRevendedor(user.displayName, zap, '', user);
  }).catch(error => {
    console.log(error);
    loginGoogleMaster();
  });
}

export let loginFace = () => {
  var provider = new FacebookAuthProvider();
  getAuth().languageCode = 'pt';
  provider.setCustomParameters({
    'display': 'popup'
  });
  getAuth().signInWithPopup(provider).then(result => {
    let user = result.user;
    console.log(user.displayName);
    window.location.reload();
  }).catch(error => {

  });
}

export let loginFaceMaster = () => {
  var provider = new FacebookAuthProvider();
  getAuth().languageCode = 'pt';
  provider.setCustomParameters({
    'display': 'popup'
  });
  getAuth().signInWithPopup(provider).then(result => {
    let user = result.user;
    mUid = user.uid;
    abrirPainelRevendas();
    //abrirPaginaRevenda();
    //solicitacaoRevendedor(user.displayName, zap, '', user);
  }).catch(error => {
    loginFaceMaster();
  });
}

export let signOut = () => {
  getAuth().signOut().then(function () {
    // Sign-out successful.
    window.location.reload();
  }).catch(function (error) {
    // An error happened.
  });
}

export function removeToCart(idProdut) {

  const refDoc = doc(firedb, 'carComprasActivy', 'usuario', mUser.uid, idProdut);
  deleteDoc(refDoc);

  //window.location.reload();
}

export function limparCart(list) {

  const batch = writeBatch(firedb);

  list.map(item => {
    const id = item.get('idProdut');
    const refDoc = doc(firedb, 'listaRevendas', 'usuario', mUser.uid, id);
    batch.delete(refDoc);
  });

  batch.commit();

};

export function removerDaRevenda(idProdut) {

  const refDoc = doc(firedb, 'listaRevendas', 'usuario', mUser.uid, idProdut);
  deleteDoc(refDoc);

  //window.location.reload();
}

export function atualizarProdutoRevenda(obj, idProdut) {

  const refDoc = doc(firedb, 'listaRevendas', 'usuario', mUser.uid, idProdut);
  setDoc(refDoc, obj);

}

export function atualizarProdutoCarrinho(obj, idProdut) {

    const refDoc = doc(firedb, 'carComprasActivy', 'usuario', mUser.uid, idProdut);
    setDoc(refDoc, obj);
}

export let abriCategoria = cat => {
  hist.push('/?catg=' + cat);
}

export let abrirMeuPerfil = () => {
  hist.push('/perfil');
}

export let abrirFormulario = () => {
  hist.push('/formulario');
}

export let ganheDinheiro = () => {
  abrirPaginaRevenda();
}

export let abrirCart = () => {
  hist.push('/carrinho');
}

export let abrirListaRevenda = () => {
  hist.push('/revenda');
}

export let abrirCheckput = (t) => {
  totalCheckout = t;
  hist.push('/comprar-agora');
}

export let abrirPainelRevendas = () => {
  hist.push('/revendedor');
}

export let verMinhasComissoes = () => {
  hist.push('/comissoes');
}

export let verMeusAfiliados = () => {
  hist.push('/afiliados');
}

export let interfaceMain = () => {
  hist?.push('/');
  //window?.location.reload();
}

export let homepage = () => {
  hist.push('/');
}

export let interfaceFinal = () => {
  hist.push('/concluir');
}

export let voltar = () => {
  hist.goBack();
}

export let abrirPaginaRevenda = () => {
  hist.push('/ganhe-dinheiro');
}

export let finalizarRevenda = (state) => {
  if(state) {
    hist.push('/finalizar-venda', state);
  } else {
    hist.push('/finalizar-venda');
  }
  
}

export let abrirLogin = () => {
  hist.push('/cadastro');
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

  } else if (urlParams.has('carrinho')) {

  } else if (urlParams.has('cat')) {

    if (listaProdutosPrincipal === null || listaProdutosPrincipal === undefined || listaProdutosPrincipal.length == 0) {
      //updateInterface(firebase, anonimato);
    } else {
      let listaCateg = Array();
      for (var i = 0; i < listaProdutosPrincipal.length; i++) {
        let produto = listaProdutosPrincipal[i];
        let prodCateg = produto.get('categorias');
        for (var key in prodCateg) {
          if (key === urlParams.get('cat')) {
            listaCateg.push(produto);
          }
        }

      }



      //const element = <App size={tamanho} produtos={listaCateg} isAnonimo={isAnonimo} />

      //ReactDOM.render(element, document.getElementById('conteudo'));
    }

  } else {
    //const element = <App size={tamanho} produtos={prods} isAnonimo={isAnonimo} />

    //ReactDOM.render(element, document.getElementById('conteudo'));
  }
  window.fbq('init', '2638954186391320');
  window.fbq('track', 'PageView');

}


ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/update" component={withRouter(ActivityMain)} />
      <Route path="/cadastro" component={withRouter(Cadastro)} />
      <Route path="/formulario" component={withRouter(SignupPage)} />
      <Route path="/perfil" component={withRouter(ProfilePage)} />
      <Route path="/ganhe-dinheiro" component={withRouter(LandingPage)} />
      <Route path="/carrinho" component={withRouter(ShoppingCartPage)} />
      <Route path="/error-page" component={withRouter(ErrorPage)} />
      <Route path="/comprar-agora" component={withRouter(ComprarAgora)} />
      <Route path="/revenda" component={withRouter(CarrinhoRevendas)} />
      <Route path="/finalizar-venda" component={withRouter(Finalizacao)} />
      <Route path="/" component={withRouter(ActivityMain)} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

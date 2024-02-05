/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import Favorite from "@material-ui/icons/Favorite";
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CustomInput from "components/CustomInput/CustomInput.js";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.js";

import image from "assets/img/bg0.jpg";

import Pb from 'views/my/Pb';

import { abrirMeuPerfil, mUser, mUid, mApelido, mPathFoto, mCelular, mNome, mUsuarioRegistrado, abrirPainelRevendas, verificarUsuario, abrirLogin} from 'index.js';

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const useStyles = makeStyles(signupPageStyle);

let meuApelido = '';
let meuContato = '';

function setMeuApelido (valor) {
    meuApelido = valor.target.value;
}

function setContato (valor) {
    meuContato = valor.target.value;
}

function verificarDados() {


    if (meuApelido.length === 0) {

        alert('Insira seu apelido');
        return false;

    }

    if (meuContato.length < 8) {
        alert('Insira todos os digitos do seu número');
        return false;
    }

    console.log(meuContato);
    console.log(meuApelido);

    return true;

}


class FormularioDeCadastro extends React.Component {


  constructor(props) {
    super(props);

    console.log('(constructor) mUsuarioRegistrado: ' + mUsuarioRegistrado);

    this.state = {
      loading: true
    };

    this.analizar = this.analizar.bind(this);
    this.verificarApelido = this.verificarApelido.bind(this);
    this.salvarDados = this.salvarDados.bind(this);
    this.verificarRegistro = this.verificarRegistro.bind(this);
  }


  verificarApelido() {

    getFirestore()
      .collection("Usuario")
      .where("userName", "==", meuApelido)
      .get()
      .then(querySnapshot => {

        if (querySnapshot === null || querySnapshot === undefined) {
          // apelino nao existe
          console.log('apelido nao existe, é nulo ou indefinido');
          this.salvarDados();
        } else {


          if (querySnapshot.size > 0) {

            //apelido existe
            this.setState({
              loading: false
            });
            console.log('apelido ja existe');
            alert('Esse apelido ja existe, você precisa de um apelido unico... Tente outro nome');
            

          } else {

            //apelido nao existe
            this.salvarDados();
            console.log('apelido nao existe, nenhuma busca encontrada');

          }


        }
      });


  }

  verificarRegistro(usr) {

    if (usr.isAnonymous) {
        abrirLogin();
    }

    getFirestore()
      .collection("Usuario")
      .doc(usr.uid)
      .get()
      .then(doc => {
        if (doc !== null || doc !== undefined) {



          if (doc.get('userName') === null || doc.get('userName') === undefined) {
            //abrirPainelRevendas();

            this.setState({
              loading: false
            })

          } else {
            abrirMeuPerfil();
            //abrirPainelRevendas();
          }
          
        }
      });

  }


  salvarDados() {

    let documentoPrincipalUsuario = {
        userName: meuApelido.toLowerCase(),
        nome: mUser.displayName,
        email: mUser.email,
        celular: meuContato,
        controleDeVersao: 2,
        uid: mUid,
        pathFoto: mUser.photoURL,
        tipoDeUsuario: 2,
        provedor: 'Site',
        ultimoLogin: Date.now(),
        primeiroLogin: Date.now(),
        tokenFcm: '',
        endereco: null,
        uidAdm: '',
        usernameAdm: '',
        nomeAdm: '',
        pathFotoAdm: '',
        admConfirmado: false
    };

    let obj = {
      nome: mUser.displayName,
      zap: meuContato,
      obs: '',
      userName: mUser.displayName,
      email: mUser.email,
      foto: mUser.photoURL,
      uid: mUid,
      timestamp: Date.now()
    };

    const db = getFirestore();
    db.settings({timestampsInSnapshots: true});
    let batch = db.batch();

    let userRef = db.collection("Usuario").doc(mUid);
    let revRef = db.collection('Revendedores').doc('amacompras').collection('ativos').doc(mUid);

    batch.set(userRef, documentoPrincipalUsuario);
    batch.set(revRef, obj);

    batch.commit().then(() => {

      verificarUsuario();

      abrirPainelRevendas();
    });

  }


  analizar() {

    if (meuApelido.length === 0) {

        alert('Insira seu apelido');
        return;

    }

    if (meuContato.length < 8) {
        alert('Insira todos os digitos do seu número');
        return;
    }

    let apelidoFormatado = '';

    for(let i = 0; i < meuApelido.length; i++) {
        let char = meuApelido[i];

        if (char === ' ') {
           char = '_';
        }

        apelidoFormatado = apelidoFormatado + char;

    }

    meuApelido = apelidoFormatado.toLowerCase();

    

    console.log(meuContato);
    console.log(meuApelido);

    this.setState({
      loading: true
    });

    this.verificarApelido();

  }

  componentDidMount() {
    if (mUser === null || mUser === undefined || mUser.isAnonymous) {

        getAuth().onAuthStateChanged(user => {
          if (user) {
            // User is signed in.
            
            this.verificarRegistro(user);

          }
        });

      } else {

        this.verificarRegistro(mUser);

      }
  }

  render() {

    let classes = this.props.classes;

    let elemento = null;

    console.log('(render) mUsuarioRegistrado: ' + mUsuarioRegistrado);

    if (this.state.loading) {

      elemento = (<Pb />);

    } else {

      elemento = (
          <div 
              style={{
                  marginTop: '50px'
              }} 
              className={classes.textCenter}>
          <Button onClick={this.analizar} round color="verde">
              Conluir
          </Button>
          </div>
      );
    }


    return(

        <div>
          
          <div
            
            style={{
              backgroundSize: "cover",
              backgroundPosition: "top center"
            }}
          >
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={10} md={10}>
                  <Card className={classes.cardSignup}>
                    <h2 className={classes.cardTitle}>Registrar</h2>
                    <CardBody>
                      <GridContainer justify="center">

                        <GridItem xs={12} sm={5} md={5}>

                          <InfoArea
                            className={classes.infoArea}
                            title="Lucro e crescimento"
                            description="Cadastre-se para acompanhar suas compras, vendas, recrutamentos, e toda sua evolução dentra da nossa plataforma"
                            icon={Timeline}
                            iconColor="danger"
                          />

                          <InfoArea
                            className={classes.infoArea}
                            title="Dinheiro e Monetização"
                            description="Ao se cadastrar você vai poder revender nossos produtos e ganhar comissões a cada venda"
                            icon={MonetizationOnIcon}
                            iconColor="danger"
                          />

                          <InfoArea
                            className={classes.infoArea}
                            title="Recrutamento de vendedores"
                            description="Você tambem pode ganhar dinheiro recrutando outros usuarios para vender nossos produtos e a cada venda que eles fizerem, você ganha R$ 5,00 reais POR VENDA"
                            icon={Group}
                            iconColor="danger"
                          />
                        </GridItem>

                        <GridItem xs={12} sm={5} md={5}>
                          <div className={classes.textCenter}>
                            
                            <h4 className={classes.socialTitle}>Preencha o formulario</h4>
                          </div>

                          <form className={classes.form}>
                            <CustomInput
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses
                              }}
                              inputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                  >
                                    <Face className={classes.inputAdornmentIcon} />
                                  </InputAdornment>
                                ),
                                placeholder: "Apelido...",
                                onChange: setMeuApelido
                              }}
                            />
                            <CustomInput
                              formControlProps={{
                                fullWidth: true,
                                className: classes.customFormControlClasses
                              }}
                              inputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                  >
                                    <ContactPhoneIcon className={classes.inputAdornmentIcon} />
                                  </InputAdornment>
                                ),
                                placeholder: "Telefone ou Whatsapp...",
                                onChange: setContato
                              }}
                            />
                            {elemento}
                          </form>
                        </GridItem>

                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
      
          </div>
        </div>

    );


  }

}

export default function SignUpPage({ ...rest }) {
  

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const classes = useStyles();

  return (
    <FormularioDeCadastro classes={classes} />
  );
}

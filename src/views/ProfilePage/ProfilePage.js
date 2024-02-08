/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import People from "@material-ui/icons/People";
import Add from "@material-ui/icons/Add";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Badge from "components/Badge/Badge.js";
import Muted from "components/Typography/Muted.js";
import Parallax from "components/Parallax/Parallax.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Media from "components/Media/Media.js";
import Button from "components/CustomButtons/Button.js";

import christian from "assets/img/faces/christian.jpg";
import oluEletu from "assets/img/examples/olu-eletu.jpg";
import clemOnojeghuo from "assets/img/examples/clem-onojeghuo.jpg";
import cynthiaDelRio from "assets/img/examples/cynthia-del-rio.jpg";
import mariyaGeorgieva from "assets/img/examples/mariya-georgieva.jpg";
import clemOnojegaw from "assets/img/examples/clem-onojegaw.jpg";
import darrenColeshill from "assets/img/examples/darren-coleshill.jpg";
import avatar from "assets/img/faces/avatar.jpg";
import marc from "assets/img/faces/marc.jpg";
import kendall from "assets/img/faces/kendall.jpg";
import cardProfile2Square from "assets/img/faces/card-profile2-square.jpg";

import Pb from 'views/my/Pb';

import {mFirebase, abrirFormulario, mUser, mUid, mApelido, mPathFoto, mCelular, mNome, mUsuarioRegistrado, abrirPainelRevendas, verificarUsuario} from 'index.js';


import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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

const useStyles = makeStyles(profilePageStyle);


class MeuPerfil extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      solicitacaoExistente: false,
      loading: true,
      apelido: '',
      pathFoto: '',
      celular: '',
      nome: '',
      email: '',
      uidAdm: '',
      usernameAdm: '',
      nomeAdm: '',
      pathFotoAdm: '',
      admConfirmado: false,
      user: null
    };

    this.verificarRegistro = this.verificarRegistro.bind(this);
    this.aceitar = this.aceitar.bind(this);
    this.recusar = this.recusar.bind(this);
  }

  verificarRegistro(usr) {

      const refDoc = doc(db, "Usuario", usr.uid);
      getDoc(refDoc).then(doc => {
          if (doc !== null || doc !== undefined) {



            if (doc.get('userName') === null || doc.get('userName') === undefined || doc.get('userName') === '') {
              //abrirPainelRevendas();
              abrirFormulario();

            } else {
              let apelido = doc.get('userName');
              let pathFoto = doc.get('pathFoto');
              let celular = doc.get('celular');
              let nome = usr.displayName;
              let email = usr.email;

              let possuiSolicitacao = false;

              if (doc.get('usernameAdm') !== undefined) {

                 if (doc.get('usernameAdm').length > 0) {


                    if (doc.get('admConfirmado') === true) {

                        //possui um adm confirmado

                    } else {

                        //possui uma solicitacao de adm
                        possuiSolicitacao = true;

                    }

                 }

              } else {
                  //nao possui nenhum adm
              }


              this.setState({
                loading: false,
                apelido: apelido,
                pathFoto: pathFoto,
                celular: celular,
                nome: nome,
                email: email,
                uidAdm: doc.get('uidAdm'),
                usernameAdm: doc.get('usernameAdm'),
                nomeAdm: doc.get('nomeAdm'),
                pathFotoAdm: doc.get('pathFotoAdm'),
                admConfirmado: doc.get('admConfirmado'),
                solicitacaoExistente: possuiSolicitacao,
                user: usr
              });
            }
            
          }
        });

  }

  aceitar() {

      let ref = getFirestore().collection("Usuario").doc(this.state.user.uid);
      ref.update({
        admConfirmado: true
      });

      this.setState({
        admConfirmado: true,
        solicitacaoExistente: false
      });

  }

  recusar() {
    let ref = getFirestore().collection("Usuario").doc(this.state.user.uid);
      ref.update({
        admConfirmado: false,
        uidAdm: '',
        usernameAdm: '',
        nomeAdm: '',
        pathFotoAdm: ''
      });

      this.setState({
        admConfirmado: false,
        solicitacaoExistente: false,
        admConfirmado: false,
        uidAdm: '',
        usernameAdm: '',
        nomeAdm: '',
        pathFotoAdm: ''
      });

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
    let navImageClasses = this.props.navImageClasses;
    let imageClasses = this.props.imageClasses;

    let elemento;

    let containerSolicitacao = null;

    if (this.state.solicitacaoExistente) {

      containerSolicitacao = (

          <Media
                key={Math.random() * Date.now()}
                avatar={this.state.pathFotoAdm}
                style={{margin: '30px'}}
                title={
                  <span>
                    @{this.state.usernameAdm} deseja se tornar seu ADM
                  </span>
                }
                body={
                  <span>
                    <p>
                      Aceite para que ele ganhe comissões a cada venda que você fizer... Aproveite e convide novas pessoas tambem !
                    </p>
                  </span>
                }
                footer={
                  <div>
                    <Tooltip
                      id="tooltip-tina2"
                      title="Reply to comment"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        onClick={() => (this.aceitar())}
                        color="danger"
                        simple
                        className={classes.floatRight}
                      >
                         Aceitar
                      </Button>
                    </Tooltip>
                    <Button
                      onClick={() => (this.recusar())}
                      simple
                      color="primary"
                      className={classes.floatRight}
                    >
                       Recusar
                    </Button>
                  </div>
                }
              />

      );

    } else {

        if (this.state.admConfirmado) {

            containerSolicitacao = (

          <Media
                key={Math.random() * Date.now()}
                avatar={this.state.pathFotoAdm}
                style={{margin: '30px'}}
                title={
                  <span>
                    @{this.state.usernameAdm}
                  </span>
                }
                body={
                  <span>
                   
                      Administrador/Recrutador
                    
                  </span>
                }
              />

      );

        }

    }

    if (this.state.loading) {

      elemento = (

        <div>
          <br/>
          <Pb />
          <br/>
        </div>

      );


    } else {


      elemento = (

        <div>

          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.profile}>
                <div>
                  <img src={this.state.pathFoto} alt="..." className={imageClasses} />
                </div>
                <div className={classes.name}>
                  <h3 className={classes.title}>{this.state.nome}</h3>
                  <h4>{'@' + this.state.apelido}</h4>
                </div>
              </div>
            </GridItem>
          </GridContainer>

          <div className={classNames(classes.description, classes.textCenter)}>
            <p>
              {this.state.email}
            </p>

            <div>
              <Button onClick={() => (abrirPainelRevendas())}  fullWidth >Abrir painel de revendas</Button>;
            </div>

            <br/>
            <br/>

          </div>
        </div>

      );


    }


    return(

      <div style={{
        paddingBottom: '50px'
      }} >
        <div style={{minHeight: '100px'}} className={classNames(classes.main, classes.mainRaised)}>
          {elemento}
        </div>

        {containerSolicitacao}

      </div>

    );


  }


}


export default function ProfilePage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  return (
    <MeuPerfil classes={classes} imageClasses={imageClasses} navImageClasses={navImageClasses} />
  );
}

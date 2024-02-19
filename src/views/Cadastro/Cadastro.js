import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from "components/CustomButtons/Button.js";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Endereco from 'views/FinalizarRevenda/Endereco.js';
import FormaPagamento from 'views/FinalizarRevenda/FormaPagamento.js';
import Resumo from 'views/FinalizarRevenda/Resumo.js';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Check from '@material-ui/icons/Check';
import clsx from 'clsx';

import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import StepConnector from '@material-ui/core/StepConnector';
import CardBody from "components/Card/CardBody.js";
import Media from "components/Media/Media.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Face from "@material-ui/icons/Face";
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import Tooltip from "@material-ui/core/Tooltip";


import ArrowBackIcon from '@material-ui/icons/ArrowBack';



import { voltar, totalCheckout, abrirPainelRevendas, abrirMeuPerfil } from "index.js";
import { mUser, mUid } from 'index.js';
import { interfaceMain } from 'index.js';
import Pb from 'views/my/Pb';
import { collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where, writeBatch } from 'firebase/firestore';
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { abrirLogin } from 'index';
import { Grid } from '@material-ui/core';


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
const auth = getAuth(app);

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(5),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    marginTop: 16
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    background: '#1A237E',
    cursor: 'pointer', '&:hover, &:focus, &:active': {
      background: '#1A237E'
    },
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  textCenter: {
    textAlign: "center"
  },
  form: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1
  },
  containerLogin: {
  },
  titleMain: {
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    marginTop: theme.spacing(6),
    color: '#1A237E',
    fontWeight: "bold",
    textAlign: "center"
  }
}));


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#1A237E',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#1A237E',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#1A237E',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#060D51',
    zIndex: 1,
    fontSize: 18,
  },
});




let verificarDados = () => {
  if (mApelido === '') {
    alert('Insira seu apelido');
    return false;
  } else if (mContato === '') {
    alert('Insira seu contato');
    return false;
  }

  return true;
}

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};


const steps = ['Login', 'Cadastro', 'Confirmação'];




const finalTitulo = ['Concluindo venda', 'Obrigado por ganhar conosco.'];
const finalDescricao = ['Aguarde um pouco, estamos Confirmando sua venda, é rápido', 'Agora é so pedi pro seu cliente aguardar a encomenda. Geralmente nossa entrega costuma demorar entre 60 a 90 minutos. Se seu cliente tiver sem pressa ok, mas se ele estiver precisando receber a mercadoria com mais urgencia você pode me avisar pelo whatsapp 92 99191-3525 !']


let mApelido = '';
let mContato = '';

function setMeuApelido(valor) {
  mApelido = valor.target.value;
}

function setContato(valor) {
  mContato = valor.target.value;
}

class Conclusao extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      pb: true,
      usuario: null,
      activeStep: 0,
      user: null,
      adm: null
    }

    this.carregarUsuario = this.carregarUsuario.bind(this);
    this.loginFace = this.loginFace.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.carregarDadosAdm = this.carregarDadosAdm.bind(this);

    this.analizar = this.analizar.bind(this);
    this.verificarApelido = this.verificarApelido.bind(this);
    this.salvarDados = this.salvarDados.bind(this);

    //colocar pra analisar o apelido e iniciar o processo de cadastro

  }

  verificarApelido() {

    let meuApelido = mApelido;

    const q = query(collection(db, 'Usuario'), where("userName", "==", mApelido));
    getDocs(q).then(querySnapshot => {

      console.log(querySnapshot);

      if (querySnapshot.docs === null || querySnapshot.docs === undefined) {
        // apelino nao existe
        console.log('apelido nao existe, é nulo ou indefinido');

        this.salvarDados();

      } else {

        console.log(querySnapshot.size);

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

  salvarDados() {

    let { user } = this.state;

    let documentoPrincipalUsuario = {
      userName: mApelido.toLowerCase(),
      nome: user.displayName,
      email: user.email,
      celular: mContato,
      controleDeVersao: 2,
      uid: user.uid,
      pathFoto: user.photoURL,
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
      nome: user.displayName,
      zap: mContato,
      obs: '',
      userName: user.displayName,
      email: user.email,
      foto: user.photoURL,
      uid: user.uid,
      timestamp: Date.now()
    };

    const batch = writeBatch(db);

    let userRef = doc(db, "Usuario", user.uid);
    let revRef = doc(db, 'Revendedores', 'amacompras', 'ativos', user.uid);

    batch.set(userRef, documentoPrincipalUsuario);
    batch.set(revRef, obj);

    batch.commit().then(() => {

      //verificarUsuario();

      //abrirPainelRevendas();

      this.setState({
        loading: true
      });

      this.carregarDadosAdm();

    });

  }

  analizar() {

    if (mApelido.length === 0) {

      alert('Insira seu apelido');
      return;

    }

    if (mContato.length < 8) {
      alert('Insira todos os digitos do seu número');
      return;
    }

    let apelidoFormatado = '';

    for (let i = 0; i < mApelido.length; i++) {
      let char = mApelido[i];

      if (char === ' ') {
        char = '_';
      }

      apelidoFormatado = apelidoFormatado + char;

    }

    mApelido = apelidoFormatado.toLowerCase();



    console.log(mContato);
    console.log(mApelido);

    this.setState({
      loading: true
    });

    this.verificarApelido();

  }

  loginFace() {
    var provider = new FacebookAuthProvider();
    getAuth().languageCode = 'pt';
    getAuth().signInWithPopup(provider).then(result => {
      let user = result.user;
      this.setState({
        //usuario ta logado
        activeStep: 1,
        user: user,
        pb: true
      });
      this.carregarUsuario(user);
    }).catch(error => {

    });
  }

  async loginGoogle() {
    this.setState({
      pb: true
    });
    const providerGoogle = new GoogleAuthProvider();
    auth.languageCode = 'pt';

    await signInWithRedirect(auth, providerGoogle);

    const result = await getRedirectResult(auth);

    if (result) {
      // This is the signed-in user
      const user = result.user;
      this.setState({
        //usuario ta logado
        activeStep: 1,
        user: user,
        pb: true
      });
      this.carregarUsuario(user);
    } else {
      this.setState({
        pb: false
      });
    }
  }

  carregarDadosAdm() {

    let urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('adm')) {

      let adm = urlParams.get('adm');

      console.log(adm);

      const q = query(collection(db, 'Usuario'), where("userName", "==", adm));

      getDocs(q).then(querySnapshot => {
        if (querySnapshot === null || querySnapshot === undefined) {
          // apelino nao existe
          abrirPainelRevendas();

        } else {

          console.log(querySnapshot[0]);
          console.log(querySnapshot.docs[0]);

          if (querySnapshot.size > 0) {

            this.setState({
              loading: false,
              adm: querySnapshot.docs[0],
              activeStep: 2
            });


          } else {

            abrirPainelRevendas();
          }
        }
      });

    } else {
      abrirPainelRevendas();
    }

  }

  carregarUsuario(usr) {

    if (usr.isAnonymous) {

      this.setState({
        //container login
        //usuario nao ta logado
        activeStep: 0,
        user: usr,
        pb: false
      });

      return;
    }

    const refDocUsuario = doc(db, 'Usuario', usr.uid);
    getDoc(refDocUsuario).then(doc => {

      if (doc !== null || doc !== undefined) {

        if (doc.get('userName') === null || doc.get('userName') === undefined || doc.get('userName') === '') {

          this.setState({
            //container formulario
            //usuario ta logado, mas nao tem cadastro
            activeStep: 1,
            usuario: doc,
            user: usr,
            pb: false
          });

          //this.carregarDadosAdm();

          return;

        } else {

          if (doc.data().admConfirmado) {
            abrirPainelRevendas();
            return;
          }

          this.setState({
            //container solicitacao adm
            //usuario ta logado, ja ta castrado mas não tem adm
            activeStep: 2,
            usuario: doc,
            user: usr,
            pb: false
          });

          this.carregarDadosAdm();

          return;

        }

      } else {

        this.setState({
          //container formulario
          //usuario ta logado, mas nao tem cadastro
          activeStep: 1,
          pb: false,
          user: usr
        });

        //this.carregarDadosAdm();

        return;

      }
    });
  }


  componentDidMount() {

    getAuth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.

        this.carregarUsuario(user);

      } else {
        abrirLogin();
      }
    });


  }

  aceitar() {

    this.setState({ loading: true });

    const ref = doc(db, "Usuario", this.state.user.uid);

    updateDoc(ref, {
      admConfirmado: true,
      uidAdm: this.state.adm.get('uid'),
      usernameAdm: this.state.adm.get('userName'),
      nomeAdm: this.state.adm.get('nome'),
      pathFotoAdm: this.state.adm.get('pathFoto')
    }).then(() => {
      abrirMeuPerfil();
    });

  }

  recusar() {

    abrirPainelRevendas();

  }

  render() {

    let { classes } = this.props;

    let { usuario, pb, activeStep } = this.state;



    let containerLogin = (

      <CardBody className={classes.containerLogin}>

        <h3 className={classes.textCenter}>Seus dados estão seguros</h3>

        <h5 className={classes.textCenter}>Faça a Autenticação para poder revender nossos produtos. Pedimos sua identificação atraves das redes sociais para manter um relacionamento mais seguro. So teremos acesso a dados públicos como: e-mail, nome, foto do perfil...</h5>

        <br />
        <h3 className={classes.textCenter}> <strong>FAÇA SUA AUTENTICAÇÃO</strong></h3>
        <br />

        <div className={classes.textCenter}>

          <Button onClick={() => this.loginGoogle()} round color="verdin">
            <i className="fab fa-google" />
            <Typography style={{ paddingLeft: 10 }}>
              Com Google
            </Typography>

          </Button>


        </div>

      </CardBody>

    );


    let containerFormulario = (

      <form className={classes.form}>

        <h3 className={classes.textCenter}>Insira seus dados abaixo</h3>

        <h5 className={classes.textCenter}>Crie um apelido unico e exclusivamente seu. Assim você será reconhecido na Amacompras ! E lembre-se de insiri um número pra contato</h5>


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

        <div
          style={{
            marginTop: '50px'
          }}
          className={classes.textCenter}>
          <Button onClick={this.analizar} round color="verde">
            Continuar
          </Button>
        </div>

      </form>

    );

    let containerSolicitacao = null;

    if (this.state.adm !== null && this.state.adm !== undefined) {
      containerSolicitacao = (

        <Media
          key={Math.random() * Date.now()}
          avatar={this.state.adm.get('pathFoto')}
          style={{ margin: '30px' }}
          title={
            <span>
              @{this.state.adm.get('userName')} deseja se tornar seu ADM
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
    }



    let containerMain = null;

    switch (activeStep) {

      default:

        break;

      case 0:
        containerMain = containerLogin;
        break;

      case 1:
        containerMain = containerFormulario;
        break;

      case 2:
        containerMain = containerSolicitacao;
        break;

    }

    console.log(this.state)


    return (

      <Grid container justifyContent='center' className={classes.container}>

        <Grid item xs={12} sm={9} md={7}>
          <Typography className={classes.titleMain} variant='h2'>Venda Favorita</Typography>
        </Grid>



        <Grid item xs={12} sm={9} md={7} className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h3" variant="h4" align="center">
              Liberar Acesso
            </Typography>
            <Stepper activeStep={activeStep} connector={<QontoConnector />} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {pb === true ? (
                <Pb />
              ) : (
                <React.Fragment>
                  {containerMain}
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Grid>

      </Grid>

    );


  }

}

export default function Cadastro(props) {

  const classes = useStyles();

  return (

    <Conclusao classes={classes} />

  );


}
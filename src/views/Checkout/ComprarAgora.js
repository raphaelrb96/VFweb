import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Endereco from 'views/Checkout/Endereco.js';
import FormaPagamento from 'views/Checkout/FormaPagamento.js';
import Resumo from 'views/Checkout/Resumo.js';
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

import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import {voltar, totalCheckout} from "index.js";
import { mUser, mUid} from 'index.js';
import {interfaceMain} from 'index.js';
import Pb from 'views/my/Pb';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';




const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginTop: '100px',
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
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    background: '#ff0000',
    cursor: 'pointer', '&:hover, &:focus, &:active': {
      background: '#ff0000'
    },
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#ff0000',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#ff0000',
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
    color: '#ff0000',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#ff0000',
    zIndex: 1,
    fontSize: 18,
  },
});

export let objectCompraFinal = {
  adress: '',
  complemento: '',
  detalhePag: '',
  formaDePagar: 4,
  hora: 0,
  lat: 0,
  listaDeProdutos: [],
  lng: 0,
  phoneUser: '',
  tipoDeEntrega: 1,
  uidUserCompra: '',
  userNome: '',
  pathFotoUser: '',
  valorTotal: 0,
  frete: 0,
  compraValor: 0,
  statusCompra: 0,
  idCompra: ''
};

export function setPagamento(valor) {
  objectCompraFinal.formaDePagar = valor;
}

export function setRua(valor) {
  objectCompraFinal.adress = valor.target.value;
}

export function setBairro(valor) {
  objectCompraFinal.complemento = valor.target.value;
}

export function setTelefone(valor) {
  objectCompraFinal.phoneUser = valor.target.value;
}

export function setNomeUser(valor) {
  objectCompraFinal.userNome = valor.target.value;
}

let preencherListaDeCompras = listaCompras => {
  objectCompraFinal.listaDeProdutos = listaCompras;
  objectCompraFinal.hora = Date.now();
  objectCompraFinal.uidUserCompra = mUser.uid;

  objectCompraFinal.idCompra = mUid + '_' + objectCompraFinal.hora;

  let soma = 0;

  objectCompraFinal.listaDeProdutos.map((item,index) => {


        let tt = item.valorUni * item.quantidade;
        soma = soma + tt;

  });

  objectCompraFinal.valorTotal = soma;
  objectCompraFinal.compraValor = soma;
}

let verificarDados = () => {
  if (objectCompraFinal.userNome === '') {
    alert('Insira seu nome');
    return false;
  } else if (objectCompraFinal.adress === '') {
    alert('Insira sua rua');
    return false;
  } else if(objectCompraFinal.complemento === '') {
    alert('Insira seu bairro');
    return false;
  } else if (objectCompraFinal.phoneUser.length < 8) {
    alert('Insira seu número completo');
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


const steps = ['Endereço', 'Pagamento', 'Confirmação'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Endereco />;
    case 1:
      return <FormaPagamento />;
    case 2:
      return <Resumo />;
    default:
      throw new Error('Unknown step');
  }
}


const finalTitulo = ['Concluindo compra', 'Obrigado por comprar conosco.'];
const finalDescricao = ['Aguarde um pouco, estamos Confirmando sua compra, é rápido', 'Agora é so aguardar sua encomenda. Geralmente nossa entrega costuma demorar entre 60 a 90 minutos. Se você tiver sem pressa ok, se estiver precisando receber a mercadoria com mais urgencia você pode me avisar pelo whatsapp 92 99191-3525 !']

class ConfirmacaoCompra extends React.Component {


  constructor(props) {
      super(props);
      const db = getFirestore();
      db.settings({timestampsInSnapshots: true});

      let batch = db.batch();


      let novaListaProdutos = Array();


      props.objeto.listaDeProdutos.map(item => {
         let id = item.get('idProdut');
         let refCart = db.collection('carComprasActivy').doc('usuario').collection(mUser.uid).doc(id);
         batch.delete(refCart);
         let objItem = {
           caminhoImg: item.get('caminhoImg'),
           produtoName: item.get('produtoName'),
           idProdut: item.get('idProdut'),
           labo: item.get('labo'),
           quantidade: item.get('quantidade'),
           valorTotal: item.get('valorTotal'),
           valorUni: item.get('valorUni')
         };
         novaListaProdutos.push(objItem);
      });


      let objtFim = {
        adress: objectCompraFinal.adress,
        complemento: objectCompraFinal.complemento,
        detalhePag: objectCompraFinal.detalhePag,
        formaDePagar: objectCompraFinal.formaDePagar,
        hora: objectCompraFinal.hora,
        lat: objectCompraFinal.lat,
        listaDeProdutos: novaListaProdutos,
        lng: objectCompraFinal.lng,
        phoneUser: objectCompraFinal.phoneUser,
        tipoDeEntrega: objectCompraFinal.tipoDeEntrega,
        uidUserCompra: objectCompraFinal.uidUserCompra,
        userNome: objectCompraFinal.userNome,
        pathFotoUser: objectCompraFinal.pathFotoUser,
        valorTotal: objectCompraFinal.valorTotal,
        frete: objectCompraFinal.frete,
        compraValor: objectCompraFinal.valorTotal,
        statusCompra: objectCompraFinal.statusCompra,
        idCompra: objectCompraFinal.idCompra
      };
      

      let refCompra = db.collection('Compras').doc(objectCompraFinal.idCompra);
      let refMinhaCompra = db.collection('MinhasCompras').doc('Usuario').collection(mUser.uid).doc(objectCompraFinal.idCompra);
      batch.set(refCompra, objtFim);
      batch.set(refMinhaCompra, objtFim);

      batch.commit().then(() => {
        //state2
        let itens = Array();
        objectCompraFinal.listaDeProdutos.map((item,index) => {


              let nome = item.get('produtoName');
              let valorUni = item.get('valorUni');
              let quantidade = item.get('quantidade');
              let id = item.get('idProdut');
              let path = item.get('caminhoImg');

              let obj = {
                price: valorUni,
                name: nome,
                quantity: quantidade,
                id: id,
                creative_slot: path,
                creative_name: path
              };

              itens.push(obj);

        });

        window.fbq('track', 'Purchase', {value: props.objeto.valorTotal, currency: 'BRL'});
        getAnalytics().logEvent('purchase', {
          transaction_id: props.objeto.idCompra,
          value: props.objeto.valorTotal,
          currency: 'BRL',
          shipping: 0,
          tax: 0,
          items: itens
        });
        this.setState({
              status: 1
            });

      }).catch(erro => {
        //state3
        alert('Algo está impedindo a gente receber sua solicitação de compra, tente novamente');
        //alert(erro);
        this.props.erro();
      });

      //state1
      this.state = {
            status: 0
          };
  }


  render() {

    let elementoPb = null;

    if (this.state.status === 0) {
      elementoPb = <Pb />;
    } else {
      elementoPb = <Button
                          style={{
                            marginTop: '10px',
                            backgroundColor: '#e00000',
                          }}
                          variant="contained"
                          color="primary"
                          onClick={interfaceMain}>
                          OK
                        </Button>;
    }

    return(

      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          {finalTitulo[this.state.status]}
        </Typography>
        <Typography >
          {finalDescricao[this.state.status]}
        </Typography>
        {elementoPb}
      </React.Fragment>

    );

  }

}


class Conclusao extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      valorTotal: 0,
      pb: true,
      activeStep: 0,
    }

    this.carregarCart = this.carregarCart.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }


  carregarCart(usr) {

    console.log(mUid);

    const db = getFirestore();
    db.settings({timestampsInSnapshots: true});

    db.collection('carComprasActivy')
            .doc('usuario')
            .collection(usr.uid)
            .onSnapshot(querySnapshot => {


              if (querySnapshot === null || querySnapshot === undefined) {


                this.setState({
                    lista: [],
                    valorTotal: 0,
                    pb: false
                  });



              } else {

                let prodsCart = querySnapshot.docs;

                if (prodsCart.length === 0) {


                  this.setState({
                    lista: [],
                    valorTotal: 0,
                    pb: false
                  });



                } else {

                  let somaTT = 0;

                  preencherListaDeCompras(prodsCart);

                  prodsCart.map(item => {
                    let precoTT = item.get('quantidade') * item.get('valorUni');
                    somaTT = somaTT + precoTT;
                  });

                  objectCompraFinal.valorTotal = somaTT;

                  this.setState({
                    lista: prodsCart,
                    valorTotal: somaTT,
                    pb: false
                  });

                }

              }


            });


  }

  handleNext () {
    if (this.state.activeStep === 0) {
      if (verificarDados()) {
        this.setState({
          activeStep: this.state.activeStep + 1
        });
      }
    } else {
      this.setState({
        activeStep: this.state.activeStep + 1
      });
    }
    
  }

  handleBack () {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  }

  componentDidMount() {

    if (mUser === null || mUser === undefined) {
      getAuth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          
          this.carregarCart(user);

        }
      });
    } else {
      this.carregarCart(mUser);
    }
    

  }


  render() {

    let {classes} = this.props;
    
    let {lista, valorTotal, pb, activeStep} = this.state;

    let componentTotal = null;

    if (pb) {
        componentTotal = null;
    } else {
        componentTotal = <h4 style={{marginRight: "20px"}} >Total: <b> {valorTotal},00</b></h4>;

    }

    if (!pb && lista.length === 0 && activeStep < 2) {
      interfaceMain();
    }


    return (
    <React.Fragment>
      <CssBaseline />
      
      <AppBar position="fixed" style={{
              top: 0,
              bottom: "auto",
              backgroundColor: "#e00000",
            }} >
          <Toolbar>
            <IconButton onClick={() => (voltar())} edge="start" color="inherit" aria-label="back">
              <ArrowBackIcon />
            </IconButton>
            
            
            <div style={{
                flexGrow: 1,
              }} />

            {componentTotal}
            
          </Toolbar>
        </AppBar>

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Concluir compra
          </Typography>
          <Stepper activeStep={activeStep} connector={<QontoConnector />} className={classes.stepper}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                  ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <ConfirmacaoCompra objeto={objectCompraFinal} erro={this.handleBack} />
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button variant="contained"
                    color="primary" onClick={this.handleBack} className={classes.button}>
                      Voltar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Fazer compra' : 'Continuar'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );


  }

}

export default function Checkout(props) {
  
  const classes = useStyles();

  return(

    <Conclusao classes={classes} />

  );

  
}
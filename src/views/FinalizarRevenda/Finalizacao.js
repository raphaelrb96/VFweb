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

import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import {voltar, totalCheckout} from "index.js";
import firebase from 'firebase';
import {mFirebase, mUser, mUid} from 'index.js';
import {interfaceMain} from 'index.js';
import Pb from 'views/my/Pb';




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
    background: '#1A237E',
    cursor: 'pointer', '&:hover, &:focus, &:active': {
      background: '#1A237E'
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

export let objectCompraFinal = {
  adress: '',
  complemento: '',
  detalhePag: '',
  formaDePagar: 4,
  hora: 0,
  lat: 0,
  listaDeProdutos: [],
  lng: 0,
  phoneCliente: '',
  nomeCliente: '',
  tipoDeEntrega: 1,
  uidUserRevendedor: '',
  userNomeRevendedor: '',
  pathFotoUserRevenda: '',
  comissaoTotal: 0,
  valorTotal: 0,
  frete: 0,
  compraValor: 0,
  statusCompra: 1,
  idCompra: '',
  vendaConcluida: false,
  pagamentoRecebido: false
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
  objectCompraFinal.phoneCliente = valor.target.value;
}

export function setNomeUser(valor) {
  objectCompraFinal.nomeCliente = valor.target.value;
}

let preencherListaDeCompras = listaCompras => {
  objectCompraFinal.listaDeProdutos = listaCompras;
  objectCompraFinal.hora = Date.now();
  objectCompraFinal.uidUserRevendedor = mUser.uid;

  objectCompraFinal.idCompra = mUid + '_' + objectCompraFinal.hora;

  let soma = 0;
  let somaComissao = 0;


  objectCompraFinal.listaDeProdutos.map((item,index) => {


        let tt = item.valorUniComComissao * item.quantidade;
        soma = soma + tt;

        let ttc = item.comissaoUnidade * item.quantidade;
        somaComissao = somaComissao + ttc;

  });

  objectCompraFinal.valorTotal = soma;
  objectCompraFinal.compraValor = soma;
  objectCompraFinal.comissaoTotal = somaComissao;
}

let verificarDados = () => {
  if (objectCompraFinal.nomeCliente === '') {
    alert('Insira o nome do cliente');
    return false;
  } else if (objectCompraFinal.adress === '') {
    alert('Insira a rua do cliente');
    return false;
  } else if(objectCompraFinal.complemento === '') {
    alert('Insira o bairro');
    return false;
  } else if (objectCompraFinal.phoneCliente.length < 8) {
    alert('Insira o número pra contato do cliente');
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
      setPagamento(4);
      return <FormaPagamento />;
    case 2:
      return <Resumo />;
    default:
      throw new Error('Unknown step');
  }
}


const finalTitulo = ['Concluindo venda', 'Obrigado por ganhar conosco.'];
const finalDescricao = ['Aguarde um pouco, estamos Confirmando sua venda, é rápido', 'Agora é so pedi pro seu cliente aguardar a encomenda. Geralmente nossa entrega costuma demorar entre 60 a 90 minutos. Se seu cliente tiver sem pressa ok, mas se ele estiver precisando receber a mercadoria com mais urgencia você pode me avisar pelo whatsapp 92 99191-3525 !']

class ConfirmacaoCompra extends React.Component {


  constructor(props) {
      super(props);

      this.verificarRegistro = this.verificarRegistro.bind(this);
      this.salvarRevenda = this.salvarRevenda.bind(this);
      //state1
      this.state = {
          status: 0,
          usuario: null
      };
  }


  salvarRevenda() {

      let props = this.props;

      const db = mFirebase.firestore();
      db.settings({timestampsInSnapshots: true});

      let batch = db.batch();


      let novaListaProdutos = Array();


      props.objeto.listaDeProdutos.map(item => {

         let id = item.get('idProdut');
         let refCart = db.collection('listaRevendas').doc('usuario').collection(mUser.uid).doc(id);
         batch.delete(refCart);
         //preencher novalistaprodutos pra arrumar o erro
         let objItem = {
            caminhoImg: item.get('caminhoImg'),
            idProdut: item.get('idProdut'),
            labo: item.get('labo'),
            produtoName: item.get('produtoName'),
            quantidade: item.get('quantidade'),
            valorTotal: item.get('valorTotal'),
            valorUni: item.get('valorUni'),
            valorUniComComissao: item.get('valorUniComComissao'),
            valorTotalComComissao: item.get('valorTotalComComissao') ,
            comissaoUnidade: item.get('comissaoUnidade'),
            comissaoTotal: item.get('comissaoTotal')
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
        phoneCliente: objectCompraFinal.phoneCliente,
        nomeCliente: objectCompraFinal.nomeCliente,
        tipoDeEntrega: objectCompraFinal.tipoDeEntrega,
        uidUserRevendedor: mUser.uid,
        userNomeRevendedor: mUser.displayName,
        pathFotoUserRevenda: mUser.photoURL,
        comissaoTotal: objectCompraFinal.comissaoTotal,
        valorTotal: objectCompraFinal.valorTotal,
        frete: objectCompraFinal.frete,
        compraValor: objectCompraFinal.compraValor,
        statusCompra: objectCompraFinal.statusCompra,
        idCompra: objectCompraFinal.idCompra,
        vendaConcluida: objectCompraFinal.vendaConcluida,
        pagamentoRecebido: objectCompraFinal.pagamentoRecebido,
        existeComissaoAfiliados: this.state.usuario.get('admConfirmado'),
        uidAdm: this.state.usuario.get('uidAdm')
      };
      

      let refCompra = db.collection('Revendas').doc(objectCompraFinal.idCompra);
      let refMinhaCompra = db.collection('MinhasRevendas').doc('Usuario').collection(mUser.uid).doc(objectCompraFinal.idCompra);

      if (this.state.usuario.get('admConfirmado') === true) {


          let comissaoRef = db.collection('ComissoesAfiliados').doc(objectCompraFinal.idCompra);
          let minhaComissaoRef = db.collection('MinhasComissoesAfiliados').doc('Usuario').collection(this.state.usuario.get('uidAdm')).doc(objectCompraFinal.idCompra);

          let tituloDaComissao = 'Venda da @' + mUser.displayName;
          let produtoAtual = '';

          props.objeto.listaDeProdutos.map((item, i) => {

          
             let objItem = {
                caminhoImg: item.get('caminhoImg'),
                idProdut: item.get('idProdut'),
                labo: item.get('labo'),
                produtoName: item.get('produtoName'),
                quantidade: item.get('quantidade'),
                valorTotal: item.get('valorTotal'),
                valorUni: item.get('valorUni'),
                valorUniComComissao: item.get('valorUniComComissao'),
                valorTotalComComissao: item.get('valorTotalComComissao') ,
                comissaoUnidade: item.get('comissaoUnidade'),
                comissaoTotal: item.get('comissaoTotal')
            };

            let prodAtual = objItem.quantidade + ' ' + objItem.produtoName;

            if (i > 0) {
              produtoAtual = produtoAtual + ', ' + prodAtual;
            } else {
              produtoAtual = prodAtual;
            }

          });

          let descricaoOficial = 'De ' + produtoAtual;


          let objComissaoAfiliados = {
            id: objtFim.idCompra,
            comissao: 5,
            titulo: tituloDaComissao,
            descricao: descricaoOficial,
            hora: objtFim.hora,
            uid: objtFim.uidUserRevendedor,
            nomeVendedor: objtFim.userNomeRevendedor,
            pathVendedor: objtFim.pathFotoUserRevenda,
            pagamentoRecebido: false,
            statusComissao: objtFim.statusCompra
          };


          batch.set(comissaoRef, objComissaoAfiliados);
          batch.set(minhaComissaoRef, objComissaoAfiliados);


      }

    

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

        mFirebase.analytics().logEvent('purchase', {
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


  }


  verificarRegistro(usr) {

    firebase.firestore()
      .collection("Usuario")
      .doc(usr.uid)
      .get()
      .then(doc => {
        if (doc !== null || doc !== undefined) {



          if (doc.get('userName') === null || doc.get('userName') === undefined) {
            //abrirPainelRevendas();


          } else {
            //abrirMeuPerfil();
            //abrirPainelRevendas();

            this.setState({
              usuario: doc
            });

          }
          
        }

        this.salvarRevenda();

      });

  }


  componentDidMount() {

    if (mUser === null || mUser === undefined) {
      firebase.auth().onAuthStateChanged(user => {
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

    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});

    db.collection('listaRevendas')
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

                  let somaComissao = 0;


                  objectCompraFinal.listaDeProdutos.map((item,index) => {


                        let tt = item.get('valorUniComComissao') * item.get('quantidade');
                        somaTT = somaTT + tt;

                        let ttc = item.get('comissaoUnidade') * item.get('quantidade');
                        somaComissao = somaComissao + ttc;

                  });

                  objectCompraFinal.valorTotal = somaTT;
                  objectCompraFinal.compraValor = somaTT;
                  objectCompraFinal.comissaoTotal = somaComissao;

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
      firebase.auth().onAuthStateChanged(user => {
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
        componentTotal = <h4 style={{marginRight: "20px"}}> Comissão: <b> {objectCompraFinal.comissaoTotal},00 </b> </h4>;


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
              backgroundColor: "#060D51",
              paddingTop: "7px",
              paddingBottom: "7px",
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
            Concluir venda
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
                    {activeStep === steps.length - 1 ? 'Finalizar venda' : 'Continuar'}
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
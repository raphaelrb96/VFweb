import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider, createTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Endereco from 'views/FinalizarRevenda/Endereco.js';
import Resumo from 'views/FinalizarRevenda/Resumo.js';
import IconButton from '@material-ui/core/IconButton';

import Rodape from 'views/my/Rodape';


import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import StepConnector from '@material-ui/core/StepConnector';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';



import { interfaceMain } from 'index.js';
import Pb from 'views/my/Pb';

import { getAnalytics, logEvent } from 'firebase/analytics';
import { Box, Card } from '@material-ui/core';
import { abrirLogin } from 'index';
import { abrirListaRevenda } from 'index';
import QontoStepIcon from './QontoStepIcon';
import { getListPagamentos } from 'util/Listas';
import { getListParcelamento } from 'util/Listas';
import { getListEntrega } from 'util/Listas';
import { getListaGarantia } from 'util/Listas';
import Cliente from './Cliente';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, writeBatch } from 'firebase/firestore';

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
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(5, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    marginTop: theme.spacing(6)
  },
  button: {
    borderRadius: 12,
    marginTop: theme.spacing(2),
    fontSize: 16,
    paddingTop: 6,
    paddingBottom: 6,
    height: 60
  },
  titleHead: {
    paddingLeft: theme.spacing(3),
    color: '#fff'
  },
}));

const theme = createTheme({
  palette: {
    background: {
      default: '#fff'
    },
    primary: {
      main: '#fff'
    },
    secondary: {
      light: '#004dcf',
      main: '#1A237E',
      dark: '#060D51',
    },
    inherit: {
      main: '#9a9a9a',
      light: '#ccc',
      dark: '#3C4858'
    }
  },
  overrides: {
    MuiMenuItem: {
      root: {
        backgroundColor: '#fff',
      },
      '&$selected': {
        backgroundColor: '#FFF'
      },
    },
    MuiTextField: {
      root: {
        backgroundColor: '#fff',
        // input label when focused
        "& label.Mui-focused": {
          color: '#1A237E',
          backgroundColor: '#fff'
        },
        // focused color for input with variant='outlined'
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: '#1A237E',
          },
          "&.Mui-focused": {
            backgroundColor: '#ffffff',

          },
        },
      },
      required: {
        backgroundColor: '#FFF'
      },
    },
    MuiIcon: {
      colorPrimary: "#fff"
    },
    MuiButton: {

    },
    MuiIconButton: {
      root: {
      },
      colorPrimary: {
        color: '#fff',
      }
    }
  },
});

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


const steps = ['Cliente', 'Endereço', 'Confirmação'];
const finalTitulo = ['Concluindo venda', 'Novo pedido enviado'];
const finalDescricao = ['Aguarde um pouco, estamos Confirmando sua venda, é rápido', 'Agora é so pedi pro seu cliente aguardar a encomenda. O prazo de entrega é de 1 a 3 horas. Se tiver pressa em receber a mercadoria com mais urgencia avise pelo whatsapp 92 99193-3525 !'];

export let objectCompraFinal = {
  adress: '',
  comissaoTotal: 0,
  complemento: '',
  compraValor: 0,
  detalhePag: '',
  formaDePagar: 4,
  frete: 0,
  hora: 0,
  idCompra: '',
  lat: 0,
  listaDeProdutos: [],
  lng: 0,
  nomeCliente: '',
  pagamentoRecebido: false,
  pathFotoUserRevenda: '',
  phoneCliente: '',
  statusCompra: 1,
  tipoDeEntrega: 1,
  uidUserRevendedor: '',
  userNomeRevendedor: '',
  valorTotal: 0,
  vendaConcluida: false,
  existeComissaoAfiliados: false,
  uidAdm: '',
  idCancelamento: 0,
  detalheCancelamento: '',
  garantiaFinal: null,
  entregaFinal: null,
  pagamentoFinal: null,
  parcelaFinal: null,
  cep: '69000000',
  cidade: 'Manaus',
  estado: 'Amazonas',
  obs: ''
};


const getListaDeProdutos = (lista) => {

  let novaListaProdutos = Array();

  lista.map(item => {

    //preencher novalistaprodutos pra arrumar o erro
    let objItem = {
      caminhoImg: item.get('caminhoImg'),
      comissaoTotal: item.get('comissaoTotal'),
      comissaoUnidade: item.get('comissaoUnidade'),
      idProdut: item.get('idProdut'),
      labo: item.get('labo'),
      produtoName: item.get('produtoName'),
      quantidade: item.get('quantidade'),
      valorTotal: item.get('valorTotal'),
      valorTotalComComissao: item.get('valorTotalComComissao'),
      valorUni: item.get('valorUni'),
      valorUniComComissao: item.get('valorUniComComissao'),
      modoPreco: item.get('modoPreco'),
      idModoPreco: item.get('idModoPreco'),
      quantidadeMinima: item.get('quantidadeMinima'),
      obs: item.get('obs')
    };

    novaListaProdutos.push(objItem);

  });

  return novaListaProdutos;
};

const updateValoresDocObjPedido = (listaCompras, state) => {

  let soma = 0;
  let somaComissao = 0;

  listaCompras.map((i, index) => {

    const item = i.data();

    const tt = item.valorUniComComissao * item.quantidade;
    soma = soma + tt;

    const ttc = item.comissaoUnidade * item.quantidade;
    somaComissao = somaComissao + ttc;

  });

  const { pagamento, parcelamento, entrega, garantia } = state;

  const listPagamento = getListPagamentos();
  const listaParcelamento = getListParcelamento(soma);
  const listEntrega = getListEntrega();
  const listGarantia = getListaGarantia(soma);

  const entregaSelecionada = listEntrega[entrega];
  const garantiaSelecidonada = listGarantia[garantia];
  const pagamentoSelecionada = listPagamento[pagamento];
  const parcelamentoSelecionado = listaParcelamento[parcelamento];

  const valorGarantia = garantiaSelecidonada.valor;
  const valorEntrega = entregaSelecionada.valor;
  const taxaParcela = parcelamentoSelecionado.total;



  let totalCalculo = valorGarantia + valorEntrega + soma;

  if (pagamentoSelecionada.id === 6
    || pagamentoSelecionada.id === 2
    || pagamentoSelecionada.id === 3) {
    totalCalculo = totalCalculo + taxaParcela;
  }

  return {
    ...objectCompraFinal,
    listaDeProdutos: listaCompras,
    valorTotal: totalCalculo,
    compraValor: totalCalculo,
    comissaoTotal: somaComissao,
    garantiaFinal: garantiaSelecidonada,
    entregaFinal: entregaSelecionada,
    pagamentoFinal: pagamentoSelecionada,
    parcelaFinal: parcelamentoSelecionado,
  };
};

const getDocObjPedido = (list, document, usuario, id) => {

  const objtFim = {
    ...document,
    hora: Date.now(),
    listaDeProdutos: list,
    uidUserRevendedor: usuario.uid,
    userNomeRevendedor: usuario.nome,
    pathFotoUserRevenda: usuario.pathFoto,
    existeComissaoAfiliados: usuario.admConfirmado,
    uidAdm: usuario.uidAdm,
    idCompra: id
  };

  return objtFim;
};

const getDocObjComissaoAfiliado = (objtFim, usuario) => {

  const tituloDaComissao = usuario?.vipDiamante ? 'Bônus Diamanete' : 'Venda de ' + objtFim.userNomeRevendedor;
  const descricaoOficial = objtFim.listaDeProdutos[0].quantidade + ' ' + objtFim.listaDeProdutos[0].produtoName;

  const objComissaoAfiliados = {
    id: objtFim.idCompra,
    comissao: 5,
    titulo: tituloDaComissao,
    descricao: descricaoOficial,
    hora: objtFim.hora,
    uidVendedor: objtFim.uidUserRevendedor,
    nomeVendedor: objtFim.userNomeRevendedor,
    pathVendedor: objtFim.pathFotoUserRevenda,
    pagamentoRecebido: false,
    statusComissao: objtFim.statusCompra
  };

  return objComissaoAfiliados;
}

const verificarDados = (activeStep, state) => {

  const { document } = state;

  if (activeStep === 0) {

    if (document.nomeCliente === '') {
      alert('Insira o nome do cliente');
      return false;
    } else if (document.phoneCliente.length < 8) {
      alert('Insira o número pra contato do cliente');
      return false;
    }

  } else if (activeStep === 1) {
    if (document.adress === '') {
      alert('Insira a rua do cliente');
      return false;
    } else if (document.complemento === '') {
      alert('Insira o bairro');
      return false;
    }
  }



  return true;
};

const trackerPixelAnalytics = (listaDeProdutosFinal, docFinal) => {
  let itens = Array();
  listaDeProdutosFinal.map((item, index) => {


    let nome = item.produtoName;
    let valorUni = item.valorUni;
    let quantidade = item.quantidade;
    let id = item.idProdut;
    let path = item.caminhoImg;

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

  //window.fbq('track', 'Purchase', { value: docFinal.valorTotal, currency: 'BRL' });

  logEvent(getAnalytics(), 'purchase', {
    transaction_id: docFinal.idCompra,
    value: docFinal.valorTotal,
    currency: 'BRL',
    shipping: 0,
    tax: 0,
    items: itens
  });
};

const getStepContent = (step, state, setState) => {
  switch (step) {
    case 0:
      return <Cliente state={state} setState={setState} />;
    case 1:
      return <Endereco state={state} setState={setState} />;
    case 2:
      return <Resumo state={state} setState={setState} />;
    default:
      throw new Error('Unknown step');
  }
};



function ViewSteps({ activeStep, classes }) {
  return (
    <Stepper activeStep={activeStep} connector={<QontoConnector />} className={classes.stepper}>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
};

function ViewContent({ activeStep, state, setState }) {
  return getStepContent(activeStep, state, setState);
};

function ViewBottom({ classes, handleBack, handleNext, activeStep }) {
  return (
    <Box className={classes.buttons}>

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        startIcon={<CheckOutlinedIcon fontSize="large" />}
        onClick={handleNext}
        className={classes.button}>
        {activeStep === steps.length - 1 ? 'Finalizar venda' : 'Continuar'}
      </Button>

      {activeStep !== 0 && (
        <Button
          variant="text"
          color="inherit"
          fullWidth
          onClick={handleBack}
          className={classes.button}>
          Voltar
        </Button>
      )}

    </Box>
  );
};

function MyAppBar({ classes, pb, total }) {

  const componentTotal = pb ? null : <Typography variant='subtitle2' style={{ marginRight: "20px", color: '#fff' }}> Total: <b> {total.toFixed(0)},00 </b> </Typography>;


  return (
    <AppBar position="fixed" style={{
      top: 0,
      bottom: "auto",
      backgroundColor: "#060D51",
    }} >
      <Toolbar>
        <IconButton onClick={() => (abrirListaRevenda())} edge="start" color="primary" aria-label="back">
          <ArrowBackIcon />
        </IconButton>

        <Typography noWrap variant="subtitle2" className={classes.titleHead}>
          Concluir Pedido
        </Typography>

        <div style={{
          flexGrow: 1,
        }} />

        {componentTotal}

      </Toolbar>
    </AppBar>
  )
};

function ConfirmacaoCompra({ objeto, erro, state, status, salvar, classes }) {

  useEffect(() => {
    salvar();
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        {finalTitulo[status]}
      </Typography>
      <Typography >
        {state.error ? state.error : finalDescricao[status]}
      </Typography>
      {
        status === 0
          ?
          <Pb />
          :

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<CheckOutlinedIcon fontSize="large" />}
            onClick={() => interfaceMain()}
            className={classes.button}>
            Continuar
          </Button>
      }
    </React.Fragment>
  );

};

function Conclusao({ classes, state, setState, salvar }) {

  const { lista, pb, activeStep, document, status } = state;

  const { comissaoTotal, valorTotal } = document;

  if (!pb && lista.length === 0 && activeStep < 2) {
    interfaceMain();
  }

  const handleNext = () => {

    const next = () => {
      setState((prevState) => ({
        ...prevState,
        activeStep: activeStep + 1
      }));
    };

    if (activeStep !== 2) {
      if (verificarDados(activeStep, state)) {
        next();
      }
    } else {
      next();
    }

  };

  const handleBack = () => {

    const back = () => {
      setState((prevState) => ({
        ...prevState,
        activeStep: activeStep - 1
      }));
    };

    back();
  };

  return (
    <ThemeProvider theme={theme}>

      <MyAppBar classes={classes} pb={pb} total={valorTotal} />

      <main className={classes.layout}>
        <Card raised className={classes.paper}>
          <Typography component="h4" variant="h5" style={{ fontFamily: 'sans-serif' }} align="center">
            INFORMAÇÕES IMPORTANTES
          </Typography>
          <ViewSteps classes={classes} activeStep={activeStep} />
          <React.Fragment>
            {activeStep === steps.length ? (
              <ConfirmacaoCompra salvar={salvar} objeto={document} erro={handleBack} status={status} state={state} classes={classes} />
            ) : (
              <React.Fragment>
                <ViewContent activeStep={activeStep} state={state} setState={setState} />
                <ViewBottom classes={classes} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />
              </React.Fragment>
            )}
          </React.Fragment>
        </Card>
      </main>

      <Rodape />

    </ThemeProvider>
  );
};



export default function Checkout(props) {

  const classes = useStyles();

  const [state, setState] = useState({
    lista: [],
    pb: true,
    activeStep: 0,
    document: objectCompraFinal,
    usuario: null,
    status: 0
  });


  const returnEmpty = () => {
    setState((prevState) => ({
      ...prevState,
      lista: [],
      valorTotal: 0,
      pb: false
    }));

    abrirListaRevenda();
  };


  useEffect(() => {

    const { location } = props;
    if (!location?.state) {
      returnEmpty();
      return;
    } else {
      setState((prevState) => ({
        ...prevState,
        ...location.state
      }));
    }

    window?.scrollTo(0, 0);

    getAuth().onAuthStateChanged(async usr => {
      if (usr) {
        // User is signed in.

        const refDocUsuario = doc(db, 'Usuario', usr.uid);
        const docSnap = await getDoc(refDocUsuario);
        const docUsuario = docSnap.exists() ? docSnap.data() : null;

        if (!docUsuario) {
          abrirLogin();
        }

        setState((prevState) => ({
          ...prevState,
          usuario: docUsuario
        }));

        const refColl = collection(db, 'listaRevendas', 'usuario', usr.uid);

        const next = (querySnapshot) => {

          if (querySnapshot === null || querySnapshot === undefined) {

            returnEmpty()

          } else {

            const prodsCart = querySnapshot.docs;

            if (prodsCart.length === 0) {

              returnEmpty();

            } else {

              const docObj = updateValoresDocObjPedido(prodsCart, location.state);

              setState((prevState) => ({
                ...prevState,
                lista: prodsCart,
                pb: false,
                document: docObj
              }));

            }

          }

        };

        const error = (e) => {
          returnEmpty();
        };

        getDocs(refColl).then(next).catch(error);

      } else {
        abrirLogin();
      }

    });

  }, []);


  const salvarRevenda = () => {

    if (!state.usuario) {
      abrirLogin();
    }

    try {

      const listaDeProdutosFinal = getListaDeProdutos(state.lista);

      const batch = writeBatch(db);


      const refCompra = doc(collection(db, 'Revendas'));
      const idRef = refCompra.id;

      const novoStateDocument = state.document;
      novoStateDocument.listaDeProdutos = listaDeProdutosFinal;

      const docFinal = getDocObjPedido(listaDeProdutosFinal, novoStateDocument, state.usuario, idRef);

      const refMinhaCompra = doc(db, 'MinhasRevendas', 'Usuario', state.usuario.uid, idRef);

      batch.set(refCompra, docFinal);
      batch.set(refMinhaCompra, docFinal);

      listaDeProdutosFinal.map(item => {
        const idRemove = item.idProdut;
        const refCart = doc(db, 'listaRevendas', 'usuario', state.usuario.uid, idRemove);
        batch.delete(refCart);
      });

      if (state.usuario.admConfirmado) {
        const comissaoRef = doc(db, 'ComissoesAfiliados', idRef);
        const minhaComissaoRef = doc(db, 'MinhasComissoesAfiliados', 'Usuario', state.usuario.uidAdm, idRef);
        const docComissaoAfiliado = getDocObjComissaoAfiliado(docFinal);

        batch.set(comissaoRef, docComissaoAfiliado);
        batch.set(minhaComissaoRef, docComissaoAfiliado);

      }

      batch.commit().then(() => {
        //state2
        //trackerPixelAnalytics(listaDeProdutosFinal, docFinal);

        setState((prevState) => ({
          ...prevState,
          status: 1
        }));

      });

    } catch (error) {

      setState((prevState) => ({
        ...prevState,
        activeStep: state.activeStep - 1,
        status: 0,
      }));
      alert('Algo está impedindo a gente receber sua solicitação de compra, tente novamente');
    }

  };


  if (!state.pagamento) {

    return <Pb />;

  }

  return (

    <Conclusao classes={classes} state={state} setState={setState} salvar={salvarRevenda} />

  );


}
import MeuTolbar from 'views/my/MeuTolbar.js';
import FormEndereco from 'views/my/FormEndereco.js';
import Rodape from 'views/my/Rodape.js';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import clsx from 'clsx';
import StepConnector from '@material-ui/core/StepConnector';
import ReactDOM from 'react-dom';
import {mUser, mFirebase} from './index.js';
import {interfaceMain} from './index.js';
import Pb from 'views/my/Pb.js';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(12),
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
  	background: '#3dbea7',
  	cursor: 'pointer', '&:hover, &:focus, &:active': {
  		background: '#3dbea7'
  	},
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  step: {
    "& $completed": {
      color: "lightgreen"
    },
    "& $active": {
      color: "pink"
    },
    "& $disabled": {
      color: "red"
    }
  },
  alternativeLabel: {},
  active: {
  	background: "red"
  }, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
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
      borderColor: '#3dbea7',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#3dbea7',
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
    color: '#3dbea7',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#3dbea7',
    zIndex: 1,
    fontSize: 18,
  },
});

let objectCompraFinal = {
	adress: '',
	complemento: '',
	detalhePag: '',
	formaDePagar: 0,
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

let nCasa = '';

export function setRua(valor) {
	objectCompraFinal.adress = valor.target.value;
}

export function setCep(valor) {
	objectCompraFinal.complemento = valor.target.value;
}

export function setNumCasa(valor) {
	nCasa = valor.target.value;
}

export function setTelefone(valor) {
	objectCompraFinal.phoneUser = valor.target.value;
}

export function setNomeUser(valor) {
	objectCompraFinal.userNome = valor.target.value;
}

let verificarDados = (listaCompras) => {
	if (objectCompraFinal.userNome === '') {
		alert('Insira seu nome');
		return false;
	} else if (objectCompraFinal.adress === '') {
		alert('Insira sua rua');
		return false;
	} else if (nCasa === '') {
		alert('Insira o número da casa');
		return false;
	} else if(objectCompraFinal.complemento === '') {
		alert('Insira seu Cep');
		return false;
	} else if (objectCompraFinal.phoneUser.length < 8) {
		alert('Insira seu telefone');
		return false;
	} 

	objectCompraFinal.adress = objectCompraFinal.adress + ', número da casa: ' + nCasa; 
  objectCompraFinal.listaDeProdutos = listaCompras;
  objectCompraFinal.hora = Date.now();
  objectCompraFinal.uidUserCompra = mUser.uid;

  objectCompraFinal.idCompra = objectCompraFinal.userNome + '_' + objectCompraFinal.hora;

  let soma = 0;

  objectCompraFinal.listaDeProdutos.map((item,index) => {


        let tt = item.valorUni * item.quantidade;
        soma = soma + tt;

  });

  objectCompraFinal.valorTotal = soma;
  objectCompraFinal.compraValor = soma;

	return true;
}

const finalTitulo = ['Concluindo compra', 'Obrigado por comprar conosco.'];
const finalDescricao = ['Aguarde um pouco, estamos Confirmando sua compra, é rápido', 'Agora é so aguardar sua encomenda. Geralmente nossa entrega costuma demorar no maximo 3horas. Se você tiver sem pressa ok, se estiver precisando receber a mercadoria com mais urgencia você pode me avisar pelo whatsapp 92 99191-3525 !']

class ConfirmacaoCompra extends React.Component {


	constructor(props) {
      super(props);
      const db = mFirebase.firestore();
      db.settings({timestampsInSnapshots: true});

      let batch = db.batch();

      props.objeto.listaDeProdutos.map(item => {
         let id = item.idProdut;
         let refCart = db.collection('carComprasActivy').doc('usuario').collection(mUser.uid).doc(id);
         batch.delete(refCart);
      });

      

      let refCompra = db.collection('Compras').doc(props.objeto.idCompra);
      let refMinhaCompra = db.collection('MinhasCompras').doc('Usuario').collection(mUser.uid).doc(props.objeto.idCompra);
      batch.set(refCompra, props.objeto);
      batch.set(refMinhaCompra, props.objeto);

      batch.commit().then(() => {
        //state2
        let itens = Array();
        objectCompraFinal.listaDeProdutos.map((item,index) => {


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

        window.fbq('track', 'Purchase', {value: props.objeto.valorTotal, currency: 'BRL'});
        mFirebase.analytics().logEvent('purchase', {
          transaction_id: props.objeto.idCompra,
          value: props.objeto.valorTotal,
          currency: 'BRL',
          shipping: 0,
          tax: 0,
          items: itens
        });
        //limparListaDeCompra();
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
                          variant="contained"
                          color="primary"
                          onClick={interfaceMain}
                          className={this.props.classes.button}>
                          OK
                        </Button>;
    }

    return(

      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          {finalTitulo[this.state.status]}
        </Typography>
        <Typography variant="subtitle1">
          {finalDescricao[this.state.status]}
        </Typography>
        {elementoPb}
      </React.Fragment>

    );

  }

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

const steps = ['Carrinho', 'Endereço'];

function getStepContent(step, lista) {
  switch (step) {
    case 0:
      return <FormEndereco />;
    case 1:
    
  	  window.fbq('track', 'AddPaymentInfo');
      mFirebase.analytics().logEvent('add_payment_info');


      return <FormEndereco />;
    default:
      throw new Error('Unknown step');
  }
}

function Comp (props) {

	const classes = useStyles();

	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		if (activeStep === 1) {
			if (verificarDados(props.lista)) {
				setActiveStep(activeStep + 1);
			}
		} else {
			setActiveStep(activeStep + 1);
		}
	    
	};

  //window.history.pushState("carrinho", "Carrinho", "/?carrinho=clientevip");

	const handleBack = () => {
	    setActiveStep(activeStep - 1);
	};

  const error = () => {
    setActiveStep(1);
  }

	return(
		<React.Fragment>
			<CssBaseline />
			<MeuTolbar />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
			            Finalizar Compra
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
			              <React.Fragment>
			                <ConfirmacaoCompra objeto={objectCompraFinal} erro={error} classes={classes} />
			              </React.Fragment>
			            ) : (
			              <React.Fragment>
			                {

			                	getStepContent(activeStep, props.lista)

			                }
			                
			                <div className={classes.buttons}>
			                  {activeStep !== 0 && (
			                    <Button onClick={handleBack} variant="contained"
			                    color="primary" className={classes.button}>
			                      Voltar
			                    </Button>
			                  )}
			                  <Button
			                    variant="contained"
			                    color="primary"
			                    onClick={handleNext}
			                    className={classes.button}
			                  >
			                    {activeStep === steps.length - 1 ? 'Concluir Compra' : 'Continuar'}
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

export default function main(props) {
	return(
		<Comp lista={props.lista} />
	);
}
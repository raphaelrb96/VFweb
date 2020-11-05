import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.js";


function preventDefault(event) {
  event.preventDefault();
}

function Title(props) {
  return (
    <h3 style={{color: '#060D51'}} >
      <b>
      {props.children}
      </b>
    </h3>
  );
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  
  btIndisp: {
    color: "gray",
  },
});

export default function MiniCarteira(props) {
  const classes = useStyles();

  let btReceber = null;

  let textAuxiliar = 'Relatorio financeiro';

  if (props.timestamp !== null || props.timestamp !== undefined) {
      let dataString = new Date(props.timestamp);
      let sFor = dataString.toLocaleDateString() + ' às ' + dataString.toLocaleTimeString() + '  (Horario de Brasilia)';
      textAuxiliar = 'Ultima venda: ' + sFor;
  }

  

  if (props.total >= 100) {
    btReceber = <Button color="verdin" fullWidth >Receber dinheiro</Button>;
  } else {
    btReceber = <Link className={classes.btIndisp} >Saque indisponivel</Link>;
  }

  if (props.total === 0) {
    textAuxiliar = 'Faça uma venda para aumentar seu saldo !';
  }

  return (
    <React.Fragment>
      <Title>Finanças</Title>
      <Typography component="p" variant="h4">
        R${props.total},00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {textAuxiliar}
      </Typography>
      <div>
        {btReceber}
      </div>
    </React.Fragment>
  );
}
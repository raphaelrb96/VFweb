import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


// Generate Order Data
function createData(data, nome, numero, status, total) {
  return { data, nome, numero, status, total };
}

function getStatus(s) {

  if (s === 1) {
    return 'Confirmando';
  } else if (s === 2) {
    return 'Confirmada';
  } else if (s === 3) {
    return 'Cancelada';
  } else if (s === 4) {
    return 'Saiu pra entrega';
  } else if (s === 5) {
    return 'Concluida';
  } else {
    return 'Aguarde';
  }

}

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

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function UltimasVendas(props) {
  const classes = useStyles();

  let rows = Array();

  props.lista.map(item => {
     let daS = new Date(item.get('hora'));
     let da = daS.toLocaleDateString() + ' às ' + daS.toLocaleTimeString();
     const no = item.get('nomeCliente');
     const num = item.get('phoneCliente');
     const st = getStatus(item.get('statusCompra'));
     const to = item.get('comissaoTotal') + ',00';

     const row = createData(da, no, num, st, to);

     rows.push(row);

  });

  return (
    <React.Fragment>
      <Title>Vendas Recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Comissão</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
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
function createData(data, nome, status, total) {
  return { data, nome, status, total };
}

function getStatus(s) {

  if (s === 1) {
    return 'Em análise';
  } else if (s === 2) {
    return 'Em análise';
  } else if (s === 3) {
    return 'Em análise';
  } else if (s === 4) {
    return 'Em análise';
  } else if (s === 5) {
    return 'Concluida';
  } else {
    return 'Em análise';
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

  props.comissoes.map(item => {
     let daS = new Date(item.get('hora'));
     let da = daS.toLocaleDateString() + ' às ' + daS.toLocaleTimeString();
     const no = item.get('nomeVendedor');
     const st = getStatus(item.get('statusComissao'));
     const to = item.get('comissao') + ',00';

     const row = createData(da, no, st, to);

     rows.push(row);

  });

  return (
    <React.Fragment>
      <Title>Comissões de Afiliados</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Vendedor</TableCell>
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
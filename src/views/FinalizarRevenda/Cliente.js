import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { setTelefone, setNomeUser, objectCompraFinal } from 'views/FinalizarRevenda/Finalizacao.js';

export default function Cliente({ state, setState }) {


  const setTelefone = (event) => {

    const v = event.target.value;

    setState((prevState) => ({
      ...prevState,
      document: {
        ...prevState.document,
        phoneCliente: v
      }
    }));

  };

  const setNomeUser = (event) => {

    const v = event.target.value;

    setState((prevState) => ({
      ...prevState,
      document: {
        ...prevState.document,
        nomeCliente: v
      }
    }));

  };

  const setObs = (event) => {

    const v = event.target.value;

    setState((prevState) => ({
      ...prevState,
      document: {
        ...prevState.document,
        obs: v
      }
    }));

  };

  return (
    <React.Fragment>
      
      <Typography variant="h6" style={{marginBottom: 20}} gutterBottom>
        Cliente
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            label="Nome do cliente"
            variant='outlined'
            fullWidth
            defaultValue={state.document.nomeCliente}
            onChange={setNomeUser}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant='outlined'
            onChange={setTelefone}
            label="Número do cliente"
            fullWidth
            defaultValue={state.document.phoneCliente}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant='outlined'
            onChange={setObs}
            label="Observações"
            fullWidth
            defaultValue={state.document.obs}
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function Endereco({ state, setState }) {

  const setRua = (event) => {

    const v = event.target.value;

    setState((prevState) => ({
      ...prevState,
      document: {
        ...prevState.document,
        adress: v
      }
    }));

  };

  const setBairro = (event) => {

    const v = event.target.value;

    setState((prevState) => ({
      ...prevState,
      document: {
        ...prevState.document,
        complemento: v
      }
    }));

  };

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

      <Typography variant="h6" style={{ marginBottom: 20 }} gutterBottom>
        Endereço
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12}>
          <TextField
            required
            variant='outlined'
            label="Rua e N° da casa"
            onChange={setRua}
            fullWidth
            defaultValue={state.document.adress}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={setBairro}
            label="Bairro"
            required
            variant='outlined'
            defaultValue={state.document.complemento}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            variant='outlined'
            label="Cidade"
            fullWidth
            disabled
            defaultValue="Manaus"
          />
        </Grid>
        <Grid item xs={12} >
          <TextField id="state" name="estado" label="Estado" variant='outlined' disabled defaultValue="Amazonas" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            label="País"
            fullWidth
            disabled
            defaultValue="Brasil"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
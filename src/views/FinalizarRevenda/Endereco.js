import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {setRua, setBairro, setTelefone, setNomeUser, objectCompraFinal} from 'views/FinalizarRevenda/Finalizacao.js';

export default function Endereco() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informações importantes
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="firstName"
            name="PrimeiroNome"
            label="Nome do cliente"
            fullWidth
            defaultValue={objectCompraFinal.userNome}
            onChange={setNomeUser}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onChange={setTelefone}
            id="phone"
            name="phone"
            label="Número do cliente"
            fullWidth
            defaultValue={objectCompraFinal.phoneUser}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Nome da rua"
            onChange={setRua}
            fullWidth
            defaultValue={objectCompraFinal.adress}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="bairro"
            onChange={setBairro}
            name="bairro"
            label="Bairro"
            required
            defaultValue={objectCompraFinal.complemento}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            required
            id="city"
            name="cidade"
            label="Cidade"
            fullWidth
            disabled
            defaultValue="Manaus"
          />
        </Grid>
        <Grid item xs={12} >
          <TextField id="state" name="estado" label="Estado" disabled defaultValue="Amazonas" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="country"
            name="country"
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
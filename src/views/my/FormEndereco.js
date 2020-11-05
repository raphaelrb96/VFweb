import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {setRua, setCep, setNumCasa, setTelefone, setNomeUser} from './Final';

export default function main() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Endereço de Entrega
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="firstName"
            name="firstName"
            onChange={setNomeUser}
            label="Seu Nome"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="rua"
            name="rua"
            label="Nome da rua"
            onChange={setRua}
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="ncasa"
            name="ncasa"
            label="Número da casa"
            fullWidth
            onChange={setNumCasa}
            autoComplete="billing address-line2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={setCep}
            required
            id="cep"
            name="cep"
            label="CEP / Codigo Postal"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={setTelefone}
            required
            id="telefone"
            name="telefone"
            label="Telefone/Celular/Whatsapp"
            fullWidth
            autoComplete="billing phone"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
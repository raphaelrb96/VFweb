import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import { Button, Container, ThemeProvider, createTheme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
    marginTop: 26,
    marginBottom: 26,
    paddingBottom: 6,
    height: 60
  },
}));

const theme = createTheme({
  palette: {
    
    secondary: {
      light: '#004dcf',
      main: '#1A237E',
      dark: '#060D51',
    },
    
  },
  
});

export default function InputAgendamento({ state, setState }) {

  const classes = useStyles();


  const setChave = (event) => {

    const v = event.target.value;

    setState((prevState) => ({
      ...prevState,
      document: {
        ...prevState.document,
        chave: v
      }
    }));

  };

  const setTitular = (event) => {

    const v = event.target.value;

    setState((prevState) => ({
      ...prevState,
      document: {
        ...prevState.document,
        titular: v
      }
    }));

  };

  const setBanco = (event) => {

    const v = event.target.value;

    setState((prevState) => ({
      ...prevState,
      document: {
        ...prevState.document,
        banco: v
      }
    }));

  };

  return (
    <ThemeProvider theme={theme}>

      <Typography variant="h6" style={{ marginBottom: 20, textAlign: 'center' }} gutterBottom>
        Agendamento Do Pagamento
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12}>
          <TextField
            required
            label="Chave Pix"
            variant='outlined'
            fullWidth
            defaultValue={state.document.chave}
            onChange={setChave}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant='outlined'
            onChange={setTitular}
            label="Titular da Conta"
            fullWidth
            defaultValue={state.document.titular}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant='outlined'
            onChange={setBanco}
            label="Banco"
            fullWidth
            defaultValue={state.document.banco}
          />
        </Grid>

        <Container>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<CheckOutlinedIcon fontSize="large" />}
            onClick={() => { }}
            className={classes.button}>
            Agendar Saque
          </Button>
        </Container>

      </Grid>
    </ThemeProvider>
  );
}
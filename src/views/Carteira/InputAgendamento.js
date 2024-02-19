import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import { Button, Container, ThemeProvider, createTheme, makeStyles } from '@material-ui/core';
import Pb from 'views/my/Pb';
import { grayColor } from 'assets/jss/material-kit-pro-react';

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
    marginTop: 46,
    marginBottom: 46,
    paddingBottom: 6,
    height: 60
  },
  title: {
    marginBottom: 40,
    textAlign: 'center'
  }
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

export default function InputAgendamento({ state, setState, click }) {

  const classes = useStyles();

  function Prazo({ previsao }) {
    return (
      <Typography style={{textAlign: 'center', color: grayColor[12], marginBottom: 12}} variant='body2'>
        {(previsao === '') ? 'Aguardando Confirmação' : `PREVISÃO: ${previsao}`}
      </Typography>
    );
  }


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

  const componentExtra = state.emAndamento ? <Prazo previsao={state.emAndamento.previsao} /> : null;

  return (
    <ThemeProvider theme={theme}>

      <Typography variant="h6" className={classes.title} gutterBottom>
        Informações De Pagamento
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12}>
          <TextField
            required
            disabled={state.emAndamento}
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
            disabled={state.emAndamento}
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
            disabled={state.emAndamento}
            variant='outlined'
            onChange={setBanco}
            label="Banco"
            fullWidth
            defaultValue={state.document.banco}
          />
        </Grid>

        <Container>
          {
            state.load ?
              <Pb />
              :
              <Button
                variant="contained"
                color="secondary"
                disabled={state.emAndamento}
                fullWidth
                startIcon={!state.emAndamento ? <CheckOutlinedIcon fontSize="large" /> : null}
                onClick={click}
                className={classes.button}>
                {state.emAndamento ? 'Saque Em Andamento' : 'Agendar Saque'}
              </Button>
          }

          {componentExtra}

        </Container>

      </Grid>
    </ThemeProvider>
  );
}
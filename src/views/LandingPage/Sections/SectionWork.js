import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import {solicitacaoRevendedor, abrirLogin, mUser} from "index.js";

import workStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(workStyle);

let nome = '';
let zap = '';
let obs = '';


let handlerNome = event => {
  nome = event.target.value;
};

let handlerZap = event => {
  zap = event.target.value;
}

let handlerObs = event => {
  obs = event.target.value;
}

let analizarSolicitacao = (nome, zap, obs) => {
  
  solicitacaoRevendedor(nome, zap, obs);
  
}

function FormularioRevendedor(props) {

  let classes = props.classes;

  return(

      <form>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <CustomInput
                  labelText="Nome"
                  id="name"
                  inputProps={{
                    onChange: handlerNome
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <CustomInput
                  labelText="Whatsapp"
                  id="phone"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: handlerZap
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Conte-nos sobre suas habilidades"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  onChange: handlerObs
                }}
              />
              <GridItem
                xs={12}
                sm={4}
                md={4}
                className={classes.mrAuto + " " + classes.mlAuto}
              >
              </GridItem>
            </GridContainer>
          </form>

  );


}

export default function SectionWork() {
  const classes = useStyles();


  let elemento1 = (
    <a href = "https://api.whatsapp.com/send?phone=5592991933525">
      <Button color="verdin">Enviar Solicitação</Button>
    </a>
  );

  let elemento2 = (
    <Button onClick={() => (analizarSolicitacao(nome, zap, obs))} color="verdin">Enviar Solicitação</Button>
  );

  let elemento3 = (
    <a href="/revendedor">
      <Button color="verdin">Acessar painel do revendedor</Button>
    </a>
  );

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={8} md={8}>
          <h2 className={classes.title}>Entre agora pra equipe da VendaFavorita</h2>
          <h4 className={classes.description}>
            Aproveite agora mesmo, pois essa pode ser a ultima oportunidade de preencher uma das vagas... 
          </h4>
          <form>
            <GridContainer>
              <GridItem
                xs={12}
                sm={4}
                md={4}
                className={classes.mrAuto + " " + classes.mlAuto}
              >
              {elemento3}
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

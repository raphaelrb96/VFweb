import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import  from "@material-ui/icons/";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Muted from "components/Typography/Muted.js";
import Button from "components/CustomButtons/Button.js";

import cardProfile1Square from "assets/img/cherry_done.png";
import cardProfile2Square from "assets/img/carteira_oca.png";
import cardProfile4Square from "assets/img/sucess_prod.png";
import cardProfile6Square from "assets/img/welcome.png";

import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import teamStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/teamStyle.js";

const style = {
  ...teamsStyle,
  ...teamStyle,
  justifyContentCenter: {
    justifyContent: "center"
  }
};

const useStyles = makeStyles(style);

export default function SectionTeam() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Por que entrar pra equipe da VendaFavorita ?</h2>
      <div>
        <GridContainer>

          <GridItem xs={12} sm={6} md={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>

                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={cardProfile1Square} alt="..." />
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: `url(${cardProfile1Square})`,
                      }}
                    />
                  </CardHeader>
                </GridItem>

                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>Simplificando Vendas</h4>
                    <Muted>
                      <h6 className={classes.cardCategory}>Pra você e seus clientes</h6>
                    </Muted>
                    <p className={classes.description}>
                      A VendaFavorita criou um sistema que simplifica os 3 fatores principais de um venda: Produto/Entrega/Pagamento.
                    </p>
                  </CardBody>

                </GridItem>

              </GridContainer>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={cardProfile2Square} alt="..." />
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: `url(${cardProfile2Square})`,
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>Carteira Online</h4>
                    <Muted>
                      <h6 className={classes.cardCategory}>Historico das suas comissões</h6>
                    </Muted>
                    <p className={classes.description}>
                      Suas comissões estão em segurança na sua carteira online da VendaFavorita. Você encontra todo historico de vendas, valor a receber, alem do extrato completo de vendas e retiradas !
                    </p>
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={cardProfile4Square} alt="..." />
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: `url(${cardProfile4Square})`,
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>Produtos Em Alta</h4>
                    <Muted>
                      <h6 className={classes.cardCategory}>Excelencia em Vendas</h6>
                    </Muted>
                    <p className={classes.description}>
                      Site Pensado em você que tem o Dom da venda, mas que não tem acessibilidade a produtos de qualidade e um sistema de entrega eficaz...
                    </p>
                  </CardBody>
                  
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={cardProfile6Square} alt="..." />
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: `url(${cardProfile6Square})`,
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>Aréa Restrita e Limitada</h4>
                    <Muted>
                      <h6 className={classes.cardCategory}>Processo de seleção</h6>
                    </Muted>
                    <p className={classes.description}>
                      Pra manter nosso nivel de Excelencia, passamos todos os candidatos por um processo de seleção. Além do periodo de tempo limitado para inscrição, as vagas são extremamente restritas !
                    </p>
                  </CardBody>
                  
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
    </div>
  );
}

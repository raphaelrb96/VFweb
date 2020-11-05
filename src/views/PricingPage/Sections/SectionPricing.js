import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import pricingStyle from "assets/jss/material-kit-pro-react/views/pricingSections/pricingStyle.js";

import {revenderProduto} from "index.js";


const useStyles = makeStyles(pricingStyle);

let revender = (item, comissao) => {

  let valor1 = item.valorUni + comissao;

  let obj = {
        caminhoImg: item.caminhoImg,
        idProdut: item.idProdut,
        labo: item.labo,
        produtoName: item.produtoName,
        quantidade: 1,
        valorTotal: item.valorTotal,
        valorUni: item.valorUni,
        valorUniComComissao: valor1,
        valorTotalComComissao: valor1,
        comissaoUnidade: comissao,
        comissaoTotal: comissao
    };


    revenderProduto(obj, item.idProdut);

}

export default function SectionPricing(props) {
  const classes = useStyles();

  let valor = props.valor;

  return (
    <div className={classes.pricingSection}>
      <GridContainer>

        <GridItem md={4} sm={4}>
          <Card raised pricing>
            <CardBody pricing>
              <h6
                className={classes.cardCategory}
              >
                Venda Fácil
              </h6>
              <h1 className={classes.cardTitle}>
                <small>R$</small>{valor + 5},00
              </h1>
              <ul>
                <li>
                  Total Por Unidade vendida
                </li>
                <li>
                  Giro de vendas alto
                </li>
                <li>
                  <b>R$ 5,00</b> de lucro
                </li>
                
              </ul>
              <Button onClick={() => {
                revender(props.produto, 5);
              }}  round>
                Revender
              </Button>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem md={4} sm={4}>
          <Card raised pricing >
            <CardBody pricing>
              <h6 className={classes.cardCategory}>Venda Premium</h6>
              <h1 className={classes.cardTitle}>
                <small>R$</small>{10 + valor},00
              </h1>
              <ul>
                <li>
                  Total Por Unidade vendida
                </li>
                <li>
                  Oportunidade de venda Razoavel
                </li>
                <li>
                  <b>R$ 10,00</b> de lucro
                </li>
                
              </ul>

              <Button onClick={() => {
                revender(props.produto, 10);
              }}  round>
                Revender
              </Button>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem md={4} sm={4}>
          <Card raised pricing>
            <CardBody pricing>
              <h6
                className={classes.cardCategory}
              >
                Venda Master
              </h6>
              <h1 className={classes.cardTitle}>
                <small>R$</small>{20 + valor},00
              </h1>
              <ul>
                <li>
                  Total Por Unidade vendida
                </li>
                <li>
                  Baixa probabilidade de venda
                </li>
                <li>
                  <b>R$ 20,00</b> de lucro
                </li>
                
              </ul>

              <Button onClick={() => {
                revender(props.produto, 20);
              }}  round>
                Revender
              </Button>
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}

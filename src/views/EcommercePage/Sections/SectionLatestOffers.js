import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
import Favorite from "@material-ui/icons/Favorite";

import { Link } from "react-router-dom";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.js";

import gucci from "assets/img/examples/gucci.jpg";
import tomFord from "assets/img/examples/tom-ford.jpg";
import dolce from "assets/img/examples/dolce.jpg";

const useStyles = makeStyles(styles);

function abrirDetalhe(produtoAtual) {

    let idProduto = produtoAtual.get('idProduto');
   //const elemento = <Detalhes size={size} produtos={lista} isAnonimo={isAnonimo} index={i} />
   //ReactDOM.render(elemento, document.getElementById('root'));
   let listaNova = Array();
   let foto = produtoAtual.get('imgCapa');
    let nome = produtoAtual.get('prodName');
    let valor = produtoAtual.get('prodValor');
    let descr = produtoAtual.get('descr');
    let valorAntigo = produtoAtual.get('valorAntigo');
   let objj = {
    "@context": "https://schema.org",
          "@type": "Product",
          "productID": idProduto,
          "name": nome,
          "description": descr,
          "url": window.location.href,
          "image": foto,
          "brand":"facebook",
          "offers": [
            {
            "@type":"Offer",
            "price":valor,
            "priceCurrency":"BRL",
            "itemCondition":"https://schema.org/NewCondition",
            "availability":"https://schema.org/InStock"
            }
          ]
   };
   listaNova.push(objj);
   window.fbq('track', 'Microdata', {"JSON-LD": listaNova});
}

export default function SectionLatestOffers(props) {
  const classes = useStyles();
  let produtos = props.list;
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>Ofertas imperdiveis</h2>

        <GridContainer>

          <GridItem md={4} sm={4}>

            <Link to={'/produto/?id=' + produtos[0].get('idProduto')} onClick={() => abrirDetalhe(produtos[0])} >
              <Card product plain>

                <CardHeader image plain>
                  <a href="#pablo">
                    <img src={produtos[0].get('imgCapa')} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{ backgroundImage: `url(${gucci})`, opacity: 1 }}
                  />
                </CardHeader>

                <CardBody className={classes.textCenter} plain>
                  <h4 className={classes.cardTitle}>R$ {produtos[0].get('prodValor')},00</h4>
                  <h4 className={classes.cardDescription}>
                    {produtos[0].get('prodName').substring(0, 40)}
                  </h4>
                </CardBody>

              </Card>
            </Link>
          </GridItem>

          <GridItem md={4} sm={4}>

            <Link to={'/produto/?id=' + produtos[1].get('idProduto')} onClick={() => abrirDetalhe(produtos[1])}>
              <Card product plain>
                <CardHeader image plain>
                  <a href="#pablo">
                    <img src={produtos[1].get('imgCapa')} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{ backgroundImage: `url(${dolce})`, opacity: 1 }}
                  />
                </CardHeader>
                <CardBody className={classes.textCenter} plain>
                  <h4 className={classes.cardTitle}>R$ {produtos[1].get('prodValor')},00</h4>
                  <h4 className={classes.cardDescription}>
                    {produtos[1].get('prodName').substring(0, 40)}
                  </h4>
                </CardBody>
                
              </Card>
            </Link>
          </GridItem>

          <GridItem md={4} sm={4}>
            <Link to={'/produto/?id=' + produtos[2].get('idProduto')} onClick={() => abrirDetalhe(produtos[2])}>
              <Card product plain>
                <CardHeader image plain>
                  <a href="#pablo">
                    <img src={produtos[2].get('imgCapa')} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{ backgroundImage: `url(${tomFord})`, opacity: 1 }}
                  />
                </CardHeader>
                <CardBody className={classes.textCenter} plain>
                  <h4 className={classes.cardTitle}>R$ {produtos[2].get('prodValor')},00</h4>
                  <h4 className={classes.cardDescription}>
                    {produtos[2].get('prodName').substring(0, 40)}
                  </h4>
                </CardBody>
                
              </Card>
            </Link>
          </GridItem>

        </GridContainer>
      </div>
    </div>
  );
}

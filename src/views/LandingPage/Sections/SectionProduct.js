import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(productStyle);

export default function SectionProduct() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h2 className={classes.title}>COMECE A GANHAR DINHEIRO</h2>
          <h4 className={classes.description}>
            Você vai se tornar seu próprio patrão...<br/> <br/>
            Você vai poder vender nossos produtos pela internet sem se preocupar com estoque de produto, logistica
             e custos de entrega, formas de pagamentos. Literalmente sua unica 
             missão é vender.
            E você tambem pode liderar equipes de vendedores e ganhar comissões a cada venda que eles fizerem.
          </h4>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Loja Local"
              description="Nossa loja online é Manauara. Permitindo que os clientes recebam os produtos com mais rapidez e flexibilidade de tempo."
              icon={RoomRoundedIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Venda Segura"
              description="Damos 7 dias de teste para qualquer cliente. Fazemos troca dentro desse periodo, apenas no caso de defeito de fabricação!"
              icon={VerifiedUser}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Dinheiro certo"
              description="Suas comissões são somadas e registradas automaticamentes. Ao atingir R$ 100,00 você pode solicitar a retirada ou transferencia."
              icon={MonetizationOnRoundedIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import GroupWork from "@material-ui/icons/GroupWork";
import Airplay from "@material-ui/icons/Airplay";
import LocationOn from "@material-ui/icons/LocationOn";
import Extension from "@material-ui/icons/Extension";
import ChildFriendly from "@material-ui/icons/ChildFriendly";
import WatchLater from "@material-ui/icons/WatchLater";
import Code from "@material-ui/icons/Code";
import FormatPaint from "@material-ui/icons/FormatPaint";
import Dashboard from "@material-ui/icons/Dashboard";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import AccessTime from "@material-ui/icons/AccessTime";
import AttachMoney from "@material-ui/icons/AttachMoney";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';

import featuresStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.js";

import iphone from "assets/img/sections/iphone.png";
import pare from "assets/img/pare.png";
import bg9 from "assets/img/bg9.jpg";

const useStyles = makeStyles(featuresStyle);

export default function SectionFeatures({ ...rest }) {
  const classes = useStyles();
  return (
    <div className="cd-section" {...rest}>
      <div className={classes.container}>

        {/* Feature 4 START */}
        <div className={classes.features4}>

          <GridContainer>
            <GridItem
              xs={12}
              sm={8}
              md={8}
              className={
                classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
              }
            >
              <h2 className={classes.title}>Perguntas Frequentes</h2>
              <h5 className={classes.description}>
                Tire suas dúvidas
              </h5>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={3} className={classes.mlAuto}>
              <InfoArea
                icon={ContactSupportRoundedIcon}
                title="Como posso revender os produtos ?"
                description="Simples, pelas redes sociais. Facebook, Instagram, Olx, Marketplace, Grupos, Whatsapp, Telegram. Você tambem pode anunciar pra amigos e pessoas proximas..."
                iconColor="danger"
              />
              <InfoArea
                icon={ContactSupportRoundedIcon}
                title="Como funciona a garantia ?"
                description="Você tem 7 dias para solicitar troca (apenas em caso de defeito de fabricação). Não fazemos troca em caso de defeito de ultilização."
                iconColor="danger"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={1}>
              
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={3} className={classes.mrAuto}>

              <InfoArea
                icon={ContactSupportRoundedIcon}
                title="Arrumei uma venda, e agora o que eu faço ?"
                description="Agora só é fazer sua lista de revenda com os produtos você revendeu, e depois inserir os dados de entrega do seu cliente. Pronto ! Assim que a venda for confirmada, sua comissão estará disponivél na sua carteira online"
                iconColor="danger"
              />

              <InfoArea
                icon={ContactSupportRoundedIcon}
                title="Quando e como vou receber minhas comissões ?"
                description="O pagamento das comissões é via transferencia bancaria. E o valor minimo é de R$ 100,00 reais... "
                iconColor="danger"
              />

              
            </GridItem>
          </GridContainer>

        </div>
        {/* Feature 4 END */}

      </div>
    </div>
  );
}

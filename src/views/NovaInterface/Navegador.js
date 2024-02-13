import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { abrirPainelRevendas, homepage, abrirListaRevenda, verMinhasComissoes, verMeusAfiliados } from 'index.js';
import CardAvatar from 'components/Card/CardAvatar';
import { Avatar } from '@material-ui/core';

import fav from "fav2.png";
import { verMinhasCarteira } from 'index';

export const CATEGORIA_LIST = [
  "Combos",
  "SmartWatchs",
  "Caixas De Som",
  "Eletronicos",
  "Salão e Barbearia",
  "Automotivos",
  "Videgame",
  "Computador",
  "Ferramentas",
  "Brinquedos",
  "Relogios",
  "Headset e Fones",
  "Luzes e iluminação",
  "Cameras",
  "Oculos",
  "Celulares",
  "Capinhas",
  "Piscinas",
  "Microfones",
  "Petshop",
  "Tv e acessorios",
  "Cabos",
  "Roupas",
  "Boné e chapeu",
  "Calçados",
  "Roupa infantil",
  "Calçado infantil",
  "Bebê e mamãe",
  "Cama, mesa e banho",
  "Saúde e beleza",
  "Instrumentos musicais",
  "Moveis",
  "Decoração",
  "Fantasia",
  "Esportivos",
  "Malas e bolsas",
  "Livraria e papelaria",
  "Caça e pesca",
  "Agrorural",
  "Alianças",
  "Bijuterias",
  "Piscinas",
  "Adaptadores",
  "Inversores",
  "Maquiagem",
  "Cosmeticos",
  "Perfumes",
  "Drones",
  "Ventiladores",
  "Linha e costura",
  "Panelas"
];

const objChildren = {
  id: 'Categorias',
  children: [
    { id: 'Kits e Combos', icon: null, i: '0' },
    { id: 'SmartWatchs', icon: null, i: '1' },
    { id: 'Caixas de som', icon: null, i: '2' },
    { id: 'Eletronicos', icon: null, i: '3' },
    { id: 'Maquina de cabelo', icon: null, i: '4' },
    { id: 'Automotivos', icon: null, i: '5' },
    { id: 'Video Game', icon: null, i: '6' },
    { id: 'Computador', icon: null, i: '7' },
    { id: 'Ferramentas', icon: null, i: '8' },
    { id: 'Brinquedos', icon: null, i: '9' },
    { id: 'Relogios', icon: null, i: '10' },
    { id: 'Headset e Fones', icon: null, i: '11' },
    { id: 'Luz e Iluminação', icon: null, i: '12' },
    { id: 'Câmeras', icon: null, i: '13' },
    { id: 'Oculos', icon: null, i: '14' },
    { id: 'Celulares e Acss', icon: null, i: '15' },
    { id: 'Audio e Som', icon: null, i: '30' },
    { id: 'Piscinas', icon: null, i: '17' },
    { id: 'Microfones', icon: null, i: '18' },
    { id: 'Petshop', icon: null, i: '19' },
    { id: 'Tv e acessorios', icon: null, i: '20' },
    { id: 'Cabos', icon: null, i: '21' },
    { id: 'Inversores', icon: null, i: '43' },
    { id: 'Malas e Bolsas', icon: null, i: '35' },
    { id: 'Ventiladores', icon: null, i: '48' },
    { id: 'Panelas', icon: null, i: '50' },

  ],
};

const categories = [
  {
    id: 'Atalhos',
    children: [
      { id: 'Tela principal', icon: <HomeIcon />, i: 'home' },
      { id: 'Painel do Revendedor', icon: <DnsRoundedIcon />, i: 'revendedor' },
      { id: 'Carrinho de Venda', icon: <ShoppingCart />, i: 'cart' },
      { id: 'Minhas Comissões', icon: <MonetizationOnIcon />, i: 'comissoes' },
      { id: 'Minha Carteira', icon: <AccountBalanceWalletIcon />, i: 'carteira' },
      { id: 'Meus Afiliados', icon: <GroupAddIcon />, i: 'afiliados' },
    ],
  }
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    marginTop: 2,
    marginBottom: 2,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.048)',
    },
    cursor: 'pointer'
  },
  itemCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flexDirection: 'column',
    
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },

});

function Navegador(props) {
  const { classes, navegar, PaperProps, onClose, open, variant, ...other } = props;

  const handlerClick = (i) => {

    props.navegar(i);

    if (i === 'revendedor') {
      abrirPainelRevendas();
    } else if (i === 'home') {
      homepage();
    } else if (i === 'cart') {
      abrirListaRevenda();
    } else if (i === 'comissoes') {
      verMinhasComissoes();
    } else if (i === 'afiliados') {
      verMeusAfiliados();
    } else if (i === 'carteira') {
      verMinhasCarteira()
    } else {
      
    }

  };

  return (
    <Drawer variant={variant ? variant : "permanent"} PaperProps={PaperProps} onClose={onClose} open={open}>
      <List disablePadding>

        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          <Avatar src={fav} style={{ width: 70, height: 70, marginBottom: '12px' }} />
          Venda Favorita
        </ListItem>

        {categories.map(({ id, children }) => (

          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, i }) => (
              <ListItem
                key={childId}
                button
                onClick={() => (handlerClick(i))}
                className={clsx(classes.item, active)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navegador.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navegador);
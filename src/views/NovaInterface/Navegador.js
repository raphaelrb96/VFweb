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

import {abrirPainelRevendas, homepage, abrirListaRevenda, verMinhasComissoes, verMeusAfiliados} from 'index.js';

const categories = [
  {
    id: 'Atalhos',
    children: [
      { id: 'Tela principal', icon: <HomeIcon />, i: 'home' },
      { id: 'Painel do Revendedor', icon: <DnsRoundedIcon />, i: 'revendedor' },
      { id: 'Carrinho de Venda', icon: <ShoppingCart />, i: 'cart' },
      { id: 'Minhas Comissões', icon: <MonetizationOnIcon />, i: 'comissoes' },
      { id: 'Meus Afiliados', icon: <GroupAddIcon />, i: 'afiliados' },
    ],
  },
  {
    id: 'Categorias',
    children: [
      { id: 'Combos', icon: null, i: '0' },
      { id: 'SmartWatchs', icon: null , i: '1'},
      { id: 'Caixas de som', icon: null , i: '2'},
      { id: 'Eletronicos', icon: null, i: '3' },
      { id: 'Maquina de cabelo', icon: null, i: '4' },
      { id: 'Automotivos', icon: null, i: '5' },
      { id: 'Video Game', icon: null, i: '6' },
      { id: 'Computador', icon: null, i: '7' },
      { id: 'Ferramentas', icon: null, i: '8' },
    ],
  },
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
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  const { classes, ...other } = props;

  const handlerClick = (i) => {
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
    } else {
      props.navegar(i);
    }
    
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          VendaFavorita
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
                className={clsx(classes.item, active )}
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
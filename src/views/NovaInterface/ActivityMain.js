import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Navegador from 'views/NovaInterface/Navegador';
import Content from 'views/NovaInterface/Content';
import Header from 'views/NovaInterface/Header';

import EcommercePage from "views/EcommercePage/EcommercePage.js";
import Dashboard from 'views/PainelRevendedor/Dashboard.js';
import ProductPage from "views/ProductPage/ProductPage.js";
import Comissoes from "views/Comissoes/Comissoes.js";
import MeusAfiliados from "views/Afiliados/MeusAfiliados.js";
import { grayColor } from 'assets/jss/material-kit-pro-react';
import CarrinhoRevendas from 'views/Revendas/CarrinhoRevendas';
import Carteira from 'views/Carteira/Carteira';

//import { abriCategoria, verMinhasComissoes } from 'index.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#004dcf',
      main: '#1A237E',
      dark: '#060D51',

    },
    secondary: {
      main: '#9a9a9a',
      light: '#ccc',
      dark: '#3C4858'
    },
    background: '#EAEAEA'
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      textSecondary: {
        color: '#D2D2D2'
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  }
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

function Paperbase(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [titulo, setTitulo] = React.useState('Inicio');
  const [tela, setTela] = React.useState(1);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navegar = (catg) => {
    setMobileOpen(!mobileOpen);
    //abriCategoria(catg);
  };

  const getTitulo = () => {
    switch (tela) {
      default:
        return 'Tela Inicial';
      case 2:
        return 'Painel do Revendedor';
      case 3:
        return 'Detalhes do Produto';
      case 4:
        return 'Comissões';
      case 5:
        return 'Afiliados';
      case 6:
        return 'Novo Pedido';
      case 7:
        return 'Carteira';
    }
  };

  let component = null;

  let urlParams = new URLSearchParams(window.location);

  if (window.location.toString().includes('revendedor')) {

    if (tela !== 2) {
      setTela(2);
    }

  } else if (window.location.toString().includes('produto')) {

    let urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('id')) {
      if (urlParams.get('id').length > 0) {
        if (tela !== 3) {
          setTela(3);
        }
      }
    }


  } else if (window.location.toString().includes('comissoes')) {

    if (tela !== 4) {
      setTela(4);
    }

  } else if (window.location.toString().includes('afiliados')) {

    if (tela !== 5) {
      setTela(5);
    }


  } else if (window.location.toString().includes('revenda')) {

    if (tela !== 6) {
      setTela(6);
    }


  } else if (window.location.toString().includes('carteira')) {

    if (tela !== 7) {
      setTela(7);
    }


  } else {
    if (tela !== 1) {
      setTela(1);
    }
  }




  switch (tela) {
    default:
      component = <EcommercePage />;
      break;
    case 2:
      component = <Dashboard />;
      break;
    case 3:
      component = <ProductPage />;
      break;
    case 4:
      component = <Comissoes />;
      break;
    case 5:
      component = <MeusAfiliados />;
      break;
    case 6:
      component = <CarrinhoRevendas />;
      break;
    case 7:
      component = <Carteira />;
      break;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navegador
              navegar={navegar}
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navegador navegar={navegar} PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>

        <div className={classes.app}>

          <Header titulo={getTitulo()} onDrawerToggle={handleDrawerToggle} />

          <main>
            {component}
          </main>

        </div>

      </div>
    </MuiThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);
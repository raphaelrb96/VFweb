import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { ListItem, ListItemIcon, ListItemText, Slide, useScrollTrigger } from '@material-ui/core';
import classNames from 'classnames';


const lightColor = 'rgba(255, 255, 255, 0.9)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
      textDecoration: 'none',
    },
  },
  button: {
    borderColor: lightColor,
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginLeft: "6px"
  },
  containerItem: {
    padding: 0,
    margin: 0,
    borderWidth: 1,
    borderColor: 'white'
  },
  title: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      //width: '100%',
    }
  },
  hidden: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  appbar: {
    padding: 6,
    paddingLeft: 0,
    background: '#060D51',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 256
    }
  }
});

function Header(props) {
  const { classes, onDrawerToggle, titulo } = props;

  const BaixarApp = () => {



    return (
      <Link className={classes.link} href='https://play.google.com/store/apps/details?id=com.rapha.vendafavorita'>
        <ListItem className={classes.containerItem}>

          <Typography noWrap variant="subtitle1" className={classNames(classes.title, classes.hidden)}>
            BAIXAR APP
          </Typography>

          <ListItemIcon className={classes.itemIcon}>
            <PhoneIphoneIcon />
          </ListItemIcon>


        </ListItem>
      </Link>

    )
  };

  const Titulo = () => {
    return (
      <Typography noWrap variant="subtitle2" className={classes.title}>
        {titulo}
      </Typography>
    );
  };

  const HideOnScroll = ({ children, window }) => {
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return (
    <React.Fragment>

      <HideOnScroll {...props}>


        <AppBar className={classes.appbar} elevation={16}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item>
                <Titulo />
              </Grid>
              <Grid item xs />
              <Grid item>
                <BaixarApp />
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>

      </HideOnScroll>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
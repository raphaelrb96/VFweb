import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ComputerIcon from '@material-ui/icons/Computer';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PetsIcon from '@material-ui/icons/Pets';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import BuildIcon from '@material-ui/icons/Build';
import WidgetsIcon from '@material-ui/icons/Widgets';



export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Meu Carrinho" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Categorias</ListSubheader>
    <ListItem button onClick={() => console.log('celular')}>
      <ListItemIcon>
        <PhoneAndroidIcon />
      </ListItemIcon>
      <ListItemText primary="Celular" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ComputerIcon />
      </ListItemIcon>
      <ListItemText primary="Computador" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SportsEsportsIcon />
      </ListItemIcon>
      <ListItemText primary="Video Game" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PetsIcon />
      </ListItemIcon>
      <ListItemText primary="Petshop" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EmojiObjectsIcon />
      </ListItemIcon>
      <ListItemText primary="Eletronicos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Ferramentas" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WidgetsIcon />
      </ListItemIcon>
      <ListItemText primary="Diversos" />
    </ListItem>
  </div>
);
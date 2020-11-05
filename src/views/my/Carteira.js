import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';


const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: 'grey',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'grey',
      },
    },
  },
})(TextField);


function Carteira(props) {

  const classes = props.class;

  return (
    <Card
      
    >
      <CardContent>

        <Grid
          container
          justify="space-between">

          <Grid item >
            <form noValidate autoComplete="off">
              <CssTextField id="custom-css-standard-input" label="Pesquisar" />
            </form>
          </Grid>
          <Grid justify="center"
            item>
            <Avatar className={classes.avatar}>
              <SearchIcon className={classes.iconc} />
            </Avatar>
          </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  );
};

export default function main(props) {
  return(
    <Carteira class={props.class}/>
  );
}

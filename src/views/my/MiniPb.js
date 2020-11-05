import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';


const ColorCircularProgress = withStyles({
  root: {
    color: '#e00000',
  },
})(CircularProgress);

const centro = {
	display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20px',
}

export default function Pb() {
  return(
    <ColorCircularProgress style={centro} size={30} thickness={5} />
  );
}
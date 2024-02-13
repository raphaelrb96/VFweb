import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';


const ColorCircularProgress = withStyles({
  root: {
    color: '#1A237E',
  },
})(CircularProgress);

const centro = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '120px',
  marginBottom: '200px',
}

export default function Pb() {
  return (
    <ColorCircularProgress style={centro} size={30} thickness={5} />
  );
}
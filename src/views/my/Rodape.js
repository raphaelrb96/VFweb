import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(6),
    minWidth: '250px',
    paddingTop: '40px',
  }
}));

function Copyright() {

    const classes = useStyles();

    return (
    	<footer className={classes.footer}>
	        <Typography variant="h6" align="center" gutterBottom>
	          (92) 99193-3525
	        </Typography>
	        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
	          Manaus - AM
	        </Typography>
	        <Typography variant="body2" color="textSecondary" align="center">
		      {'Copyright © '}
		      <Link color="inherit" href="">
		        VendaFavorita
		      </Link>{' '}
		      {new Date().getFullYear()}
		      {'.'}
		    </Typography>
	    </footer>
    );
}

export default function main() {

	return(
	    
		<Copyright />
	);

	
}
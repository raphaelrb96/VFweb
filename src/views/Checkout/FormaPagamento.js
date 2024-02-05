import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';

import {setPagamento} from 'views/Checkout/ComprarAgora.js';



const GreenCheckbox = withStyles({
  root: {
    color: "#e00000",
    '&$checked': {
      color: "e00000",
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function FormaPagamento() {

	let [state, setState] = React.useState({
	    dinheiro: true,
	    credito: false,
	    debito: false,
	    forma: 4
	  });


	  let handleChange = name => event => {
	  	if (name === 'dinheiro' && event.target.checked) {
	  		setPagamento(4);
	  		setState({
	  			credito: false,
	  			debito: false,
	  			dinheiro: true,
	  			forma: 4
	  		});
	  	} else if (name === 'debito' && event.target.checked) {
	  		setPagamento(1);
	  		setState({
	  			credito: false,
	  			dinheiro: false,
	  			debito: true,
	  			forma: 1
	  		});
	  	} else if (name === 'credito' && event.target.checked) {
	  		setPagamento(2);
	  		setState({
	  			debito: false,
	  			dinheiro: false,
	  			credito: true,
	  			forma: 2
	  		});

	  	} 

	  };

	let { dinheiro, debito, credito } = state;

	return(

		<React.Fragment>

			<Typography variant="h6" gutterBottom>
		        Pagamento Seguro
		    </Typography>
		    <FormGroup>
	          <FormControlLabel
	            control={<GreenCheckbox checked={dinheiro} onChange={handleChange('dinheiro')} value="dinheiro" />}
	            label="Dinheiro"
	          />

	          <FormControlLabel
	            control={<GreenCheckbox checked={debito} onChange={handleChange('debito')} value="debito" />}
	            label="Debito"
	          />
	          

	          <FormControlLabel
	            control={
	              <GreenCheckbox checked={credito} onChange={handleChange('credito')} value="credito" />
	            }
	            label="Crédito"
	          />
	        </FormGroup>
	        <FormHelperText>O pagamento é feito no momento da entrega</FormHelperText>
	        

		</React.Fragment>

	);

}
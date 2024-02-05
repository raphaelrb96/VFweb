import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';



const GreenCheckbox = withStyles({
  root: {
    color: "#1A237E",
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
		parcelado: false,
		pix: false,
	    forma: 4
	  });

	  //4 = din; debito = 1; credito avista = 2; credito parcelado = 3; pix = 5;

	  let handleChange = name => event => {
	  	if (name === 'dinheiro' && event.target.checked) {
	  		setState({
	  			credito: false,
	  			debito: false,
	  			dinheiro: true,
				parcelado: false,
				pix: false,
	  			forma: 4
	  		});
	  	} else if (name === 'debito' && event.target.checked) {
	  		setState({
	  			credito: false,
	  			dinheiro: false,
	  			debito: true,
				parcelado: false,
				pix: false,
	  			forma: 1
	  		});
	  	} else if (name === 'credito' && event.target.checked) {
	  		setState({
	  			debito: false,
	  			dinheiro: false,
	  			credito: true,
				parcelado: false,
				pix: false,
	  			forma: 2
	  		});

	  	} else if (name === 'parcelado' && event.target.checked) {
			setState({
				debito: false,
				dinheiro: false,
				credito: false,
				parcelado: true,
				pix: false,
				forma: 3
			});

		} else if (name === 'pix' && event.target.checked) {
			setState({
				debito: false,
				dinheiro: false,
				credito: false,
				parcelado: false,
				pix: true,
				forma: 5
			});

		}

	  };

	let { dinheiro, debito, credito, pix, parcelado } = state;

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
	            label="Débito"
	          />
	          

	          <FormControlLabel
	            control={
	              <GreenCheckbox checked={credito} onChange={handleChange('credito')} value="credito" />
	            }
	            label="Crédito à Vista"
	          />

			  <FormControlLabel
	            control={
	              <GreenCheckbox checked={parcelado} onChange={handleChange('parcelado')} value="parcelado" />
	            }
	            label="Crédito Parcelado"
	          />
	        </FormGroup>

			<FormControlLabel
	            control={
	              <GreenCheckbox checked={pix} onChange={handleChange('pix')} value="pix" />
	            }
	            label="Pix"
	          />

	        <FormHelperText>O pagamento é feito no momento da entrega</FormHelperText>
	        

		</React.Fragment>

	);

}
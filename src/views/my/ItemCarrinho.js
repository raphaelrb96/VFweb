import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import TrendingUp from "@material-ui/icons/TrendingUp";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";


import cardBlog4 from "assets/img/examples/card-blog4.jpg";

import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";

import {removeToCart, atualizarProdutoCarrinho} from "index.js";

import blogsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/blogsStyle.js";


const useStyles = makeStyles(blogsStyle);


class Item extends React.Component {

	constructor(props) {
		super(props);
		let vttl = props.quantidade * props.valUnidade;
		this.state = {
			quantidade: props.quantidade,
			valorTotal: vttl
		}

		this.aumentar = this.aumentar.bind(this);
		this.diminuir = this.diminuir.bind(this);
		this.remover = this.remover.bind(this);
	}

	aumentar () {
		let item = this.props.item;
		let quant = item.get('quantidade') + 1;
		let vf = quant * item.get('valorUni');
		let resposta = {
				caminhoImg: item.get('caminhoImg'),
				idProdut: item.get('idProdut'),
				labo: item.get('labo'),
				produtoName: item.get('produtoName'),
				quantidade: quant,
				valorTotal: vf,
				valorUni: item.get('valorUni')
		};

		atualizarProdutoCarrinho(resposta, this.props.item.get('idProdut'));
		this.setState({
			valorTotal: vf,
			quantidade: quant
		});
	}

	diminuir () {
		if (this.props.item.get('quantidade') > 1) {

			let item = this.props.item;
			let quant = item.get('quantidade') - 1;
			let vf = quant * item.get('valorUni');
			let resposta = {
					caminhoImg: item.get('caminhoImg'),
					idProdut: item.get('idProdut'),
					labo: item.get('labo'),
					produtoName: item.get('produtoName'),
					quantidade: quant,
					valorTotal: vf,
					valorUni: item.get('valorUni')
			};

			atualizarProdutoCarrinho(resposta, this.props.item.get('idProdut'));

			this.setState({
				valorTotal: vf,
				quantidade: quant
			});

		}
	}

	remover () {
	  removeToCart(this.props.item.get('idProdut'));
	}

	render() {

		let classes = this.props.clas;

        return(
		<Card plain blog className={classes.card}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <a>
                        <img src={this.props.item.get('caminhoImg')} />
                      </a>
                      
                    </CardHeader>
                  </GridItem>

                  <GridItem xs={12} sm={7} md={7}>
                    <h3 style={{marginTop: "18px"}} className={classes.cardTitle}>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        {this.props.nome}
                      </a>
                    </h3>
                    <p className={classes.description1}>
                      Valor por unidade: {this.props.valUnidade},00
                    </p>
                    <h4 className={classes.author}>
                      Total: 
                      <a href="#pablo" >
                        <b> {this.state.valorTotal},00</b>
                      </a>
                    </h4>
                    <h5 className={classes.author}>
                      Quantidade: 
                      <a href="#pablo" >
                        <b> {this.state.quantidade}</b>
                      </a>
                    </h5>
                    <div style={{marginTop: "25px"}} >
                        <Button
                          style={{marginRight: "20px"}}
                          color="verdin"
                          size="sm"
                          onClick={() => (this.diminuir())}
                          round
                        >
                          <Remove />
                        </Button>
                        
                        <Button
                          color="verdin"
                          size="sm"
                          onClick={() => (this.aumentar())}
                          round
                        >
                          <Add />
                        </Button>

                        <Button
                          onClick={() => (this.remover())}
                          style={{float: "right"}}
                          color="transparent"
                          size="sm"
                          round
                        >
                          Remover
                        </Button>
                      </div>
                  </GridItem>
                </GridContainer>
              </Card>
	);


	}

}


export default function ItemCarrinho(props) {

	const classes = useStyles();


	return(
		<Item clas={classes} valUnidade={props.valUnidade} quantidade={props.quantidade} nome={props.nome} item={props.item} indice={props.indice} onChange={props.change} />
	);
	

}
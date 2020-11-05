/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LocalShipping from "@material-ui/icons/LocalShipping";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from '@material-ui/core/CardMedia';

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

import firebase from 'firebase';
import Pb from 'views/my/Pb';
import Rodape from 'views/my/Rodape';

import SectionPricing from 'views/PricingPage/Sections/SectionPricing'

// images
import cardProduct1 from "assets/img/examples/card-product1.jpg";
import cardProduct3 from "assets/img/examples/card-product3.jpg";
import cardProduct4 from "assets/img/examples/card-product4.jpg";
import cardProduct2 from "assets/img/examples/card-product2.jpg";
import product1 from "assets/img/examples/product1.jpg";
import product2 from "assets/img/examples/product2.jpg";
import product3 from "assets/img/examples/product3.jpg";
import product4 from "assets/img/examples/product4.jpg";

import {produtos} from "views/EcommercePage/EcommercePage.js";

import {revenderProduto, isRevendedor, abrirPaginaRevenda} from "index.js";

const useStyles = makeStyles(productStyle);

function analizarUrl() {

  if (produtos.length > 0) {
    
  } else {
    
    return null;

  }

  let urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('id')) {
    let i, itemOfc;
    for (i = 0; i < produtos.length; i++) {
      let item = produtos[i];
      if (item.get('idProduto') === urlParams.get('id')) {
        itemOfc = item;
        break;
      }
    }
    return itemOfc;
  }

  return null;
}

class Detalhes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pb: true,
      produto: {},
    };
  }

  componentDidMount() {

    const obj = analizarUrl();

    if (obj !== null) {

      this.setState({
          pb: false,
          produto: obj,
      });

    } else {


      let urlParams = new URLSearchParams(window.location.search);

      if (urlParams.has('id')) {

        firebase.firestore().collection("produtos")
        .where("idProduto", "==", urlParams.get('id'))
        .get()
        .then(querySnapshot => {

          let prods = querySnapshot.docs;
          let tamanho = querySnapshot.size;

          if (tamanho > 0) {
            this.setState({
              pb: false,
              produto: prods[0],
            });

          }

        }).catch(error => {
          console.log(error.message);
        });



      }

    }

  }
 
  render() {

      window.scrollTo(0, 0);


      let {pb, produto} = this.state;
      let {classes} = this.props;

      let compNulo = (

        <div >
                <br/>
                <br/>
                <h3 className={classNames(classes.title, classes.textCenter)}>
                  Ganhe dinheiro atravez desse produto ...
                </h3>
                
              </div>

      );


      if (pb) {
        
        return(<Pb />);

      } else {

          let mProduto = produto;

          let idP = mProduto.get('idProduto');

          

          let documento = {
              caminhoImg: mProduto.get('imgCapa'),
              idProdut: mProduto.get('idProduto'),
              labo: mProduto.get('fabricante'),
              produtoName: mProduto.get('prodName'),
              quantidade: 1,
              valorTotal: mProduto.get('prodValor'),
              valorUni: mProduto.get('prodValor'),
              valorUniComComissao: mProduto.get('prodValor'),
              valorTotalComComissao: mProduto.get('prodValor'),
              comissaoUnidade: mProduto.get('comissao'),
              comissaoTotal: mProduto.get('comissao')
          };

          const images = [
            {
              original: produto.get('imgCapa'),
            }
          ];

          let produtoAtual = produto;
          let idProduto = produtoAtual.get('idProduto');
         //const elemento = <Detalhes size={size} produtos={lista} isAnonimo={isAnonimo} index={i} />
         //ReactDOM.render(elemento, document.getElementById('root'));
         let listaNova = Array();
         let foto = produtoAtual.get('imgCapa');
          let nome = produtoAtual.get('prodName');
          let valor = produtoAtual.get('prodValor');
          let descr = produtoAtual.get('descr');
          let valorAntigo = produtoAtual.get('valorAntigo');
          let urlNova = window.location.href + '/?id=' + idProduto;

          let objContentId = [idProduto];


          window.fbq('track', 'ViewContent', {
              content_name: nome,
              content_category: 'produtos',
              value: valor,
              currency: 'BRL',
              content_ids: objContentId,
              content_type: 'product',
          });  

          console.log(idProduto);

          firebase.analytics().logEvent('view_item', {
                        items: [
                          {
                            price: valor,
                            name: nome,
                            id: idProduto,
                            creative_slot: foto,
                            creative_name: foto
                          }
                        ]
                      });

         let objj = {
          "@context": "https://schema.org",
                "@type": "Product",
                "productID": objContentId,
                "name": nome,
                "description": descr,
                "url": urlNova,
                "image": foto,
                "brand":"facebook",
                "offers": [
                  {
                  "@type":"Offer",
                  "price":valor,
                  "priceCurrency":"BRL",
                  "itemCondition":"https://schema.org/NewCondition",
                  "availability":"https://schema.org/InStock"
                  }
                ]
         };
         listaNova.push(objj);
         window.fbq('track', 'Microdata', {"JSON-LD": listaNova});

          let componetVariavel = <Button
              color="verdin"
              round
              onClick={() => (abrirPaginaRevenda())}
              style={{
                display: "block",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "60px"
              }}
            >
              Ganhar dinheiro revendendo
            </Button>;

          if (isRevendedor) {
            //componetVariavel = <SectionPricing valor={produto.get('prodValor')} produto={documento} />;
          }
          

          return(

            <div>

              <div className={classNames(classes.main, classes.mainRaised)}>
                <GridContainer>
                  <GridItem md={6} sm={6}>
                    <img className={classes.imagem} src={produto.get('imgCapa')} />
                  </GridItem>

                  <GridItem md={6} sm={6}>
                    <h2 className={classes.title}>{produto.get('prodName')}</h2>
                    <h3 className={classes.mainPrice}> R${produto.get('prodValor')},00 </h3>

                    <Accordion
                      active={0}
                      collapses={[
                        {
                          title: "Descrição",
                          content: (
                            <p>
                              {produto.get('descr')}
                            </p>
                          )
                        }
                        
                      ]}
                    />

                    <GridContainer className={classes.pullRight}>
                      <Button onClick={() => (revenderProduto(documento, idP))} style={{
                        marginRight: '20px',
                      }} round color="verde">
                        <ShoppingCart /> Vender agora &nbsp; 
                      </Button>
                    </GridContainer>

                  </GridItem>
                </GridContainer>
              </div>

              <div className={classNames(classes.features, classes.textCenter)}>
                <GridContainer>
                  <GridItem md={4} sm={4}>
                    <InfoArea
                      title="Entrega Fácil"
                      description="Entregamos no mesmo dia para a maioria dos bairros de Manaus. Em breve estaremos fazendo entrega tambem para o interior."
                      icon={LocalShipping}
                      iconColor="danger"
                      vertical
                    />
                  </GridItem>
                  <GridItem md={4} sm={4}>
                    <InfoArea
                      title="Venda Segura"
                      description="Disponibilizamos 7 dias para você testar a qualidade de qualquer um dos nossos produtos... Em casos de defeito de fabricação, trocamos o produto !"
                      icon={VerifiedUser}
                      iconColor="danger"
                      vertical
                    />
                  </GridItem>
                  <GridItem md={4} sm={4}>
                    <InfoArea
                      title="A melhor opção em Manaus"
                      description="Alem do serviço de compra, nós abrimos espaço para qualquer cliente poder gerar uma renda extra apartir da nossa empresa !"
                      icon={Favorite}
                      iconColor="danger"
                      vertical
                    />
                  </GridItem>
                </GridContainer>
              </div>

              


            </div>

            


          );

      }

  }


}

export default function ProductPage() {
  const [colorSelect, setColorSelect] = React.useState("0");
  const [sizeSelect, setSizeSelect] = React.useState("0");
  const classes = useStyles();

  return (
    <div className={classes.productPage}>

      <div className={classes.section}>

        <div className={classes.container}>

          <Detalhes classes={classes}/>
          
        </div>

      </div>

      <Rodape />
    </div>
  );
}

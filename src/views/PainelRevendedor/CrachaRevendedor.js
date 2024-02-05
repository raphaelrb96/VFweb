import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Pb from 'views/my/Pb';

import {mFirebase, abrirFormulario, mUser, mUid, mApelido, mPathFoto, mCelular, mNome, mUsuarioRegistrado, abrirPainelRevendas, verificarUsuario} from 'index.js';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function preventDefault(event) {
  event.preventDefault();
}

function Title(props) {
  return (
    <h3 style={{color: '#060D51'}} >
      <b>
      {props.children}
      </b>
    </h3>
  );
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  
  btIndisp: {
    color: "gray",
  },
});

class Cracha extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        user: null,
        solicitacao: false,
        usuario: null
      };

    }

    verificarRegistro(usr) {

      getFirestore()
        .collection("Usuario")
        .doc(usr.uid)
        .get()
        .then(doc => {
          if (doc !== null || doc !== undefined) {



            if (doc.get('userName') === null || doc.get('userName') === undefined) {
              //abrirPainelRevendas();

              this.setState({
                loading: false
              })

            } else {
               
            }
            
          }
        });

    }

    componentDidMount() {
      if (mUser === null || mUser === undefined || mUser.isAnonymous) {

          getAuth().onAuthStateChanged(user => {
            if (user) {
              // User is signed in.
              
              this.verificarRegistro(user);

            }
          });

        } else {

          this.verificarRegistro(mUser);

        }
    }


}

export default function MiniCarteira(props) {
  const classes = useStyles();

  let btReceber = null;

  let textAuxiliar = 'Relatorio financeiro';

  if (props.timestamp !== null || props.timestamp !== undefined) {
      let dataString = new Date(props.timestamp);
      let sFor = dataString.toLocaleDateString() + ' às ' + dataString.toLocaleTimeString() + '  (Horario de Brasilia)';
      textAuxiliar = 'Ultima venda: ' + sFor;
  }

  

  if (props.usuario.get('admConfirmado') === false && props.usuario.get('usernameAdm').length > 0) {
      btReceber = <Button color="verdin" fullWidth >Solicitacão pendente</Button>;
  } 


  return (
    <React.Fragment>
      <div>
              <CardBody>

                <CardAvatar 
                  style={{

                      width: '70px',
                  }} profile plain>
                      <a href="/perfil">
                          <img src={props.usuario.get('pathFoto')} alt="..." />
                      </a>
                </CardAvatar>


                <div className={classes.textCenter}>
                
                    <br/>
                    <h4>
                       {props.usuario.get('nome')}
                    </h4>
                          
                </div>

                <div className={classes.textCenter}>
                
                    <p>@{props.usuario.get('userName')}</p>
                          
                </div>

                        
              </CardBody>     
      </div>
      <div>
        {btReceber}
      </div>
    </React.Fragment>
  );
}
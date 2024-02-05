import React from "react";

import { main, mainRaised } from "assets/jss/material-kit-pro-react.js";


import { Box, Button, Card, Container, Divider, Grid, Icon, Typography, makeStyles } from "@material-ui/core";
import { SubHead } from "./SubHead";
import classNames from "classnames";
import { grayColor } from "assets/jss/material-kit-pro-react";

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SaveIcon from '@material-ui/icons/Save';
import { getListaPrecificacao } from "util/Calculos";



const useStyles = makeStyles(theme => ({
    contanerMain: {
        paddingTop: theme.spacing(4),
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(4)
        },
    },
    head: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(10)
    },
    mainRaised: {
        borderRadius: "12px",
    },
    main: {
        ...main
    },
    card: {
        background: 'white',
        borderRadius: "12px",
        zIndex: "3",
        width: '100%',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    nome: {
        fontFamily: `"Roboto Slab", "Times New Roman", serif`,
        color: grayColor[1],
        fontWeight: "500",
        marginLeft: '2px',
        [theme.breakpoints.down('sm')]: {
            fontSize: theme.typography.h5.fontSize
        }
    },
    subnome: {
        color: grayColor[10],
        paddingTop: theme.spacing(3),
        marginLeft: '2px',
        [theme.breakpoints.down("xs")]: {
            fontSize: theme.typography.caption.fontSize
        }
    },
    comissao: {
        color: grayColor[10],
        marginLeft: '2px',
        paddingBottom: theme.spacing(3),
        width: '100%',
        fontWeight: 'bold'
    },
    boxCenter: {

        [theme.breakpoints.up('lg')]: {
            //textAlign: 'center',
            marginLeft: theme.spacing(4)
        }
    },
    btn: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3),
        alignItems: 'center'
    },
    infoVariante: {
        color: grayColor[10],
        paddingLeft: theme.spacing(1),
        marginTop: '3px',
        [theme.breakpoints.down("sm")]: {
            marginTop: '0px'
        }
    },
    captionValor: {
        fontSize: '10px',
        color: grayColor[10]
    },
    valorUnd: {
        fontFamily: `"Roboto Slab", "Times New Roman", serif`,
        color: grayColor[1],
        fontWeight: "600",
    },
    gridBottomCardVariante: {
        
    },
    divider: {
        width: '100%',
        height: 0.5,
        background: grayColor[6],
        [theme.breakpoints.up("md")]: {
            display: 'none'
        }
    }
}));

function CardVariante({ classes, nome, valor, comissao, quantidade, diamante, id, click, disponivel }) {

    const info = id === 3 ? "Atenção para a quantidade minima para esse preço" : "Confirme a disponibilidade e prazo de envio";

    return (
        <Card elevation={4} className={classNames(classes.main, classes.mainRaised, classes.card)} sx={{ width: "100%" }}>
            <Grid container xs={12} alignItems="center">

                <Grid item xs={12} sm={12} md={8}>
                    <Box className={classes.boxCenter} py={4} px={4}>
                        <Typography className={classes.nome} variant="h4" mb={1}>
                            {String(nome).toLocaleUpperCase()}
                        </Typography>

                        <Grid container>
                            <Grid container item xs={4} sm={4} md={4} sx={{ mt: 1, mb: 1 }}>
                                <Typography className={classes.subnome} variant="body1">
                                    Comissão
                                </Typography>
                                <Typography className={classes.comissao} variant="h6">
                                    R${comissao}
                                </Typography>
                            </Grid>

                            <Grid container item xs={4} sm={4} md={4} sx={{ mt: 1, mb: 1 }}>
                                <Typography className={classes.subnome} variant="body1">
                                    Minimo
                                </Typography>
                                <Typography className={classes.comissao} variant="h6">
                                    0{quantidade}
                                </Typography>
                            </Grid>

                            {
                                diamante ?
                                    <Grid container item xs={4} sm={4} md={4} sx={{ mt: 1, mb: 1 }}>
                                        <Typography className={classes.subnome} variant="body1">
                                            Bônus
                                        </Typography>
                                        <Typography className={classes.comissao} variant="h6">
                                            R$5
                                        </Typography>
                                    </Grid>
                                    :
                                    null
                            }


                        </Grid>

                        <Grid container xs={12} spacing={3}>
                            <Grid item xs={12}>
                                <Box display="flex" py={1} pr={1} lineHeight={0}>
                                    <Typography variant="body1" color="dark">
                                        <Icon style={{ color: grayColor[10] }}>info</Icon>
                                    </Typography>
                                    <Typography className={classes.infoVariante} variant="body2" fontWeight="regular" pl={1}>
                                        {info}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>





                    </Box>
                </Grid>

                <Grid item justifyContent="flex-end" className={classes.gridBottomCardVariante} xs={12} sm={12} md={4}>
                    <Divider className={classes.divider} />
                    <Box p={3} textAlign="center">
                        <Typography variant="caption" mt={{ xs: 0, sm: 3, color: grayColor[10] }}>
                            Valor por Unidade
                        </Typography>
                        <Typography className={classes.valorUnd} variant="h4">
                            <Box component="small">R$</Box>{valor}
                        </Typography>
                        <Button className={classes.btn} disabled={disponivel ? false : true} onClick={() => click(id, nome, quantidade, valor, comissao)} size="large" endIcon={<NavigateNextIcon />} color="primary" variant="contained">
                            {disponivel ? 'FAZER PEDIDO' : 'INDISPONIVEL'}
                        </Button>
                        <Typography className={classes.captionValor} display="block" variant="caption" color="text" >
                            (TAXA DE ENTREGA NÃO INCLUIDA)
                        </Typography>
                    </Box>
                </Grid>

            </Grid>
        </Card>
    );
};

function SectionValores({ produto, click, usuario }) {

    const classes = useStyles();

    const { atacado, comissao, disponivel, prodValor } = produto;


    const listaDeValores = getListaPrecificacao(comissao, prodValor, atacado);
    console.log(listaDeValores)
    if (!listaDeValores) return null;

    console.log(usuario)

    const diamante = (usuario && usuario.vipDiamante);

    return (
        <div className={classes.contanerMain}>
            <SubHead
                title="PREÇOS E COMISSÕES"
                subTitle="Selecione a opção de preço pra registrar seu pedido"
            />
            <Grid container item xs={12}>
                {listaDeValores.map(item => (
                    <CardVariante
                        key={item.id}
                        nome={item.nome}
                        click={click}
                        id={item.id}
                        quantidade={item.quantidadeMinima}
                        bonus={item.bonus}
                        diamante={diamante}
                        comissao={item.comissao}
                        disponivel={disponivel}
                        valor={item.valor}
                        usuario={usuario}
                        classes={classes} />
                ))}
            </Grid>
        </div>
    );
}

export default SectionValores;
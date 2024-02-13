import { Avatar, Box, Card, Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Rodape from 'views/my/Rodape';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import InputAgendamento from "./InputAgendamento";

import imagem from "mymoney.png";

const firebaseConfig = {
    apiKey: "AIzaSyAtMQ-oTpBa3YNeLf8DTRYdKWDQxMXFuvE",
    authDomain: "venda-favorita.firebaseapp.com",
    databaseURL: "https://venda-favorita.firebaseio.com",
    projectId: "venda-favorita",
    storageBucket: "venda-favorita.appspot.com",
    messagingSenderId: "978500802251",
    appId: "1:978500802251:web:1aad0e093739f59969ed4e",
    measurementId: "G-EK2ZQP9BKK"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const useStyles = makeStyles(theme => ({
    depositContext: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: '10px'
    },

    btIndisp: {
        color: "gray",
    },
    valor: {
        fontFamily: `"Roboto Slab", "Times New Roman", serif`,
        color: '#060D51',
        fontWeight: "bold",
        marginBottom: '16px'
    },
    contentCardMain: {
        padding: '20px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 16
    },
    contentInput: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    spacing: {
        height: 400
    },
    imgCenter: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '100%', 
        height: 'auto', 
        [theme.breakpoints.down("sm")]: {
            width: '60%', 
        },
        [theme.breakpoints.down("xs")]: {
            width: '80%', 
        }
    }
}));

function Title(props) {
    return (
        <Typography variant="h6" style={{ color: '#060D51' }} >
            <b>
                {props.children}
            </b>
        </Typography>
    );
};

function ContentCards({ title, total, texto, classes }) {

    return (
        <Card className={classes.contentCardMain}>

            <Title>{title}</Title>
            <Typography className={classes.valor} variant="h4">
                R${total},00
            </Typography>

        </Card>
    );
};

function ContentBanner({ classes }) {

    return (
        <Card className={classes.contentCardMain}>

            <Box className={classes.spacing} />

        </Card>
    );
};

function ContentInputs({ classes, state, setState }) {

    return (
        <Card className={classes.contentCardMain}>

            <Grid container item>

                <Grid xs={12} md={6} item>

                    <Box className={classes.imgCenter}>
                        <Avatar src={imagem} className={classes.img} />
                    </Box>

                </Grid>
                <Grid xs={12} md={6} item>

                    <Box className={classes.contentInput}>
                        <InputAgendamento state={state} setState={setState} />
                    </Box>


                </Grid>

            </Grid>
        </Card>


    );
};

function ContentMain({ classes, state, setState }) {


    return (

        <div>

            <Container maxWidth="lg" style={{ paddingTop: '100px', paddingBottom: '0px', }} >

                <Grid container spacing={3}>

                    <Grid item xs={12} md={4} lg={4}>
                        <ContentCards
                            title="Disponivel"
                            total={state.totalAReceber}
                            classes={classes} />
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <ContentCards
                            title="Pendente"
                            total={state.totalComissoesVendas}
                            classes={classes} />
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <ContentCards
                            title="Ultimo Saque"
                            total={state.totalComissoesAfilidados}
                            classes={classes} />
                    </Grid>

                    <Grid item xs={12}>
                        <ContentInputs classes={classes} state={state} setState={setState} />
                    </Grid>

                </Grid>



            </Container>

            <Rodape />

        </div>


    );
};


export default function Carteira() {

    const classes = useStyles();

    const [state, setState] = useState({
        usuario: null,
        minhasVendas: [],
        totalComissoesVendas: 0,
        comissoesAfiliados: [],
        totalComissoesAfilidados: 0,
        totalAReceber: 0,
        pb: true,
        document: {
            chave: '',
            titular: '',
            banco: ''
        }
    });

    return (
        <ContentMain classes={classes} state={state} setState={setState} />
    );
};


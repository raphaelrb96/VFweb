import { Avatar, Box, Card, Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Rodape from 'views/my/Rodape';
import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, where, writeBatch } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from "react";
import InputAgendamento from "./InputAgendamento";

import imagem from "mymoney.png";
import Pb from "views/my/Pb";
import { SubHead } from "views/ProductPage/SubHead";

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



const verificarRegistro = async (usr) => {

    const refDocUsuario = doc(db, 'Usuario', usr.uid);
    const docSnap = await getDoc(refDocUsuario);
    const docUsuario = docSnap.exists() ? docSnap.data() : null;

    if (docUsuario.userName === null || docUsuario.userName === undefined) {
        return null;
    } else {
        if (docUsuario.userName.length > 0) {
        } else {
            return null;
        }
    }

    return docUsuario;
};

const getComissoes = async (uid) => {
    const q = query(collection(db, 'MinhasRevendas', 'Usuario', uid), orderBy("hora", "desc"), limit(400));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot) return null;

    const prods = querySnapshot.docs;
    if (!prods) return null;

    const tamanho = querySnapshot.size;

    let list = [];
    let total = 0;
    let pendente = 0;

    for (let i = 0; i < tamanho; i++) {
        const item = prods[i];
        const data = item.data();
        let precoTT = data.comissaoTotal;

        if (data.statusCompra === 5) {
            if (data.pagamentoRecebido === false) {
                total = total + precoTT;
            }
        } else {
            if (data.statusCompra !== 3) {
                if (data.pagamentoRecebido === false) {
                    pendente = pendente = precoTT;
                }
            }
        }

        list.push(data);
    }

    return { list, total, pendente };
};

const getBonus = async (uid) => {
    const q = query(collection(db, 'MinhasComissoesAfiliados', 'Usuario', uid), orderBy("hora", "desc"), limit(400));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot) return null;

    const qDocs = querySnapshot.docs;
    if (!qDocs) return null;

    const tamanho = querySnapshot.size;


    let list = [];
    let total = 0;
    let pendente = 0;


    for (let i = 0; i < tamanho; i++) {
        const item = qDocs[i];
        const data = item.data();
        let precoTT = data.comissao;

        console.log(data.statusComissao);
        console.log(data.pagamentoRecebido);


        if (data.statusComissao === 5) {
            if (data.pagamentoRecebido === false) {
                total = total + precoTT;
            }
        } else {
            if (data.statusCompra !== 3) {
                if (data.pagamentoRecebido === false) {
                    pendente = pendente = precoTT;
                }
            }
        }

        list.push(data);
    }

    return { list, total, pendente };
};

const getAgendamento = async (uid) => {

    const ref = collection(db, 'Pagamentos', 'Usuario', uid);
    const q = query(ref, orderBy("timestampCreated", "desc"), limit(400));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot) return null;

    const qDocs = querySnapshot.docs;
    if (!qDocs) return null;

    const tamanho = querySnapshot.size;

    let list = [];
    let listEmAndamento = [];
    let emAndamento = null;
    let ultimo = 0;

    for (let i = 0; i < tamanho; i++) {

        const item = qDocs[i];
        const data = item.data();

        const concluida = (data.status === 5);
        if (concluida) {
            list.push(data);
        }

        const andamento = (data.status !== 3 && data.status !== 5);
        if (andamento) {
            listEmAndamento.push(data);
        }

    }

    if (listEmAndamento.length > 0) {
        emAndamento = listEmAndamento[0];
    }

    if (list.length > 0) {
        ultimo = list[0].valorFinal;
    }

    return { list, emAndamento, ultimo };

};

const confirmarDados = (state) => {

    const { chave, banco, titular } = state.document;

    if (chave === '') {
        alert('Insira sua chave pix');
        return false;
    }

    if (titular === '') {
        alert('Insira o nome do titular da conta');
        return false;
    }

    if (banco === '') {
        alert('Insira o nome do banco');
        return false;
    }

    return true;
};

const getDadosAgendamento = (idRef, valor, state) => {

    const { chave, banco, titular } = state.document;

    return {
        id: idRef,
        timestampCreated: Date.now(),
        timestampPay: 0,
        previsao: '',
        valorTemporario: valor,
        valorFinal: valor,
        status: 1,
        chave: chave,
        bank: banco,
        titular: titular
    };
};

const salvarAgendamento = async (state, listener) => {

    if (!confirmarDados(state)) {
        return listener({ sucess: false, data: null });
    }

    const usuario = state.usuario;
    const valor = state.totalAReceber;


    const batch = writeBatch(db);

    const refCentral = doc(collection(db, 'Pagamentos'));
    const idRef = refCentral.id;
    const ref = doc(db, 'Pagamentos', 'Usuario', usuario.uid, idRef);

    const docFinal = getDadosAgendamento(idRef, valor, state);

    batch.set(refCentral, docFinal);
    batch.set(ref, docFinal);

    batch.commit().then(() => {
        return listener({ sucess: true, data: docFinal });
    }).catch(error => {
        return listener({ sucess: false, data: null });
    });


};

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

function ContentVazio({ classes }) {

    return (
        <Card className={classes.contentCardMain}>

            <Box className={classes.spacing} />

        </Card>
    );
};

function ContentInputs({ classes, state, setState, agendar }) {

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
                        <InputAgendamento state={state} setState={setState} click={agendar} />
                    </Box>


                </Grid>

            </Grid>
        </Card>


    );
};

function ContentMain({ classes, state, setState, agendar }) {

    if (state.pb) return <Pb />;


    return (

        <div>

            <Container maxWidth="lg" style={{ paddingTop: '80px', paddingBottom: '0px', }} >
                <SubHead
                    title="Resumo da Carteira"
                />
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
                            total={state.totalPendente}
                            classes={classes} />
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <ContentCards
                            title="Ultimo Saque"
                            total={state.ultimo}
                            classes={classes} />
                    </Grid>



                </Grid>



            </Container>

            <Container style={{ paddingTop: '20px', paddingBottom: '0px', }}>
                <SubHead
                    title="Solicitação de Agendamento"
                />
                <Grid container>
                    <Grid item xs={12}>
                        <ContentInputs
                            classes={classes}
                            agendar={agendar}
                            state={state}
                            setState={setState} />
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
        agendamentos: [],
        emAndamento: null,
        ultimo: 0,
        minhasVendas: [],
        totalComissoesVendas: 0,
        comissoesAfiliados: [],
        totalComissoesAfilidados: 0,
        totalAReceber: 0,
        totalPendente: 0,
        pb: true,
        load: false,
        document: {
            chave: '',
            titular: '',
            banco: ''
        }
    });


    useEffect(() => {
        window.scrollTo(0, 0);
        getAuth().onAuthStateChanged(async usr => {
            if (usr) {

                if (usr.isAnonymous) {
                    abrirLogin();
                } else {

                    const docUsuario = await verificarRegistro(usr);

                    if (!docUsuario) {
                        abrirFormulario();
                        return;
                    }

                    const resultComissoes = await getComissoes(usr.uid);
                    const listComissoes = resultComissoes ? resultComissoes.list : [];
                    const totalComissoes = resultComissoes ? resultComissoes.total : 0;
                    const pendenteVendas = resultComissoes ? resultComissoes.pendente : 0;
                    console.log(totalComissoes);

                    const resultBonus = await getBonus(usr.uid);
                    const listBonus = resultBonus ? resultBonus.list : [];
                    const totalBonus = resultBonus ? resultBonus.total : 0;
                    const pendenteBonus = resultBonus ? resultBonus.pendente : 0;

                    const resultAgendamentos = await getAgendamento(usr.uid);
                    const listAgendamentos = resultAgendamentos ? resultAgendamentos.list : [];
                    const emAndamento = resultAgendamentos ? resultAgendamentos.emAndamento : null;
                    const ultimo = resultAgendamentos ? resultAgendamentos.ultimo : 0;



                    let objDocument = {
                        chave: '',
                        titular: '',
                        banco: ''
                    };

                    if (emAndamento) {
                        objDocument = {
                            chave: emAndamento.chave,
                            titular: emAndamento.titular,
                            banco: emAndamento.bank
                        };
                    }


                    console.log(ultimo, emAndamento)

                    setState((prevState) => ({
                        ...prevState,
                        pb: false,
                        emAndamento: emAndamento,
                        agendamentos: listAgendamentos,
                        usuario: docUsuario,
                        minhasVendas: listComissoes,
                        comissoesAfiliados: listBonus,
                        totalComissoesVendas: totalComissoes,
                        totalComissoesAfilidados: totalBonus,
                        totalAReceber: (totalBonus + totalComissoes),
                        totalPendente: (pendenteVendas + pendenteBonus),
                        ultimo: ultimo,
                        document: objDocument
                    }));
                }

            } else {
                abrirLogin();
            }

        });
    }, []);

    const registrarAgendamento = async () => {

        setState((prevState) => ({
            ...prevState,
            load: true
        }));

        salvarAgendamento(state, ({ data, sucess }) => {

            if (sucess) {

                setState((prevState) => ({
                    ...prevState,
                    load: false,
                    emAndamento: data
                }));

            } else {

                alert('Erro ao fazer agendamento, tente novamente');

                setState((prevState) => ({
                    ...prevState,
                    load: false
                }));

            }

        });


    };

    return (
        <ContentMain classes={classes} state={state} setState={setState} agendar={registrarAgendamento} />
    );
};


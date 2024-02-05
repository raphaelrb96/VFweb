
import { Box, Card, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { SubHead } from "./SubHead";
import classNames from "classnames";
import { grayColor } from "assets/jss/material-kit-pro-react";

const useStyles = makeStyles(theme => ({
    contanerMain: {
        paddingTop: theme.spacing(4),
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(4)
        },
    },
    mainRaised: {
        borderRadius: "12px",
    },
    main: {
    },
    card: {
        background: 'white',
        borderRadius: "12px",
        zIndex: "3",
        width: '100%',
        marginBottom: theme.spacing(0),
        marginTop: theme.spacing(1),
    },
    title: {
        fontSize: theme.typography.h6.fontSize,
        paddingBottom: theme.spacing(2),
        paddingTop: '3px',
        fontWeight: '400',
        color: grayColor[10]
    },
    itemForm: {
        fontSize: theme.typography.subtitle1.fontSize,
        color: grayColor[10],
        [theme.breakpoints.down("sm")]: {
        }
    }
}));



const ItemText = ({title}) => {
    const classes = useStyles();
    return(
        <Typography className={classes.itemForm}>
            {String(title).toUpperCase()}
        </Typography>
    )
};

const Content = ({ onChange, list }) => {
    const [value, setValue] = useState(null);

    const classes = useStyles();

    const handleChange = (event) => {
        const string = event.target.value;
        setValue(string);
        onChange(string);
    };

    return (
        <Card elevation={4} className={classNames(classes.main, classes.mainRaised, classes.card)} sx={{ width: "100%" }}>
            <Grid container xs={12} alignItems="center">
                <Box className={classes.boxCenter} py={4} px={4}>
                    <FormControl component="fieldset">
                        <FormLabel className={classes.title} component="h6" color="primary" >Modelos Disponíveis</FormLabel>
                        <RadioGroup row aria-label="Cores" name="cores" value={value} onChange={handleChange}>
                            {list.map(item => (
                                <FormControlLabel value={item} control={<Radio color='primary' />} label={<ItemText title={item} />}  />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>

            </Grid>
        </Card>
    );
}

export const SectionVariantes = ({ listener, modelos }) => {

    const classes = useStyles();

    if(!modelos) return null;

    return (
        <div className={classes.contanerMain}>
            <SubHead
                title="Variações de Modelos"
                subTitle="Selecione o modelo ou cor do produto"
            />
            <Grid container item xs={12}>
                <Content onChange={listener} list={modelos} />
            </Grid>
        </div>
    );
};
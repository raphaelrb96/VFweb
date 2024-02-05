
import { Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
    contanerMain: {

    },
    head: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        flexDirection: "column",
        width: '100%',
    },
    card: {
        background: 'white'
    },
    title: {
        width: '100%',
    }
}));

export const SubHead = ({ title, subTitle }) => {

    const classes = useStyles();

    return (
        <Grid container item xs={12} justifyContent="center" className={classes.head} sx={{ textAlign: "center" }}>

            <Typography className={classes.title} variant="h6" color="text">
                {title}
            </Typography>

            {
                subTitle ?
                <Typography variant="body2" color="text">
                    {subTitle}
                </Typography>
                : null
            }

        </Grid>
    );
};
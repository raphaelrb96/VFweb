
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
    },
    center: {
        textAlign: 'center'
    }
}));

export const SubHead = ({ title, subTitle, center }) => {

    const classes = useStyles();

    const titleStyle = center ? [classes.title, classes.center] : classes.title;

    return (
        <Grid container item xs={12} justifyContent="center" className={classes.head} sx={{ textAlign: "center" }}>

            <Typography className={titleStyle} variant="h6" color="text">
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
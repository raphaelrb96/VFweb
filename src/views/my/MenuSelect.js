import { FormControl, InputLabel, MenuItem, Select, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
    
}));

const MenuSelect = ({handleChange, valor}) => {

    const classes = useStyles();


    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Modelos</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={valor}
                onChange={handleChange}
                label="Modelos"
            >
                <MenuItem value="">
                    <em>Cores</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
}

export default MenuSelect;
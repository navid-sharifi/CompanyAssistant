import { Autocomplete, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import React, { FC } from "react";




export const SimpleInput: FC<{
    displayname: String;
    value: any;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    StartWith?: string;
    multiline?: boolean;
}> = ({
    displayname, value, onChange, StartWith, multiline
}) => {

        return (<FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel>{displayname}</InputLabel>
            <Input
                multiline={multiline}
                
                value={value}
                onChange={onChange}
                startAdornment={StartWith ? <InputAdornment position="start">+98</InputAdornment> : null} />
        </FormControl>);
    };


export const SimpleAutocomple: FC<{
    displayname: String;
    value: any;
    onChange: any
    StartWith?: string;
    multiline?: boolean;
}> = ({
    displayname, value, onChange
}) => {


        const defaultProps = {
            options: [{
                navid: "one"
            }],
            getOptionLabel: (option: any) => option.navid,
        };

        return (<Autocomplete
            value={value}
            onChange={onChange}
            {...defaultProps}
            renderInput={(params) => (
                <TextField {...params} label={displayname} variant="standard" />
            )}
        />)

    };


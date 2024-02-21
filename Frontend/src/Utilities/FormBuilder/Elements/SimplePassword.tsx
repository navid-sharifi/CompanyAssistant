import { Visibility, VisibilityOff } from "@mui/icons-material"
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material"
import React, { FC } from "react"



export const SimplePassword: FC<{
    displayname: String,
    value: any,
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>

}> = ({
    displayname,
    value,
    onChange
}) => {

        const [showPassword, setShowPassword] = React.useState(false);
        const handleClickShowPassword = () => setShowPassword((show) => !show);
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };

        return (<FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel>{displayname}</InputLabel>
            <Input
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>)
    }



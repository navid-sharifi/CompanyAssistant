import { Popover } from "@mui/material"
import React, { FC } from "react"
import { JsxElement } from "typescript";


const SimplePopover: FC<{
    Trigger: JSX.Element,
    children?: React.ReactNode
}> = ({
    Trigger,
    children
}) => {

        const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return <>
            <span onClick={handleClick}>
                {Trigger}
            </span>
            <Popover
                onClick={handleClose}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {children}
            </Popover>

        </>
    }


export default SimplePopover
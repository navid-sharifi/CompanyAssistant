import { ModalDialog } from "@mui/joy"
import { Modal as MuiModal } from "@mui/material"
import React, { FC } from "react"

export const Modal: FC<{
    children?: React.ReactNode,
    width?: number,
    onClose?: {
        bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
    }['bivarianceHack'];
}> = ({ children, onClose, width = 500 }) => {

    return (<MuiModal open onClose={onClose}>
        <ModalDialog size="lg" sx={{ width: width + "px", overflow: "auto" }}>{children}</ModalDialog>
    </MuiModal>
    )


}
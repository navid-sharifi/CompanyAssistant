import { ModalDialog } from "@mui/joy"
import { Modal as MuiModal } from "@mui/material"
import React, { FC } from "react"

export const Modal: FC<{
    children?: React.ReactNode
}> = ({ children }) => {

    return (<MuiModal open>
        <ModalDialog size="lg" sx={{ width: "500px" }}>{children}</ModalDialog>
    </MuiModal>
    )

}
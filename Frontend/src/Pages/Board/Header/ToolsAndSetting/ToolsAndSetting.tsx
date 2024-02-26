import { Button } from "@mui/material"
import { useState } from "react";
import { MdViewColumn } from "react-icons/md";
import CRUD from "../../../../Utilities/CRUD/CRUD";

export const ToolsAndSetting = () => {

    return <div>
        <Columns />
    </div>
}

const Columns = () => {

    const [openList, setOpenList] = useState(false)
    return <>
        <Button variant="text" color="inherit" className="noUpperCase" startIcon={<MdViewColumn />}> Columns </Button>
        <CRUD columns={[]} />
    </>
}

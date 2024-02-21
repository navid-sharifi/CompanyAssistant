import { FC, useEffect, useState } from "react";
import { Http } from "../../Model/Enums/Http";
import useHttpClient from "../Http/useHttpClient";
import classes from './CRUD.module.scss'
import { Field, SimpleForm } from "../FormBuilder/FormBuilder";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, CircularProgress, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SimplePopover from "../FormBuilder/Elements/SimplePopover";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { HttpResponseModel } from "../Http/Models";


interface props {
    PagenationUrl?: string,
    noPaginations?: boolean
    noHeader?: boolean
    StaticData?: any[],
    PagenationUrlMethod?: Http,
    columns: GridColumn[],
    pageItem?: number,
    minWidth?: number,
    AddFields?: Field[],
    AddUrl?: string,
    EditDataBeforeAddSubmit?: (data: any) => any;
    EditDataBeforeEditSubmit?: (data: any) => any;
    EditEditFromData?: (data: any) => any;
    DeleteUrl?: (row: any) => string,
    DeleteMethod?: Http,
    EditUrl?: (row: any) => string,
    EditMethod?: Http,
    EditFields?: Field[],
    Actions?: {
        name: string,
        onClick?: (data: any) => void,
        redirectWithRetunUrl?: string
        param?: { name: string, value: (data: any) => string }[]
    }[]
}

const CRUD: FC<props> = ({
    noHeader = false,
    minWidth = 650,
    noPaginations = false,
    StaticData,
    PagenationUrl,
    PagenationUrlMethod = Http.GET,
    columns,
    pageItem = 5,
    AddFields,
    AddUrl,
    DeleteUrl,
    DeleteMethod = Http.DELETE,
    EditUrl,
    EditDataBeforeAddSubmit,
    EditMethod = Http.PUT,
    EditFields,
    EditEditFromData,
    EditDataBeforeEditSubmit,
    Actions
}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [Items, setItems] = useState<any[]>();
    const [totalCount, setTotalcount] = useState(0)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(pageItem)
    const { isLoading, send } = useHttpClient();
    const DeleteHttp = useHttpClient();
    const [OpenAddForm, SetOpenAddForm] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<any>()
    const [itemToEdit, SetItemToEdit] = useState<any>()
    const navigate = useNavigate();
    const DeleteItem = async () => {
        if (!DeleteUrl)
            return;
        const { response, errorMessage } = await DeleteHttp.send({
            method: DeleteMethod,
            url: DeleteUrl(itemToDelete),
        });

        if (response) {

            setItemToDelete(null)

        } else if (errorMessage) {
            toast.error(errorMessage, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };


    /////fetch items
    const fetchItems = async () => {


        if ((StaticData && StaticData.length > 0) || noPaginations) {
            setItems(StaticData)
            // setTotalcount(StaticData.length)
            return;
        }

        var filter = {
            "filter": null,
            "sorting": null,
            "skipCount": ((page + 1) * pageSize) - pageSize,
            "maxResultCount": pageSize
        };



        const { response, errorMessage } = await send({
            method: PagenationUrlMethod,
            url: PagenationUrl ?? "",
            data: filter
        });
        if (response) {

            var rows = (response as HttpResponseModel<any[]>).data
            var totalCount = (response as any)?.result?.totalCount as number;

            setItems(rows)
            setTotalcount(totalCount)

        } else if (errorMessage) {
            toast.error(errorMessage, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        setTimeout(() => {
            fetchItems()
        }, 500);

    }

    const [effectFirstTime, SetEffectFirstTime] = useState(true);
    useEffect(() => {

        if (effectFirstTime) {
            SetEffectFirstTime(false)
            return;
        }

        if (itemToDelete === null || itemToEdit === null || OpenAddForm === false) {

            fetchItems();
        }


    }, [OpenAddForm, itemToDelete, itemToEdit])


    useEffect(() => {
        console.log('here');
        // let updatedSearchParams = new URLSearchParams(searchParams.toString());
        // updatedSearchParams.set('page', page.toString());
        // setSearchParams(updatedSearchParams.toString());

        fetchItems();
    }, [page, pageSize]);


    return (
        <Box className={classes.crud}>

            {/* delete Modal confration */}
            {itemToDelete &&
                <Modal open={true}>
                    <Box p={"20px"} maxWidth={"400px"} margin={"auto"}>
                        <Paper>
                            <Box p={"20px"}>
                                <Stack gap={10} pt={"10px"}>
                                    Are you sure you want to delete ?
                                    {DeleteHttp.isLoading ? <Box textAlign={"right"}>
                                        <Button variant="contained" color='error' size='small'>
                                            <CircularProgress color="inherit" style={{ height: '22px', width: "22px" }} />
                                        </Button> {" "}
                                        <Button variant="contained" color='info' size='small'>
                                            Close
                                        </Button>
                                    </Box> : <Box textAlign={"right"}>
                                        <Button variant="contained" color='error' size='small' onClick={DeleteItem}>
                                            Delete
                                        </Button> {" "}
                                        <Button variant="contained" color='info' size='small' onClick={() => setItemToDelete(null)}>
                                            Close
                                        </Button>
                                    </Box>}
                                </Stack>
                            </Box>
                        </Paper>
                    </Box>
                </Modal >
            }


            {/* edit form */}
            {
                itemToEdit &&
                EditFields &&
                EditUrl &&
                <SimpleForm
                    method={EditMethod}
                    fields={EditFields}
                    data={EditEditFromData ? EditEditFromData(itemToEdit) : itemToEdit}
                    EditDataBeforeAddSubmit={EditDataBeforeEditSubmit}
                    url={EditUrl(itemToEdit)}
                    Close={() => SetItemToEdit(false)} />
            }

            {
                searchParams.get('returnUrl') &&
                <Box textAlign={"left"}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => {
                            var returnUrl = searchParams.get('returnUrl')
                            if (returnUrl)
                                navigate(returnUrl);

                        }}>  برگشت </Button>
                </Box>
            }

            <Box textAlign={"right"} pb={"10px"}>
                {
                    isLoading &&
                    <Button
                        variant="text"
                        color='info'
                        size="small"

                        onClick={() => SetOpenAddForm(true)}>
                        <CircularProgress color="inherit" style={{ height: '22px', width: "22px" }} />
                    </Button>
                }
                {
                    AddFields &&
                    AddFields.length > 0 &&
                    <Button
                        variant="contained"
                        color='success'
                        size="small"
                        endIcon={<AddIcon />}
                        onClick={() => SetOpenAddForm(true)}>
                        Add
                    </Button>
                }
            </Box>

            {/* add from */}
            {
                OpenAddForm &&
                AddFields &&
                AddFields.length > 0 &&
                <SimpleForm
                    fields={AddFields}
                    url={AddUrl ?? ''}
                    EditDataBeforeAddSubmit={EditDataBeforeAddSubmit}
                    Close={() => SetOpenAddForm(false)} />
            }

            <TableContainer style={{ borderRadius: "0" }} component={Paper}  >
                <Table sx={{ minWidth: minWidth }} aria-label="simple table">
                    {
                        noHeader === false && columns && columns.length > 0 &&
                        <TableHead>
                            <TableRow className={classes.header}>
                                {
                                    columns.map((col, colCounter) =>
                                        <TableCell
                                            padding="none"

                                            key={colCounter} hidden={col.display} className={classes.header}>
                                            {col.displayName()}
                                        </TableCell>
                                    )
                                }
                                {
                                    ((DeleteUrl) ||
                                        (EditUrl && EditFields && EditFields.length > 0)
                                        ||
                                        (Actions && Actions.length > 0)

                                    ) && <TableCell></TableCell>
                                }
                            </TableRow>
                        </TableHead>
                    }

                    {/* rows */}
                    {
                        Items && Items?.length > 0 &&
                        <TableBody >
                            {
                                Items?.map((row, counterRow) => (
                                    <TableRow
                                        className={classes.row}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        key={counterRow}>
                                        {
                                            columns && columns.length > 0 ?
                                                columns.map((col, colCounter) =>
                                                    <TableCell
                                                        width={col.width}
                                                        padding="none"
                                                        style={{ padding: "5px" }}
                                                        key={colCounter}
                                                    >

                                                        <span>
                                                            {
                                                                col.value(row)
                                                            }
                                                        </span>


                                                    </TableCell>
                                                ) : null
                                        }

                                        {
                                            ((DeleteUrl) ||
                                                (EditUrl && EditFields && EditFields.length > 0)
                                                ||
                                                (Actions && Actions.length > 0)

                                            ) &&
                                            <TableCell padding="none">
                                                <SimplePopover Trigger={<Button startIcon={<MoreVertIcon />} />} >
                                                    <Box padding={"5px"}>
                                                        {
                                                            DeleteUrl != undefined &&
                                                            <div
                                                                onClick={() => setItemToDelete(row)}>
                                                                <Button
                                                                    endIcon={<DeleteIcon />}
                                                                    className="noUpperCase"
                                                                    variant="contained"
                                                                    fullWidth
                                                                    color="error"
                                                                    size="small"
                                                                >  Delete</Button>

                                                                {/* <Typography variant="body2"
                                                                    color={"white"}

                                                                    style={{ cursor: 'pointer', backgroundColor: "red", padding: " 5px 8px" }}
                                                                >
                                                                    Delete Item
                                                                </Typography> */}
                                                            </div>
                                                        }
                                                        {
                                                            EditUrl && EditFields && EditFields.length > 0 &&
                                                            <Box
                                                                mt={"5px"}
                                                                onClick={() => SetItemToEdit(row)}>

                                                                <Button
                                                                    endIcon={<EditIcon />}
                                                                    className="noUpperCase"
                                                                    fullWidth
                                                                    variant="contained"
                                                                    color="primary"
                                                                    size="small"
                                                                >  Edit</Button>

                                                                {/* <Typography
                                                                    variant="body2"
                                                                    color={"white"}
                                                                    style={{ cursor: 'pointer', backgroundColor: 'blue' }}
                                                                >
                                                                    Edit Item
                                                                </Typography> */}

                                                            </Box>
                                                        }

                                                        {
                                                            Actions && Actions.length > 0 &&
                                                            Actions.map((k, i) => <Box
                                                                key={i}
                                                                mt={"5px"}
                                                                onClick={() => {

                                                                    if (k.onClick) {
                                                                        k.onClick(row)
                                                                    }

                                                                    if (k.redirectWithRetunUrl) {

                                                                        let updatedSearchParams = new URLSearchParams();
                                                                        updatedSearchParams.set('returnUrl',
                                                                            window.location.pathname + window.location.search

                                                                        );

                                                                        if (k.param && k.param.length > 0) {

                                                                            k.param.forEach(element => {
                                                                                updatedSearchParams.set(element.name, element.value(row));
                                                                            })
                                                                        }

                                                                        navigate(k.redirectWithRetunUrl + '?' + updatedSearchParams.toString());
                                                                    }

                                                                }}>
                                                                <Typography variant="body2">
                                                                    {k.name}
                                                                </Typography>
                                                            </Box>)
                                                        }
                                                    </Box>
                                                </SimplePopover>
                                            </TableCell>
                                        }
                                    </TableRow>
                                )
                                )
                            }
                        </TableBody>
                    }
                    {
                        !noPaginations && Items && Items?.length > 0 && totalCount && totalCount > 0 &&
                        <TableFooter>
                            <TableRow>

                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={3}
                                    count={totalCount}
                                    rowsPerPage={pageSize}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                // ActionsComponent={TablePaginationActions}
                                />



                            </TableRow>
                        </TableFooter>
                    }
                </Table>
            </TableContainer>
        </Box >)
}

export default CRUD


export interface GridColumn {
    displayName: () => string;
    value: (item: any) => any;
    display?: boolean,
    width?: number
}




import React, { FC, useCallback, useEffect, useState } from "react";
import { Http } from "../../Model/Enums/Http";
import useHttpClient from "../Http/useHttpClient";
import Resizer from "react-image-file-resizer";
import Dropzone from "react-dropzone";
import OpenLayersMap from "@neshan-maps-platform/ol/Map";
import VectorLayer from "@neshan-maps-platform/ol/layer/Vector";
import VectorSource from "@neshan-maps-platform/ol/source/Vector";
import { Feature } from "@neshan-maps-platform/ol";
import { Point } from "@neshan-maps-platform/ol/geom";
import Style from "@neshan-maps-platform/ol/style/Style";
import Icon from "@neshan-maps-platform/ol/style/Icon";
import { Coordinate } from "@neshan-maps-platform/ol/coordinate";
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import { v4 as uuidv4 } from 'uuid';
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import classes from './from.module.scss'
import moment from "moment-jalaali";
import { CasheContext } from "../../Contexts/CasheContext";
import { RemoteSelectSearchable } from "./RemoteSelectSearchable/RemoteSelectSearchable";
import { SimpleSelect, SimpleSelectSearchable } from "./SimpleSelect/SimpleSelect";
import UseOnClickOutside from "./UseOutside/UseOutside";
import { IoCloseCircleSharp } from "react-icons/io5";

import { toast } from "react-toastify";
import {
    Box,
    Button,
    ButtonPropsColorOverrides,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack, Switch, Typography
} from "@mui/material";

import Modal from '@mui/joy/Modal';

import { SimplePassword } from "./Elements/SimplePassword";
import { SimpleInput } from "./Elements/SimpleInput";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GroupCheckBox } from "./SimpleSelect/GroupCheckBox";
import { Height, YardRounded } from "@mui/icons-material";
import { DialogContent, LinearProgress, ModalClose, ModalDialog } from "@mui/joy";
import { log } from "console";
import { RemoteMultiSelectSearchable } from "./RemoteMultiSelectSearchable/RemoteMultiSelectSearchable";
import { HtmlEditor } from "./HtmlEditor/HtmlEditor";


var jalaali = require('jalaali-js')

interface FromBuilderProps {
    JustButton?: boolean;
    linearProgress?: boolean;
    ExternalIsLoading?: boolean;
    SubmitButtonNoUpperCase?: boolean;
    ConfirmMessage?: string;
    OpenInModal?: boolean,
    MinHight?: string,
    OnFormChange?: (from: any, extraData: any, setForm: (value: any, key: string) => void, submit: () => void) => void
    SuccessMessge?: string,
    FetchUrl?: string,
    OnSuccess?: (data: any, form: any, CleanFrom?: () => void) => void,
    OnSubmitForm?: (form: any) => void,
    OnBeforSubmit?: (form: any) => boolean
    htttMethod?: Http,
    OnCloseModal?: () => void,
    Fields?: Field[],
    Data?: any,
    FullWidthSubmitButton?: boolean,
    SubmitButtonName?: string,
    SubmitButtonVariant?: 'text' | 'outlined' | 'contained',
    SubmitButtonStartIcon?: React.ReactNode,
    AfterSubmitButton?: React.ReactNode,
    BeforFormTitle?: React.ReactNode,
    SubmitButtonColor?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides
    >,
    Title?: string,
    Subtitle?: string,
    ElementContainerClassName?: string,
    EditDataBeforSubmit?: (data: any, extraData?: any) => any
}

const FormBuilder: FC<FromBuilderProps> = ({
    BeforFormTitle,
    linearProgress = false,
    ExternalIsLoading,
    SubmitButtonNoUpperCase,
    AfterSubmitButton,
    SubmitButtonStartIcon,
    SubmitButtonVariant = 'contained',
    JustButton = false,
    MinHight,
    OpenInModal = false,
    OnFormChange,
    SuccessMessge = "Save Successfully",
    FetchUrl,
    OnSuccess,
    OnBeforSubmit,
    htttMethod = Http.POST,
    OnCloseModal,
    Fields,
    Data,
    FullWidthSubmitButton = false,
    SubmitButtonName = "Save",
    Title,
    Subtitle,
    EditDataBeforSubmit,
    OnSubmitForm,
    ElementContainerClassName = "",
    SubmitButtonColor = "primary",
    ConfirmMessage
}) => {


    const dateTimeRef = React.useRef();

    const handleDatePickerClose = useCallback(
        () => {
            if (dateTimeRef && dateTimeRef.current) {

                (dateTimeRef?.current as any)?.closeCalendar();
            }
        }
        ,
        [dateTimeRef]
    );
    UseOnClickOutside(dateTimeRef, handleDatePickerClose);


    const { isLoading, send } = useHttpClient();
    const [form, setFormState] = useState<any>(Data ?? {});
    const [validationMessages, setValidationMessages] = useState<any>({});
    const [_extraData, _setExtraData] = useState<any>({});

    const CleanForm = () => setFormState({})

    useEffect(() => {

        if (!Fields) {
            return;
        }

        if (Fields.filter(c => c.defaultValue).length > 0) {

            Fields.filter(c => c.defaultValue).forEach(element => {
                setForm(
                    element.defaultValue,
                    element.name
                )
            });
        }

    }
        , [])


    const [firest, setFirest] = useState(true);
    useEffect(() => {

        if (firest) {
            setFirest(false)
            return
        }

        if (OnFormChange) {
            OnFormChange(form, _extraData, setForm, OnSubmit)
        }

    }, [form])


    const setForm = (
        value: any,
        key: string
    ) => {
        setFormState((prevState: any) => ({
            ...prevState,
            [key]: value,
        }));
    }

    const SetValidation = (
        value: any,
        key: string
    ) => {
        setValidationMessages((prevState: any) => ({
            ...prevState,
            [key]: value,
        }));
    }


    const SetExtraData = (
        value: any,
        key: string
    ) => {
        _setExtraData((prevState: any) => ({
            ...prevState,
            [key]: value,
        }));
    }

    const setFormForArrayWithId = (
        value: any,
        key: string
    ) => {
        setFormState((prevState: any) => {
            if (!prevState[key]) {
                return ({
                    ...prevState,
                    [key]: [value],
                })
            }
            return ({
                ...prevState,
                [key]: [...(prevState[key] as any[])?.filter((c: any) => c._id !== value._id), value],
            })
        });
    }
    var [seed, setSeed] = useState(0)
    const DeleteFormForArrayWithId = (
        value: any,
        key: string
    ) => {
        setFormState((prevState: any) => {

            var newData = [...(prevState[key] as any[]).filter((c: any) => c._id !== value._id)]

            setSeed(f => f > 1000 ? 0 : ++f)

            return ({
                ...prevState,
                [key]: newData,
            })
        });
    }

    const OnSubmit = () => {


        console.log(!FormIsValid());

        if (!FormIsValid()) {
            return
        }

        const Save = async () => {

            if ((OnBeforSubmit && !OnBeforSubmit(form)) || !FetchUrl) {
                return;
            }

            const { response, errorMessage } = await send({
                method: htttMethod,
                url: FetchUrl,
                data: EditDataBeforSubmit ? EditDataBeforSubmit(form, _extraData) : form
            });

            if (response) {


                toast.success(SuccessMessge, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });


                if (OnSuccess)
                    OnSuccess(response, form, CleanForm);

                setShowConfirmMessage(false)

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
        Save()
    }



    var FormIsValid = () => {


        var isvalid = true;
        var Fildvalidations = Fields?.filter(c => (c.Validations && c.Validations.length > 0));
        if (!Fildvalidations || Fildvalidations.length < 1) return isvalid

        var validations: any = {};
        Fildvalidations.forEach(Fildvalidation => {
            var value = form[Fildvalidation?.name];

            Fildvalidation?.Validations?.reverse().forEach(validation => {
                switch (validation.type) {
                    case ("required"):
                        if (!value) {
                            validations[Fildvalidation.name] = 'required'
                        }
                        break;

                    default:
                        break;
                }

            });

        })

        if (Object.keys(validations).length > 0) {
            isvalid = false;
        }
        setValidationMessages(validations)
        return isvalid;
    }


    const [ShowConfrimMessage, setShowConfirmMessage] = useState(false)

    const submitButton = (FetchUrl || OnSubmitForm) && <>{
        (isLoading || ExternalIsLoading === true) ? <Button
            startIcon={SubmitButtonStartIcon}
            variant={SubmitButtonVariant}

            color={SubmitButtonColor}
            fullWidth={FullWidthSubmitButton}
        >
            <CircularProgress color="inherit" style={{ height: '22px', width: "22px" }} />
        </Button> : <Button
            startIcon={SubmitButtonStartIcon}
            variant={SubmitButtonVariant}
            className={[SubmitButtonNoUpperCase === true ? "noUpperCase" : ""].join('')}
            color={SubmitButtonColor}
            onClick={() => {

                if (ConfirmMessage) {
                    setShowConfirmMessage(true)
                    return;
                }

                if (OnSubmitForm) {
                    OnSubmitForm(form)
                }
                if (FetchUrl) {
                    OnSubmit()
                }
            }}
            fullWidth={FullWidthSubmitButton}
        >
            {SubmitButtonName}
        </Button>
    }</>;

    const UI = <div className={classes.form_builder}>
        {BeforFormTitle}
        {
            Title && <Typography variant="h5" gutterBottom>
                {Title}
            </Typography>
        }
        {
            Subtitle &&
            <Typography style={{ marginBottom: "20px" }} variant="body2" gutterBottom>
                {Subtitle}
            </Typography>
        }

        <Stack key={seed} className={ElementContainerClassName}>
            {Fields && Fields.length > 0 && Fields.map((item, counter) => {

                if (item.isHide)
                    return null;

                switch (item.type) {
                    case FieldType.PhonenumberWithLeftAddOne:
                        return <Box key={counter}>
                            <SimpleInput
                                value={form[item?.name] ?? ''}
                                onChange={(e) => setForm(e.target.value, item.name)}
                                displayname={item.displayname}
                                StartWith="+98"
                            />
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>

                    case FieldType.Password:
                        return <Box key={counter}>
                            <SimplePassword
                                displayname={item.displayname}
                                onChange={(e) => setForm(e.target.value, item.name)}
                                value={form[item?.name] ?? ''}
                            />
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>



                    case FieldType.Base64File:
                        return <Box key={counter} padding={"10px 0 10px 10px"}>
                            <Typography variant="body2" gutterBottom style={{ paddingBottom: "5px" }}>{item.displayname}</Typography>
                            <Dropzone maxFiles={1}
                                // accept={{
                                //     "image/png": [".png"],
                                //     "image/jpg": [".jpg"]
                                // }}
                                onDrop={async files => {
                                    try {
                                        const file = files[0];
                                        if (file) {
                                            const reader = new FileReader();

                                            reader.onload = () => {
                                                const base64String = reader.result as string;
                                                setForm(base64String, item.name);
                                                SetExtraData(file, item.name);
                                            };
                                            // Read the file as a data URL!
                                            reader.readAsDataURL(file);
                                        }

                                    } catch (error) {
                                    }
                                }}>
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        bgcolor={"#f1f1f1"}
                                        border={"1px dashed gray"}
                                        borderRadius={"5px"}
                                        textAlign={"center"}
                                        p={"10px 0"}
                                    >
                                        <div
                                            {...getRootProps({
                                                className: 'dropzone',
                                                onDrop: event => event.stopPropagation()
                                            })}
                                        >
                                            <input {...getInputProps()} />

                                            {form[item?.name] ?
                                                <div>File : {_extraData[item?.name].name}</div> :
                                                <Typography variant="subtitle2">
                                                    Drop a file here or click to select.
                                                </Typography>
                                            }
                                        </div>
                                    </Box>
                                )}
                            </Dropzone>
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>

                    case FieldType.Base64Image:
                        return <Box key={counter}>
                            <Typography variant="body2" gutterBottom style={{ paddingBottom: "5px" }}>{item.displayname}</Typography>
                            <Dropzone maxFiles={1}
                                accept={{
                                    "image/png": [".png"],
                                    "image/jpg": [".jpg"]
                                }}
                                onDrop={async files => {
                                    try {

                                        const file = files[0];

                                        const image = await resizeFile(file, 300, 300);

                                        setForm(image, item.name);

                                    } catch (error) {
                                    }
                                }}>
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        bgcolor={"#f1f1f1"}
                                        border={"1px dashed gray"}
                                        borderRadius={"5px"}
                                        textAlign={"center"}
                                        p={"10px 0"}
                                    >
                                        <div
                                            {...getRootProps({
                                                className: 'dropzone',
                                                onDrop: event => event.stopPropagation()
                                            })}
                                        >
                                            <input {...getInputProps()} />


                                            {form[item?.name] ? <>
                                                <img style={{ margin: "auto", borderRadius: "4px" }} alt={item.displayname} src={form[item?.name]} />
                                            </>
                                                :
                                                <Typography variant="subtitle2">
                                                    یک عکس را در این محل رها کنید یا برای انتخاب کلیک کنید
                                                </Typography>
                                            }
                                        </div>
                                        {
                                            form[item?.name] &&
                                            <Button onClick={() => setForm('', item.name)} startIcon={<IoCloseCircleSharp
                                                color="red"

                                                style={{
                                                    height: "20px",
                                                    width: "20px",
                                                    backgroundColor: '#fff',
                                                    borderRadius: "100%"
                                                }}

                                            />} variant="outlined" color="warning">Remove </Button>
                                        }

                                    </Box>
                                )}
                            </Dropzone>
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    case FieldType.RemoteSelect:
                        return <Box key={counter}>
                            <Typography variant="body2" gutterBottom style={{ paddingBottom: "5px" }} >{item.displayname}</Typography>
                            {
                                item.url &&
                                item.Key &&

                                <RemoteSelect
                                    value={form[item?.name] ?? ''}
                                    onChange={(e) => setForm(e.target.value, item?.name)}
                                    httpMethod={item.httpMethod}
                                    url={item.url}
                                    Key={item.Key}
                                    dispalyField={item?.dispalyField}
                                    ComplexDispalyField={item?.ComplexDispalyField}
                                    placeholder={item?.placeholder}
                                />}
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    case FieldType.RemoteSelectSearchable:
                        return <Box key={counter} pl={"7px"} pb={"10px"}>
                            <Typography variant="body2" gutterBottom>{item.displayname}</Typography>
                            {
                                item.url &&
                                item.Key &&

                                <RemoteSelectSearchable
                                    isDisabled={item.Disabled}
                                    noCash={item.noCash}
                                    value={form[item?.name] ?? ''}
                                    onObjectChange={(value) => SetExtraData(value, item?.name)}
                                    onChange={(value) => {
                                        setForm(value, item?.name)
                                    }}
                                    OnChangeWithDetil={(value, itemobj) => item.OnChangeWithDetil && item.OnChangeWithDetil(value, itemobj, setForm)}
                                    httpMethod={item.httpMethod}
                                    url={item.url}
                                    Key={item.Key}
                                    dispalyField={item?.dispalyField}
                                    ComplexDispalyField={item?.ComplexDispalyField}
                                    placeholder={item?.placeholder}
                                />}
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    case FieldType.RemoteMultiSelectSearchable:

                        return <Box key={counter} pl={"7px"} pb={"10px"}>
                            <Typography variant="body2" gutterBottom>{item.displayname}</Typography>
                            {
                                item.url &&
                                item.Key &&

                                <RemoteMultiSelectSearchable
                                    noCash={item.noCash}
                                    value={form[item?.name] ?? ''}
                                    onChange={(value) => {
                                        setForm(value, item?.name)
                                    }}
                                    httpMethod={item.httpMethod}
                                    url={item.url}
                                    Key={item.Key}
                                    dispalyField={item?.dispalyField}
                                    ComplexDispalyField={item?.ComplexDispalyField}
                                    placeholder={item?.placeholder}
                                />}
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>



                    case FieldType.SimpleSelect:
                        return <Box key={counter} pl={"7px"} pb={"10px"}>
                            {item.displayname && <Typography variant="body2" gutterBottom >{item.displayname}</Typography>
                            }
                            {
                                item.Items &&
                                item.Items.length > 0 &&

                                <SimpleSelectSearchable
                                    isSearchable={false}
                                    Items={item.Items}
                                    value={form[item?.name] ?? ''}
                                    onChange={(value) => setForm(value, item?.name)}
                                    placeholder={item?.placeholder}
                                />}
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    case FieldType.HtmlEditor:
                        return <Box key={counter} pl={"7px"} pb={"10px"}>
                            {item.displayname && <Typography variant="body2" gutterBottom >{item.displayname}</Typography>}
                            <HtmlEditor
                                value={form[item?.name] ?? ''}
                                OnChange={(value) => setForm(value, item?.name)}
                            />
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    case FieldType.MUISimpleSelect:
                        return <Box key={counter} pl={"7px"} pb={"10px"}>
                            <FormControl variant="standard" sx={{}} fullWidth>
                                <InputLabel>{item.displayname}</InputLabel>
                                <Select
                                    value={form[item?.name] ?? ''}
                                    onChange={(event: SelectChangeEvent) => setForm(event.target.value, item?.name)}
                                    label={item.displayname}
                                >
                                    {
                                        item.Items &&
                                        item.Items.length > 0 &&
                                        item.Items.map((op, index) => <MenuItem key={index} value={op.key}>{op.value}</MenuItem>)
                                    }

                                </Select>
                            </FormControl>
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>



                    case FieldType.SimpleSelectSearchable:
                        return <Box key={counter} pl={"7px"} pb={"10px"} pt={"5px"}>
                            {item.displayname && <Typography variant="body2" gutterBottom >{item.displayname}</Typography>
                            }
                            {
                                item.Items &&
                                item.Items.length > 0 &&

                                <SimpleSelectSearchable
                                    Items={item.Items}
                                    value={form[item?.name] ?? ''}
                                    onChange={(value) => setForm(value, item?.name)}
                                    placeholder={item?.placeholder}
                                />}
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>

                    case FieldType.GroupCheckBox:
                        return <Box key={counter}>
                            {item.displayname && <Typography style={{ paddingBottom: "5px", marginBottom: 0 }} variant="body2" gutterBottom >{item.displayname}</Typography>
                            }
                            {
                                item.Items &&
                                item.Items.length > 0 &&
                                <GroupCheckBox
                                    Items={item.Items}
                                    value={form[item?.name] ?? []}
                                    onChange={(value) => setForm(value, item?.name)}

                                />}
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>

                    case FieldType.TextArea:
                        return <Box key={counter}>
                            <SimpleInput
                                value={form[item?.name] ?? ''}
                                onChange={(e) => {
                                    if (item.allowedChars && e.target.value) {

                                        var value = e.target.value
                                        var last = value.split("")[value.length - 1]

                                        if (!item.allowedChars.split("").some((c: any) => c === last)) {
                                            return;
                                        }
                                    }
                                    setForm(e.target.value, item.name)
                                }}
                                displayname={item.displayname}
                                multiline={true}
                            />
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    case FieldType.Map:
                        return <Box key={counter}>
                            <Typography variant="body2" gutterBottom style={{ paddingBottom: "5px" }}>{item.displayname}</Typography>
                            <Box height={"300px"}>
                                <NeshanMapInput form={form} item={item} setForm={setForm} />
                            </Box>
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    case FieldType.Switch:
                        return <Box key={counter}>
                            <FormGroup>
                                {form[item?.name] === true && <FormControlLabel control={<Switch checked onChange={(event) => setForm(event.target.checked, item.name)} />}
                                    label={item.displayname} />}

                                {form[item?.name] !== true && <FormControlLabel control={<Switch onChange={(event) => setForm(event.target.checked, item.name)} />}
                                    label={item.displayname} />}

                            </FormGroup>
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    case FieldType.Form:
                        return <Box key={counter}>
                            <Typography variant="body2" gutterBottom style={{ paddingBottom: "5px" }}>{item.displayname}</Typography>
                            <Box padding={"15px"} borderRadius={"5px"} border={"2px solid #f8f8f8"}>
                                {item.Fields &&
                                    <SimpleForm
                                        fields={item.Fields}
                                        data={form[item?.name]}
                                        openInModal={false}
                                        OnChangeData={(data) => {
                                            setForm(data, item.name)
                                        }}
                                    />
                                }
                            </Box>

                        </Box>

                    case FieldType.MultipleForm:
                        return <Box key={counter + 3}
                            pl={"5px"} pr={"5px"}
                            pt={"5px"}
                        >
                            <Typography variant="body2" gutterBottom style={{ paddingBottom: "5px" }}>{item.displayname}</Typography>
                            <Box padding={"15px"} borderRadius={"5px"} border={"2px solid #f8f8f8"}>
                                {
                                    form[item?.name] && (form[item?.name] as []).length > 0 ? (form[item?.name] as []).filter((c: any) => c._id).map((rowData, i) => {

                                        return (<Box key={i} border={"1px dashed gray"} padding={"10px"} borderRadius={"3px"} mt={"10px"}>

                                            <Box textAlign={"right"}>

                                                <IconButton onClick={() => DeleteFormForArrayWithId(rowData, item?.name)} color={"error"} >
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </Box>
                                            {item.Fields && <SimpleForm key={i}
                                                fields={item.Fields}
                                                data={rowData}
                                                openInModal={false}
                                                OnChangeData={(data) => {
                                                    setFormForArrayWithId(data, item.name)
                                                }}
                                            />}
                                        </Box>)
                                    }

                                    ) : null
                                }
                                <Box mt={"10px"} textAlign={"center"}>
                                    <Button startIcon={<AddCircleIcon />} color="primary" size='small' className="noUpperCase" onClick={() => setFormForArrayWithId({ _id: generateUUID() }, item.name)}>
                                        Add
                                    </Button>
                                </Box>
                            </Box>
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>

                    case FieldType.PersianDataAndTime:

                        return <Box key={counter}>
                            <Typography variant="body2" gutterBottom style={{ paddingBottom: "5px" }}>{item.displayname}</Typography>
                            <DatePicker
                                ref={dateTimeRef}
                                format="HH:mm:ss YYYY/MM/DD"
                                value={form[item?.name] ? moment(form[item?.name]).format('HH:mm:ss jYYYY/jMM/jDD') : ''}
                                containerStyle={{
                                    width: "100%",

                                }}
                                style={{
                                    width: "100%",
                                    height: "40px",
                                }}

                                placeholder={item.displayname}
                                plugins={[
                                    <TimePicker position="bottom"
                                        className={classes.TimePicker}
                                    />
                                ]}

                                onChange={(event: any) => {
                                    if (!event) {
                                        setForm('', item.name)
                                        return
                                    }
                                    var date =
                                        new jalaali.jalaaliToDateObject(event.year, event?.month?.number, event.day) as Date;
                                    date.setHours(event.hour)
                                    date.setMinutes(event.minute)
                                    date.setSeconds(event.second)
                                    var frmateddateTime = moment(date).format('MM/DD/YYYY hh:mm:ss A');
                                    setForm(frmateddateTime, item.name)
                                }}
                                weekStartDayIndex={6}
                                calendar={persian}
                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                locale={persian_fa}
                                hideOnScroll
                                calendarPosition="bottom-right"
                            />
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    case FieldType.MiladyDate:

                        return <Box key={counter} pl={"5px"} pr={"10px"}>

                            <Typography variant="body2" gutterBottom style={{ paddingBottom: "1px" }}>{item.displayname}</Typography>
                            <DatePicker
                                format="YYYY-MM-DD"
                                ref={dateTimeRef}
                                value={form[item?.name] ? moment(form[item?.name]).toDate() : ""}
                                containerStyle={{
                                    width: "100%",
                                }}
                                style={{
                                    width: "100%",
                                    height: "40px",
                                }}
                                placeholder={item.displayname}
                                onChange={(date: any) => {
                                    setForm(date?.isValid ? date.toString() : "", item.name)
                                }}
                                weekStartDayIndex={6}
                                hideOnScroll
                                calendarPosition="bottom-right"
                            />
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>



                    case FieldType.PersianDataAndTimeSepratly:
                        return <Box key={counter}>
                            <Typography variant="body2" gutterBottom style={{ paddingBottom: "5px" }}>{item.displayname}</Typography>
                            <Box>

                                <Box>
                                    <DatePicker
                                        ref={dateTimeRef}
                                        hideOnScroll
                                        format="YYYY/MM/DD"
                                        value={form[item?.name] ? moment(form[item?.name]).format('jYYYY/jMM/jDD') : ''}
                                        containerStyle={{
                                            width: "100%",
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "40px",
                                        }}
                                        placeholder={"تاریخ"}
                                        onChange={(event: any) => {
                                            if (!event) {
                                                setForm('', item.name)
                                                return
                                            }
                                            var date =
                                                new jalaali.jalaaliToDateObject(event.year, event?.month?.number, event.day) as Date;

                                            if (form[item?.name]) {
                                                var oldTime = moment(form[item?.name]);

                                                date.setHours(oldTime.hour())
                                                date.setMinutes(oldTime.minute())
                                                date.setSeconds(oldTime.second())
                                            }


                                            var frmateddateTime = moment(date).format('MM/DD/YYYY hh:mm:ss A');
                                            setForm(frmateddateTime, item.name)
                                        }}
                                        weekStartDayIndex={6}
                                        calendar={persian}
                                        digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                    />
                                </Box>
                                <Box>
                                    <DatePicker
                                        ref={dateTimeRef}
                                        disableDayPicker
                                        hideOnScroll
                                        format="HH:mm:ss"
                                        value={form[item?.name] ? moment(form[item?.name]).toDate() : ''}
                                        containerStyle={{
                                            width: "100%",
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "40px",
                                        }}

                                        placeholder={"ساعت"}
                                        plugins={[
                                            <TimePicker position="bottom"
                                                className={classes.TimePicker}
                                            />
                                        ]}

                                        onChange={(event: any) => {

                                            if (!event) {
                                                setForm('', item.name)
                                                return
                                            }





                                            var date =
                                                new jalaali.jalaaliToDateObject(event.year, event?.month?.number, event.day) as Date;
                                            date.setHours(event.hour)
                                            date.setMinutes(event.minute)
                                            date.setSeconds(event.second)
                                            var frmateddateTime = moment(date).format('MM/DD/YYYY hh:mm:ss A');
                                            setForm(frmateddateTime, item.name)
                                        }}
                                        weekStartDayIndex={6}
                                        calendar={persian}
                                        digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                    />
                                </Box>
                            </Box>
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>


                    default:

                        return <Box key={counter} display={form && item?.DispalyIf !== undefined && !item?.DispalyIf(form) ? "hide" : "unset"}>
                            <SimpleInput
                                value={form[item?.name] ?? ''}
                                onChange={(e) => {
                                    if (item.allowedChars && e.target.value) {
                                        var value = e.target.value
                                        var last = value.split("")[value.length - 1]
                                        if (!item.allowedChars.split("").some((c: any) => c === last)) {
                                            return;
                                        }
                                    }
                                    setForm(e.target.value, item.name)

                                }}
                                displayname={item.displayname}
                            />
                            <Typography key={counter} paddingLeft={"5px"} color="red" variant="caption" display="block" gutterBottom>
                                {validationMessages[item?.name]}
                            </Typography>
                        </Box>
                }
            }
            )}

        </Stack>
        {
            (FetchUrl || OnSubmitForm) && <Box textAlign={"right"} pt={"30px"}>
                {
                    submitButton
                }
            </Box>
        }
        {
            isLoading && linearProgress && <LinearProgress style={{ marginTop: "10px" }} />
        }

    </div >

    const ConfirmDialog: FC = () => <React.Fragment> <Modal open={true}>
        <ModalDialog>
            <div>
                {ConfirmMessage}
            </div>
            <div style={{ textAlign: "right" }}>

                <Button variant="contained" color="primary" className="noUpperCase" onClick={() => setShowConfirmMessage(false)} >
                    No, Close
                </Button>
                {
                    " "
                }
                <FormBuilder ExternalIsLoading={isLoading} htttMethod={htttMethod} JustButton SubmitButtonName="Yes" SubmitButtonNoUpperCase={true} SubmitButtonColor="error" OnSubmitForm={OnSubmit} />
            </div>
        </ModalDialog>
    </Modal>
    </React.Fragment>

    return (
        <>
            {
                JustButton ? submitButton : null
            }
            {
                JustButton &&
                ShowConfrimMessage && <ConfirmDialog />

            }
            {
                !JustButton && OpenInModal && <React.Fragment><Modal onClose={() => {
                    if (OnCloseModal) {
                        OnCloseModal()
                    }
                }
                }
                    open={true}
                >
                    <ModalDialog
                        sx={{ width: "700px", overflow: "auto", minHeight: MinHight ? MinHight : 'unset' }}
                        layout="center"
                        size="md"
                    >
                        <ModalClose />
                        <DialogContent sx={{ overflow: "initial", marginTop: '20px' }}>
                            {UI}
                            {AfterSubmitButton}
                        </DialogContent>

                        {
                            ShowConfrimMessage && <ConfirmDialog />

                        }

                    </ModalDialog>
                </Modal >
                </React.Fragment>
            }
            {
                !JustButton && !OpenInModal && <>
                    {UI}
                    {AfterSubmitButton}
                    {
                        ShowConfrimMessage && <ConfirmDialog />

                    }
                </>

            }


        </>)
}

export enum FieldType {
    PhonenumberWithLeftAddOne,
    Text,
    PersianDataAndTime,
    MiladyDate,
    PersianDataAndTimeSepratly,
    Map,
    TextArea,
    Pin,
    Password,
    RemoteSelect,
    HtmlEditor,
    RemoteSelectSearchable,
    RemoteMultiSelectSearchable,
    GroupCheckBox,
    SimpleSelect,
    MUISimpleSelect,
    SimpleSelectSearchable,
    Base64Image,
    Base64File,
    Switch,
    Form,
    MultipleForm
}


export interface Validation {
    type: "required"
}


export interface Field {
    name: string;
    displayname: string;

    type: FieldType;
    OnChangeWithDetil?: (value: any, itemObj: any, setForm: (value: any, key: string) => void) => void
    lenght?: Number;
    allowedChars?: string;
    defaultValue?: any;
    isHide?: boolean;
    Disabled?: boolean;
    httpMethod?: Http,
    url?: string,
    Key?: string,
    noCash?: boolean,
    dispalyField?: string,
    ComplexDispalyField?: (date: any) => string,
    placeholder?: string
    Fields?: Field[],
    DispalyIf?: (date: any) => boolean,
    Items?: { key: any, value: string }[],
    Validations?: Validation[]
}

export default FormBuilder;





interface RemoteSelectProps {
    httpMethod?: Http,
    url: string,
    Key: string,
    dispalyField?: string,
    ComplexDispalyField?: (date: any) => string,
    placeholder?: string,
    value?: string | number | readonly string[] | undefined;
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}


















const RemoteSelect: FC<RemoteSelectProps> = ({

    httpMethod = Http.GET,
    url,
    Key,
    dispalyField,
    ComplexDispalyField,
    placeholder = 'یک آیتم را انتخاب کنید',
    value,
    onChange
}) => {

    const { isLoading, send } = useHttpClient();

    const [Items, setItems] = useState<any[]>();
    const [filter, setFilter] = useState<any>({
        "filter": null,
        "sorting": null,
        "skipCount": 0,
        "maxResultCount": 1000
    });

    const { cashe, setCashe } = React.useContext(CasheContext);

    /////fetch items
    const fetchItems = async () => {


        if (cashe[url]) {
            setItems(cashe[url])
            return;
        }

        const { response, errorMessage } = await send({
            method: httpMethod,
            url: url,
            data: filter,

        });
        if (response) {

            var rows = (response as any)?.result?.items as any[];
            setItems(rows)
            setCashe((r: any) => {
                return { ...r, [url]: rows }
            })

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
    useEffect(() => {
        fetchItems();
    }, [])


    return <Box>


        {/* <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pr={"10px"}>

        {Items && Items.length > 0 && Items.map((item, counter) =>
            <option key={counter}
                value={item[Key]} > {
                    ComplexDispalyField ? ComplexDispalyField(item) : dispalyField ? item[dispalyField] : null
                } </option>

        )}
    </Select>{isLoading && <Spinner float={"left"} mt={"-30px"} ml={"5px"} />}
    
     */}
    </Box>
}









const resizeFile = (file: any, width: number, height: number) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            width,
            height,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });


interface NeshanMapProps {
    setForm: (value: any, key: string) => void,
    item: Field,
    form: any

}

const NeshanMapInput: FC<NeshanMapProps> = ({ setForm, item, form }) => {
    const GetPoint = (coordinates: Coordinate) => {
        const iconFeature = new Feature({
            geometry: new Point(coordinates),
            name: 'Null Island',
            population: 4000,
            rainfall: 500,
        });
        const iconStyle = new Style({
            image: new Icon({
                width: 35,
                height: 60,
                src: '/Location.svg',
            }),
        });
        iconFeature.setStyle(iconStyle);
        return iconFeature
    }

    return (<Box>
        <NeshanMap
            onInit={
                (map: OpenLayersMap) => {
                    map.on("singleclick", function (evt) {
                        var coordinate = evt.coordinate;

                        setForm({ "latitude": coordinate[0], "longitude": coordinate[1] }, item.name)

                        map.getAllLayers()?.filter(c => c.get('name') === undefined)?.forEach(layer =>
                            map.removeLayer(layer)
                        )

                        map.addLayer(
                            new VectorLayer({
                                source: new VectorSource(
                                    {
                                        features: [
                                            GetPoint(coordinate)
                                        ]
                                    }
                                )
                            })
                        )
                    })
                }
            }

            options={{
                layers: [
                    form[item?.name] ? (new VectorLayer({
                        source: new VectorSource(
                            {
                                features: [
                                    GetPoint([form[item?.name]?.latitude, form[item?.name]?.longitude])
                                ]
                            }
                        )
                    }))
                        :
                        new VectorLayer()

                ]
            }}

            style={{ height: "300px" }}
            mapKey={process.env.REACT_APP_NESHAN_KEY ?? ""}
        ></NeshanMap>
    </Box>)
}


interface FromProps {
    fields: Field[],
    Close?: () => void
    OnChangeData?: (data: any) => void,
    url?: string,
    method?: Http,
    data?: any,
    openInModal?: boolean,
    EditDataBeforeAddSubmit?: (data: any) => any
}


export const SimpleForm: FC<FromProps> = ({
    fields,
    Close,
    url,
    method = Http.POST,
    data,
    openInModal = true,
    OnChangeData,
    EditDataBeforeAddSubmit
}) => {
    return (<Box>
        <FormBuilder
            Fields={fields}
            htttMethod={method}
            Data={data}
            OpenInModal={openInModal}
            OnCloseModal={Close}
            OnSuccess={(data: any, form: any) => Close ? Close() : null}
            FetchUrl={url}
            EditDataBeforSubmit={EditDataBeforeAddSubmit}
            OnFormChange={OnChangeData}
        /></Box>)
}


export const generateUUID = () => uuidv4()


export type OverridableStringUnion<T extends string | number, U = {}> = GenerateStringUnion<
    Overwrite<Record<T, true>, U>
>;

export type GenerateStringUnion<T> = Extract<
    {
        [Key in keyof T]: true extends T[Key] ? Key : never;
    }[keyof T],
    string
>;

export type Overwrite<T, U> = DistributiveOmit<T, keyof U> & U;
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

import { Card, CardContent, Grid, LinearProgress, Typography } from "@mui/joy"
import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import useHttpClient from "../../../Utilities/Http/useHttpClient"
import { Http } from "../../../Model/Enums/Http"
import { CompanyModel } from "../../../Model/CompanyModel"
import { HttpResponseModel } from "../../../Utilities/Http/Models"
import { useAppDispatch, useAppSelector } from "../../../Store/hooks"
import { updateUserCompany } from "../../../Store/UserCompany"
import FormBuilder, { FieldType } from "../../../Utilities/FormBuilder/FormBuilder"
import { RiAddLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import RemoveHtmlTags, { SummarizeText } from "../../../Utilities/String/RemoveHtmlTags"
import { MdModeEdit } from "react-icons/md";
import { UseRouteAssistant } from "../../../Utilities/RoutingAssistant/UseRouteAssistant"

export const CompanyListPage = () => {

    var { GoTo } = UseRouteAssistant();

    var { isLoading, send } = useHttpClient<HttpResponseModel<CompanyModel[]>>();
    
    var UserCompanies = useAppSelector(state => state.UserCompany.value);
    var dispacher = useAppDispatch();
    const UpdateCompanies = async () => {
        var { response } = await send({
            url: "/Company",
            method: Http.GET,
        })

        if (response) {
            console.log(response.data);
            dispacher(updateUserCompany(response.data))
        }
    }

    useEffect(() => {

        if (UserCompanies !== undefined)
            return;
        UpdateCompanies()
    }, [])

    const [OpenAdd, setOpenAdd] = useState(false)
    const [EditCompany, setEditCompany] = useState<CompanyModel>()


    return <Box>

        <div style={{ textAlign: "right", padding: "10px" }}>
            <FormBuilder
                SubmitButtonName="Add new Company"
                SubmitButtonNoUpperCase
                JustButton
                SubmitButtonStartIcon={<RiAddLine />}
                OnSubmitForm={() => {
                    setOpenAdd(true)
                }}
            />
        </div>

        {OpenAdd && <FormBuilder
            OpenInModal
            SubmitButtonName="Add new Company"
            OnCloseModal={() => setOpenAdd(false)}
            SubmitButtonNoUpperCase
            SubmitButtonStartIcon={<RiAddLine />}
            FetchUrl="/Company"
            Fields={[
                {
                    displayname: "Name",
                    name: "name",
                    type: FieldType.Text,
                    Validations: [{ type: "required" }]
                },
                {
                    displayname: "Description",
                    name: "description",
                    type: FieldType.HtmlEditor,
                    Validations: [{ type: "required" }]
                },

            ]}
            SuccessMessge="Added successfully"
            OnSuccess={() => {
                setOpenAdd(false)
                UpdateCompanies()
            }}
        />}

        {EditCompany && <FormBuilder
            OpenInModal
            SubmitButtonName="Edit Company"
            OnCloseModal={() => setEditCompany(undefined)}
            SubmitButtonNoUpperCase
            SubmitButtonStartIcon={<MdModeEdit />}
            FetchUrl="/Company"
            htttMethod={Http.PUT}
            Fields={[
                {
                    displayname: "id",
                    name: "id",
                    defaultValue: EditCompany._id,
                    isHide: true,
                    type: FieldType.Text,
                    Validations: [{ type: "required" }]
                },
                {
                    displayname: "Name",
                    name: "name",
                    defaultValue: EditCompany.name,
                    type: FieldType.Text,
                    Validations: [{ type: "required" }]
                },
                {
                    displayname: "Description",
                    name: "description",
                    defaultValue: EditCompany.description,
                    type: FieldType.HtmlEditor,
                    Validations: [{ type: "required" }]
                },

            ]}

            SuccessMessge="Updated successfully"
            OnSuccess={() => {
                setEditCompany(undefined)
                UpdateCompanies()
            }}
        />}

        {isLoading && <Box padding={"5px"}>
            <LinearProgress />
        </Box>}
        <h3 style={{ textAlign: "center" }}>Companies</h3>
        {
            UserCompanies && UserCompanies.length > 0 &&
            <Grid container padding={"5px"} sx={{ flexGrow: 1 }}>
                {
                    UserCompanies.map((company, index) => {
                        return <Grid key={index} md={3} padding={"5px"} xs={12} sm={6} lg={3}>
                            <Card key={index} variant="soft" >
                                <CardContent>
                                    <Button variant="text" className="noUpperCase" onClick={() => GoTo.GoToProjects(company._id)}>
                                        <Typography level="title-md">{company.name}</Typography>
                                    </Button>
                                    <div style={{ minHeight: "50px" }}>
                                        <Typography>{SummarizeText(RemoveHtmlTags(company.description ?? ""), 60)}</Typography>
                                    </div>
                                </CardContent>
                                <div>
                                    <FormBuilder
                                        ConfirmMessage="Are you sure to delete this company?"
                                        SubmitButtonName="Delete"
                                        JustButton
                                        SubmitButtonVariant="text"
                                        SubmitButtonColor="error"
                                        OnCloseModal={() => setOpenAdd(false)}
                                        SubmitButtonNoUpperCase
                                        SubmitButtonStartIcon={<MdDelete />}
                                        FetchUrl={"/Company/" + company._id}
                                        htttMethod={Http.DELETE}
                                        SuccessMessge="Added successfully"
                                        OnSuccess={() => {
                                            UpdateCompanies()
                                        }}
                                    />

                                    <FormBuilder
                                        SubmitButtonName="Edit"
                                        JustButton
                                        SubmitButtonVariant="text"
                                        OnSubmitForm={() => setEditCompany(company)}
                                        SubmitButtonNoUpperCase
                                        SubmitButtonStartIcon={<MdModeEdit />}
                                    />
                                </div>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>


        }
    </Box>

}
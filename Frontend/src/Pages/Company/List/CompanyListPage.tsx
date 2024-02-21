import { Card, CardContent, Grid, LinearProgress, Typography } from "@mui/joy"
import { Box } from "@mui/material"
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

export const CompanyListPage = () => {

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


        {isLoading && <Box padding={"5px"}>
            <LinearProgress />
        </Box>}
        {
            UserCompanies && UserCompanies.length > 0 &&
            <Grid container padding={"5px"} sx={{ flexGrow: 1 }}>
                {
                    UserCompanies.map((company, index) => {
                        return <Grid key={index} md={3} padding={"5px"} xs={12} sm={6} lg={3}>
                            <Card key={index} variant="soft" >
                                <CardContent sx={{ minHeight: "150px" }}>
                                    <Typography level="title-md">{company.name}</Typography>
                                    <Typography>{SummarizeText(RemoveHtmlTags(company.description ?? ""), 100)}</Typography>
                                    <div>
                                        <FormBuilder
                                            ConfirmMessage="Are you sure to delete this company?"
                                            SubmitButtonName="Delete"
                                            SubmitButtonVariant="outlined"
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
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>


        }
    </Box>
}
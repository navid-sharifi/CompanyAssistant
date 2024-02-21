import { useEffect, useState } from "react";
import { UseRouteAssistant } from "../../../Utilities/RoutingAssistant/UseRouteAssistant"
import { stringIsGuid } from "../../../Utilities/String/stringIsGuid";
import useHttpClient from "../../../Utilities/Http/useHttpClient";
import { HttpResponseModel } from "../../../Utilities/Http/Models";
import { CompanyModel } from "../../../Model/CompanyModel";
import { ProjectModel } from "../../../Model/ProjectModel";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { Http } from "../../../Model/Enums/Http";
import { updateUserProject } from "../../../Store/UserProject";
import { Box, Button, LinearProgress } from "@mui/material";
import FormBuilder, { FieldType } from "../../../Utilities/FormBuilder/FormBuilder";
import { RiAddLine } from "react-icons/ri";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Card, CardContent, Grid, Typography } from "@mui/joy";
import RemoveHtmlTags, { SummarizeText } from "../../../Utilities/String/RemoveHtmlTags";



export const ProjectListPage = () => {

    var { GoTo } = UseRouteAssistant();
    var { isLoading, send } = useHttpClient<HttpResponseModel<ProjectModel[]>>();
    var UserProjects = useAppSelector(state => state.UserProject.value);
    var dispacher = useAppDispatch();
    var { companyId } = GoTo.Projects.ProjectsParam();

    useEffect(() => {
        if (!stringIsGuid(companyId ?? '')) {
            GoTo.GoToCompanies();
        }
    }, [])



    const UpdateProjects = async () => {
        var { response } = await send({
            url: "/project/" + companyId,
            method: Http.GET,
        })

        if (response) {
            dispacher(updateUserProject(response.data))
        }
    }

    useEffect(() => {
        if (!stringIsGuid(companyId ?? '')) {
            GoTo.GoToCompanies();
            return;
        }

        if (UserProjects !== undefined) {
            return;
        }

        UpdateProjects()
    }, [])

    const [OpenAdd, setOpenAdd] = useState(false)
    const [EditProject, setEditProject] = useState<ProjectModel>()


    if (!stringIsGuid(companyId ?? '')) {
        return <></>
    }

    return <Box>
        <div style={{ textAlign: "right", padding: "10px" }}>
            <FormBuilder
                SubmitButtonName="Add new Project"
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
            SubmitButtonName="Add new Project"
            OnCloseModal={() => setOpenAdd(false)}
            SubmitButtonNoUpperCase
            SubmitButtonStartIcon={<RiAddLine />}
            FetchUrl="/Project"
            Fields={[
                {
                    displayname: "companyId",
                    name: "companyId",
                    type: FieldType.Text,
                    defaultValue: companyId,
                    isHide: true,
                    Validations: [{ type: "required" }]
                },
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
                UpdateProjects()
            }}
        />}

        {EditProject && <FormBuilder
            OpenInModal
            SubmitButtonName="Edit Project"
            OnCloseModal={() => setEditProject(undefined)}
            SubmitButtonNoUpperCase
            SubmitButtonStartIcon={<MdModeEdit />}
            FetchUrl="/Project"
            htttMethod={Http.PUT}
            Fields={[
                {
                    displayname: "id",
                    name: "id",
                    defaultValue: EditProject._id,
                    isHide: true,
                    type: FieldType.Text,
                    Validations: [{ type: "required" }]
                },
                {
                    displayname: "Name",
                    name: "name",
                    defaultValue: EditProject.name,
                    type: FieldType.Text,
                    Validations: [{ type: "required" }]
                },
                {
                    displayname: "Description",
                    name: "description",
                    defaultValue: EditProject.description,
                    type: FieldType.HtmlEditor,
                    Validations: [{ type: "required" }]
                },

            ]}

            SuccessMessge="Updated successfully"
            OnSuccess={() => {
                setEditProject(undefined)
                UpdateProjects()
            }}
        />}

        {isLoading && <Box padding={"5px"}>
            <LinearProgress />
        </Box>}
        <h3 style={{ textAlign: "center" }}>Projects</h3>
        {
            UserProjects && UserProjects.length > 0 &&
            <Grid container padding={"5px"} sx={{ flexGrow: 1 }}>
                {
                    UserProjects.map((UserProject, index) => {
                        return <Grid key={index} md={3} padding={"5px"} xs={12} sm={6} lg={3}>
                            <Card key={index} variant="soft" >
                                <CardContent>
                                    <Button
                                        variant="text"
                                        className="noUpperCase"
                                        onClick={() => GoTo.GoToBoard(UserProject._id)}>
                                        <Typography level="title-md">{UserProject.name}</Typography>
                                    </Button>
                                    <div style={{ minHeight: "50px" }}>
                                        <Typography>{SummarizeText(RemoveHtmlTags(UserProject.description ?? ""), 60)}</Typography>
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
                                        FetchUrl={"/Project/" + UserProject._id}
                                        htttMethod={Http.DELETE}
                                        SuccessMessge="Added successfully"
                                        OnSuccess={() => {
                                            UpdateProjects()
                                        }}
                                    />

                                    <FormBuilder
                                        SubmitButtonName="Edit"
                                        JustButton
                                        SubmitButtonVariant="text"
                                        OnSubmitForm={() => setEditProject(UserProject)}
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
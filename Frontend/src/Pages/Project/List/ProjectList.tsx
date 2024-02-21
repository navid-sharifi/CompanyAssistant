import { useEffect } from "react";
import { UseRouteAssistant } from "../../../Utilities/RoutingAssistant/UseRouteAssistant"
import { stringIsGuid } from "../../../Utilities/String/stringIsGuid";



export const ProjectListPage = () => {

    var { GoTo } = UseRouteAssistant();
    var { companyId } = GoTo.Projects.ProjectsParam();

    useEffect(() => {
        if (!stringIsGuid(companyId ?? '')) {
            GoTo.GoToCompanies();
        }
    }, [])
    if (!stringIsGuid(companyId ?? '')) {
        return <></>
    }



    return <>project list</>
}
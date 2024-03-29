import { createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";


export const UseRouteAssistant = () => {

    let navigate = useNavigate();
    var param = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    var GoTo = {
        Go: (path: string) => navigate(path),
        GoToReturnUrl: () => GoTo.Go(GetReturnUrl() ?? "/"),
        GoToProjects: (companyId: string) => GoTo.Go(`/Company/${companyId}/Projects`),
        Projects: {
            ProjectsParam: () => {
                var { companyId } = param;
                return { companyId }
            },
        },

        GoToCompanies: () => GoTo.Go('/'),
        GoToBoard: (projectId: string) => GoTo.Go(`/Project/${projectId}/Board`),
        Board: {

            GoToShowTask: (projectId: string, boardId: string, columnId: string, taskId: string) => GoTo.Go(GoTo.Board.ShowTaskUrl(projectId, boardId, columnId, taskId)),
            ShowTaskUrl: (projectId: string, boardId: string, columnId: string, taskId: string) => `/Project/${projectId}/Board/${boardId}/Column/${columnId}/Task/${taskId}`,
            ShowTaskParam: () => {
                var { projectId, boardId, columnId, taskId } = param;
                return { projectId, boardId, columnId, taskId }
            },


            AddTaskUrl: (projectId: string, boardId: string, columnId: string) => `/Project/${projectId}/Board/${boardId}/Column/${columnId}`,
            GoToAddTask: (projectId: string, boardId: string, columnId: string) => GoTo.Go(GoTo.Board.AddTaskUrl(projectId, boardId, columnId)),
            TaskParam: () => {
                var { projectId, boardId, columnId } = param;
                return { projectId, boardId, columnId }
            },

            GoToAddColumn: (projectId: string, boardId: string) => GoTo.Go(GoTo.Board.AddColumnUrl(projectId, boardId)),
            AddColumnUrl: (projectId: string, boardId: string) => `/Project/${projectId}/Board/${boardId}/AddColumn`,

            BoardParam: () => {
                var { projectId } = param;
                return { projectId }
            },
        },



        // engineering: {
        //     GoToAddDocument: () => navigate('/engineering/AddDocument'),

        //     SendByWorkFollowUrl: (documentId: string) => `${GoTo.engineering.DocumentDtailUrl(documentId)}/SendByWorkFollow`,
        //     SendByWorkFollowParam: () => {
        //         var { documentId } = param;
        //         return { documentId }
        //     },
        //     GoToSendByWorkFollow: (documentId: string) => {
        //         var returnUrl = location.pathname
        //         if (location.search) {
        //             returnUrl += `?${location.search}`
        //         }
        //         navigate(
        //             {
        //                 pathname: GoTo.engineering.SendByWorkFollowUrl(documentId),
        //                 search: createSearchParams({ returnUrl: returnUrl }).toString()
        //             })
        //     },
        //     GoToDocumentDtail: (documentId: string) => navigate(GoTo.engineering.DocumentDtailUrl(documentId)),
        //     DocumentDtailUrl: (documentId: string) => `/engineering/documentList/${documentId}`,
        //     DocumentDtailParam: () => {
        //         var { documentId } = param;
        //         return { documentId }
        //     },

        //     GoToDocument: () => navigate(`/engineering/documentList`)
        // },

    }

    const GetReturnUrl = () => {
        var returnUrl = searchParams.get('returnUrl');
        return returnUrl
    }

    return {
        GoTo,
        Location: location.pathname,
        Back: () => navigate(-1),
        GetReturnUrl
    }
}

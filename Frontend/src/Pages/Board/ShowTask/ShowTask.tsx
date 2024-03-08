import { FC, useEffect, useState } from "react"
import { getAllJSDocTagsOfKind } from "typescript"
import { UseRouteAssistant } from "../../../Utilities/RoutingAssistant/UseRouteAssistant";
import { stringIsGuid } from "../../../Utilities/String/stringIsGuid";
import { Modal } from "../../../Utilities/Components/Modal/Modal";
import useHttpClient from "../../../Utilities/Http/useHttpClient";
import { Http } from "../../../Model/Enums/Http";
import { toast } from "react-toastify";
import { LinearProgress } from "@mui/material";
import { HttpResponseModel } from "../../../Utilities/Http/Models";
import { AddComment } from "./AddComment/AddComment";
import { CommentList } from "./CommentList/CommentList";


export const ShowTask: FC = () => {

    var { GoTo, Location } = UseRouteAssistant()
    var { projectId, boardId, columnId, taskId } = GoTo.Board.ShowTaskParam();
    var { send, isLoading } = useHttpClient<HttpResponseModel<TaskDetail>>();
    const [firstLoading, setFirstLoading] = useState(true);
    const [taskDetail, setTaskDetail] = useState<TaskDetail>()
    const [reloadTask, setReloadTask] = useState(false);

    const RefreshTask = async () => {
        await FetchTask();
    }

    const FetchTask = async () => {
        var { errorMessage, response } = await send({
            url: "/Task/GetTaskDetail/" + taskId,
            method: Http.GET
        })
        setTaskDetail(response?.data)
        if (errorMessage) {
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
        setFirstLoading(false)
    }

    useEffect(() => {
        if ([projectId, boardId, columnId, taskId].some(c => !stringIsGuid(c)) || GoTo.Board.ShowTaskUrl(projectId as string, boardId as string, columnId as string, taskId as string) !== Location) {
            return
        }
        setFirstLoading(true)
        setTaskDetail(undefined)
        FetchTask()
    }, [Location,])

    if ([projectId, boardId, columnId, taskId].some(c => !stringIsGuid(c)) || GoTo.Board.ShowTaskUrl(projectId as string, boardId as string, columnId as string, taskId as string) !== Location) {
        return <></>
    }

    if (isLoading && firstLoading) {
        return <Modal>
            <LinearProgress />
        </Modal>
    }

    return <Modal width={800} onClose={() => GoTo.GoToBoard(projectId as string)}>
        <h3>
            {
                taskDetail?.title
            }
        </h3>
        <div style={{ display: "grid", gridTemplate: "auto /1fr 150px" }}>
            <div style={{ paddingRight: "30px" }}>
                <AddComment RefeshTask={RefreshTask} />
                {taskDetail && <CommentList Task={taskDetail} />}
            </div>
            <div>
                <h6>Actions</h6>
            </div>
        </div>
    </Modal>
}

export interface TaskDetail {
    title: string
    columnId: string
    _id: string,
    comments: { message: string, taskId: string }[]
}


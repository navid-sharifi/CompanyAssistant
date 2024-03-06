import { Modal } from "../../../Utilities/Components/Modal/Modal";
import FormBuilder, { FieldType } from "../../../Utilities/FormBuilder/FormBuilder";
import { UseRouteAssistant } from "../../../Utilities/RoutingAssistant/UseRouteAssistant"
import { stringIsGuid } from "../../../Utilities/String/stringIsGuid";
import { UseBoardAcion } from "../Logic/BoardLogic";
import AddIcon from '@mui/icons-material/Add';


export const AddTask = () => {

    var { GoTo, Location } = UseRouteAssistant()
    var { projectId, boardId, columnId } = GoTo.Board.TaskParam();

    if (!stringIsGuid(projectId) || !stringIsGuid(boardId) || !stringIsGuid(columnId)) {
       // GoTo.GoToCompanies();
    }

    return <> {GoTo.Board.AddTaskUrl(projectId as string, boardId as string, columnId as string) === Location &&

        <FormBuilder
            OpenInModal
            OnCloseModal={() => GoTo.GoToBoard(projectId as string)}
            Title="Add Task"
            Fields={[
                {
                    displayname: "title",
                    name: "title",
                    type: FieldType.Text,
                    Validations: [{ type: "required" }]
                },

                {
                    displayname: "ColumnId",
                    name: "columnId",
                    isHide: true,
                    defaultValue: columnId,
                    type: FieldType.Text,
                    Validations: [{ type: "required" }]
                }

            ]}
            FetchUrl="/Task"
            SubmitButtonStartIcon={<AddIcon />}
            OnSuccess={() => GoTo.GoToBoard(projectId as string)}
            SubmitButtonNoUpperCase
        />
    }
    </>
}
import { Modal } from "../../../Utilities/Components/Modal/Modal";
import FormBuilder, { FieldType } from "../../../Utilities/FormBuilder/FormBuilder";
import { UseRouteAssistant } from "../../../Utilities/RoutingAssistant/UseRouteAssistant"
import { UseBoardAcion } from "../Logic/BoardLogic";
import AddIcon from '@mui/icons-material/Add';


export const AddColumn = () => {

    var { GoTo, Location } = UseRouteAssistant()
    var { projectId } = GoTo.Board.BoardParam();
    var { SelectedBoard } = UseBoardAcion(projectId as string)

    return <> {GoTo.Board.AddColumnUrl(projectId as string, SelectedBoard as string) === Location &&

        <FormBuilder
            OpenInModal
            OnCloseModal={() => GoTo.GoToBoard(projectId as string)}
            Title="Add Column"
            Fields={[

                {
                    displayname: "Name",
                    name: "Name",
                    type: FieldType.Text,
                    Validations: [{ type: "required" }]
                },


                {
                    displayname: "BoardId",
                    name: "BoardId",
                    isHide: true,
                    defaultValue: SelectedBoard,
                    type: FieldType.Text,
                    Validations: [{ type: "required" }]
                }
            ]}
            FetchUrl="/Column"
            SubmitButtonStartIcon={<AddIcon />}
            OnSuccess={() => GoTo.GoToBoard(projectId as string)}
            SubmitButtonNoUpperCase
        />
    }
    </>
}
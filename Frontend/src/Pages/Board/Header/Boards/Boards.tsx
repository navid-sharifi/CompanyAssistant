import { FC, useEffect, useState } from "react"
import { UseRouteAssistant } from "../../../../Utilities/RoutingAssistant/UseRouteAssistant"
import useHttpClient from "../../../../Utilities/Http/useHttpClient"
import { Http } from "../../../../Model/Enums/Http"
import { Modal } from "../../../../Utilities/Components/Modal/Modal"
import FormBuilder, { FieldType } from "../../../../Utilities/FormBuilder/FormBuilder"
import AddIcon from '@mui/icons-material/Add';
import { UseBoardAcion } from "../../Logic/BoardLogic"
import { HttpResponseModel } from '../../../../Utilities/Http/Models'


export const BoardsHeader = () => {

    var { GoTo } = UseRouteAssistant()
    var { projectId } = GoTo.Board.BoardParam();
    const [OpenAddFirstBoardModal, SetOpenAddFirstBoardModal] = useState(false)
    var { SetSelectedBoard } = UseBoardAcion(projectId ?? '')
    var { isLoading, send } = useHttpClient<HttpResponseModel<any[]>>();

    const GetBoards = async () => {
        var { response } = await send({
            url: "/Board/" + projectId,
            method: Http.GET,
        })

        if (response) {
            if (response.data.length === 0) {
                SetOpenAddFirstBoardModal(true)
            }
        }
    }

    
    useEffect(() => {
        GetBoards()
    }, [])

    return <div>
        <FormBuilder
            Fields={[{
                displayname: "Boards",
                name: "Board",
                type: FieldType.RemoteSelectSearchable,
                url: "/Board/" + projectId,
                dispalyField: "name",
                Key: "_id",
                OnChangeWithDetil: (value, itemObj, setForm) => {
                    SetSelectedBoard(value)
                },
            }]}
        />
        {
            OpenAddFirstBoardModal && <AddBoard SetOpenAddFirstBoardModal={SetOpenAddFirstBoardModal} />
        }
    </div>
}


const AddBoard: FC<{
    SetOpenAddFirstBoardModal: any
}> = ({
    SetOpenAddFirstBoardModal
}) => {

        var { GoTo } = UseRouteAssistant()
        var { projectId } = GoTo.Board.BoardParam();

        return <Modal>
            <FormBuilder
                Title="Add First Board"
                Fields={[
                    {
                        displayname: "Name",
                        name: "Name",
                        type: FieldType.Text,
                        Validations: [{ type: "required" }]
                    },
                    {
                        displayname: "ProjectId",
                        name: "ProjectId",
                        isHide: true,
                        defaultValue: projectId,
                        type: FieldType.Text,
                        Validations: [{ type: "required" }]
                    }
                ]}
                FetchUrl="/Board"
                SubmitButtonNoUpperCase
                SubmitButtonVariant="text"
                SubmitButtonName="Add board"
                OnSuccess={() => {
                    SetOpenAddFirstBoardModal(false)
                }}
                SubmitButtonStartIcon={<AddIcon />}
            />
        </Modal>
    }



import { updateSelectedBoard } from "../../../Store/Board/Board";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";



export const UseBoardAcion = (projectId: string) => {


    var dispacher = useAppDispatch();
    var boardState = useAppSelector(state => state.Board.value)

    const SetSelectedBoard = (boardId: string) => dispacher(updateSelectedBoard({
        board: boardId,
        projectId: projectId
    }))


    return {
        SetSelectedBoard,
        SelectedBoard: boardState[projectId]?.selectedBoard as string | undefined
    }
}
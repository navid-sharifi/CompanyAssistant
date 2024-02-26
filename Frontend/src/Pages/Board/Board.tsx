import { Paper } from '@mui/material'
import BoardTrllo from 'react-trello-ts'
import { ToolsAndSetting } from './Header/ToolsAndSetting/ToolsAndSetting';
import { UseRouteAssistant } from '../../Utilities/RoutingAssistant/UseRouteAssistant';
import { BoardsHeader } from './Header/Boards/Boards';
import { stringIsGuid } from '../../Utilities/String/stringIsGuid';
import { useEffect, useState } from 'react';
import { UseBoardAcion } from './Logic/BoardLogic';
import useHttpClient from '../../Utilities/Http/useHttpClient';
import { Http } from '../../Model/Enums/Http';



export interface BoardTask {
    id: string
    title: string
    description?: string
    label?: string
    draggable: boolean
}




export const BoardPage = () => {


    var { GoTo } = UseRouteAssistant()
    var { projectId } = GoTo.Board.BoardParam();
    if (!stringIsGuid(projectId ?? '')) {
        GoTo.GoToCompanies();
    }

    var { send } = useHttpClient();
    var { SetSelectedBoard, SelectedBoard } = UseBoardAcion(projectId ?? '');
    const [data, setData] = useState<{ lanes: any[] }>();



    const GetBoardData = async () => {

        var { response } = await send({
            url: "/Board/WithTasks/" + SelectedBoard,
            method: Http.GET
        })

        if (response) {
            console.log(response);

        }

    }
    useEffect(() => {

        if (!SelectedBoard) {
            return
        }
        GetBoardData()
    }, [SelectedBoard])

    // const data = {
    //     lanes: [
    //         {
    //             id: 'lane1',
    //             title: 'Planned Tasks',
    //             label: '2/2',
    //             cards: [
    //                 {
    //                     id: 'Card1',
    //                     title: 'up',
    //                     description: 'Can AI make memes',
    //                     label: '30 mins',
    //                     navid: "dfd",
    //                     draggable: false
    //                 },
    //                 {
    //                     id: 'Card2',
    //                     title: 'down',
    //                     description: 'Transfer via NEFT',
    //                     label: '5 mins',
    //                     metadata: { sha: 'be312a1' }
    //                 },
    //                 {
    //                     id: 'Card2',
    //                     title: 'not change',
    //                     description: 'Transfer via NEFT',
    //                     label: '5 mins',
    //                     metadata: { sha: 'be312a1' }
    //                 }

    //             ]
    //         },
    //     ]
    // }


    const components = {
        Card: (data: any) => {
            console.log(data.title);
            return <Paper>{data.title}{data.index}</Paper>
        },
    };

    return <>
        <BoardsHeader />
        <Paper>

            {/* <ToolsAndSetting /> */}
        </Paper>
        {
            data && <BoardTrllo
                style={{ height: "100%" }}
                components={components}
                onCardAdd={() => { }}
                data={data} />
        }

    </>
}
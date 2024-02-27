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
import { CSSProperties } from 'styled-components';
import FormBuilder from '../../Utilities/FormBuilder/FormBuilder';






enum CardType {
    task,
    AddColumn
}


interface BoardData {
    lanes: Lane[];
}
interface Lane {
    id: string;
    title?: string;
    label?: string;
    style?: CSSProperties;
    cards: Card[];
    currentPage?: number;
    droppable?: boolean;
    labelStyle?: CSSProperties;
    cardStyle?: CSSProperties;
    disallowAddingCard?: boolean;
    [key: string]: any;
}
interface Card {
    id: string;
    title?: string;
    label?: string;
    description?: string;
    laneId?: string;
    style?: CSSProperties;
    draggable?: boolean;
    [key: string]: any;
    CardType: CardType
}





export const BoardPage = () => {


    var { GoTo } = UseRouteAssistant()
    var { projectId } = GoTo.Board.BoardParam();
    if (!stringIsGuid(projectId ?? '')) {
        GoTo.GoToCompanies();
    }

    var { send } = useHttpClient();
    var { SetSelectedBoard, SelectedBoard } = UseBoardAcion(projectId ?? '');
    const [data, setData] = useState<BoardData>({
        lanes: [

            {
                id: 'lane1',
                title: 'Planned Tasks',
                label: '2/2',

                cards: [
                    {
                        id: 'Card1',
                        title: 'up',
                        description: 'Can AI make memes',
                        label: '30 mins',
                        navid: "dfd",
                        draggable: false,
                        CardType: CardType.task
                    },
                    {
                        id: 'Card1',
                        title: 'up',
                        description: 'Can AI make memes',
                        label: '30 mins',
                        navid: "dfd",
                        draggable: false,
                        CardType: CardType.task
                    },
                    {
                        id: 'Card1',
                        title: 'up',
                        description: 'Can AI make memes',
                        label: '30 mins',
                        navid: "dfd",
                        draggable: false,
                        CardType: CardType.task
                    },
                ]
            },

            {
                id: 'Add',
                title: ' ',
                label: ' ',
                style: { backgroundColor: '#ffffff3d' },
                cardStyle: {},
                cards: [{
                    CardType: CardType.AddColumn,
                    id: "none"
                }]
            },

        ]
    });

    useEffect(() => {
        // setData(f => {
        //     return {
        //         lanes: [...f?.lanes,
        //         {
        //             id: 'lane1',
        //             title: 'Planned Tasks',
        //             label: '2/2',

        //         }

        //         ]
        //     }
        // }
        // )


    }, [data]);


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
            var card = data as Card

            if (card.CardType === CardType.AddColumn) {
               return <FormBuilder/>
            }

            return <Paper>{data.title}{data.index}</Paper>
        }
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
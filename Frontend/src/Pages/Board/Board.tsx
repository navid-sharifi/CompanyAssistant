import { Box, Button, Paper } from '@mui/material'
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
import AddIcon from '@mui/icons-material/Add';
import { HttpResponseModel } from '../../Utilities/Http/Models';
import { toast } from 'react-toastify';





enum CardType {
    task,
    AddColumn,
    AddTask
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
    ColumnId?: string;
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
    var { send } = useHttpClient<HttpResponseModel<Board>>();
    var { SetSelectedBoard, SelectedBoard } = UseBoardAcion(projectId ?? '');
    const [boardData, setBoardData] = useState<Board>()

    const [data, setData] = useState<BoardData | undefined>({
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
                    draggable: false,
                    id: "none"
                }]
            },

        ]
    });

    useEffect(() => {

        if (!boardData) {
            setData(undefined)
            return;
        }
        setData({
            lanes: boardData.columns.length > 0 ?
                boardData.columns.sort((n1, n2) => {
                    if (n1.order > n2.order) {
                        return 1;
                    }
                    if (n1.order < n2.order) {
                        return -1;
                    }
                    return 0;
                }).map(column => {
                    return {
                        id: column._id,
                        title: column.name,
                        cards: [{
                            CardType: CardType.AddTask,
                            id: "addTask",
                            draggable: false,
                            ColumnId: column._id,
                            style: { backgroundColor: "#ffffff3d" }
                        }]
                    }
                })
                : []
        })

    }, [boardData]);


    const GetBoardData = async () => {

        var { response, errorMessage } = await send({
            url: "/Board/WithTasks/" + SelectedBoard,
            method: Http.GET
        })
        setBoardData(response?.data)
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

    }

    useEffect(() => {
        if (!SelectedBoard) {
            return
        }
        GetBoardData()
    }, [SelectedBoard])


    const components = {
        Card: (data: any) => {
            var card = data as Card
            if (card.CardType === CardType.AddColumn) {
                return <Box padding={"1px"} textAlign={"center"}>
                    <Button onClick={() => GoTo.Board.GoToAddColumn(projectId as string, SelectedBoard as string)} style={{ backgroundColor: "transparent" }} startIcon={<AddIcon />} variant='contained' className='noUpperCase' color='primary'> Add Column </Button>
                </Box>
            }

            if (card.CardType === CardType.AddTask) {
                return <Box padding={"1px"} textAlign={"center"}>
                    <Button
                        onClick={() => GoTo.Board.GoToAddColumn(projectId as string, SelectedBoard as string)}
                        startIcon={<AddIcon />} 
                        variant='outlined' className='noUpperCase' color='primary'> Task </Button>
                </Box>
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
            data && SelectedBoard && <BoardTrllo
                style={{ height: "100%" }}
                components={components}
                onCardAdd={() => { }}
                data={data} />
        }
    </>
}

interface Board {
    name: string
    projectId: string
    _id: string
    columns: Column[]
}

interface Column {
    name: string
    order: string
    boardId: string
    _id: string
    tasks: any[]
}




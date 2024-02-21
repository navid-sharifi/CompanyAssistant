import { Paper } from '@mui/material'
import BoardTrllo from 'react-trello-ts'
import { ToolsAndSetting } from './Header/ToolsAndSetting/ToolsAndSetting';



export const BoardPage = () => {
    const data = {
        lanes: [
            {
                id: 'lane1',
                title: 'Planned Tasks',
                label: '2/2',
                cards: [
                    {
                        id: 'Card1',
                        title: 'Write Blog',
                        description: 'Can AI make memes',
                        label: '30 mins',
                        navid: "dfd",
                        draggable: false
                    },
                    {
                        id: 'Card2',
                        title: 'Pay Rent',
                        description: 'Transfer via NEFT',
                        label: '5 mins',
                        metadata: { sha: 'be312a1' }
                    }
                ]
            },
            {
                id: 'lane2',
                title: 'Completed',
                label: '0/0',
                cards: [

                ]
            }

        ]
    }
    const components = {

        Card: (data: any) => {
            console.log(data);
            return <Paper>test</Paper>
        },
    };

    return <>
        <Paper>

           <ToolsAndSetting/>
        </Paper>

        <BoardTrllo
            components={components}
            onCardAdd={() => { }}
            data={data} />
    </>
}
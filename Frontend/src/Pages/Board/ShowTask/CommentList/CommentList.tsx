import { FC } from "react"
import { TaskDetail } from "../ShowTask"
import { Task } from "@mui/icons-material"
import parse from 'html-react-parser'
import classes from './module.module.scss'

export const CommentList: FC<{
    Task: TaskDetail
}> = ({ Task }) => {

    return <div>
        {
            Task.comments && Task.comments.length > 0 && Task.comments.map((comment, index) => {
                return <div key={index} className={classes.comment}>{parse(comment.message)}</div>
            })
        }
    </div>
}
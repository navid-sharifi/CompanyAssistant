import { useState } from "react";
import FormBuilder, { FieldType } from "../../../../Utilities/FormBuilder/FormBuilder";
import classes from './module.module.scss'
import AddCommentIcon from '@mui/icons-material/AddComment';
import { UseRouteAssistant } from "../../../../Utilities/RoutingAssistant/UseRouteAssistant";

export const AddComment = () => {

    const [open, setOpen] = useState<boolean>(false);
    var { GoTo } = UseRouteAssistant();

    if (!open) {
        return <div className={classes.AddCommentHint} onClick={() => setOpen(true)}>
            Add Comment...
        </div>;
    }

    return <div className={classes.AddComment} >
        <FormBuilder
            Fields={[
                {
                    displayname: "",
                    name: "Message",
                    type: FieldType.HtmlEditor
                },
                {
                    displayname: "",
                    name: "TaskId",
                    defaultValue: GoTo.Board.ShowTaskParam().taskId,
                    type: FieldType.Text,
                    isHide: true
                }
            ]}
            SubmitButtonStartIcon={<AddCommentIcon />}
            SubmitButtonNoUpperCase
            SubmitButtonName="Add Comment"
            FetchUrl="/Task/AddComment" />
    </div>;
};

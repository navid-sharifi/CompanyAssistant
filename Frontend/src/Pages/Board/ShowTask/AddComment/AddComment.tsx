import { FC, useState } from "react";
import FormBuilder, { FieldType } from "../../../../Utilities/FormBuilder/FormBuilder";
import classes from './module.module.scss'
import AddCommentIcon from '@mui/icons-material/AddComment';
import { UseRouteAssistant } from "../../../../Utilities/RoutingAssistant/UseRouteAssistant";
import { Refresh } from "@mui/icons-material";

export const AddComment: FC<{
    RefeshTask: () => Promise<void>
}> = ({
    RefeshTask
}) => {


        const [open, setOpen] = useState<boolean>(false);
        var { GoTo } = UseRouteAssistant();
        const [isLoading, setIsloading] = useState(false);
        const HandelOnSuccess = async () => {
            setIsloading(true);
            await RefeshTask();
            setIsloading(false);
            setOpen(false)
        }

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
                        Validations: [{
                            type: "required"
                        }],
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
                ExternalIsLoading={isLoading}
                SubmitButtonStartIcon={<AddCommentIcon />}
                SubmitButtonNoUpperCase
                SubmitButtonName="Add Comment"
                OnSuccess={HandelOnSuccess}
                FetchUrl="/Task/AddComment" />
        </div>;
    };

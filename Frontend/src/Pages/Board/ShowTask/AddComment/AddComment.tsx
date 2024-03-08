import { useState } from "react";
import FormBuilder, { FieldType } from "../../../../Utilities/FormBuilder/FormBuilder";
import classes from './module.module.scss'
import AddCommentIcon from '@mui/icons-material/AddComment';

export const AddComment = () => {

    const [open, setOpen] = useState<boolean>(false);


    if (!open) {
        return <div className={classes.AddCommentHint} onClick={()=> setOpen(true) }>
           Add Comment...
        </div>;
    }

    return <div className={classes.AddComment} >
        <FormBuilder
            Fields={[
                {
                    displayname: "",
                    name: "Comment",
                    type: FieldType.HtmlEditor
                }
            ]}
            SubmitButtonStartIcon={<AddCommentIcon/>}
            SubmitButtonNoUpperCase
            SubmitButtonName="Add Comment"
            FetchUrl="/post/comment" />
    </div>;
};

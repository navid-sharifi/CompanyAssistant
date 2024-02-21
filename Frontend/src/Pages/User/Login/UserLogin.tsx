import { Box, Paper } from "@mui/material"
import FormBuilder, { FieldType } from "../../../Utilities/FormBuilder/FormBuilder"
import { RiLoginCircleFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa6";
import { ModalDialog } from "@mui/joy";
import { Modal } from "../../../Utilities/Components/Modal/Modal";
import { HttpResponseModel } from "../../../Utilities/Http/Models";
import { useAppDispatch } from "../../../Store/hooks";
import { updateUserToken } from "../../../Store/UserToken";


export const UserLoginPage = () => {

    var dispacher = useAppDispatch();
    return <Modal>
        <Box>
            <div style={{ maxWidth: "200px", width: "100%", margin: "auto", padding: "20px" }}>
                <FaUserTie color="#1976d2" style={{ width: "100%", height: "auto" }} />
            </div>
            <FormBuilder
                Title="Login"
                Subtitle="Enter your email and password"
                Fields={[
                    {
                        displayname: "Email",
                        name: "Email",
                        type: FieldType.Text,
                        Validations: [{ type: "required" }],
                    },
                    {
                        displayname: "Password",
                        name: "Password",
                        type: FieldType.Password,
                        Validations: [{ type: "required" }],
                    },
                ]}
                FullWidthSubmitButton
                SubmitButtonNoUpperCase
                SubmitButtonStartIcon={<RiLoginCircleFill />}
                FetchUrl="user/passwordLogin"
                SuccessMessge="Login successfully."
                OnSuccess={(data) => {
                    var res = data as HttpResponseModel<string>
                    dispacher(updateUserToken(res.data))
                }}
            />
        </Box>
    </Modal>
}

import { useJwt } from "react-jwt";
import { deleteCredentials } from "../Http/StorageUtils";

const UserAssistant = () => {

    const LogOut = () => {
        // window.location.reload()
        // deleteCredentials()
    }

    return {
        LogOut
    }
}

export default UserAssistant;


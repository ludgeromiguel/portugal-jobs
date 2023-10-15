import { IUserInfo } from "../contexts/UserInfoProvider";
import api from "./api"

const checkToken = async (): Promise<IUserInfo | undefined> => {
    try {
        const userData = await api.get('/@me');

        if (!userData || !userData.data) return;

        return userData.data;
    } catch (e) {
        console.log(e);
        return;
    }
}

export default checkToken;
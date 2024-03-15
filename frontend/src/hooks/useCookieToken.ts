import {useCookies} from "react-cookie";
import {oneYear} from "../utils/variables.ts";


export function useCookieToken() {
    const [cookies, setCookies] = useCookies(['token']);

    const cookieToken = cookies.token;

    const setCookieToken = (token: string) => {
        return setCookies('token', token, {expires: new Date(Date.now() + oneYear)})
    }

    return {cookieToken, setCookieToken}
}
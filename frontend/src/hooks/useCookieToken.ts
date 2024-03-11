import {useCookies} from "react-cookie";


export function useCookieToken() {
    const [cookies, setCookies] = useCookies(['token']);

    const cookieToken = cookies.token;

    const setCookieToken = (token: string) => {
        return setCookies('token', token)
    }

    return {cookieToken, setCookieToken}
}
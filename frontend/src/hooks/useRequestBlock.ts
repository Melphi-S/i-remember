import {useCookies} from "react-cookie";

export function useRequestBlock(name: string) {
    const [ cookies, setCookie, removeCookie] = useCookies()

    const setRequestBlock = (timeout: number) => {
        setCookie(name, Date.now() + timeout, {maxAge: timeout / 60})
    };

    const getRequestBlock = cookies[name];

    const clearRequestBlock = () => {
        removeCookie(name)
    }

    return {setRequestBlock, getRequestBlock, clearRequestBlock}
}
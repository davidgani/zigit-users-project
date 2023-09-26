import { sendData } from "../../../ApiLayer/Api"

export const loginAuthenticationRequest = (userName: string, password: string) => {
    return sendData('Login', {userName, password});
}
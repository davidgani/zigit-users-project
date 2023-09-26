import { sendData } from "../../../ApiLayer/Api"

export const fetchProjectsDataRequest = (id: number, token: string) => {
    return sendData('UserDetails', null, {
        'Authorization': token,
        'Params' : id
      });
}
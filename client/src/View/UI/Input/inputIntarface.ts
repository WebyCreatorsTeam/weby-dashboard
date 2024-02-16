import { IUserRegData } from "../../Components/Auth/inputsIntarface";

export interface IInput {
    type: string, 
    name: string,
    placeholder: string
    changeInput: (ev: React.SyntheticEvent) => void;
}
export interface IInputsList {
    type: string
    name: string
    placeholder: string
}

export interface IUserLoginData {
    email: string
    password: string
}

export interface IUserRegData extends IUserLoginData {
    userName: string;
    repeatPassword:string
}
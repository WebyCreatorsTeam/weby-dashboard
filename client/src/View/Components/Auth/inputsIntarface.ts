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

// export interface UserData {
//     userName: string
//     userEmail: string
//     userPhone: string
// }

// export interface OptionsList {
//     value: string
//     text: string
// }

// export interface User {
//     userName: string;
//     userEmail: string;
//     userPhone: string;
//     userHelp: string;
// }

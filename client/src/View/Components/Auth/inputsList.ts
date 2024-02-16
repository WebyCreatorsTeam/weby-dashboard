import { IInputsList } from "./inputsIntarface";

export const loginInputs: Array<IInputsList> = [
    { type: "text", name: "email", placeholder: "אימייל" },
    { type: "password", name: "password", placeholder: "סיסמא" },
];

export const registerInputs: Array<IInputsList> = [
    { type: "text", name: "userName", placeholder: "שם/כינוי" },
    { type: "text", name: "email", placeholder: "אימייל" },
    { type: "password", name: "password", placeholder: "סיסמא" },
    { type: "password", name: "repeatPassword", placeholder: "סיסמא שנית" },
]


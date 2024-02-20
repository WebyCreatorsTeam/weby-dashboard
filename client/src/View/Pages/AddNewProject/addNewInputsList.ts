import { IInputsList } from "../../Components/Auth/inputsIntarface";

export const addNewInputs: Array<IInputsList> = [
    { type: "text", name: "name", placeholder: "שם הפרויקט" },
    { type: "text", name: "urlSite", placeholder: "קישור לאתר" },
    { type: "text", name: "description", placeholder: "תיאור הפרויקט" }
];
import { IInputsList } from "../../../Components/Auth/inputsIntarface";
import { ISelectValues } from "./addNewInterface";

export const addNewInputs: Array<IInputsList> = [
    { type: "text", name: "name", placeholder: "שם הפרויקט" },
    { type: "text", name: "urlSite", placeholder: "קישור לאתר" },
    { type: "text", name: "description", placeholder: "תיאור הפרויקט" },
    { type: "text", name: "customerFeedback", placeholder: "הכנס פידבק" },
    { type: "text", name: "customerName", placeholder: "הכנס שם הלקוח" },
];

export const selectValues: Array<ISelectValues> = [
    { value: "landing", text: "דף נחיתה" },
    { value: "corporate", text: "אתר תדמית" },
    { value: "commerce", text: "אתר מכירה" },
    { value: "complex", text: "מערכות מורכבות" }
]
import { ReactNode } from "react"

export interface IFrom {
    submit: (ev: React.SyntheticEvent) => void;
    children: ReactNode;
    btnText: string;
}
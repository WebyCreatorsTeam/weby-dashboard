export interface IFormBtn {
    btnText: string, 
    loading: boolean,
    submitFunction?: (ev: React.SyntheticEvent) => void;
}
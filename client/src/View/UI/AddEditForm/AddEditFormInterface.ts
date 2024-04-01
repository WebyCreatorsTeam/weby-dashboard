import { SelectChangeEvent } from "@mui/material"
import { IInputsList } from "../../Components/Auth/inputsIntarface"
import { IProjectDetails } from "../../Pages/Dashboard/AddNewProject/addNewInterface"

export interface IAddEditProps {
    projectDetails: IProjectDetails
    inputs: Array<IInputsList>
    handleChangeInput: (ev: React.SyntheticEvent) => void
    handleChange: (ev: SelectChangeEvent) => void
}
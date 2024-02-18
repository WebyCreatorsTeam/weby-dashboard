import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import Layout from "../View/Layout";
import Register from "../View/Components/Auth/Reg/Register";
import Login from "../View/Components/Auth/Login/Login";
import DashMain from "../View/Pages/Dashboard/DashMain";
import Projects from "../View/Pages/Projects/Projects";
import AddNewProject from "../View/Pages/AddNewProject/AddNewProject";

const RouterPage = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<Login />} />
                <Route path="dashboard" element={<Layout />} >
                    <Route index element={< DashMain/>}/>
                    <Route path="reg" element={<Register/>}/>
                    <Route path="projects" element={< Projects/>}/>
                    <Route path="projects/add-new-roject" element={< AddNewProject/>}/>
                </Route>
            </Route>
        )
    );
    
    return <RouterProvider router={router} />;
};

export default RouterPage;

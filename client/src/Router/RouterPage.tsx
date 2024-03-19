import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import Layout from "../View/Layout";
import Register from "../View/Components/Auth/Reg/Register";
import Login from "../View/Components/Auth/Login/Login";
import DashMain from "../View/Pages/Dashboard/UsersCalls/DashMain";
import Projects from "../View/Pages/Dashboard/Projects/Projects";
import AddNewProject from "../View/Pages/Dashboard/AddNewProject/AddNewProject";
import ProjectEdit from "../View/Pages/Dashboard/EditProject/ProjectEdit";
import { projectsLoader } from "../View/Pages/Dashboard/Projects/projectsLoader";
import { projectLoader } from "../View/Pages/Dashboard/EditProject/projectLoader";
import { usersCallsLoader } from "../View/Pages/Dashboard/UsersCalls/usersCallsLoader";
import { feedbackLoader } from "../View/Pages/Dashboard/Feedbacks/feedbacksLoader";
import ProtectedAuth from "./ProtectedRouts/ProtecterAuth/ProtectedAuth";
import FeedbacksPage from "../View/Pages/Dashboard/Feedbacks/FeedbacksPage";

const RouterPage = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<Login />} />
                <Route path="dashboard" element={
                    <ProtectedAuth>
                        <Layout />
                    </ProtectedAuth>} >
                    <Route index element={< DashMain />} loader={usersCallsLoader} />
                    <Route path="reg" element={<Register />} />
                    <Route path="projects" element={< Projects />} loader={projectsLoader} />
                    <Route path="projects/add-new-roject" element={< AddNewProject />} />
                    <Route path="projects/project/:id" element={< ProjectEdit />} loader={projectLoader} />
                    <Route path="feedbacks" element={< FeedbacksPage />} loader={feedbackLoader} />
                </Route>
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default RouterPage;

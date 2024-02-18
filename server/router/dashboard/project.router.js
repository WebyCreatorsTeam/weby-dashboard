const router = require("express").Router();
const { saveNewProject, getAllProjects, deleteProject } = require("../../controllers/dashboard/projects.controller");
const { upload } = require("../../utils/cloudinary/storage");

router
    .get('/get-all-data-projects', getAllProjects)
    .post('/save-new-project', upload.single("my_file"), saveNewProject)
    .delete('/delete-project', deleteProject)

module.exports = router;
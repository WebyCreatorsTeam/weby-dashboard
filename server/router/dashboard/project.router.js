const router = require("express").Router();
const { saveNewProject,
    getAllProjects,
    deleteProject,
    showProjectToUpdate,
    hendleReplace,
    editProductTexts,
    saveAsDraftorNotToBe
} = require("../../controllers/dashboard/projects.controller");
const { upload } = require("../../utils/cloudinary/storage");

router
    .get('/get-all-data-projects', getAllProjects)
    .post('/save-new-project', upload.single("my_file"), saveNewProject)
    .delete('/delete-project', deleteProject)
    .post('/show-project', showProjectToUpdate)
    .post('/replace-image-project', upload.single("my_file"), hendleReplace)
    .post('/edit-texts-project', editProductTexts)
    .patch('/draft-project', saveAsDraftorNotToBe);

module.exports = router;
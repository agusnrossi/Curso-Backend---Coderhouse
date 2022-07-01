const express = require('express');
const multer = require('multer');
const { loggerInfo,loggerError } = require('../../logger/index');


const fileRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'views/uploads') },
    filename: (req, file, cb) => { cb(null, `${file.originalname}`) }
});

const upload = multer({ storage });

fileRouter.post('/image', upload.single('image'), (req, res, next) => {
    const filePath = req.file.path;
    if (!filePath) {
        const error = new Error('No file uploaded');
        error.httpStatusCode = 400;
        return next(error);
    }
    loggerInfo.info(`File uploaded: ${filePath}`);

}
)

module.exports = fileRouter;
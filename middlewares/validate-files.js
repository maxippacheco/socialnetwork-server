const validateFiles = (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg:'There is no files to upload'
        });
    }

    next();
}

module.exports = {
    validateFiles
};

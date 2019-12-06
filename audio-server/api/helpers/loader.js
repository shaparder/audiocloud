const multer = require('multer');
const path = require('path');

// storage path and file name
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(process.cwd(), '/trackfiles'));
	},
	filename: (req, file, cb) => {
		cb(null, req.body.trackname + '.mp3');
	}
});

// custom file filter
const fileFilter = function(req, file, cb) {
	console.log('new file:\n', file);
	const allowedTypes = ['audio/mp3', 'audio/mpeg'];
	if (!allowedTypes.includes(file.mimetype.toLowerCase())) {
		const error = new Error('Incorrect file');
		error.code = 'INCORRECT_FILETYPE';
		return cb(error, false);
	}
	cb(null, true);
};

// limits for the upload
const limits = {
	fieldNameSize: 20,
	fileSize: 50000000,	
}

//multer middleware
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: limits 
});

module.exports.upload = upload;
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');

// storage path and file name, creates folder if it doesn't exist
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dest = process.env.TRACKFILES_PATH || path.join(process.cwd(), '/trackfiles');
		mkdirp.sync(dest);
		cb(null, dest);
	},
	filename: (req, file, cb) => {
		cb(null, req.body.username + ' - ' + req.body.trackname + '.mp3');
	}
});

// custom file filter, allows only mp3, mpeg files
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

// size and name length limits for the file upload
const limits = {
	fieldNameSize: 20,
	fileSize: 50000000,	
}

//multer middleware
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: limits 
}).single('trackfile');

module.exports.upload = upload;
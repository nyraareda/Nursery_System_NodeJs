const multer = require('multer');
const diskStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    const fileName = `user-${Date.now()}.${extension}`;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split('/')[0];

  if (imageType === 'image') {
    cb(null, true);
  } else {
    cb(new Error("You should upload an image only"), false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter
}).single('image');

module.exports = upload;

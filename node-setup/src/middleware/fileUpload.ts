import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const uploadCSV = upload.single('file');

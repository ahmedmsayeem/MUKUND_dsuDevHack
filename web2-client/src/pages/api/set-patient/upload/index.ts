// pages/api/upload.ts

import formidable, { File as FormidableFile } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// Disable the default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const form = new formidable.IncomingForm();

    // Set the upload directory to the public folder
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Create the uploads directory if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true });

    form.uploadDir = uploadDir;

    form.parse(req, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
        if (err) {
            res.status(500).json({ error: 'Error parsing the files.' });
            return;
        }

        // Move the files to the public/uploads directory
        Object.values(files).forEach((file: FormidableFile | FormidableFile[]) => {
            if (Array.isArray(file)) {
                // Handle multiple files (if applicable)
                file.forEach(f => moveFile(f));
            } else {
                moveFile(file);
            }
        });

        res.status(200).json({ message: 'Files uploaded successfully!' });
    });
};

// Function to handle file movement
const moveFile = (file: FormidableFile) => {
    const oldPath = file.filepath; // Use `filepath` in formidable v3
    const newPath = path.join(process.cwd(), 'public/uploads', file.originalFilename || file.newFilename || 'unknown');

    // Rename the file to the new path
    fs.renameSync(oldPath, newPath);
};

export default uploadHandler;

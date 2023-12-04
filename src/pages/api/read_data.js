import fs from 'fs';
import path from 'path';

export default (req, res) => {
    try {
        const filePath = path.join(process.cwd(),"./src/data/calendar-entries.json");

        const jsonData = fs.readFileSync(filePath, 'utf-8');

        const data = JSON.parse(jsonData);

        res.status(200).json(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

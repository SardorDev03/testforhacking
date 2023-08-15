const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Faylni qo'llash uchun joylashuv va nomlash
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

// Multer o'rnatilgan joyga fayl yuklash
const upload = multer({ storage: storage });
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
})
// Faylni qabul qilish va qo'llash
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ message: 'Rasm muvaffaqiyatli yuklandi!' });
});

// Serverni eshittirish
app.listen(port, () => {
    console.log(`Server http://localhost:${port} portida ishga tushdi.`);
});

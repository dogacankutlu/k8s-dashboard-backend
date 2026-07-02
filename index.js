// bu dosya expressjs ile yazılmış bir backend server dosyasıdır
// expressjs framework'ünü kullanarak backend server'ı başlatmak için kullanılan ana dosyadır 
// bu dosya gelen HTTP isteklerini dinler ve yanıtlar üretir

// importlama
const express = require('express');
const cors = require('cors');

// server objesi yaratılıyor
const app = express();
const PORT = 3000;

// app.use(): gelen her requeste bunu uygula
// expresse diyoruz ki, her istekte cors kullan ve gelen requestin bodysini json olarak parse et
app.use(cors());
app.use(express.json());

// GET request endpointi olusturuluyor
// (req, res) => {} callback fonksiyonu, gelen requesti ve response objesini parametre olarak alır
app.get('/', (req, res) => {
    res.send('Kubernetes Dashboard Backend is running.');
});

// POST request endpointi olusturuluyor
// server başlatılıyor ve PORT numarası dinleniyor
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
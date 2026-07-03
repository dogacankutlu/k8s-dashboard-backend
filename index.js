// bu dosya expressjs ile yazılmış bir backend server dosyasıdır
// expressjs framework'ünü kullanarak backend server'ı başlatmak için kullanılan ana dosyadır 
// bu dosya gelen HTTP isteklerini dinler ve yanıtlar üretir

// importlama
// podsRouter, pods.js baglantısı icin import edilir, bu dosya podlar ile ilgili endpointleri içerir
// index.js su anda podsRouter'ın var oldugunu ve kullanılabilir olduğunu bilir
const express = require('express');
const cors = require('cors');
const podsRouter = require('./routes/pods');

// server objesi yaratılıyor
const app = express();
const PORT = 3000;

// app.use(): gelen her requeste bunu uygula
// expresse diyoruz ki, her istekte cors kullan ve gelen request json ise
// requestin bodysini json olarak parse et
// podsRouter import edildi, /api/pods endpointi ile eşleştirildi
// router'ın servera bağlandığı nokta burasıdır
// /api/pods ile başlayan bir istek geldiğinde, halletmesi icin podsRouter'a yönlendirilir
// özetle, angular GET /api/pods isteği gönderdiğinde:
// express /api/pods ile başlayan URL'yi görür
// podsRouter'a yönlendirir
// podsRouter'da eşleşen bir GET endpointi zaten tanımlıdır
// Kubernetesi çağırır ve podları listeler, json formatında döner
app.use(cors());
app.use(express.json());
app.use('/api/pods', podsRouter);

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
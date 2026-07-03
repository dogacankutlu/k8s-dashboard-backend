
// express kütüphanesi import edilir
const express = require('express');

// router objesi yaratılıyor
const router = express.Router();

// client.js'den sadece coreV1Api import ediliyor çünkü 
// bu dosyada sadece podlar listelenecek
const { coreV1Api } = require('../k8s/client');

// GET endpointi tanımlanıyor, async kullanılıyor çünkü kubernetesten veri beklemek gerekiyor
// try-catch bloğu ile hata yönetimi sağlanıyor
// coreV1Api kullanılarak default namespace'deki podlar listeleniyor, await ile yanıt bekleniyor
// result.items array'i map fonksiyonu ile dönüştürülüyor
// temizlenmiş veri, response olarak podlar json formatında gönderiliyor
// hata durumunda 500 Internal Server Error yanıtı gönderiliyor
router.get('/', async (req, res) => {
  try {
    const result = await coreV1Api.listNamespacedPod({ namespace: 'default' });
    const pods = result.items.map(pod => ({
      name: pod.metadata.name,
      status: pod.status.phase,
      namespace: pod.metadata.namespace,
    }));
    res.json(pods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router objesi export ediliyor, index.js dosyasında kullanılmak üzere
module.exports = router;
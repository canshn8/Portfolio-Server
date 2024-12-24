const Mail = require('../models/mail'); // MongoDB modelini import et

exports.saveMessage = async (req, res) => {
    const { fullName, email, message } = req.body;

    console.log(req.body); // Gelen veriyi logla
    
    // Alanlar kontrolü
    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'Tüm alanlar gereklidir.' });
    }
    
    // MongoDB'ye kaydedilecek yeni mesaj objesi oluşturuyoruz
    const newMail = new Mail({
      fullName,
      email,
      message,
    });
    
    // Veriyi MongoDB'ye kaydediyoruz
    newMail.save()
      .then(() => {
        res.status(200).json({ message: 'Mesaj başarıyla kaydedildi.' });
      })
      .catch((err) => {
        console.error('Mesaj MongoDB kaydederken hata oluştu:', err);
        res.status(500).json({ error: 'Mesaj kaydedilemedi.' });
      });
};

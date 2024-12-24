const path = require('path');


exports.downloadTrCvPdf = (req, res) => {
  try {
    const filePath = path.join(__dirname,'..', 'file', 'CV_TR.pdf');
    res.download(filePath, 'turkish-cv.pdf', (err) => {
      if (err) {
        console.error('Dosya indirilemedi:', err);
        res.status(500).send('Dosya indirilemedi.');
      }
    });

  } catch (err) {
    console.error('Dosya indirirken hata:', err);
    res.status(500).send('Dosya indirilemedi.');
  }
};

exports.downloadEnCvPdf = (req, res) => {
  try {
    const filePath = path.join(__dirname,'..', 'file', 'CV_EN.pdf');
    res.download(filePath, 'english-cv.pdf', (err) => {
      if (err) {
        console.error('Dosya indirilemedi:', err);
        res.status(500).send('Dosya indirilemedi.');
      }
    });

  } catch (err) {
    console.error('Dosya indirirken hata:', err);
    res.status(500).send('Dosya indirilemedi.');
  }
};



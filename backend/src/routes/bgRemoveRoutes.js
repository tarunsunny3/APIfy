const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

router.post('/remove-bg', upload.single('file'), async (req, res) => {
  const file = req.file;
  let base64 = Buffer.from(file.buffer).toString('base64');
  //   console.log(base64.substring(base64.length - 10));

  const formData = new FormData();
  formData.append('size', 'full');
  formData.append('image_file_b64', base64);
  console.log(formData.size);
  axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
      ...formData.getHeaders(),
      'X-Api-Key': process.env.REMOVE_BG_API_KEY,
    },
    encoding: null,
  })
    .then((response) => {
      if (response.status != 200)
        return console.error('Error:', response.status, response.statusText);
        // console.log(response.data);
      // fs.writeFileSync('no-bg.png', response.data);
    //   res.json({ success: true });
    // res.download('./no-bg.png', (err)=>{
    //     console.log(err);
    // })
    })
    .catch((error) => {
      return console.error('Request failed:', error);
    });
});

module.exports = router;

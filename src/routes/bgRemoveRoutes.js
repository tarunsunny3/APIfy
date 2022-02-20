const express = require('express');
const router = express.Router();
const { cloudinary } = require('../utils/cloudinary');
// const multer = require('multer');
// const upload = multer();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { requireAuth } = require('../middlewares/auth');

router.post('/remove-bg', async (req, res) => {
  // const decodedUser = req.decoded;
  // const loggedIn = decodedUser.id !== null;
  let fileName = req.body.fileName;
  fileName = fileName.substr(0, fileName.indexOf("."));
  const base64Image = req.body.image;
  console.log(fileName);
  // // If the id is null, then the user is not logged in
  // // if (loggedIn) {
  //   try {
  //     const uploadedResponse = await cloudinary.uploader.upload(base64Image, {
  //       public_id: fileName,
  //       background_removal: "cloudinary_ai",
  //       upload_preset: 'dev_setups',
  //     });
  //     console.log(uploadedResponse);
  //     // res.json({msg: "SUCCESS"});
  //   } catch (error) {
  //     console.error(error);
  //     // res.json({msg: "FAIL"})
  //   }
  // // }

  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_file_b64', base64Image);
  // console.log(formData.size);
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
      // fs.writeFileSync(`${fileName}-bg-removed.png`, response.data);
      res.json({ success: true, image: response.data.toString('base64')});
      // res.download(`${fileName}-bg-removed.png`, (err) => {
      //   console.log(err);
      // });
    })
    .catch((error) => {
      res.json({success: false, message: "Something's wrong!!, Try with another image"});
      console.log(error);
    });
});

module.exports = router;

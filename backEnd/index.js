const express = require("express");
const path = require('path')
const cors = require('cors')
const multer = require("multer");
const app = express();
const PORT =  3001;

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
const imageStorage = multer.diskStorage({     
  destination: (req,file,cb)=>{
    cb(null,'../frontEnd/src/assets/images')
  }, 
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
  }
});

const imageUpload = multer({storage: imageStorage}) 

app.post("/storeImage", imageUpload.array('file') ,(req, res) => {
  let urls= []
  req.files.map((values)=>{
      let destination = values.destination.replace("../","")
      urls.push(`localhost:3000/D:/Reactjs/multipleimage/${destination}/${values.filename}`)
  })
  console.log(req.files[0])
  return res.json({data:urls})
})
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
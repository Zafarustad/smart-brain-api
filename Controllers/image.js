// const Clarifai = require('clarifai');

// const app = new Clarifai.App({
//     apiKey: 'cc22ed09b3f64e8194c71d9d3cae3a9c'
//    });
 
// const handleApiCall = (req, res) =>{
//     app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
//     .then(data =>{
//         res.json(data);
//     })
//     .catch(err => res.status(400).json('unable to connect to API'))
// }

const handleImage = (req, res, knex) =>{
    const { id } = req.body;
   knex('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
       res.json(entries[0]);
   })
   .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
}
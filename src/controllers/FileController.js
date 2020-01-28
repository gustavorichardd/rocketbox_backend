const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
    async store(req, res) {
        const box = await Box.findById(req.params.id);

        const file = await File.create({
           title: req.file.originalname,
           path: req.file.key,
        });

        box.files.push(file);

        await box.save();

        await req.io.sockets.in(box._id).emmit('file', file);
        //
        const get = async () => {
            return Promise.reject('Oops!').catch(err => {
              throw new Error(err);
            });
          };
          
          get()
            .then(console.log)
            .catch(function(e) {
              console.log(e);
            });
        //
        return res.json(file);
    }
}

module.exports = new FileController();
const Api = require('../models/Api.js');
const User = require('../models/User.js');
const apis = {
  // GET get all APIs
  getAllAPIs: function (req, res) {
    Api.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving APIs.',
        });
      });
  },
  // GET APIs of a particular user
  getAPIsByUserID: async function (req, res) {
    const userId = req.params.id;

    try {
      const populatedUser = await User.findOne({ id: userId }).populate({
        path: 'apis',
      });
      // console.log(populatedUser['apis']);
      if (!populatedUser) {
        res.status(404).send({
          message: 'API with id ' + userId + ' is not found.',
        });
      } else {
        //User found, populate all the APIs
        res.json({ apis: populatedUser['apis'] });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message:
          err.message || 'Error occured while retrieving API with id ' + userId,
      });
    }
  },
  // POST add new API
  addAPI: function (req, res) {
    const userId = '61e83a571cde6f37ffb06e98';
    if (!req.body.name) {
      res.status(400).send({
        message: 'API name can not be empty!',
      });
      return;
    }
    const api = new Api({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });
    api
      .save()
      .then(async (data) => {
        const user = await User.findById(userId);
        if (!user) {
          res.status(500).send({
            message: err.message || 'Error occurred while creating the API.',
          });
        } else {
          try {
            user.apis.push(data._id);
            const newUser = await user.save();
            res.json({
              success: true,
              newUser,
            });
          } catch (e) {
            console.log(e);
            res.json({
              success: false,
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while creating the API.',
        });
      });
  },
  // PUT update API by id
  updateAPI: function (req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data to update can not be empty!',
      });
    }
    const id = req.params.id;
    Api.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Failed to update API with id=${id}.`,
          });
        } else
          res.send({
            message: 'API was updated successfully.',
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error occured while updating API with id=' + id,
        });
      });
  },
  // DELETE delete API by id
  deletAPI: function (req, res) {
    const id = req.params.id;
    Api.deleteOne({
      _id: id,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Failed to delete API with id=${id}.`,
          });
        } else
          res.send({
            message: 'API was deleted successfully.',
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error occured while deleting API with id=' + id,
        });
      });
  },
  // DELETE remove all APIs
  deleteAllAPIs: function (req, res) {
    Api.deleteMany({})
      .then((data) => {
        res.send({
          message: 'All APIs was deleted successfully.',
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error occured while deleting all APIs',
        });
      });
  },
};
module.exports = apis;

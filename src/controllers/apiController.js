const Api = require('../models/Api.js');
const User = require('../models/User.js');
const apis = {
  // GET get all APIs
  getAllAPIs: function (req, res) {
    Api.find({})
      .then((data) => {
        res.send({ apis: data });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error occurred while retrieving APIs.',
        });
      });
  },

  //GET API by it's id

  getAPIByID: function (req, res) {
    let id = req.params.id;
    Api.findById(id)
      .then((data) => {
        res.send({ api: data });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error occured while retrieving API',
        });
      });
  },
  // GET APIs of a particular user
  getAPIsByUserID: async function (req, res) {
    const userId = req.params.id;
    try {
      const populatedUser = await User.findOne({ _id: userId }).populate({
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
    console.log(req.body);
    const userID = req.body.id;
    console.log(userID);
    if (!req.body.id) {
      res.status(400).send({
        message: 'User ID cannot be empty!',
      });
      return;
    }
    const api = new Api({
      name: req.body.name,
      endpoints: req.body.endpoints,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userID,
    });
    api
      .save()
      .then(async (data) => {
        const user = await User.findById(userID);
        if (!user) {
          res.status(500).send({
            success: false,
            message: 'Error occurred while creating the API.',
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
          success: false,
          message: 'Error occurred while creating the API.',
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
  deleteAPI: async function (req, res) {
    const id = req.params.id;
    const deletedAPI = await Api.findByIdAndDelete(id, { rawResult: true });
    if (!deletedAPI) {
      res.status(404).send({
        message: 'API with the given ID is not found.',
      });
    }
    // Now remove also remove this API id from the User's APIs list
    try {
      let userID = deletedAPI.value.userID;
      let user = await User.findById(userID);
      user.apis.splice(user.apis.indexOf(id), 1);
      await user.save();
      res.send({
        message: 'API was deleted successfully.',
      });
    } catch (error) {
      res.status(500).send({
        message: 'Error deleting the API',
      });
    }

    // Api.deleteOne({
    //   _id: id,
    // })
    //   .then((data) => {
    //     console.log(data);
    //     if (data.deletedCount == 0) {
    //       res.status(404).send({
    //         message: `Failed to delete API with id=${id}.`,
    //       });
    //     } else {
    //       res.send({
    //         message: 'API was deleted successfully.',
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     res.status(500).send({
    //       message: 'Error occured while deleting API with id=' + id,
    //     });
    //   });
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

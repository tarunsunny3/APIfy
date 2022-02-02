const express = require('express');
const router = new express.Router();
const api = require('../controllers/apiController.js');
const { requireAuth } = require('../middlewares/auth.js');

router.get(`/apis`, [api.getAllAPIs]);
router.get(`/apis/:id`, requireAuth, [api.getAPIsByUserID]);
router.post(`/apis`, requireAuth, [api.addAPI]);
router.put(`/apis/:id`, [api.updateAPI]);
router.delete(`/apis/:id`, [api.deletAPI]);
router.delete(`/apis`, [api.deleteAllAPIs]);

module.exports = router;

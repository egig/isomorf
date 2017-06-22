import express from 'express';
const router = express.Router();
import config from '../../../config';
import axios from 'axios';

router.post('/login', function(req, res) {

	let email = req.body.email;
	let password = req.body.password;
	let serviceUrl = `${config.API_SERVER}/api/users/login`;
	let keyId = config.API_SERVER_KEY;
	let data = {
		email, password, keyId
	};

	axios.post(serviceUrl, {}, {
		params: data
	}).then(function (response) {

		if(response.data.success) {
			req.session.user = response.data.data;
		}

		res.json(response.data);

	}).catch(function (e) {
		console.error(e.response);
		res.send(e);
	});

});


router.get('/list', function(req, res) {

	let serviceUrl = `${config.API_SERVER}/api/users/list`;
	let keyId = config.API_SERVER_KEY;
	let params = {
		keyId
	};

	axios.get(serviceUrl, {
		params
	}).then(function (response) {

		res.json(response.data.data);

	}).catch(function (e) {
		console.error(e.response);
		res.send(e);
	});

});

router.post('/create', function(req, res) {

	let serviceUrl = `${config.API_SERVER}/api/users/register/v2`;
	let keyId = config.API_SERVER_KEY;
	let data = req.body;

	let params = { keyId };

	axios.post(serviceUrl, data, {
		params
	}).then(function (response) {

		res.json(response.data.data);

	}).catch(function (e) {
		console.error(e.response);
		res.send(e);
	});

});


router.get('/detail', function(req, res) {

	let serviceUrl = `${config.API_SERVER}/api/users/detail`;
	let keyId = config.API_SERVER_KEY;
	let params = {
		keyId,
		userId: req.query.userId
	};

	axios.get(serviceUrl, {
		params
	}).then(function (response) {

		res.json(response.data.data);

	}).catch(function (e) {
		console.error(e.response);
		res.send(e);
	});

});


router.post('/update', function(req, res) {

	let serviceUrl = `${config.API_SERVER}/api/users/updateAccount`;
	let keyId = config.API_SERVER_KEY;
	let data = req.body;

	let params = { keyId };

	axios.put(serviceUrl, data, {
		params
	}).then(function (response) {

		res.json(response.data.data);

	}).catch(function (e) {
		console.error(e.response);
		res.send(e);
	});

});

router.get('/eselon', function(req, res) {

	let serviceUrl = `${config.API_SERVER}/api/users/eselon`;
	let keyId = config.API_SERVER_KEY;
	let params = {
		keyId,
	};

	axios.get(serviceUrl, {
		params
	}).then(function (response) {
		res.json(response.data.data);

	}).catch(function (e) {
		console.error(e.response);
		res.send(e);
	});

});

export default router;
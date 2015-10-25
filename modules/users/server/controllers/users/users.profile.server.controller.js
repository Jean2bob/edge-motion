'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	fs = require('fs'),
	path = require('path'),
    async = require('async'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function (req, res) {
	// Init Variables
	var user = req.user;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function (err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function (err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Update profile picture
 */
exports.changeProfilePicture = function (req, res) {
	var user = req.user;
	var message = null;

	if (user) {
		fs.writeFile('./modules/users/client/img/profile/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
			if (uploadError) {
				return res.status(400).send({
					message: 'Error occurred while uploading profile picture'
				});
			} else {
				user.profileImageURL = 'modules/users/img/profile/uploads/' + req.files.file.name;

				user.save(function (saveError) {
					if (saveError) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(saveError)
						});
					} else {
						req.login(user, function (err) {
							if (err) {
								res.status(400).send(err);
							} else {
								res.json(user);
							}
						});
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
  *  Update multiple users
 */
exports.updateMulti = function(req, res) {
    var users = req.body;

    async.each(users, function (user, callback) {
        User.findById(user._id).exec(function (err, userToUpdate) {
            // Merge existing user
            _.merge(userToUpdate, user);
            userToUpdate.updated = Date.now();
            userToUpdate.save(function (err) {
                if (err) {
                    callback(err);
                    return res.status(400).send();
                } else {
                    res.status(200).send();
                }
            });
        });
    });
};

/**
 * Send User
 */
exports.me = function (req, res) {
    console.log('depuis user.profile.server.controller' + req);
	res.json(req.user || null);
};

/**
 * Show the current Profile
 */
exports.read = function(req, res) {
	//FindOne is called in user.authorization.server.controller.js
	res.jsonp(req.profile);
};

/*
    List of users
 */
exports.list = function(req, res){
    User.find()
        .select('username profileImageURL')
        .populate('').exec(function(err, users){
        if(err){
            console.log(err);
        }else{
            res.jsonp(users);
        }
    });
};

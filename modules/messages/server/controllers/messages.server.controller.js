'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Message = mongoose.model('Message'),
	User = mongoose.model('User'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Message
 */
exports.create = function(req, res) {
	var message = new Message(req.body);

	message.save(function(err) {
		if (err) {
            console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(message);
		}
	});
};

/**
 * Show the current Message
 */
exports.read = function(req, res) {
	res.jsonp(req.message);
};

/**
 * Update a Message
 */
exports.update = function(req, res) {
	var message = req.message ;

	message = _.extend(message , req.body);

	message.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(message);
		}
	});
};

/**
 * Delete an Message
 */
exports.delete = function(req, res) {
	var message = req.message ;

	message.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(message);
		}
	});
};

/**
 * List of Messages
 */
exports.list = function(req, res) {
    Message.find({
        $or:[{userCopy : req.user._id}, {userRecipient : req.user._id}, {userSender : req.user._id}]
    }).populate('userRecipient userCopy userSender', 'displayName')
        .exec(function(err, messages){
        if(err){
            console.log(err);
        }else{
            res.jsonp(messages);
        }
    });
    /*
    User.findById(req.user._id).populate('messages.incoming messages.sended').exec(function(err, user) {
        console.log(user.messages);
        res.jsonp(user.messages);
    });
    */
};


/**
 * Message middleware
 */
exports.messageByID = function(req, res, next, id) { Message.findById(id).populate('user', 'displayName').exec(function(err, message) {
		if (err) return next(err);
		if (! message) return next(new Error('Failed to load Message ' + id));
		req.message = message ;
		next();
	});
};

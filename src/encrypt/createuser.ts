import express from 'express';
import bcrypt from 'bcryptjs';

/* bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("superSecret", salt, function(err, hash) {
      user.password = hash;
      user.save();
      res.json({success: true, message: 'Create user successful'});
    });
  }); */
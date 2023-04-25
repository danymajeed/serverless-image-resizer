"use strict";

const GetOrCreateImage = require("./GetOrCreateImage");

exports.handler = async (event, context, callback) =>
  await GetOrCreateImage(event, context, callback);

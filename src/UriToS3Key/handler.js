"use strict";

const UriToS3Key = require("./UriToS3Key");

exports.handler = async (event, context, callback) =>
  await UriToS3Key(event, context, callback);

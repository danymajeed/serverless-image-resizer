"use strict";

const AWS = require("aws-sdk");
const Sharp = require("sharp");
const { parse } = require("querystring");

const S3 = new AWS.S3();

const defaultImageBase64 =
  "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AAQEAAEBAAEBQEAAEBAABAQAAQEAAQFAQAAQEAAEBAABAQABAUBAABAQAAQEAAEBAAEBQEAAEBAABAQAAQEAAQFAQAAQEAAEBAAB8VcAgIAAICAACAgAAgIAAgKAgAAgIAAICAACAgACAoCAACAgAAgIAAICAAICgIAAICAACAgAAgIAAgKAgAAgIAAICAACAgACAoCAACAgAAgIAAICAAICgIAAICAACAgAAgIAAgKAgAAgIAAICAAICAACAoCAACAgAAgIAAgIAAICgIAAICAACAgACAgAAgKAgAAgIAAICAAICAACAoCAACAgAAgIAAgIAAICgIAAICAACAgACAgAAgKAgAAgIAAICAAICAACAoCAACAgAAgIAAgIAAICgIAAICAAICAACAgAAgKAgAAgIAAgIAAICAACAoCAACAgACAgAAgIAAICgIAAICAAICAACAgAAgKAgAAgIAAgIAAICAACAoCAACAgACAgAAgIAAICgIAAICAAICAACAgAAgKAgACAgAAgIAAICAACAoCAAICAACAgAAgIAAICgIAAgIAAICAATM3/AIq0T3puTLXSAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTEzVDE4OjQ2OjQxKzAwOjAw06bEqQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0xM1QxODo0Njo0MSswMDowMKL7fBUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC";

const GetOrCreateImage = async (event, context, callback) => {
  const {
    cf: {
      request: {
        origin: {
          s3: { domainName },
        },
        querystring,
        uri,
      },
      response,
      response: { status },
    },
  } = event.Records[0];

  const defaultResponse = {
    ...response,
    status: 200,
    statusDescription: "Found",
    body: defaultImageBase64,
    bodyEncoding: "base64",
    headers: {
      ...response.headers,
      "content-type": [{ key: "Content-Type", value: "image/png" }],
    },
  };

  if (!["403", "404"].includes(status)) return response;

  let { nextExtension, height, sourceImage, width } = parse(querystring);

  height = parseInt(height, 10) || null;
  width = parseInt(width, 10);

  if (!width || !sourceImage || !nextExtension) return defaultResponse;

  const [bucket] = domainName.match(/.+(?=\.s3\.amazonaws\.com)/i);
  const contentType = "image/" + nextExtension;
  const key = uri.replace(/^\//, "");
  const sourceKey = sourceImage.replace(/^\//, "");

  return S3.getObject({ Bucket: bucket, Key: sourceKey })
    .promise()
    .then((imageObj) => {
      let resizedImage;
      const errorMessage = `Error while resizing "${sourceKey}" to "${key}":`;

      // Required try/catch because Sharp.catch() doesn't seem to actually catch anything.
      try {
        resizedImage = Sharp(imageObj.Body)
          .resize(width, height)
          .toFormat(nextExtension, {
            /**
             * @see https://sharp.pixelplumbing.com/api-output#webp for a list of options.
             */
            quality: 95,
          })
          .toBuffer()
          .catch((error) => {
            throw new Error(`${errorMessage} ${error}`);
          });
      } catch (error) {
        throw new Error(`${errorMessage} ${error}`);
      }
      return resizedImage;
    })
    .then(async (imageBuffer) => {
      await S3.putObject({
        Body: imageBuffer,
        Bucket: bucket,
        ContentType: contentType,
        Key: key,
        StorageClass: "STANDARD",
      })
        .promise()
        .catch((error) => {
          throw new Error(
            `Error while putting resized image '${uri}' into bucket: ${error}`
          );
        });

      return {
        ...response,
        status: 200,
        statusDescription: "Found",
        body: imageBuffer.toString("base64"),
        bodyEncoding: "base64",
        headers: {
          ...response.headers,
          "content-type": [{ key: "Content-Type", value: contentType }],
        },
      };
    })
    .catch((error) => {
      const errorMessage = `Error while getting source image object "${sourceKey}": ${error}`;
      console.log(errorMessage);
      return defaultResponse;
    });
};

module.exports = GetOrCreateImage;

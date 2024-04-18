const bwipjs = require("bwip-js");

const generateBarCode = async (code) => {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: "code39",
        text: code,
        scale: 3,
        height: 10,
        includetext: true,
      },
      (err, png) => {
        if (err) reject(err);
        resolve(png);
      }
    );
  });
};

module.exports = generateBarCode;

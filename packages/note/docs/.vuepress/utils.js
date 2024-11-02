const REPLACE_CODE = "$";
const SPLIT_CODE = "-";
const NAME_CODE = "/";
const COMMA_CODE = ",";
const README_CODE = "README.md";

const CODES = {
  SPLIT_CODE,
  REPLACE_CODE,
  COMMA_CODE,
  README_CODE,
  NAME_CODE,
};

const codeSplit = (str, code) => {
  return str.replace(code, CODES.REPLACE_CODE).split(CODES.REPLACE_CODE);
};

exports.codeSplit = codeSplit;
exports.CODES = CODES;

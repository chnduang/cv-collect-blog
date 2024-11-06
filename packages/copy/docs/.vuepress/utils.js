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

const TOP_LIST = [README_CODE];

const codeSplit = (str, code) => {
  return str.replace(code, CODES.REPLACE_CODE).split(CODES.REPLACE_CODE);
};

const getFileName = (str) => {
  const [fileName] = str.split(".");
  return fileName;
};

exports.codeSplit = codeSplit;
exports.CODES = CODES;
exports.TOP_LIST = TOP_LIST;
exports.getFileName = getFileName;

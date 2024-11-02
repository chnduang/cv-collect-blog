const fs = require("fs");
const path = require("path");
const process = require("process");
const onReadmeFile = require("./writefile");

const ignoreList = [".DS_Store"];
const ignoreSiderList = [".vuepress", ".DS_Store", "README.md", "temp"];
const workPath = path.join(process.cwd() + "/docs");

const { CODES, codeSplit } = require("./utils");

const README_CODE = "README.md";

const directorySort = (arr, currentPath, parentName, rankIndex) => {
  const sortArr = [];
  const noSortArr = [];
  arr.forEach((item) => {
    const fistCode = item.charCodeAt(0);
    if (49 <= fistCode && fistCode <= 57) {
      const splitArr = codeSplit(item, CODES.SPLIT_CODE);
      sortArr.push(splitArr);
      return;
    }
    if (item === README_CODE) {
      return;
    }
    noSortArr.push(item);
  });
  const tempSortArr = sortArr.sort((a, b) => a[0] - b[0]);
  const resSortArr = tempSortArr.concat(noSortArr);
  // 生成 readme 文件
  // onReadmeFile(resSortArr, currentPath, parentName, rankIndex);
  return [README_CODE, ...resSortArr];
};

function getSiderChildren(parentName, rankIndex) {
  const currentPath = path.join(workPath + `/${parentName}`);
  const filterFiles = fs
    .readdirSync(currentPath)
    .filter((file) => !ignoreList.includes(file));
  // 按文件夹中阿拉伯数字排序 并 去除
  const sortFilterFiles = directorySort(
    filterFiles,
    currentPath,
    parentName,
    rankIndex
  );
  const files = sortFilterFiles.map((file) => {
    if (file === README_CODE) {
      return `/${parentName}/`;
    }
    const isArrayFlag = Array.isArray(file);
    if (!isArrayFlag && file.endsWith(".md")) {
      const fileName = file.split(".")[0];
      return `/${parentName}/${fileName}`;
    }
    const combineFileName = !isArrayFlag
      ? file
      : file.toString().replace(CODES.COMMA_CODE, CODES.SPLIT_CODE);

    let currentFile = { title: !isArrayFlag ? file : file[1] };
    const subPath = `${currentPath}/${combineFileName}`;
    if (fs.statSync(subPath).isDirectory()) {
      return {
        ...currentFile,
        children: getSiderChildren(
          `${parentName}/${combineFileName}`,
          rankIndex + 1
        ),
      };
    }
  });

  return files.filter((item) => item);
}
const getSortList = (parentName) => {
  const list = getSiderChildren(parentName, 1);
  return [...new Set([`/${parentName}/`, ...list])];
};
const getSiderList = () => {
  let siderObj = {};
  const siderFiles = fs
    .readdirSync(workPath)
    .filter((file) => !ignoreSiderList.includes(file));

  for (let val of siderFiles) {
    siderObj = { ...siderObj, [`/${val}/`]: getSortList(val) };
  }

  return siderObj;
};
const sidebar = getSiderList();

exports.sidebar = sidebar;

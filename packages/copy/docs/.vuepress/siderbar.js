const fs = require("fs");
const path = require("path");
const process = require("process");
const onReadmeFile = require("./writefile");

const ignoreList = [".DS_Store"];
const ignoreSiderList = [".vuepress", ".DS_Store", "README.md", "temp"];
const workPath = path.join(process.cwd() + "/docs");

const { CODES, TOP_LIST, getFileName } = require("./utils");

const removeNumber = (str) => {
  const fistCode = str.charCodeAt(0);
  if (49 <= fistCode && fistCode <= 57) {
    const indx = str.indexOf(CODES.SPLIT_CODE);
    const resStr = indx ? str.slice(indx + 1) : str;
    return resStr;
  }
  return str;
};

// 侧边栏
function getSideChildren(parentName, rankIndex) {
  const parentPath = `/${parentName}`;
  const currentPath = path.join(workPath + `${parentPath}`);
  const filterFiles = fs
    .readdirSync(currentPath)
    .filter((file) => !ignoreList.includes(file));
  const topFile = [];
  const readmeFlag = filterFiles.find((item) => item === CODES.README_CODE);

  const files = filterFiles.map((file) => {
    if (file.endsWith(".md")) {
      const fileName = getFileName(file);
      const _path = `${parentPath}/${fileName}`;
      // 判断是否在toplist中
      if (TOP_LIST.includes(file)) {
        file !== CODES.README_CODE && topFile.push(_path);
        return;
      }
      return _path;
    }
    // 存在二级标题
    const title = removeNumber(file);
    const currentFile = { title };
    const subPath = `${currentPath}/${file}`;
    if (fs.statSync(subPath).isDirectory()) {
      return {
        ...currentFile,
        path: `${parentPath}/${file}`,
        children: getSideChildren(`${parentName}/${file}`, rankIndex + 1),
      };
    }
  });

  // 手动拼接让readme置顶
  const allFiles = [`${parentPath}/`, ...topFile].concat(files);

  // 去空
  const finalList = allFiles.filter((item) => item);
  // 判断是否存在readme,没有则 创建readme
  if (!readmeFlag) {
    onReadmeFile(currentPath, finalList, rankIndex);
  }
  return finalList;
}

const getSideList = () => {
  let siderObj = {};
  const siderFiles = fs
    .readdirSync(workPath)
    .filter((file) => !ignoreSiderList.includes(file));

  for (let val of siderFiles) {
    siderObj = { ...siderObj, [`/${val}/`]: getSideChildren(val, 1) };
  }

  return siderObj;
};
const sidebar = getSideList();

exports.sidebar = sidebar;

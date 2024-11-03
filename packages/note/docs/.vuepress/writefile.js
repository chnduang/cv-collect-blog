const fs = require("fs");
const README_CODE = "README.md";

const tempHead = ["#", "##"];
let tempStr = ``;

const onWriteFile = (currentPath, TEMPLATE_README) => {
  fs.writeFile(`${currentPath}/${README_CODE}`, TEMPLATE_README, (error) => {
    // 创建失败
    if (error) {
      console.log(`${README_CODE}创建失败：${error}`);
    }
    // 创建成功
    console.log(`${README_CODE}创建成功！`);
  });
};

const getFileName = (str) => {
  const splitArr = str.split("/");
  const length = splitArr.length;
  return splitArr[length - 1];
};

const genFileTemp = (item, parentPath) => {
  const fileName = getFileName(item);
  if (fileName === "") {
    return;
  }
  const parentName = parentPath && getFileName(parentPath);
  const linkStr = parentPath ? `${parentName}/${fileName}` : `${fileName}`;
  tempStr = `${tempStr}
- [${fileName}](./${linkStr}.md)
`;
};

const getFileTemplate = (fileList, rankIndex, parentPath) => {
  const headStr = `${tempHead[0]} 目录
`;

  fileList.forEach((item) => {
    //最外层的readme
    if (rankIndex === 1) {
      if (item?.title) {
        tempStr = `${tempStr}
${tempHead[1]} ${item.title}
`;
        getFileTemplate(item.children, 2, item.path);
        return;
      }
      genFileTemp(item, parentPath);
    }
    genFileTemp(item, parentPath);
  });

  return `${headStr}
${tempStr}
`;
};

const onReadmeFile = (parentPath, fileList, rankIndex) => {
  tempStr = ``;
  onWriteFile(parentPath, getFileTemplate(fileList, rankIndex));
};

module.exports = onReadmeFile;

const fs = require("fs");
const { CODES, codeSplit } = require("./utils");
const README_CODE = "README.md";

const tempHead = ["#", "#", "##"];
const currentMap = new WeakMap();
let mapKey = null;

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

const getTemplate = (fileArr, parentName, rankIndex) => {
  let contentLink = ``;
  // 标题头
  const headName = codeSplit(parentName, CODES.NAME_CODE)[1];
  const headLink = `${tempHead[rankIndex]} ${headName}`;
  fileArr.forEach((filename) => {
    const isArrayFlag = Array.isArray(filename);
    if (!isArrayFlag && filename.endsWith(".md")) {
      const linkName = filename.split(".")[0];
      const parName = parentName.split("/")[1];

      contentLink = `${contentLink}
- [${linkName}](./${parName}/${filename})
`;
    }
  });

  const templateContent = `${headLink}
${contentLink}
`;
  const {
    parentContent = "",
    count,
    dirLength,
    ...rest
  } = currentMap.get(mapKey) || {};
  const _count = count + 1;
  const isOverFlag = _count === dirLength;

  currentMap.set(mapKey, {
    ...rest,
    parentContent: `${parentContent}
${templateContent}`,
    count: _count,
    dirLength,
  });

  return [templateContent, isOverFlag];
};

// 融合
const getParentTemplate = (childStr) => {
  const parStr = `${tempHead[0]} 目录
${childStr}`;
  return parStr;
};

const onReadmeFile = (fileArr, currentPath, parentName, rankIndex) => {
  // 第一次不写入 等第一个 所有子集都写入后再写入

  if (rankIndex === 1) {
    mapKey = { currentPath };
    currentMap.set(mapKey, {
      parentPath: currentPath,
      dirLength: fileArr.length,
      count: 0,
    });
    return;
  }
  const { parentPath, count, dirLength } = currentMap.get(mapKey) || {};
  // 写入最外层的
  const [TEMPLATE_README, isOverFlag] = getTemplate(
    fileArr,
    parentName,
    rankIndex
  );
  if (!isOverFlag) {
    // 写入子级的
    onWriteFile(currentPath, TEMPLATE_README);
    return;
  }
  const { parentContent } = currentMap.get(mapKey) || {};
  onWriteFile(parentPath, getParentTemplate(parentContent));
};

module.exports = onReadmeFile;

#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e

yarn build:${PACKAGE_NAME} # 生成静态文件

echo "build successful"

cd packages/${PACKAGE_NAME}/docs/.vuepress/dist # 进入生成的文件夹

echo ${GITHUB_CNAME} > CNAME
# deploy to github
if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:chnduang/${GITHUB_URL}.git
else
  msg='来自github action的自动部署'
  githubUrl=https://chnduang:${GITHUB_TOKEN}@github.com/chnduang/${GITHUB_URL}.git
  git config --global user.name "iduang"
  git config --global user.email "chnzqd@163.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:gh-pages # 推送到github

echo "push github successful"

cd -
rm -rf docs/.vuepress/dist

echo "delete successful"

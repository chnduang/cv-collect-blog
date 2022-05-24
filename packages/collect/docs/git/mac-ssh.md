# mac下自动保存 Git SSH Key 密码

```shell
首先尝试执行以下命令:
git config --global credential.helper osxkeychain

如果以上方法没有生效,则执行
ssh-add -K
或
ssh-add ~/.ssh/id_rsa
手动添加 Key 到 keychain中

但每次添加后，只在当前会话中有效，如果重启会话，会要求重新输入密码

为了不用每次都要输入密码，可以把命令卸载.bashrc 或者.zshrc 中，使得每次启动终端时，可以自动执行

# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node

# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

on:
  push:
    branches: [ test ]
  pull_request:
    branches: [ test ]

jobs:
  build:
```



```shell
runs-on: ubuntu-latest

strategy:
  matrix:
    node-version: [10.x]

steps:
- name: 1. git checkout...
  uses: actions/checkout@v2

- name: Use Node.js ${{ matrix.node-version }}
  uses: actions/setup-node@v1
  with:
    node-version: ${{ matrix.node-version }}

- name: install hexo...
  run: |
    npm install yarn
    yarn
    
- name: hexo generate public files...
  run: |
    yarn clean
    yarn build
 
- name: hexo deploy ...
  env:
    # GH_TOKEN: ${{ secrets.GH_TOKEN }}
    HEXO_DEPLOY_PRIVATE_KEY: ${{ secrets.HEXO_DEPLOY_PRIVATE_KEY }}
  run: |
    mkdir -p ~/.ssh/
    echo "$HEXO_DEPLOY_PRIVATE_KEY" > ~/.ssh/id_rsa 
    chmod 700 ~/.ssh/id_rsa
    ssh-agent bash
    ssh-add ~/.ssh/id_rsa
    git config --global user.name "zhouqd"
    git config --global user.email "zhouqd1997@163.com"
    git config --global credential.helper osxkeychain

    yarn deploy
```
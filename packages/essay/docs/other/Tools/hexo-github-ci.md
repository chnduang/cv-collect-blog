# Node.js

```js
# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [10.16.3]

    steps:
    - name: 1. git checkout...
      uses: actions/checkout@v2

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}

    - name: install hexo...
      run: |
        npm install -g hexo-cli
        npm install -g yarn
        yarn
    
    - name: hexo secrets.HEXO_DEPLOY_PRIVATE_KEY ...
      env:
        # GH_TOKEN: ${{ secrets.GH_TOKEN }}
        NEW_KEY: ${{ secrets.NEW_KEY }}
      run: |
        mkdir -p ~/.ssh/
        echo "$NEW_KEY" > ~/.ssh/id_rsa 
        chmod 700 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts

    - name: Setup Git Infomation
      run: |
        git config --global user.name "zhouqd"
        git config --global user.email "zhouqd1997@163.com"

    - name: hexo generate public files...
      run: | 
        yarn clean
        yarn build
        yarn deploy
```


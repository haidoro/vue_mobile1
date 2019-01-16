# vue-cliを使ったレスポンシブページ

> A Vue.js project

## ファイルをダンロードして使う手順

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```



## 最初から作成方法

### vue-cli のインストール

```
npm install -g vue-cli
```

### プロジェクトを作成

```
vue init webpack my-project
```

プロジェクト作成は色々聞かれます。

YかNで答えます。

### サーバー起動

```
cd my-project
npm run dev
```

### ビルド

```
npm run build
```



### SASSの導入

srcに移動して下記コマンド実施

```
npm install sass-loader node-sass --save-dev
```

styleタグには以下のようにlang="scss"を付ける。

```
<style lang="scss">
/* write SASS! */
</style>
```



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
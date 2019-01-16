# vue-cliを使ったレスポンシブページ

目的：レスポンシブページを作成する場合に、モバイル用ページとPC用ページのHTMLのDOM構造を変更したいと考えた。

PC版で存在する要素をモバイルでは全く別の要素にしたい訳で、その例としてナビゲーションメニューをモバイル用とPC用で別個のテンプレートを使用して作成した。Vue.jsのv-ifでモバイルか否かを判定すれば簡単に切り分けができる。

モバイルの切り分けは実際のスマホを使うか、Clomeなどの検証機能からスマホを選ぶと通常の横並びのナビゲーションからハンバーガーメニューに変わる。

ブラウザの横幅を縮めたでけでは切り替わらないので注意。

横幅を取得すると切り替えは可能となると思うが、サイズの問題ではなくデバイスが何かと言うことが重要なため今回はモバイルかPCで切り分けている。



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

### GitHub Pagesへのデプロイ

難しいように思えるがbuildする先をdocsフォルダに変えるだけ。

GitHub Pagesはbuildしたファイルがdistではなくdocsフォルダになければならない。

`config/index.js`の編集

```
変更内容
index: path.resolve(__dirname, '../dist/index.html')
次のようにフォルダ名をdocsに変更
index: path.resolve(__dirname, '../docs/index.html')

変更内容
assetsRoot: path.resolve(__dirname, '../dist')
次のようにフォルダ名をdocsに変更
assetsRoot: path.resolve(__dirname, '../docs')

変更内容（build: の中にある内容）
assetsPublicPath: '/'
次のように変更
assetsPublicPath: './'
```

Index.jsを変更したら新規でdocsフォルダを作成してbuildする。

```
npm run build
```

あとは通常通りGitで「docs」フォルダを含めてpush

GitHub Pagesでは「master branch /docs folder」を選択してSaveすればOK

## template作成のポイント

App.vueに作成したテンプレートを集めて、モバイル用のテンプレート「gnav-sp」とPC用のテンプレート「gnav-pc」にv-ifを使って切り分けをした。

モバイルの判定は「ismobilejs」を使用した。

```bash
# npmでインストールする場合
npm install ismobilejs --save
```

「ismobilejs」インストール後読み込みはApp.vueで以下の記述で使えた。

```
created: function () {
  const isMobile = require('ismobilejs');
  this.mobile = isMobile.phone;
}
```



ハマったところは「GrobalNav_sp.vue」でのshow関数をアロー関数で書いたために「this」の指す相手がdataでなかったこと。これによりdataの値を変更できなかったこと。基本dataを変更する関数はアロー関数は使わないことが大事。



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
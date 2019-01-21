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

## 親から子へデーターを渡す

App.vueのdataにあるname : 'Tahara'の値を子のテンプレートHelloAorld.vueに渡します。

親テンプレートでやること

`<hello-world :myName = name />`の中で「:myName = name」の記述をする。

:myNameとはつまり属性バインディング「v-bind:myName = name」を省略したもの。

子テンプレートでやること

`props:['myName']`の記述とデーター表示部分に「{{myName}}」を記述。これでデーターが渡される。

propsは型の指定をすることができます。型が違えばエラーをスローする。

`required:true`とすると必須項目となる。また`default:'Hoge'`とすると属性バインディングを`:myName = name` を入れなかった場合デフォルト値が表示されることになる。

### 子から親へデーターを渡す

この場合はイベントを通す。

`<button @click = "resetName">Reset Name</button>` とすることでresetName関数を定義する。

関数ではまずHogeに名前を変更して、`$emit('nameReset',this.myName)` で親にデータを渡す。

```
methods:{
    resetName(){
      this.myName = 'Hoge';
      this.$emit('nameReset',this.myName);
    }
  }
```

親では`<hello-world :myName = "name" @nameReset = "name = $event"/> `

「@nameReset = "name = $event"」でデータを受け取る。

「`$emit`」と「`$event`」がポイントとなる。



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## http接続

Vue.js標準で準備された仕組みを利用（現在はAxiosを推奨）

vue-resourceを活用　https://github.com/pagekit/vue-resource

Vue CLIの場合はnpmを使う

```
npm install vue-resource
```



FirebaseのDatabaseと接続します。（リアルタイムデータベースを使用）



Main.jsに次の記述を追加することで通信できます。

```
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.http.options.root = 'https://example.firebaseio.com/data.json'
```

input要素とdataプロパティでバインディングの仕組みを作成して以下のmethodsを定義するだけです。

this.$http.post()の第1引数はデータベースのアドレスで最後にdata.jsonをつけること。

データベースアドレスはFirebaseのDatabase項目に記述されたいるアドレスを使います。下記画像赤枠

![database](database.png)

post送信の場合、this.$http.post()の第1引数はデータベースのアドレスで第2引数に送信するデータを指定します。

データベースからデータを取得するには、this.$http.get()を使います。こちらは第1引数のみでデータベースのアドレスを入れるだけ。



また、main.jsに`Vue.http.options.root = 'https://example.firebaseio.com/data.json'`の記述をした場合はthis.$http.post()の第1引数は空にすることができます。



取得したデータは配列になっていますので下記コードのようにループ文で取り出す。

```
methods:{
    submit(){
      this.$http.post('',this.user)
        .then(response =>{
            console.log(response)
        },error=>{
            console.log(error)
        })
    },
    fetchData(){
      this.$http.get('')
        .then(response =>{
            //const data = response.json()
            return response.json()
        })
        .then(data => {
          const resultArray = []
          for (let key in data){
            resultArray.push(data[key])
          }
          this.users = resultArray
        })
    }
  }
```



## Vuexを使った状態管理

srcフォルダ内にstoreフォルダを作成してその中にstore.jsを作成します。

かくコンポーネントで共有するデータはここで集中管理できるようになります。

Store.js 記述内容

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    counter:0//ここに管理したいデータを記述
  }
})
```

あとはデータを使いたいところで次の記述をする

```
this.$store.state.counter
```

今回はCounter.vueとAPP.でcounterの値を使っている。

値の保存はメソッドを使い、読み込みはcomputedを使った。

```
methods:{
    increment(){
      this.$store.state.counter++
    },
    decrement(){
      this.$store.state.counter--
    }
  }
```



```
computed:{
    counter(){
      return this.$store.state.counter
    }
  }
```



# ゲッター

例えば項目のリストをフィルタリングしたりカウントするときのように、ストアの状態を算出したいときがあります。

```js
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

もしこの関数を複数のコンポーネントで利用したくなったら、関数をコピーするか、あるいは関数を共用のヘルパーに切り出して複数の場所でインポートする必要があります。しかし、どちらも理想的とはいえません。

Vuex を利用するとストア内に "ゲッター" を定義することができます。それらをストアの算出プロパティと考えることができます。算出プロパティと同様に、ゲッターの結果はその依存関係に基づいて計算され、依存関係の一部が変更されたときにのみ再評価されます。

ゲッターは第1引数として、state を受け取ります:

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

### プロパティスタイルアクセス

ゲッターは `store.getters` オブジェクトから取り出され、プロパティとしてアクセスすることができます:

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

ゲッターは第2引数として他のゲッターを受け取ります:

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```

どのコンポーネントの内部でも簡単にゲッターを利用することができます:

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

プロパティとしてアクセスされるゲッターは Vue のリアクティブシステムの一部としてキャッシュされるという点に留意してください。

### メソッドスタイルアクセス

関数を返り値にすることで、ゲッターに引数を渡すこともできます。これは特にストアの中の配列を検索する時に役立ちます：

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

メソッドによってアクセスされるゲッターは呼び出す度に実行され、その結果はキャッシュされない点に留意してください。

### `mapGetters` ヘルパー

`mapGetters` ヘルパーはストアのゲッターをローカルの算出プロパティにマッピングさせます:

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // ゲッターを、スプレッド演算子（object spread operator）を使って computed に組み込む
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

ゲッターを異なる名前でマッピングさせたいときはオブジェクトを使います:

```js
...mapGetters({
  // `this.doneCount` を `this.$store.getters.doneTodosCount` にマッピングさせる
  doneCount: 'doneTodosCount'
})
```



# ミューテーション

実際に Vuex のストアの状態を変更できる唯一の方法は、ミューテーションをコミットすることです。Vuex のミューテーションはイベントにとても近い概念です: 各ミューテーションは**タイプ**と**ハンドラ**を持ちます。ハンドラ関数は Vuex の状態（state）を第1引数として取得し、実際に状態の変更を行います:

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 状態を変更する
      state.count++
    }
  }
})
```

直接ミューテーションハンドラを呼び出すことはできません。この mutations オプションは、どちらかいうと "タイプが `increment` のミューテーションがトリガーされたときに、このハンドラが呼ばれる" といったイベント登録のようなものです。ミューテーションハンドラを起動するためにはミューテーションのタイプを指定して `store.commit` を呼び出す必要があります:

```js
store.commit('increment')
```

### 追加の引数を渡してコミットする

`store.commit` に追加の引数を渡すこともできます。この追加の引数は、特定のミューテーションに対する**ペイロード**と呼びます:

```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)
```

ほとんどの場合、ペイロードはオブジェクトにすべきです。そうすることで複数のフィールドを含められるようになり、またミューテーションがより記述的に記録されるようになります:

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```

### オブジェクトスタイルのコミット

また `type` プロパティを持つオブジェクトを使って、ミューテーションをコミットすることもできます:

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

オブジェクトスタイルでコミットするとき、オブジェクト全体がペイロードとしてミューテーションハンドラに渡されます。したがってハンドラの例は上記と同じです:

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

### Vue のリアクティブなルールに則ったミューテーション

Vuex ストアの状態は Vue によってリアクティブになっているので、状態を変更すると、状態を監視している Vue コンポーネントは自動的に更新されます。これは Vuex のミューテーションは、通常の Vue と動作させているときと同じく、リアクティブな値に関する注意が必要であることを意味します:

1. あらかじめ全ての必要なフィールドによって、ストアの初期状態を初期化することが望ましいです
2. 新しいプロパティをオブジェクトに追加するとき、以下のいずれかが必要です:

- `Vue.set(obj, 'newProp', 123)` を使用する。あるいは

- 全く新しいオブジェクトで既存のオブジェクトを置き換える。例えば、stage-3 の[スプレッドシンタックス（object spread syntax）](https://github.com/sebmarkbage/ecmascript-rest-spread) を使用して、次のように書くことができます:

  ```js
  state.obj = { ...state.obj, newProp: 123 }
  ```

### ミューテーション・タイプに定数を使用する

いろいろな Flux 実装において、ミューテーション・タイプに定数を使用することが共通して見られるパターンです。これはコードに対してリントツールのようなツールを利用できるという利点があり、また単一ファイルに全ての定数を設定することによって、共同で作業する人に、アプリケーション全体で何のミューテーションが可能であるかを一目見ただけで理解できるようにします:

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 定数を関数名として使用できる ES2015 の算出プロパティ名（computed property name）機能を使用できます
    [SOME_MUTATION] (state) {
      // 状態を変更する
    }
  }
})
```

定数を使用するかどうかは好みの問題です。多くの開発者による大規模なプロジェクトで役に立ちますが、完全にオプションなので、もしお気に召さなければ使用しなくても構いません。

### ミューテーションは同期的でなければならない

ひとつの重要なルールを覚えておきましょう。それは**ミューテーションハンドラ関数は同期的でなければならない**ということです。なぜか？次の例で考えてみましょう:

```js
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

いま、開発ツールのミューテーションのログを見ながら、アプリケーションのデバッグを行っていることを想像してください。全てのミューテーションをログに記録するためには、ミューテーションの前後の状態のスナップショットを捕捉することが必要です。しかし、上の例にあるミューテーション内の非同期コールバックは、それを不可能にします: そのコールバックは、ミューテーションがコミットされた時点ではまだ呼び出されていません。そして、コールバックが実際にいつ呼び出されるかを、開発ツールは知る術がありません。いかなる状態変更でも、コールバック内で起きる場合は本質的に追跡不可能です。

### コンポーネント内におけるミューテーションのコミット

`this.$store.commit('xxx')` と書くか、もしくはコンポーネントのメソッドを `store.commit` にマッピングする `mapMutations` ヘルパーを呼び出すこと（ルートの `store` の注入が必要）で、コンポーネント内でミューテーションをコミットできます:

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // `this.increment()` を `this.$store.commit('increment')` にマッピングする

      // mapMutations はペイロードサポートする:
      'incrementBy' // `this.incrementBy(amount)` を `this.$store.commit('incrementBy', amount)` にマッピングする
    ]),
    ...mapMutations({
      add: 'increment' // `this.add()` を `this.$store.commit('increment')` にマッピングする
    })
  }
}
```

### アクションへ向けて

状態変更を非同期に組み合わせることは、プログラムの動きを予測することを非常に困難にします。例えば、状態を変更する非同期コールバックを持った 2つのメソッドを両方呼び出すとき、それらがいつ呼び出されたか、どちらが先に呼び出されたかを、どうやって知ればよいのでしょう？これがまさに、状態変更と非同期の 2つの概念を分離したいという理由です。Vuex では**全てのミューテーションは同期的に行う**という作法になっています:

```js
store.commit('increment')
// "increment" ミューテーションによる状態変更は、この時点で行われるべきです
```


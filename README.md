# vue-viewframework

##概要
vue-router だとアニメーションしながら遷移するとかを実装しようと思うと面倒そうだったので、ルーティングをしつつ、画面の切替アニメーションもできるライブラリを作った

##実装
src/viewframework に主要な関数がはいってる

###実装部分

- src/views = ページに使う画面
- src/views/Index.vue = 全ての画面が入ってる
- src/views/router.config.js = ルーティングの設定

###ライブラリ部分

- src/viewframework = ライブラリファイル
- src/view/Router.js = ルーティングや画面のスタック管理、履歴管理をする
- src/view/ViewWrapper.vue = 画面の表示制御をするコンポーネント

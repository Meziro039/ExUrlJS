# ExUrlJS

## 概要
ExUrlJSは、URLを変換して簡単に扱うためのモジュールです。

## 利用
`ExUrl.Parse`: URLをパース
```js
// Command(Sample)
ExUrl.Parse("http://user:pass@example.com:80/path?query=value#hash");

// OUTPUT(Sample)
{
    "Protocol" : "http:",
    "UserName" : "user",
    "Password" : "pass",
    "Host" : "example.com",
    "Port" : "80",
    "Path" : "/path",
    "Query" : {"query":"value"},
    "Hash" : "hash",
    "HostPort" : "example.com:80"
};
```
<!--
`ExUrl.UrlSearch`: 文字列からURLを探す
`ExUrl.GetQuery`: クエリを取得する
`ExUrl.SetQuery`: クエリを設定する
`ExUrl.DeleteQuery`: クエリを削除する
`ExUrl.SetHistory`: ヒストリを設定する
-->

## 更新履歴
### Ver0.0.0β
Release: 2023/01/31

### Ver0.0.1β
Release: 2023/02/01
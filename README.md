# jQuery Super Text Converter

全角のテキストを半角に変換したり、ひらがなをカタカナに変換するjQueryプラグインです。

## 動作環境
jQuery 1.11.0 又は 2.1.0 以上  

## 使い方

inputエレメント又はtextareaに対して、利用することができます。  
blurイベント発生時に自動的に変換します。

### HTML
	
```HTML
<input id="text" type="text" val="" />
```

### JavaScript
下記のオプション値はデフォルトで設定されているものです。
詳しくは[オプションオブジェクトの解説](#option-object)を参照して下さい。
	
```JavaScript
$('text').superTextConverter({
	widthMode: 'toHankaku',
	kanaMode: false,
	hankakuKatakanaMustDie: true,
	convert: {
		punctuation: true,
		tilda: true,
		exclamation: true,
		question: true,
		space: true,
		hyphen: true
	},
	zenkakuHyphen: 'ー',
	zenkakuChilda: '〜'
});
```

## すごい使い方

クラスを呼び出して使うことも可能です。

### JavaScript

```JavaScript
var stc = $.SuperTextConverter();
var str = 'こんにちわ';
str = stc.toKatakana(str);
// result: コンニチワ
```

## SuperTextConverterクラス
`$.SuperTextConverter();`で、クラスが返ります。  
また、引数にオブジェクトを渡すことで、オプションの変更することができます。

### メソッド

```JavaScript
var text = 'ＪａｖａScriptは素晴らしい。ジャバスクリプトｽｺﾞｲﾈ!';
var stc = $.SuperTextConverter();
```

#### autoConvert(text);

下記5つのメソッドを全て実行します。$.fn.superTextConverter();はこのメソッドを呼出ます。

```JavaScript
text = stc.autoConvert(text);
//"JavaScriptは素晴らしい.ジャバスクリプトスゴイネ!"

text = stc.autoConvert(text, {
	convert: {
		punctuation: false,
		exclamation: false
	}
});
//"JavaScriptは素晴らしい。ジャバスクリプトスゴイネ!"
```

#### toHnakaku(text, options);

英数字を半角に変換します。

```JavaScript
text = stc.toHankaku(text);
//"JavaScriptは素晴らしい.ジャバスクリプトｽｺﾞｲﾈ!"

text = stc.toHankaku(text, {
	convert: {
		punctuation: false
	}
});
//"JavaScriptは素晴らしい。ジャバスクリプトｽｺﾞｲﾈ!"
```

#### toZenkaku(text, options);

英数字を全角に変換します。**（半角カナは変換しません）**

```JavaScript
text = stc.toZenkaku(text);
//"ＪａｖａＳｃｒｉｐｔは素晴らしい。ジャバスクリプトｽｺﾞｲﾈ！"

text = stc.toZenkaku(text, {
	convert: {
		exclamation: false
	}
});
//"ＪａｖａＳｃｒｉｐｔは素晴らしい。ジャバスクリプトｽｺﾞｲﾈ!"
```

#### toHiragana(text);

カタカナをひらがなに変換します。

```JavaScript
text = toHiragana(text);
//"ＪａｖａScriptは素晴らしい。じゃばすくりぷとｽｺﾞｲﾈ!"
```

#### toKatakana(text);

ひらがなをカタカナに変換します。

```JavaScript
text = toKatakana(text);
//"ＪａｖａScriptハ素晴ラシイ。ジャバスクリプトｽｺﾞｲﾈ!"
```

#### killHankakuKatakana(text);

半角カタカナを全角カタカナに変換します。

```JavaScript
text = stc.killHankakuKatakana(text);
//"ＪａｖａScriptは素晴らしい。ジャバスクリプトスゴイネ!"
```

### プロパティ

基本的に変更可能なプロパティは`options`にまとめられています。

### <a name="option-object"></a>オプションオブジェクト

#### widthMode

autoConvert();時のみ有効です。
`'toHankaku'`を指定すると半角に変換します。
`'toZenkaku'`を指定すると全角に変換します。
`false`を指定すると変換しません。

デフォルト値は`toHankaku`です。

#### kanaMode

autoConvert();時のみ有効です。
`'toKatakana'`を指定するとカタカナに変換します。
`'toHiragana'`を指定するとひらがなに変換します。
`false`を指定すると変換しません。

デフォルト値は`false`です。

#### hankakuKatakanaMustDie

`autoConvert()`時のみ有効です。
半角カナを全角に変換します。
デフォルト値は`true`です。

#### convert

特定の文字を変換するかどうかを設定できます。
`toZenkaku()`又は`toHankaku()`時のみ有効です。
デフォルト値は全て`true`です。

##### punctuation

カンマとピリオド、読点と句点を変換するかどうか

##### tilda

`toHankaku()`時に全角チルダ・波ダッシュを`~`に変換するかどうか

`toZenkaku()`時に`~`、[zenkakuChilda](#zenkakuChilda)で設定した値に変換するかどうか

##### exclamation

エクストラメンションマーク（ビックリマーク）を変換するかどうか

##### question

クエスチョンマークを変換するかどうか

`？`を`?`に変換するかどうか

##### space

スペースを変換するかどうか

##### hyphen

`toHankaku()`時に全角ハイフン（‐）・全角ダッシュ（―）・長音符（ー）・全角マイナス記号（−）を半角ハイフン（-）変換するかどうか。

`toZenkaku()`時に半角ハイフン(-)を[zenkakuHyphen](#zenkakuHyphen)で設定した値に変換するかどうか

##### <a name="zenkakuHyphen"></a>zenkakuHyphen

`toZenkaku()`時に全角ハイフンとして扱う文字を指定できます。  
デフォルトでは長音符（ー）が指定されています。

参考  
全角ハイフン : `‐`  
全角ダッシュ : `―`  
長音符 : `ー`  
全角マイナス記号 : `−`

##### <a name="zenkakuChilda"></a>zenkakuChilda

`toZenkaku()`時に全角チルダとして扱う文字を指定できます。  
デフォルトでは全角チルダ（〜）が指定されています。

参考
全角チルダ : `～`  
全角波ダッシュ : `〜`

全角チルダ・波ダッシュ問題については下記を参照して下さい。

* [波ダッシュ・全角チルダ問題 - Unicode Wikipedia](http://ja.wikipedia.org/wiki/Unicode#.E6.B3.A2.E3.83.80.E3.83.83.E3.82.B7.E3.83.A5.E3.83.BB.E5.85.A8.E8.A7.92.E3.83.81.E3.83.AB.E3.83.80.E5.95.8F.E9.A1.8C)
* [Unicodeに関連する問題 - 波ダッシュ Wikipedia](http://ja.wikipedia.org/wiki/%E6%B3%A2%E3%83%80%E3%83%83%E3%82%B7%E3%83%A5#Unicode.E3.81.AB.E9.96.A2.E9.80.A3.E3.81.99.E3.82.8B.E5.95.8F.E9.A1.8C)

### ライセンス
The MIT License  
(C) Otto Kamiya (MegazalRock) 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。

上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。

ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。
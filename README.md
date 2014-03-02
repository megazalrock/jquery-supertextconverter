# jQuery Super Text Converter

全角のテキストを半角に変換したり、ひらがなをカタカナに変換するjQueryプラグインです。

## 動作環境
jQuery 1.11.0 又は 2.1.0 以上  

## 使い方

inputエレメント又はtextareaに対して、利用することができます。  
blurイベント発生時に自動的に変換します。

### HTML

	<input id="text" type="text" val="" />

### JavaScript
	
	$('text').superTextConverter();

## すごい使い方

クラスを呼び出して使うことも可能です。

### JavaScript

	var stc = $.SuperTextConverter();
	var str = 'こんにちわ';
	str = stc.toKatakana(str);
	// result: コンニチワ

## SuperTextConverterクラス

### メソッド

	str : 変換する文字列
	options : オプションオブジェクト

	stc.toHankaku(str, options)		: 半角に変換
	stc.toZEnkaku(str, options)		: 全角に変換
	stc.toHiragana(str)				: ひらがなに変換
	stc.toKatakana(str)				: カタカナに変換
	stc.killHankakuKatakana(str)	: 半角カナを全角カナに変換
	stc.autoConvert(str, options)	: 上記5つのメソッドをすべて行う






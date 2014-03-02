(function() {
	/*
		======== A Handy Little QUnit Reference ========
		http://api.qunitjs.com/

		Test methods:
			module(name, {[setup][ ,teardown]})
			test(name, callback)
			expect(numberOfAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			throws(block, [expected], [message])
	*/
	var stc;

	test('全角 -> 半角 英数字',function(){
		stc = $.SuperTextConverter();
		var result = stc.toHankaku('１２３４５６７８９０ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ');
		var correctResult = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('全角 -> 半角 記号',function(){
		stc = $.SuperTextConverter();
		var result = stc.toHankaku('！＃＄％＆＼（）＊＋，．／＜＞［］｛｝＝？＠；：＿＾｀');
		var correctResult = '!#$%&\\()*+,./<>[]{}=?@;:_^`'; // "'
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('全角 -> 半角 正規表現外', function(){
		stc = $.SuperTextConverter();
		var result = stc.toHankaku('”’　￥―‐−｜〜、。，．');
		var correctResult = '"\' ¥---|~,.,.'; // "'
		strictEqual(result, correctResult, result);
		stc = null;
	});
	
	test('半角 -> 全角 英数字',function(){
		stc = $.SuperTextConverter();
		var result = stc.toZenkaku('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
		var correctResult = '１２３４５６７８９０ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('半角 -> 全角 記号',function(){
		stc = $.SuperTextConverter();
		var result = stc.toZenkaku('!#$%&\\()*+,./<>[]{}=?@;:_^`');
		var correctResult = '！＃＄％＆＼（）＊＋，．／＜＞［］｛｝＝？＠；：＿＾｀';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('半角 -> 全角 正規表現外', function(){
		stc = $.SuperTextConverter();
		var result = stc.toZenkaku('"\' ¥-|~,.');
		var correctResult = '”’　￥ー｜〜，．';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('半角 -> 全角 カタカナ',function(){
		stc = $.SuperTextConverter();
		var result = stc.killHankakuKatakana('ｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾜｦﾝｧｨｩｪｫｬｭｮﾞﾟ');
		var correctResult = 'ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨワヲンァィゥェォャュョ゛゜';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('メールアドレス 全角 -> 半角', function(){
		stc = $.SuperTextConverter();
		var result = stc.toHankaku('ｂｅｎｅｄｉｃｔ．ｏｋ＋ｔｅｓｔ＠ｇｍａｉｌ．ｃｏｍ');
		var correctResult = 'benedict.ok+test@gmail.com';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('住所 半角 -> 全角', function(){
		stc = $.SuperTextConverter({
			zenkakuHyphen: '‐'
		});
		var result = stc.toZenkaku('東京都千代田区丸の内1-9-1 Tokyo Station');
		var correctResult = '東京都千代田区丸の内１' + stc.options.zenkakuHyphen + '９' + stc.options.zenkakuHyphen + '１　Ｔｏｋｙｏ　Ｓｔａｔｉｏｎ';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('チルダ 半角カナ -> 全角カナ',function(){
		stc = $.SuperTextConverter();
		var result = stc.toZenkaku('~');
		var correctResult = '〜';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('チルダ 全角カナ -> 半角カナ',function(){
		stc = $.SuperTextConverter();
		var result = stc.toHankaku('～〜');
		var correctResult = '~~';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('カタカナ -> ひらがな',function(){
		stc = $.SuperTextConverter();
		var result = stc.toHiragana('ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨワヰヱヲンァィゥェォャュョ');
		var correctResult = 'がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわゐゑをんぁぃぅぇぉゃゅょ';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('ひらがな -> カタカナ',function(){
		stc = $.SuperTextConverter();
		var result = stc.toKatakana('がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわゐゑをんぁぃぅぇぉゃゅょ');
		var correctResult = 'ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨワヰヱヲンァィゥェォャュョ';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('文章 全角 -> 半角', function(){
		stc = $.SuperTextConverter();
		var result = stc.autoConvert('本日12／1、Ａｐｐｌｅの新製品”ｉＰａｄ”が発表されました。｜｜｜', {
			convert: {
				punctuation: false
			}
		});
		var correctResult = '本日12/1、Appleの新製品"iPad"が発表されました。|||';
		strictEqual(result, correctResult, result);
		stc = null;
	});

	test('文章 全角 -> 半角',function(){
		stc = $.SuperTextConverter();
		var result = stc.autoConvert('ＪａｖａＳｃｒｉｐｔは、ほんとーにたのし〜ね〜？！　ﾜﾛｽ｡', {
			convert: {
				punctuation: false,
				tilda: false,
				exclamation: false,
				question: false,
				space: false
			}
		});
		var correctResult = 'JavaScriptは、ほんとーにたのし〜ね〜？！　ワロス。';
		strictEqual(result, correctResult, result);
		stc = null;
	});
}(jQuery));

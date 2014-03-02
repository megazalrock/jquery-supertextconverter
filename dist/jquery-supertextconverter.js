/*! jQuery Super Text Converter 2014-03-03
 *  Vertion : 0.1.0
 *  Dependencies : jQuery *
 *  Author : MegazalRock (Otto Kamiya)
 *  Copyright (c) 2014 MegazalRock (Otto Kamiya);
 *  License : */
(function(window, $, undefined) {
	var SuperTextConverter = function(options){
		var stc = this;
		options = options || {};
		stc.options = $.extend(true,{
			widthMode: 'toHankaku',
			kanaMode: false,
			hankakuKatakanaMustDie: true,
			convert: {
				punctuation: true,
				tilda: true,
				exclamation: true,
				question: true,
				space: true
			},
			zenkakuHyphen: 'ー',
			zenkakuChilda: '〜'
		}, options);
		stc.regexp = {
			hankaku : /[A-Za-z0-9#$%&\\()*+,.\/<>\[\]{}=@;:_\^`]/g,
			zenkaku : /[Ａ-Ｚａ-ｚ０-９＃＄％＆＼（）＊＋，．／＜＞［］｛｝＝＠；：＿＾｀]/g,
			katakana : /[ァ-ン]/g,
			hiragana : /[ぁ-ん]/g
		};
		stc.fnc = {
			toHankaku : function(str){
				return String.fromCharCode(str.charCodeAt(0) - 0xFEE0);
			},
			toZenkaku : function(str){
				return String.fromCharCode(str.charCodeAt(0) + 0xFEE0);
			},
			toKatakana : function(str){
				return String.fromCharCode(str.charCodeAt(0) + 0x60);
			},
			toHiragana : function(str){
				return String.fromCharCode(str.charCodeAt(0) - 0x60);
			}
		};
		stc.list = {
			toHankaku : [
				{
					zenkaku : /”/g,
					hankaku : '"'
				},{
					zenkaku : /’/g,
					hankaku : '\''
				},{
					zenkaku : /　/g,
					hankaku : ' ',
					type: 'space'
				},{
					zenkaku : /￥/g,
					hankaku : '¥'
				},{
					zenkaku : /[―‐−]/g,
					hankaku : '-'
				},{
					zenkaku : /｜/g,
					hankaku : '|'
				},{
					zenkaku : /[～〜]/g,
					hankaku : '~',
					type: 'tilda'
				},{
					zenkaku : /[、]/g,
					hankaku : ',',
					type : 'punctuation'
				},{
					zenkaku : /[。]/g,
					hankaku : '.',
					type : 'punctuation'
				},{
					zenkaku : /！/g,
					hankaku : '!',
					type : 'exclamation'
				},{
					zenkaku : /？/g,
					hankaku : '?',
					type : 'question'
				}
			],
			toZenkaku : [
				{
					hankaku : /"/g,
					zenkaku : '”'
				},{
					hankaku : /'/g,
					zenkaku : '’'
				},{
					hankaku : / /g,
					zenkaku : '　',
					type: 'space'
				},{
					hankaku : /[¥\\]/g,
					zenkaku : '￥'
				},{
					hankaku : /[ｰ\-]/g,
					zenkaku : stc.options.zenkakuHyphen,
					type: 'macron'
				},{
					hankaku : /\|/g,
					zenkaku : '｜'
				},{
					hankaku : /~/g,
					zenkaku : stc.options.zenkakuChilda,
					type: 'tilda'
				},{
					hankaku : /!/g,
					zenkaku : '！',
					type: 'exclamation'
				},{
					hankaku : /\?/g,
					zenkaku : '？',
					type: 'question'
				}
			]
		};
		this.hankakuKanaList = [
			/ｶﾞ/g, /ｷﾞ/g, /ｸﾞ/g, /ｹﾞ/g, /ｺﾞ/g,
			/ｻﾞ/g, /ｼﾞ/g, /ｽﾞ/g, /ｾﾞ/g, /ｿﾞ/g,
			/ﾀﾞ/g, /ﾁﾞ/g, /ﾂﾞ/g, /ﾃﾞ/g, /ﾄﾞ/g,
			/ﾊﾞ/g, /ﾋﾞ/g, /ﾌﾞ/g, /ﾍﾞ/g, /ﾎﾞ/g,
			/ﾊﾟ/g, /ﾋﾟ/g, /ﾌﾟ/g, /ﾍﾟ/g, /ﾎﾟ/g,
			/ｱ/g, /ｲ/g, /ｳ/g, /ｴ/g, /ｵ/g,
			/ｶ/g, /ｷ/g, /ｸ/g, /ｹ/g, /ｺ/g,
			/ｻ/g, /ｼ/g, /ｽ/g, /ｾ/g, /ｿ/g,
			/ﾀ/g, /ﾁ/g, /ﾂ/g, /ﾃ/g, /ﾄ/g,
			/ﾅ/g, /ﾆ/g, /ﾇ/g, /ﾈ/g, /ﾉ/g,
			/ﾊ/g, /ﾋ/g, /ﾌ/g, /ﾍ/g, /ﾎ/g,
			/ﾏ/g, /ﾐ/g, /ﾑ/g, /ﾒ/g, /ﾓ/g,
			/ﾔ/g, /ﾕ/g, /ﾖ/g,
			/ﾗ/g, /ﾘ/g, /ﾙ/g, /ﾚ/g, /ﾛ/g,
			/ﾜ/g, /ｦ/g, /ﾝ/g,
			/ｧ/g, /ｨ/g, /ｩ/g, /ｪ/g, /ｫ/g,
			/ｬ/g, /ｭ/g, /ｮ/g,
			/ﾞ/g, /ﾟ/g, /｡/g, /､/g
		];
		this.zenkakuKanaList = [
			'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
			'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
			'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
			'バ', 'ビ', 'ブ', 'ベ', 'ボ',
			'パ', 'ピ', 'プ', 'ペ', 'ポ',
			'ア', 'イ', 'ウ', 'エ', 'オ',
			'カ', 'キ', 'ク', 'ケ', 'コ',
			'サ', 'シ', 'ス', 'セ', 'ソ',
			'タ', 'チ', 'ツ', 'テ', 'ト',
			'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
			'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
			'マ', 'ミ', 'ム', 'メ', 'モ',
			'ヤ', 'ユ', 'ヨ',
			'ラ', 'リ', 'ル', 'レ', 'ロ',
			'ワ', 'ヲ', 'ン',
			'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
			'ャ', 'ュ', 'ョ',
			'゛', '゜', '。', '、'
		];
	};

	SuperTextConverter.prototype.toHankaku = function(str, convertOptions){
		var stc = this, list, length, i = 0;
		convertOptions = convertOptions || stc.options.convert;
		str = str.replace(stc.regexp.zenkaku,stc.fnc.toHankaku);

		list = stc.list.toHankaku;
		length = list.length;
		for(; i < length; i += 1){
			if(typeof list[i].type === 'string'){
				if(convertOptions[list[i].type]){
					str = str.replace(list[i].zenkaku, list[i].hankaku);
				}
			}else{
				str = str.replace(list[i].zenkaku, list[i].hankaku);
			}
		}
		return str;
	};

	SuperTextConverter.prototype.toZenkaku = function(str){
		var stc = this, list, length, i = 0;
		str = str.replace(stc.regexp.hankaku,stc.fnc.toZenkaku);

		list = stc.list.toZenkaku;
		length = list.length;
		for(; i < length; i += 1){
			str = str.replace(list[i].hankaku, list[i].zenkaku);
		}
		return str;
	};

	SuperTextConverter.prototype.killHankakuKatakana = function(str){
		var stc = this;
		var i = 0, length = stc.hankakuKanaList.length;
		if(/[ｦ-ﾟ]/.test(str)){
			for(;i < length; i += 1){
				str = str.replace(stc.hankakuKanaList[i], stc.zenkakuKanaList[i]);
			}
		}
		return str;
	};

	SuperTextConverter.prototype.toHiragana = function(str){
		var stc = this;
		return str.replace(stc.regexp.katakana, stc.fnc.toHiragana);
	};

	SuperTextConverter.prototype.toKatakana = function(str){
		var stc = this;
		return str.replace(stc.regexp.hiragana, stc.fnc.toKatakana);
	};

	SuperTextConverter.prototype.autoConvert = function(str, widthMode, kanaMode){
		var stc = this;
		var result;
		var options, _options = {};

		if($.isPlainObject(widthMode)){
			_options = widthMode || {};
		}else{
			_options = {
				widthMode: widthMode || stc.options.widthMode,
				kanaMode: kanaMode || stc.options.kanaMode
			};			
		}

		options = $.extend(true, stc.options, _options);

		if(options.widthMode === 'toHankaku'){
			result = stc.toHankaku(str, options.convertPunctuation);
		}else if(options.widthMode === 'toZenkaku'){
			result = stc.toZenkaku(str);
		}

		if(options.hankakuKatakanaMustDie){
			result = stc.killHankakuKatakana(result);
		}

		if(options.kanaMode && options.kanaMode === 'toHiragana'){
			result = stc.toHiragana(result);
		}else if(options.kanaMode && options.kanaMode === 'toKatakana'){
			result = stc.toKatakana(result);
		}

		return result;
	};

	$.SuperTextConverter = function(options){
		return new SuperTextConverter(options);
	};

	$.fn.superTextConverter = function(widthMode, kanaMode){
		$(this)
			.each(function(){
				$(this)
					.on('blur',function(){
						var stc = new SuperTextConverter();
						var text = (this.tagName === 'TEXTAREA') ? $(this).text() : $(this).val();
						var result = stc.autoConvert(text, widthMode, kanaMode);
						if(text !== result){
							$(this).val(result);
							$(this).trigger('superTextConverted', stc.options);
						}
					});
			});
		return this;
	};

}(this, jQuery));

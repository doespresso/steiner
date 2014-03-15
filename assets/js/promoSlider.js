;(function($,window,document,undefined){

	var promoSlider = function(options){
		this.options = $.extend(this.defaults, options);
	};

  promoSlider.prototype = {
		defaults:{
			beforeLoad: undefined,
			afterLoad: undefined,
			beforeShow: undefined,
			afterShow: undefined,
			beforeClose: undefined,
			afterClose: undefined,
			url: undefined,
			idStick: undefined,
			cookieName: 'promoSlider',
			cookieExpireDays: 10 // время действия куки в днях
		},

		init: function(){
			var _this = this;


			if((document.cookie.length > 0)&(document.cookie.indexOf(_this.options.cookieName + '=1') > 0))return;

      if(_this.options.beforeLoad != undefined)_this.options.beforeLoad(this);

      $.ajax({
				type:'get',
				dataType: 'text',
				url: _this.options.url,
				success: function(data){
					if(_this.options.idStick != undefined) {
						 _this.options.stickElement = $('#'+_this.options.idStick);
						 _this.options.stickElement.wrap('<div class="divPromoSliderContainer"></div>');
						 $('.divPromoSliderContainer').append($('<div class="divPromoSliderBottom"><div class="divPromoSlider"><div class="divPromoSliderContent">' + data + '</div><div class="divPromoSliderClose"></div></div></div>'));
						$('.divPromoSliderBottom').css({width: _this.options.stickElement.width() + 'px'});

						 // bind scroll handler
						 $(window)
							 .scroll(_this,_this.stickHandler)
							 .resize(_this,_this.stickHandler);

							_this.stickHandler({data:_this});

					} else
						$('body').append($('<div class="divPromoSliderBottom noVisible"><div class="divPromoSlider"><div class="divPromoSliderContent">' + data + '</div><div class="divPromoSliderClose"></div></div></div>'));


					$('.divPromoSliderClose').click(function(){
						if(_this.options.beforeClose)if(!_this.options.beforeClose(this))return;
						$('.divPromoSliderBottom').remove();
						var expireDate = new Date();
						expireDate.setDate(expireDate.getDate() + _this.options.cookieExpireDays);
						document.cookie = _this.options.cookieName + "=1;expires=" + expireDate.toGMTString() + ";path=/";
						console.log(_this.options.cookieName + "=1;expires=" + expireDate.toGMTString() + ";path=/");
						if(_this.options.afterClose)_this.options.afterClose(this);
					});

					if(_this.options.afterLoad != undefined)_this.options.afterLoad(_this);

				},
				error: function(data,status,text){console.log('Error: ' + text);}
			});
      return _this;
    },
		stickHandler: function(ev){
			var addCss = {};
			if(ev.data.options.isStick != undefined)
			addCss = {width: ev.data.options.stickElement.width() + 'px'};
			if(Number(ev.data.options.stickElement.height() - ($(window).height() + $(window).scrollTop()) + ev.data.options.stickElement.offset().top) <=0)
				$('.divPromoSliderBottom').css($.extend({position: 'absolute'},addCss));
			else
				$('.divPromoSliderBottom').css($.extend({position: 'fixed'},addCss));
		}
	};

  promoSlider.defaults = promoSlider.prototype.defaults;

  $.fn.promoSlider = function(options) {
   return new promoSlider(options).init();
  };

})(jQuery,window,document);
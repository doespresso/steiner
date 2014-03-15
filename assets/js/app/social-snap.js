(function ($) {
    var defaults = { color:'green' };
    var options;
    $.fn.socialsnap = function () {

        function setCookie(name, value, options) {
            options = options || {};

            var expires = options.expires;

            if (typeof expires == "number" && expires) {
                var d = new Date();
                d.setTime(d.getTime() + expires * 1000);
                expires = options.expires = d;
            }
            if (expires && expires.toUTCString) {
                options.expires = expires.toUTCString();
            }

            value = encodeURIComponent(value);

            var updatedCookie = name + "=" + value;

            for (var propName in options) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if (propValue !== true) {
                    updatedCookie += "=" + propValue;
                }
            }

            document.cookie = updatedCookie;
        }


        function getCookie(name) {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        function isInViewport(target) {
            var top = $(window).scrollTop(),
                wh = $(window).height();
            var isin = ((top + wh) >= target.offset().top);
            return isin;
        }

        function posChanger(target) {
            if (isInViewport(target)) {
                $("#social-snap").addClass("social-snap-snapped");
                $("#social-snap").removeClass("social-snap-fixed");
            }
            else {
                $("#social-snap").removeClass("social-snap-snapped");
                $("#social-snap").addClass("social-snap-fixed");
            }
        }






        var userclosed = getCookie("social_closed12");
        console.log("uc",userclosed);

        if (userclosed == 'false' || userclosed == undefined) {
            var el = this;
            $(window).bind("scroll", function () {
                posChanger(el);
            });
            $(window).resize(function () {
                posChanger(el);
            });

            this.css("position", "relative");
            this.append('<div id="social-snap" class="social-snap social-snap-fixed"><div id="social-snap-wrapper"></div><div id="social-snap-close">закрыть</div></div>');


            console.log("enter");
            $.ajax({
                type:"GET",
                url:"http://omiscranes.ru/html.html",
                beforeSend:function () {
                    //
                },
                success:function (response) {
                    if (response) {
                        $("#social-snap-wrapper").append(response);
                        posChanger(el);
                        setTimeout(function(){$("#social-snap").fadeIn();},2000);
                    }
                },
            });


            console.log("OK")
        }


        $("#social-snap-close").on("click", function () {
            $("#social-snap").fadeOut();
            setCookie("social_closed12",true);
        });


    };
})(jQuery);



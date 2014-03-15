(function ($) {


    Calc = new Backbone.Marionette.Application();
    SelectBox = Backbone.Collection.extend()
    Product = Backbone.Model.extend();
    ProductView = Backbone.Marionette.ItemView.extend({
        tagName:"li",
        template: "#window_item_template_pic",
        onRender: function(){

        },
        events:{
            "click":"selectFrame"
        },
        selectFrame:function(e){
            this.$el.addClass("selected");
        }
    });

    ProductViewEdit = Backbone.Marionette.ItemView.extend({
        tagName:"li",
        template: "#window_item_template_edit",
        onRender: function(){

        },
//        events:{
//            "click":"selectFrame"
//        },
//        selectFrame:function(e){
//            this.$el.addClass("selected");
//        }
    });


    Products = Backbone.Collection.extend({
        model:Product,
        makeSelectbox:function (type) {
            var selectbox = new Backbone.Collection();
            wtypes =  _.uniq(this.pluck(type), false, function (wtype) {return wtype.toLowerCase();});
            _.each(wtypes,function(wtype){
               selectbox.add(new Backbone.Model({'name':wtype}));
            });
            return selectbox;
        }
    });

    ProductsView = Backbone.Marionette.CompositeView.extend({
        itemView: ProductView,
        itemViewContainer:"ul",
        template: "#window_list_template"
    });



    ProductTypeSelector = Backbone.Marionette.ItemView.extend({
        template:"#type_selector_template",
//        template : _.template('<%= item.type %>'),
        tagName: "select",
        id:"window_type_selectbox",
        events:{
            'change':'sectionBlockSelect'
        },
        sectionBlockSelect:function(e){
            console.log(this.$el.val());
        }
    });



    /////////////////////////////////////////////////initialize
    Calc.addInitializer(function (options) {

        var products = new Products;

        var jqxhr = $.getJSON("http://oknadvor.com/php/getoptions.php", {
            tags:"mount rainier",
            tagmode:"any",
            format:"json"
        })
            .done(function (data) {
                _.each(data, function (product_type, key) {
                    _.each(product_type.vari, function(wframe,key){
                        var wsections = [];
                        console.log(wframe.name);
                        for (var i=0; i<wframe.sections.length; i++){
                            var section_type = wframe.sections[i-1];
                            wsections.push({'name':'section-'+i, 'vopen':false, 'hopen':false, 'selected':false, 'section_type':section_type});
                        }
                       var product = _.extend(product_type, {'name':wframe.name + ' ' + wframe.sections.length + ' секций','sections':wsections, 'selected':wframe.selected || null});
                       products.add(new Product(product));
                    });
                });

                ////done

                Calc.settings = {
                    name:"Оконный калькулятор"
                }

                Calc.addRegions({
                    ///////regions
                    type_selector:"#type_selector",
                    type_selector_frame:"#type_selector_frame",
                    type_constructor:"#type_constructor",
                    order_options:'#order_options',
                    order_total:'#order_total'
                });

                var type_selector = new ProductTypeSelector({
                    collection:products.makeSelectbox("type")
                });
                Calc.type_selector.show(type_selector);//                $("#test_area").append(type_selector_main.render().el);


                var frame_selector = new ProductsView({
//                  model: someModel,
                  collection: products
                });
                Calc.type_selector_frame.show(frame_selector);
                $('.w-selector').tooltip();

                var route = new Route();
                Backbone.history.start();


            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });


    });

    /////////////////////////////////////////////////router
    var Route = Backbone.Marionette.AppRouter.extend({
      routes : {
        'resetstate' : 'resetstate',
        'storestate': 'storestate'
      },
      reset: function(){
      },
      storestate: function(){
      }
    });


}(jQuery));


$(document).ready(function () {
//    $("#calculator").load("http://okna.loc/php/calc_form.html", function (response, status, xhr) {
//        if (status == "error") {
//            var msg = "Sorry but there was an error: ";
//            $("#error").html(msg + xhr.status + " " + xhr.statusText);
//        }
//        $("#calculator").fadeIn(1000);
//        Calc.start();
//
//    });
});
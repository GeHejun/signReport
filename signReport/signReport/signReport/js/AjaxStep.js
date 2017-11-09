var ajaxStep = {
    get:function (url,operator,data) {
        $.get({
            url:url,
            data:data,
            dataType:"json",
            success:function (data) {
                operator(data);
            },
            error:function (data) {

            }
        })
    },
    post:function (url,operator,data){
        $.post({
            url:url,
            data:data,
            dataType:"json",
            contentType:"application/json,charset=utf-8",
            success:function (data) {
                operator(data);
            },
            error:function (data) {

            }

        })
    }
}
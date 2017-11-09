rexport = {
    export:function () {
        var str="";
        $.each(rfactory.report,function (i,item) {
           str += item.itemCode+":"+item.content+",";
        });
        console.log(JSON.stringify(str.substring(0,str.length -1)))
        ajaxStep.post("url",function () {},JSON.stringify(JSON.stringify(str.substring(0,str.length -1))));
    }
}
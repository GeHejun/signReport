var datas = [];
var report = {
    openReport: function (flightId) {
            layer.open({
                type: 1
                , title: 'BK7862'
                , area: ['80%', '80%']
                , shade: 0.6
                , maxmin: true
                , offset: [
                    "10%", "10%"
                ]
                , content: "<div class='r'><div class='container-fluid'><div class='row' id='r'></div></div></div>"
                , zIndex: layer.zIndex
                , success: function () {
                    report.listReport('http://localhost:63342/signReport/signReport/reportlist.json')
                }
            });
        },
    openSignReport: function (i) {
        report.report = datas[i];
        layer.open({
            type: 1
            , title: false
            , area: ['40%', '90%']
            , shade: 0.6
            , maxmin: true
            , offset: [
                "5%", "30%"
            ]
            , content: "<div class='r-t'><div class='container-fluid'><div class='row' id='sr'></div></div></div>"
            , zIndex: layer.zIndex
            , success: function () {
                $("#sr").append(rfactory.createSignReport(report.row,datas[i].name,datas[i].code,datas[i].list));
            }
        });
    },
    listFlight:function (url,data) {
        ajaxStep.get(url,function(result){
            report.row = result.data[0].row;
            $.each(result.data[0].flightCountVOS,function () {
                var div = $("<div class='col-md-3'></div>");
                var card = $("<div class='f-card' onclick='report.openReport("+this.flightId+")'></div>");
                var fno = $("<p>"+this.flightNO+"</p>");
                var rst = $("<p><span>全部("+this.allCount+")</span><span>确认("+this.aoelConfirmCount+")</span><span>已签单("+this.aoelSignedCount+")</span><span>未签单("+this.aoelSendbackCount+")</span></p>");
                var hr = $("<hr/>");
                var date = $("<p>"+1507392000000+"</p>");
                card.append(fno,rst,hr,date);
                div.append(card);
                $("#f").append(div);
            });
        },JSON.stringify(data))
    },
    listReport:function (url,data) {
        ajaxStep.get(url,function(data){
            $.each(data.data[0].reportVOS, function (i) {
                var reportvo = {};
                reportvo.name = this.aoelDictName;
                reportvo.code = this.aoelDictCode;
                reportvo.list = this.reportDetailVoList;
                datas.push(reportvo);
                var div = $("<div class='col-md-4'></div>");
                var card = $("<div class='r-card' onclick='report.openSignReport("+i+")'></div>");
                var img = $("<img src=''>");
                var fno = $("<p>"+this.flightNo+"</p>");
                var rst = $("<p><span>"+this.title+"</span></p>");
                var hr = $("<hr/>");
                var date = $("<p><span>"+this.signDate+"</span><span>"+this.dispatcher+"</span></p>");
                card.append(img,fno,rst,hr,date);
                div.append(card);
                $("#r").append(div);
            });
        },data)
    }

}

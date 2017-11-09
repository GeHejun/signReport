var items = [];
var rfactory = {
    createSignReport: function (row, aoelDictName, aoelDicCode, itemList) {
        var div = $("<div class='row'></div>");
        var title = $("<div class='col-md-12 s-t'></div>");
        var p = $("<p>长沙黄花国际机场</p><p>CHANGSHA HUANGHUA INTERNATIONAL AIRPORT</p><p>" + aoelDictName + "</p><p>CHANGSHA HUANGHUA INTERNATIONAL AIRPORT</p><p class='r-s-p'><img src='../img/scan.png' onclick='rexport.export()'><img src='../img/print.png' onclick='rprint.printCurrentReport()'></p>");
        title.append(p);
        var content = $("<div class='col-sm-12'></div>");
        $.each(rfactory.createSignTable(row, aoelDicCode, itemList), function () {
            content.append(this);
        });
        div.append(title, content);
        return div;
    },
    createSignTable: function (row, aoelDictCode, itemList) {
        var sArr;
        if ("AIRCRAFT_USER" == row) {
            //特种车辆
            if ("SPE_VEH" == aoelDictCode) {
                sArr = [[2, 3], [3, 2, 1], [2]];
                //备降
            } else if ("CRF_RISER" == aoelDictCode) {
                sArr = [[2, 3], [1, 1, 1], [2]];
                //地面服务
            } else if ("GROUND_SER" == aoelDictCode) {
                sArr = [[2, 2], [2, 1], [2]];
                //登机桥使用服务结算单
                //升降平台车使用服务
                //皮带传送带
            } else if ("PLATF_CAR" == aoelDictCode || "BELT_CAR" == aoelDictCode || "BOARD_BRD" == aoelDictCode) {
                sArr = [[2, 3], [3, 1], [2]];
                //桥载设备使用例行记录单
            } else if ("BRI_EQU" == aoelDictCode) {
                sArr = [[2, 3, 2], [2, 1, 1], [2]];
                //飞机勤务例行检查、飞机放行结算单
            } else if ("ALTER_FLI" == aoelDictCode) {
                sArr = [[2, 3], [2, 2, 2, 1], [2]];
            } else if ("ROU_INS" == aoelDictCode) {
                //例行检查、放行航前航后服务结算单
                sArr = [[2, 2], [2, 1], [2, 1]];
                //飞机服务航前航后服务结算单
            } else if ("CRF_FLISER" == aoelDictCode) {
                sArr = [[2, 2], [1, 1], [2, 1]];
            } else if ("EXTEN_SER" == aoelDictCode) {
                //汽运分公司航延服务结算单(修改)
                sArr = [[3, 3], [2, 2, 2, 2, 2, 2, 2, 2], [2]];
            } else if ("VIP_SER" == aoelDictCode) {
                //贵宾
                sArr = [[2, 3], [3, 3, 1], [2]];
            }
        } else {
            //特种车辆
            if ("SPE_VEH" == aoelDictCode) {
                sArr = [[3, 3, 3, 1, 1], [2]];
                //备降
            } else if ("CRF_RISER" == aoelDictCode) {
                sArr = [[3, 3, 1, 1], [2]];
                //地面服务
            } else if ("GROUND_SER" == aoelDictCode) {
                sArr = [[2, 2, 2, 1], [2]];
                //登机桥使用服务结算单
                //升降平台车使用服务
                //皮带传送带
            } else if ("PLATF_CAR" == aoelDictCode || "BELT_CAR" == aoelDictCode || "BOARD_BRD" == aoelDictCode) {
                sArr = [[3, 3, 2, 1], [2]];
                //桥载设备使用例行记录单
            } else if ("BRI_EQU" == aoelDictCode) {
                sArr = [[3, 3, 3, 2, 1], [2]];
                //飞机勤务例行检查、飞机放行结算单
            } else if ("ALTER_FLI" == aoelDictCode) {
                sArr = [[3, 3, 3, 3, 1], [2]];
            } else if ("ROU_INS" == aoelDictCode || "CRF_FLISER" == aoelDictCode) {
                //例行检查、放行航前航后服务结算单
                //飞机服务航前航后服务结算单
                sArr = [[2, 2, 1], [2, 1]];
            } else if ("EXTEN_SER" == aoelDictCode) {
                //汽运分公司航延服务结算单(修改)
                sArr = [[3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2], [2]];
            } else if ("VIP_SER" == aoelDictCode) {
                //贵宾
                sArr = [[3, 3, 3, 2, 1], [2]];
            }
        }
        var tableArr = new Array();
        var n = 0;
        for (var i = 0; i < sArr.length; i++) {
            if ("AIRCRAFT_USER" == row) {
                var table = $("<table class='s-c-t-l'></table>");
            } else {
                var table = $("<table></table>");
            }
            for (var j = 0; j < sArr[i].length; j++) {
                var tr = rfactory.createSignTr()
                for (var m = 0; m < sArr[i][j]; m++) {
                    if (itemList[n] != null) {
                        var td = rfactory.createTdWithItem(row, itemList[n],n);
                        n++;
                    }
                    tr.append(td);
                }
                table.append(tr);
            }
            tableArr.push(table);
        }
        return tableArr;
    },
    createSignTr: function () {
        var tr = $("<tr></tr>")
        return tr;
    },
    createTdWithItem: function (row, item, n) {
        items.push(item);
        var td = $("<td class='t-d'></td>");
        var div = $("<div class='item'></div>")
        var itemNamep = $("<p>" + item.itemName + "</p>")
        var itemCodep = $("<p>" + item.itemCode + "</p>")
        var contentp;
        if ("AIRCRAFT_USER" == row) {
            if ("date" == item.itemCode || "flightNo" == item.itemCode) {
                //可编辑的情况
                contentp = $("<p>" + item.content + "</p>")
                //可加减的情况
            } else if("airlineName" == item.itemCode || "craftModel" == item.itemCode
                || "craftNo" == item.itemCode || "serviceItems" == item.itemCode || "branchAirlineName" == item.itemCode) {
                contentp = $("<input onchange='rsave.saveReport(this.value,this.name)' name='"+n+"' value='" + item.content + "'/>");
            } else  if ("guideTimes" == item.itemCode || "tractorTimes" == item.itemCode
                || "shuttleBusTimes" == item.itemCode || "passengerLadderCarTimes" == item.itemCode
                || "serviceDesk" == item.itemCode) {
                 contentp = $("<p><span>-</span><span>" + item.content + "</span><span>+</span></p>")
                //radio选择框的情况
                //点击弹出时间选择的情况
                //签名的情况
                //航食的特殊情况
                //备注
                //桥载投入时间
                //桥载电源
            } else if ("serviceTime" == item.itemCode){
                contentp = $("<input onchange='rsave.saveReport(this.value,this.name)' name='"+n+"' value='" + item.content + "'/>");
            } else if ("remark" == item.itemCode) {
                contentp = $("<input onchange='rsave.saveReport(this.value,this.name)' name='"+n+"' value='" + item.content + "'/>");
            } else if ("airlineDelegateSign" == item.itemCode || "airportOndutySign" == item.itemCode
                || "flightBeforeCrewSign" == item.itemCode || "flightAfterCrewSign" == item.itemCode
                || "airportOndutySign" == item.itemCode
                ||"crewSign" == item.itemCode || "aircrewSign" == item.itemCode){
                contentp = $("<p>"+item.content+"</p>");
            }
        } else {
            contentp = $("<p>" + item.content + "</p>")
        }
        div.append(itemNamep, itemCodep, contentp);
        td.append(div);
        return td;
    }
}


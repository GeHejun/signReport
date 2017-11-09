/**
 * author swx
 */
(function($, window){
        $.fn.extend({
            "goscalendar": function (options) {
            	if(options.hasOwnProperty("startDate"))
            		options.startDate=moment(options.startDate);
            	if(options.hasOwnProperty("endDate"))
            		options.endDate=moment(options.endDate);
            	
            	var firstDay=moment().startOf('month');
            	var endDay=moment().endOf('month');
            	var defaluts={
            			_class:"calendar_setting",
            			minHeight:"600px",
            			weeks:['日','一','二','三','四','五','六'],
            			startDate:firstDay,
            			endDate:endDay
            	};
            	var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数s
                var _oSelf = this,
                    $this = $(this);
                
            	this.each(function(i, _element) { 
            		var element = $(_element);
                	element.addClass(opts._class);
                	element.css("min-height",opts.minHeight);
                	element.empty();
                	rendarWeek(element,opts);
            		rendarDate(element,opts);
            	});
            	
            	this.refresh=function(dateSetting){	
            		if(toastr){
	            		if(dateSetting.startDate==""){
		        			toastr.warning("开始日期不能为空！");return;
		        		}
		        		if(dateSetting.endDate==""){
		        			toastr.warning("结束日期不能为空！");return;
		        		}
		        	}
            		opts.startDate=moment(dateSetting.startDate);
            		opts.endDate=moment(dateSetting.endDate);
            		
            		rendarDays($this.find("#date-box"),opts);
            	}
            	this.appendTime=function(worktime){
            		$this.find("#date-box .calendarDay").each(function(){
            			var rendarTime=rendar.renderWorktimeHtml();
            			rendarTime.text(worktime);
            			$(this).find(".calendar-desc p").empty().append(rendarTime);
            		});
            	}
            	this.clearDay=function(startDate,endDate){
            		if(startDate==""||endDate=="")return;
            		var tstartDate= moment(startDate);
            		var tendDate= moment(endDate);
            		var span=tendDate.diff(tstartDate, 'days');
                	for(var i=0,date=tstartDate;i<=span;i++){
                		$("#persons_day_"+date.format("YYYY-MM-DD")+" p").empty();
                		date=date.add(1, 'days');
                	}
            	}
            	this.removeActiveUser=function(id){
            		$this.find(".calendar-box.active span#"+id).remove();
            	}
            	this.addActiveUser=function(id,name){
            		if($this.find(".calendar-box.active span#"+id).length==0){
                		var span=$("<span class='sworkdetail'></span>").attr("id",id).text(name);
                		$this.find(".calendar-box.active .calendar-tip p").append(span);
            		}
            	}
            	this.disableDate=function(date){
            		$("#day_"+date+" .calendar-active").removeClass("calendar-active").addClass("calendar-rest");
            		$("#day_"+date+" .calendar-desc").removeClass("calendar-desc").addClass("calendar-desc-rest");
            		$("#day_"+date+" .calendar-box").removeClass("calendar-box");
            		$("#day_"+date).parent().off("click");
            	}
            	/*this.activeDate=function(date){
            		$("#day_"+date+" .calendar-rest").removeClass("calendar-rest").addClass("calendar-active");
            		$("#day_"+date+" .calendar-desc-rest").removeClass("calendar-desc-rest").addClass("calendar-desc");
            		$("#day_"+date+" .calendar-box").removeClass("calendar-box");
            		$("#day_"+date).parent().off("click");
            	}*/
            	this.getSelectDate=function(){
            		if($this.find(".calendar-box.active").length==0)return;
            		return $this.find(".calendar-box.active").parent().attr("id").replace(/day_/,'');
            	}
            	return this;
            }
        });
        
        function rendarWeek(element,opts){
        	var week=rendar.renderWeekHtml(opts.weeks);
        	element.append(week);
        }
        /**
         * 主要逻辑
         * @param element
         * @param opts
         * @returns
         */
        function rendarDate(element,opts){
        	var content=rendar.rendarContent();
        	element.append(content);
//        	rendarDays(content,opts);
        }
        
        function rendarDays(content,opts){
        	if(content.length>0){
        		content.empty();
        	}else{
        		content=rendar.rendarContent();
        	}
        	var nowWeek=new Date(opts.startDate.format("YYYY-MM-DD")).getDay();
        	if(nowWeek!=0){
        		for(var i=0;i<nowWeek;i++){
            		rendarEmptyDay(content);
            	}
        	}
        	var span=opts.endDate.diff(opts.startDate, 'days');
        	for(var i=0,date=opts.startDate;i<=span;i++){
        		rendarOneDay(content,date,opts);
        		date=date.add(1, 'days');
        	}
        }
        
        function rendarOneDay(content,date,opts){
        	var day= rendar.renderDayHtml(date);
        	content.append(day);
        	click.bindDayClick(day,opts);
        }
        function rendarEmptyDay(content){
        	var day= rendar.renderEmptyHtml();
        	content.append(day);
        }
        
        var rendar = {
    	      renderWeekHtml: function(weeks){
    	    	  if(!weeks) return $('');
    	    	  var weekHtml='<div class="row week-box">';
    	    	  $(weeks).each(function(i,n){
    	    		 weekHtml+='<div class="col-md-17 nopadding" '+'>'+
    	    	  					'<div class="week-content">';
    	    	  						weekHtml+='<div class="text-center font-bold">';
    	    	  						weekHtml+=''+n;
    	    	  						weekHtml+='</div>';
    	    	  	 weekHtml+='</div>'+
    	    	  			'</div>';
    	    	    });
    	    	  weekHtml+='</div>';
    	    	  return $(weekHtml);
    	      },
    	      rendarContent: function (){
    	    	  return $(''+
    	    	  		' <div id="date-box" class="row">' +
                  		'</div>');
    	      },
//            '<div class="m-t text-righ">'+
//            '<a href="#" class="btn btn-xs btn-primary btn-circle"><i class="fa fa-plus"></i> </a>'+
//        '</div>'+
    	      renderDayHtml: function (date){
    	    	  return $(''+
    	    			  '<div class="col-md-17 calendarDay">' +
	    	    	  		'<div class="ibox" id="day_'+date.format("YYYY-MM-DD") +'">'+
	    	    	  			'<div class="ibox-content calendar-box">'+
    	    	  					'<div class="calendar-active">'+
    	    	  						date.format("DD")+
    	    	  					'</div>'+
	                                '<div class="calendar-desc">'+
	                                    '<p></p>'+
		    	    	  			'</div>'+
	    	    	  			 '<div class="calendar-tip" id="persons_day_'+date.format("YYYY-MM-DD")+'">'+
	                                 '<p>'+
	                                 '</p>'+
	                             '</div>'+
	                  		'</div>'+
	    	    	  	'</div>');
    	      },
    	      renderEmptyHtml: function(){
    	    	  return $(''+
    	    			  '<div class="col-md-17">' +
	    	    	  			'<div class="ibox emptyDay">'+
	    	    	  			'</div>'+
  	    	  				'</div>');
    	      },
    	      renderWorktimeHtml:function(){
    	    	  return $('<span class="calendar-price">'+
		                    '</span>');
    	      }
        }  
      var click={
        	bindDayClick: function(element,opts){
        		element.on('click',function(){
            		$("div.calendar-box.active").removeClass("active");
        			$(this).find(".calendar-box").toggleClass("active");
        			var data=[];
        			$(this).find(".calendar-tip p span").each(function(i,n){
        				data.push($(this).attr("id"));
        			});
        			var date= $(this).find(".calendar-tip").attr("id").replace(/persons_day_/,'');
        			if(opts.dayClick) opts.dayClick(this,data,moment(date).format("YYYY-MM-DD"));
        		});
        		element.on('dblclick',function(){
            		$("div.calendar-box.active").removeClass("active");
        			$(this).find(".calendar-box").toggleClass("active");
        			var data=[];
        			$(this).find(".calendar-tip p span").each(function(i,n){
        				data.push($(this).attr("id"));
        			});
        			var date= $(this).find(".calendar-tip").attr("id").replace(/persons_day_/,'');
        			if(opts.dayDblclick) opts.dayDblclick(this,data,moment(date).format("YYYY-MM-DD"));
        		});
        	}
        };
})(jQuery, window);


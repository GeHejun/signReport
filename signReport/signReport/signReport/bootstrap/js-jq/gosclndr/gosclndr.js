/**
 * author swx
 */
(function($, window){
        $.fn.extend({
            "gosclndr": function (options) {
            	if(options.hasOwnProperty("startDate"))
            		options.startDate=moment(options.startDate);
            	if(options.hasOwnProperty("endDate"))
            		options.endDate=moment(options.endDate);
            	
            	var firstDay=moment().startOf('month');
            	var endDay=moment().endOf('month');
            	var defaluts={
            			_class:"clndr",
            			minHeight:"600px",
            			startDate:firstDay,
            			endDate:endDay
            	};
            	var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数s
            	
                var _oSelf = this,
                    $this = $(this);
                
            	this.each(function(i, _element) { 
            		var element = $(_element);
                	element.empty();
                	var main=$("<div></div>").addClass(opts._class);
                	main.append(views.init());
                	element.append(main);
                	rendarCalendar22(_oSelf, opts.startDate, opts.endDate);
            	});
            	
            	this.rendarCalendar=function(startDate, endDate){
            		if(startDate==""||endDate=="")return;
            		var tstartDate= moment(startDate);
            		var tendDate= moment(endDate);
            		
            		opts.startDate=tstartDate;
            		opts.endDate=tendDate;
            		var main=$this.find("div."+opts._class);
            		main.empty();
            		main.append(views.init());
            		rendarCalendar22(this,tstartDate,tendDate);
                };
            	this.rendarPerson=function(person){
            		if(!person.hasOwnProperty("id"))return;
            		var daysPerson=views.daysPerson().attr("id",person.id);
            		daysPerson.append(views.personDay(person.name));
            		var span=opts.endDate.diff(opts.startDate, 'days');
                	var date=moment(opts.startDate.format("YYYY-MM-DD"));
                	for(var i=0;i<=span;i++){
                		var weekday=new Date(date.format("YYYY-MM-DD")).getDay();
                		daysPerson.append(views.calendarDay("").addClass("calendar-day-"+date.format("YYYY-MM-DD")));
                		date=date.add(1, 'days');
                	}
            		$this.find(".clndr-grid .person-data").append(daysPerson);
                };
                this.rendarPersonWorkDays=function(personId,days){
            		$(days).each(function(i,n){
            			var personDay= $("#"+personId+".days-person div.calendar-day-"+n.date).addClass("work-day");
            			if(n.status=="UNACTIVE"){
            				personDay.addClass("unactive");
            			}
            		});
                };
                this.rendarPersonRestDays=function(personId,days){
            		$(days).each(function(i,n){
            			var personDay=$("#"+personId+".days-person div.calendar-day-"+n.date).addClass("rest-day").text("休");
            			if(n.status=="UNACTIVE"){
            				personDay.addClass("unactive");
            			}
            		});
                };
                this.rendarPersonWorkBreakDays=function(personId,days){
            		$(days).each(function(i,n){
            			var personDay=$("#"+personId+".days-person div.calendar-day-"+n.date);
            			if(personDay.hasClass("work-day")){
            				if("OVERTIME"==n.breakTag){
                				return true;
                			}
        				}else if(personDay.hasClass("rest-day")){
        					if("REST"==n.breakTag){
                				return true;
                			}
        				}
            			/*if("REST"==n.breakTag){
            				
            			}*/
            			personDay.text(n.breakTagName);
            		});
                };
                this.emptyPersonDatas=function(){
                	$this.find(".clndr-grid .person-data").empty();/*
                	$this.find(".clndr-grid .person-data").html("<div class='text-center'>暂无数据</div>");*/
                };
            	return this;
            }
        });
        
        function rendarCalendar22(obj, tstartDate, tendDate){
        	var span=tendDate.diff(tstartDate, 'days');
        	rendarHeaderTitle(obj, "星期");
        	rendarDayTitle(obj,"日期");
        	var date=moment(tstartDate.format("YYYY-MM-DD"));
        	for(var i=0;i<=span;i++){
        		var weekday=new Date(date.format("YYYY-MM-DD")).getDay();
        		rendarHeader(obj, weekday);
        		rendarDay(obj,date);
        		date=date.add(1, 'days');
        	}
        }
        
        function rendarHeader(obj, weekday){
        	$(obj).find(".days-of-the-week").append(views.headerDay(weeks[weekday]));
        }
        
        function rendarHeaderTitle(obj, content){
        	$(obj).find(".days-of-the-week").append(views.headerDay(content));
        }

        function rendarDay(obj, date){
        	$(obj).find(".days").append(views.calendarDay(date.format("DD")).addClass("calendar-day-"+date.format("YYYY-MM-DD")));
        }
        
        function rendarDayTitle(obj, content){
        	$(obj).find(".days").append(views.calendarDay(content));
        }

    	var weeks=['日','一','二','三','四','五','六'];
        var views={
        		init:function(){
    	    	  return $(	'<div class="clndr-grid">'+
    						'<div class="days-of-the-week clearfix">'+
    						'</div>'+
    						'<div class="days">'+
    						'</div>'+
    						'<div class="person-data">'+
    						'</div>'+
    						'</div>'
    	    			  );
    	      },
    	      headerDay:function(weekday){
    	    	  return $('<div class="header-day"></div>').text(weekday);
    	      },
    	      calendarDay:function(day){
    	    	  var calendarDay= $('<div class="day" id=""><span class="day-number"></span></div>');
    	    	  calendarDay.find("span.day-number").text(day);
    	    	  return calendarDay;
    	      },
    	      daysPerson:function(){
    	    	  return $('<div class="days-person clearfix">'+
  						'</div>');
    	      },
    	      calendarDay:function(day){
    	    	  var calendarDay= $('<div class="day" id=""><span class="day-number"></span></div>');
    	    	  calendarDay.find("span.day-number").text(day);
    	    	  return calendarDay;
    	      },
    	      personDay:function(day){
    	    	  var calendarDay= $('<div class="person-day " id=""><span class="day-person"></span></div>');
    	    	  calendarDay.find("span.day-person").text(day);
    	    	  return calendarDay;
    	      }
        };
        
})(jQuery, window);


var map = new BMap.Map("container");
map.centerAndZoom("Beijing", 12);
map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开
var localSearch = new BMap.LocalSearch(map);
localSearch.enableAutoViewport(); //允许自动调节窗体大小

// controll all the news
// and bind to a grouped list


function webContentWrapper( tag, attr , content ){
	return '<' + tag + " " + attr + ' >' + content + '</' + tag + '>';
}

function infoWindowWrapper( divcontent ){
	return webContentWrapper( 'div', 'class="infoWindow"' ,divcontent )
}

function contentWrapper(content){
	return webContentWrapper('li', 'class="infoWindowItem"', content);
}

var NewsManager = function(){
	this.rawData = [];
	this.groupData = new Map();
	this.initRaw = function( data ){
		this.rawData = data;
		this.groupData = new Map();
	}
	this.add2group = function(obj){
		d = new Date(Date.parse(obj['time']))
		console.log( d.toISOString() );
		content = contentWrapper( d.toLocaleString() +'<br>'+ obj['content']  );
		if ( this.groupData.get ( obj['addr'] ) == undefined ){
			this.groupData.set(obj['addr'], content);
		}else {
			pre = this.groupData.get( obj['addr'] );
			this.groupData.set(obj['addr'], content + pre)
		}
	}
	this.grouped = function(){
		for ( var i in this.rawData ){
			obj = this.rawData[i];
			this.add2group( obj );
		}
	}
	this.getGroupByAddr = function(addr){
		return '<ul>'+this.groupData.get(addr)+'</ul>';
	}
	return this;
}

nm = NewsManager();
nm.initRaw(DATA);
nm.grouped()

/*

function infoWindowGenerator( infocontent )
{
  var str = "<div class='infoContent' >" + infocontent + '</div>';
  return new BMap.InfoWindow( str );
}

function popWindow( keyword ){
  console.log( keyword );
  for ( idx in DATA ){
    obj = DATA[idx];
    if ( obj["addr"] == keyword ){
      console.log( obj["content"] );
      document.getElementById( "infoWindow" ).innerHTML = obj["content"];
      break;
    }
  }
}

function cbMaker( info ){
  return function( searchResult ){
    var poi = searchResult.getPoi(0);
    var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
        map.addOverlay(marker);

    map.centerAndZoom(poi.point, 6);

    console.log("info", info, searchResult.keyword);
          var infoWindow = new BMap.InfoWindow( "<p class='infoContent' >" + info + '</p>');

    var keyword = searchResult.keyword;
    var content = "";
    for ( idx in DATA ){
      obj = DATA[idx];
      if ( obj["addr"] == keyword ){
        console.log( obj["content"] );
        content = obj["content"];
      }
    }

        var infoWindow = new BMap.InfoWindow( "<p class='infoContent' >" + content + '</p>');
    marker.addEventListener("mouseover", function(){ this.openInfoWindow(infoWindow); popWindow( searchResult.keyword);});
    //marker.addEventListener("mouseover", function(){  popWindow( searchResult.keyword);});
    marker.addEventListener("mouseout", function(){ this.closeInfoWindow(infoWindow);});
  }
}
*/

function appendList( contentList ){
	map.clearOverlays();//清空原来的标注
	localSearch.setSearchCompleteCallback(
	  	function( searchResult, info){
	  		var poi = searchResult.getPoi(0);
	    	var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
	        map.addOverlay(marker);

	    	map.centerAndZoom(poi.point, 6);

	    	console.log("info", info, searchResult);

	    	var keyword = searchResult.keyword;
	    	var content = "";

	    	content = nm.getGroupByAddr(keyword);
	    	

			var infoWindow = new BMap.InfoWindow( infoWindowWrapper(content) );

			marker.addEventListener("mouseover", function(){ this.openInfoWindow(infoWindow);});
			marker.addEventListener("mouseout", function(){ this.closeInfoWindow(infoWindow);});
  	});

	console.log('appendList2');
  	for ( var idx in contentList ){
    	var obj = contentList[idx];
    
    	//localSearch.setSearchCompleteCallback( cbMaker( obj["content"] ) );
    	localSearch.search( obj["addr"] );

    	console.log( obj["addr"] , obj["content"]);
  	}
  	console.log("appendList3");
}

appendList( DATA );


function filterTime()
{
	startTimeRaw = document.getElementById('startTime').value;
	endTimeRaw = document.getElementById('endTime').value;

	startTime = new Date( Date.parse(startTimeRaw) );
	endTime = new Date( Date.parse(endTimeRaw));


	console.log(startTime,endTime);

	ndata = []
	for ( idx in DATA ){
		obj = DATA[idx];
		dt = new Date( Date.parse(obj['time']));
		if ( startTime <= dt && dt <= endTime ){
			ndata.push(obj);
		}
	}

	var n = NewsManager();
	n.initRaw(ndata);
	n.grouped()

	appendList( ndata );

}
console.log('hello2');

function getData (  url )
{
    console.log('gts');
    var p = $.get(
        url,
        function(data){
            console.log(data);
            DATA = data;
            console.log(data+'pp');
            n = NewsManager();
            n.initRaw(DATA);
            n.grouped()
            appendList( DATA );
            console.log('callback2');
        });

    console.log('gte');
}

(function(){
    console.log('hello')
    var p = $.get(
        '/content2.json',
        function(data){
            console.log(data);
            /*
            console.log('callback1');
            DATA = data;
            console.log(data+'pp');
            n = NewsManager();
            n.initRaw(DATA);
            n.grouped()
            appendList( DATA );
            console.log('callback2');
            */
        });
    console.log(p);
    console.log(p.responseText);
    console.log('callback');
})()

console.log('hello3');
/*
function searchByName() {
    map.clearOverlays();//清空原来的标注
    var keyword = document.getElementById("text_").value;
    localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0);
        document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat;
        map.centerAndZoom(poi.point, 13);
        var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
        map.addOverlay(marker);
        var content = document.getElementById("text_").value + "<br/><br/>longitude：" + poi.point.lng + "<br/>latitude：" + poi.point.lat;
        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
       // marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
        marker.addEventListener("mouseover", function(){ this.openInfoWindow(infoWindow);}); 
        marker.addEventListener("mouseout", function(){this.closeInfoWindow(infoWindow);}); 
    });
        localSearch.search(keyword);
}*/

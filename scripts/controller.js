// controll all the news
// and bind to a grouped list


function webContentWrapper(tag, attr, content) {
    return '<' + tag + " " + attr + ' >' + content + '</' + tag + '>';
}

function infoWindowWrapper(divcontent) {
    return webContentWrapper('div', 'class="infoWindow"', divcontent)
}

function contentWrapper(content) {
    return webContentWrapper('li', 'class="infoWindowItem"', content);
}


/**
 * deal with the returned data
 * bind datas into News Manager
 * Manager maintained some groups
 * each news first grouped by location(Peking, Shanghai , etc)
 * then response the location news
 */
var NewsManager = function () {
    this.rawData = []; // the raw Data
    this.groupData = new Map(); // grouped by location

    /**
     * init the data
     */
    this.initRaw = function (data) {
        this.rawData = data;
        this.groupData = new Map();
    }
    this.appendList = function (data) {
        var tmp = this.rawData.concat(data);
        this.rawData = tmp;
        this.grouplist(data);
    }

    /**
     * add obj to addgroup
     */
    this.add2group = function (obj) {
        d = new Date(Date.parse(obj['time']))
        console.log(d.toISOString());
        content = contentWrapper(d.toLocaleString() + '<br>' + obj['content']);
        if (this.groupData.get(obj['addr']) == undefined) {
            this.groupData.set(obj['addr'], content);
        } else {
            pre = this.groupData.get(obj['addr']);
            this.groupData.set(obj['addr'], content + pre)
        }
    }
    this.grouped = function () {
        this.grouplist(this.rawData);
    }
    this.grouplist = function (data) {
        for (var i in data) {
            var o = data[i];
            this.add2group(o);
        }
    }


    this.getGroupByAddr = function (addr) {
        return '<ul>' + this.groupData.get(addr) + '</ul>';
    }
    return this;
}

nm = NewsManager();
nm.initRaw(DATA);
nm.grouped()

console.log('XXX 1', DATA);




var map = new BMap.Map("map-container");
map.centerAndZoom("Beijing", 12);
map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
map.addControl(new BMap.NavigationControl()); //添加默认缩放平移控件
map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
map.addControl(new BMap.OverviewMapControl({
    isOpen: true,
    anchor: BMAP_ANCHOR_BOTTOM_RIGHT
})); //右下角，打开
var localSearch = new BMap.LocalSearch(map);
localSearch.enableAutoViewport(); //允许自动调节窗体大小
console.log('XXX 2', DATA);

/**
 * Dispaly function
 * append items to display
 * 
function appendList(contentList) {
    console.log('append list');
    map.clearOverlays(); //清空原来的标注
    localSearch.setSearchCompleteCallback(
        function (searchResult, info) {
            var poi = searchResult.getPoi(0);
            var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)); // 创建标注，为要查询的地方对应的经纬度
            map.addOverlay(marker);

            map.centerAndZoom(poi.point, 6);

            console.log("info", info, searchResult);

            var keyword = searchResult.keyword;
            var content = "";

            content = nm.getGroupByAddr(keyword);


            var infoWindow = new BMap.InfoWindow(infoWindowWrapper(content));

            marker.addEventListener("mouseover", function () {
                this.openInfoWindow(infoWindow);
            });
            marker.addEventListener("mouseout", function () {
                this.closeInfoWindow(infoWindow);
            });
        });

    console.log('appendList2');
    for (var idx in contentList) {
        var obj = contentList[idx];

        //localSearch.setSearchCompleteCallback( cbMaker( obj["content"] ) );
        localSearch.search(obj["addr"]);

        console.log(obj["addr"], obj["content"]);
    }
    console.log("appendList3");
}*/
appendList(DATA);


console.log('hello 2');

function getData(url) {
    console.log('gts');
    var p = $.get(
        url,
        function (data) {
            console.log(data);
            DATA = data;
            console.log(data + 'pp');
            n = NewsManager();
            n.initRaw(DATA);
            n.grouped()
            appendList(DATA);
            console.log('callback2');
        });

    console.log('gte');
}

/*

(function () {
    console.log('hello')
    var p = $.get(
        '/content2.json',
        function (data) {
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
            
            /*
});
console.log(p);
console.log(p.responseText);
console.log('callback');
})() * /

console.log('hello3');*/
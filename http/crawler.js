const http = require('http');
const cheerio = require('cheerio');
let url = 'http://www.mafengwo.cn/mdd/filter-tag-146.html';

function filterDestination(html){
    let $ = cheerio.load(html, { decodeEntities: false });
    let destinations = $('.row-list').find('.item');
    let destinationDataList = [];
    destinations.each(function (item){
        let destination = $(this);
        destinationID = destination.find('a').attr("href");
        destinationTitle = destination.find('.title').html();
        destinationDetail = destination.find('.detail').html();
        destinationImgUrl = destination.find('img').attr("data-original");
        
        let destinationData = {
            destinationID : destinationID.replace("/travel-scenic-spot/mafengwo/", "").replace(".html", ""),
            destinationTitle : destinationTitle,
            destinationImgUrl : destinationImgUrl,
            destinationDetail : destinationDetail
        }
        destinationDataList.push(destinationData);
    })
    console.log(destinationDataList);
}

http.get(url,function(res){
    let html = '';
    res.on('data',function(data){
        html += data;
    })
    res.on('end',function(){
        filterDestination(html);
    })
    
    res.on('error',function(){
        console.log('抓取数据出错');
    })
})

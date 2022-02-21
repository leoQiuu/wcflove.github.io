$(document).ready(function () {
    $('#select_btn').click(function () {
        $('#select_file').trigger('click');
    })
    $('#select_file').change(function () {
        importf(this);
    })

})

var wb;//读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串

function importf(obj) {//导入
    if (!obj.files) {
        return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        //document.getElementById("table").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        var jsondata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        var column = [];
        var data = [column];
        for (var key in jsondata[0]) {
            data[0].push(key);
        }
        for (var i = 0; i < jsondata.length; i++) {
            var row = [];
            data.push(row);
            for (var key in jsondata[i]) {
                data[i + 1].push(jsondata[i][key]);
            }
        }
        // creattable(data);

        getMultiBarChart(data);
    };
    if (rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}

function fixdata(data) { //文件流转BinaryString
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}

function creattable(data) {
    var _html = " <table>";
    for (var i = 0; i < data.length; i++) {
        _html += "<tr>";
        _html += "<th>" + data[i][0] + "</th>";
        for (var j = 1; j < data[i].length; j++) {
            _html += "<td>" + data[i][j] + "</td>";
        }
        _html += "</tr>";
    }
    _html += "</table>";
    $('#table').append(_html);
}

getMultiBarChart = function (datatable) {
    var myChart = echarts.init(document.getElementById('chart'));
    var first_1 = ['城区一部','金牌客户'];
    var first_2 = ['城区一部','银牌客户'];
    var first_3 = ['城区一部','一般客户'];
    var first_4 = ['城区一部','较差客户'];
    var first_5 = ['城区一部','-'];
    var second_1 = ['城区二部','金牌客户'];
    var second_2 = ['城区二部','银牌客户'];
    var second_3 = ['城区二部','一般客户'];
    var second_4 = ['城区二部','较差客户'];
    var second_5 = ['城区二部','-'];
    var three_1 = ['城区三部','金牌客户'];
    var three_2 = ['城区三部','银牌客户'];
    var three_3 = ['城区三部','一般客户'];
    var three_4 = ['城区三部','较差客户'];
    var three_5 = ['城区三部','-'];
    var four_1 = ['城区四部','金牌客户'];
    var four_2 = ['城区四部','银牌客户'];
    var four_3 = ['城区四部','一般客户'];
    var four_4 = ['城区四部','较差客户'];
    var four_5 = ['城区四部','-'];
    function find(arr){
        var arrList = []
        for(var i=0;i<datatable.length;i++){
            if(datatable[i].toString() == arr.toString()){
                arrList.push(datatable[i])
            }
         }
        return arrList.length
    }
    var option = {
        color:['#f74d4d', '#0c84c6', '#ffa510', '#41b7ac', '#95a2ff'],
        legend: {
            textStyle: { color: '#ffffff' }
        },
        tooltip: {
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: "#ffffff",
                }
            }
        }],
        yAxis : {},
        dataset:{
            source:[
                ['product', '金牌客户', '银牌客户', '一般客户','较差客户','未使用'],
                ['城区一部',find(first_1),find(first_2),find(first_3),find(first_4),find(first_5)],
                ['城区二部',find(second_1),find(second_2),find(second_3),find(second_4),find(second_5)],
                ['城区三部',find(three_1),find(three_2),find(three_3),find(three_4),find(three_5)],
                ['城区四部',find(four_1),find(four_2),find(four_3),find(four_4),find(four_5)],
            ]
        },
        series: [
            {
                name: '金牌客户',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#ffffff',
                                fontSize: 16
                            }
                        }
                    }
                }
            },
            {
                name: '银牌客户',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#ffffff',
                                fontSize: 16
                            }
                        }
                    }
                }
               
            },
            {
                name: '一般客户',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#ffffff',
                                fontSize: 16
                            }
                        }
                    }
                }
            },
            {
                name: '较差客户',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#ffffff',
                                fontSize: 16
                            }
                        }
                    }
                }
            },
            {
                name: '未使用',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#ffffff',
                                fontSize: 16
                            }
                        }
                    }
                }
            },
        ]
    };
    myChart.setOption(option);
}
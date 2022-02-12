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
        creattable(data);

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
    var colors = ['#0099CC', '#FF9933', '#99CC33', '#393939', '#f50001', '#fad797', '#59ccf7', '#c3b4df'];
    var myChart = echarts.init(document.getElementById('chart'));
    var option = {
        legend: { bottom: "bottom" , textStyle: { color:'#ffffff'}},
        dataset: {
            source: datatable
        },
        textStyle: { color:'#ffffff'},
        xAxis: [
            { type: 'category', gridIndex: 0, color: '#fff'}
        ],
        yAxis: [
            { gridIndex: 0}
        ],
        series: []
    };
    for (var i = 0; i < datatable.length - 1; i++) {
        option.series[i] = {
            type: 'bar', seriesLayoutBy: 'row',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    color: colors[i],
                }
            },
        };
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
(function ($) {
    "use strict";

    var table = '<table class="table table-striped table-bordered">##TABLE##</table>';
    var tr = '<tr>##TR##</tr>';
    var th = '<th>##TH##</th>';
    var td = '<td>##TD##</td>';
    var td1 = '<td class="col-xs-1">##TD##</td>';

    var jsonInEl = document.getElementById('jsonIn');
    var jsonOutEl = document.getElementById('jsonOut');
    var jsonBtn = document.getElementById('jsonBtn');

    jsonBtn.addEventListener('click', function () {
        var jsonObj;
        var inputValue = jsonInEl.value || '{}';
        try {
            jsonObj = JSON.parse(inputValue);
            var html = _renderObject('jsonObj', jsonObj, true);
            $(jsonOutEl).html(html);
        } catch (e){
            $(jsonOutEl).html('<div class="alert alert-danger">' +e.message+ '</div>')
        }

    });


    function _renderObject(name, currentObj, ignoreObjectName){
        console.log('currentObject', name);
        var k = '', t = '', v = '';
        if(!ignoreObjectName){
            k = td.replace('##TD##', name);
            t = td1.replace('##TD##', '<small>' +typeof currentObj+ '</small>');
            v = td.replace('##TD##', table.replace('##TABLE##', _parseObject(currentObj)));
            return tr.replace('##TR##', k+t+v);
        }
        return table.replace('##TABLE##', _parseObject(currentObj));
    }



    function _parseObject(currentObj) {
        var v = '';
        for(var key in currentObj){
            if(currentObj.hasOwnProperty(key)){
                var value = currentObj[key];

                if(value instanceof Array){
                    v += _renderArray(key, value);
                }else if(value instanceof Object){
                    v +=  _renderObject(key, value);
                }else {
                    v += _renderPrimitive(key, value);
                }

            }
        }
        return v;
    }

    function _renderPrimitive(key, value){
        var type = typeof value;
        if(value === null) value = '<span class="null">'+value+'</span>';
        else if(type === 'string') value = '<span class="str">"'+value+'"</span>';
        else if(type === 'boolean') value = '<span class="bln">'+value+'</span>';
        return '<tr><td>' +key+ '</td><td class="col-xs-1"><small>' +type+'</small></td><td>' +value+ "</td></tr>";
    }

    function _renderArray(key, tab) {

        var htmlTab = tab.map(function (currentEl, index) {
            if(currentEl instanceof Array){
                return _renderArray(index, currentEl);
            }else if(currentEl instanceof Object){
                return  _renderObject(index, currentEl);
            }else {
                return _renderPrimitive(index, currentEl);
            }
        });
        htmlTab = table.replace('##TABLE##', htmlTab.join(''));
        return '<tr><td>' +key+ '</td><td class="col-xs-1"><small>array</small></td><td>' +htmlTab+ "</td></tr>";

    }
})(jQuery);
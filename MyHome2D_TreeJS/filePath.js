//判断文件是否存在
function isExistFile(url)  
    {      
        var xmlHttp ;  
        alert('isExistFile-1');
        if (window.ActiveXObject)  
         {  
            alert('isExistFile-2');
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 
          alert('isExistFile-3'); 
         }  
         else if (window.XMLHttpRequest)  
         {  
            alert('isExistFile-4');
          xmlHttp = new XMLHttpRequest();
          alert('isExistFile-5');  
         }   
         alert('isExistFile-6');
        xmlHttp.open("post",url,false);
        alert('isExistFile-7');  
        xmlHttp.send();  //在这里死掉
        alert('isExistFile-8');
        if(xmlHttp.readyStatus==4)
        {
            alert('isExistFile-9');
            if(xmlhttp.status==200)
                return true;//url存在
            else if(xmlhttp.status==404)
                return false;//url不存在
            else 
                return false;//其他状态
        }    
        else 
        { 
            alert('isExistFile-10');
            return true; 
        } 
    }

    function NetPing(sUrl) {
        $.ajax({
            type: "GET",
            cache: false,
            url: sUrl,
            data: "",
            success: function() {
                Done(1);
            },
            error: function() {
                Done(0);
            }
        });
    }
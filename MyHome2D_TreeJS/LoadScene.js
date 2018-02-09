//引入其他的js文件
document.write("<script language='javascript' src='js/Three.js'></script>");
document.write("<script language='javascript' src='filePath.js'></script>");

function Entity()
            {
                this.geometry = new THREE.Geometry();
                this.id = 0;
                this.motion_type = 0;
                this.motion_pos = new THREE.Vector2(0,0,0);
                this.motion_vec = new THREE.Vector2(0,0,1);
                this.motion_valuecur = 0;
                this.motion_valuemin = 0;
                this.motion_valuemax = 0;
            }

            //解析xml文件
            function parseXML(xmlFile){
                // 创建解析XML后的DOM对象
                var xmlDoc = null;
                // 根据不同浏览器进行解析
                if(window.DOMParser){
                    // 其他浏览器  
                    alert("window.DOMParser");
                    var parser = new DOMParser();
                    alert("window.DOMParser-1");
                    xmlDoc = parser.parseFromString(xmlFile,"application/xml");
                    alert("window.DOMParser-2");
                }else{
                    // IE浏览器
                    alert("!window.DOMParser");
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlFile);
                    alert("!window.DOMParser_2");
                }
                return xmlDoc;
            }

            function parseXML2(xmlFile)
            {
                alert("parseXML2——1");
                    var xmlDoc=null;
                    //判断浏览器的类型
                    //支持IE浏览器
                    if(!window.DOMParser && window.ActiveXObject)
                    {
                        alert("!window.DOMParser && window.ActiveXObject");
                        var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
                        for(var i=0;i<xmlDomVersions.length;i++){
                            try{
                                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                                break;
                            }catch(e){
                            }
                        }
                    }
                    //支持Mozilla浏览器
                    else if(document.implementation && document.implementation.createDocument)
                    {
                        alert("支持Mozilla浏览器");
                        try{
                            /* document.implementation.createDocument('','',null); 方法的三个参数说明
                            * 第一个参数是包含文档所使用的命名空间URI的字符串； 
                            * 第二个参数是包含文档根元素名称的字符串； 
                            * 第三个参数是要创建的文档类型（也称为doctype）
                            */
                            xmlDoc = document.implementation.createDocument('','',null);
                        }catch(e){
                        }
                    }
                    else
                    {
                        alert("返回null");
                        return null;
                    }
                    alert("parseXML2——3");
                    if(xmlDoc!=null)
                    {
                        xmlDoc.async = false;
                        alert("parseXML2——3.2");
                        xmlDoc.load(xmlFile);
                        alert("parseXML2——3.3");
                    }
                    alert("parseXML2——4");
                    return xmlDoc;
            }

            //加载xml文件
            function loadXMLDoc(dname) 
            {
                var xmlDoc;
                try //Internet Explorer
                {
                    alert("loadXMLDoc_1");
                    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                }
                catch(e)
                {
                    try //Firefox, Mozilla, Opera, etc.
                    {
                        alert("loadXMLDoc_2");
                        xmlDoc=document.implementation.createDocument("","",null);
                    }
                    catch(e) 
                    {
                        alert(e.message);
                    }
                }
                try 
                {
                    alert("loadXMLDoc_3");
                    xmlDoc.async=false;
                    xmlDoc.load(dname);
                    alert("loadXMLDoc_4");
                    return(xmlDoc);
                }
                catch(e) 
                {
                    alert("loadXMLDoc_5");
                    //webkit BUG,chrome etc.
                    xmlDoc = new XMLHttpRequest(); //用AJAX中常见的套路来就可以解决了，不影响IE、FIREFOX的原生加载XML 
                    xmlDoc.overrideMimeType("text/xml");
                    xmlDoc.open("GET", dname, false);
                    xmlDoc.send(null);
                    //xmlResult = xmlDoc.responseXML; 
                    alert("loadXMLDoc_6");
                    return xmlDoc;

                    //alert(e.message);
                }
                return(null);
            }

            function loadXMLDoc1(dname)
            {
                var xmlDoc;

                // 针对 IE 的代码
                if (window.ActiveXObject)
                {
                xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                }

                // 针对 Mozilla、Firefox、Opera 的代码
                else if (document.implementation && document.implementation.createDocument)
                {
                xmlDoc=document.implementation.createDocument("","",null);
                }

                else
                {
                alert('您的浏览器无法处理此脚本');
                }

                alert('loadXMLDoc1-1');
                xmlDoc.async=false;
                xmlDoc.load(dname);
                alert('loadXMLDoc1-2');
                return(xmlDoc);
            }

            //加载xml可用版本（火狐浏览器可以、谷歌浏览器不行）
            function loadXMLDoc2(xmlFile) 
            {
                var xmlDoc;
                if (window.ActiveXObject) 
                {//IE浏览器
                    xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
                    xmlDoc.async = false;
                    xmlDoc.load(xmlFile);
                }
                else if (isFirefox=navigator.userAgent.indexOf("Firefox")>0) 
                {//火狐浏览器
                    xmlDoc = document.implementation.createDocument('', '', null);
                    xmlDoc.load(xmlFile);
                }
                else
                { //谷歌浏览器（经过测试不可用）
                    var xmlhttp = new window.XMLHttpRequest();
                    xmlhttp.open("GET",xmlFile,false);
                    xmlhttp.send(null);
                    if(xmlhttp.readyState == 4)
                        xmlDoc = xmlhttp.responseXML.documentElement;
                }

                return xmlDoc;
            }

            function get_Normal(p1, p2, p3)  
            {  
                a = ( (p2.y-p1.y)*(p3.z-p1.z)-(p2.z-p1.z)*(p3.y-p1.y) );  
                b = ( (p2.z-p1.z)*(p3.x-p1.x)-(p2.x-p1.x)*(p3.z-p1.z) );  
                c = ( (p2.x-p1.x)*(p3.y-p1.y)-(p2.y-p1.y)*(p3.x-p1.x) );  
                var nor = new THREE.Vector3( a, b, c )
                return nor;  
            }  

            var entCount = 0;
            function getEntity(ent, element1)
            {
                var i, j, k, l, m, n;       
                for (k = 0; k < element1.childNodes.length; k++)//拿到子节点的信息
                {
                    var element2 = element1.childNodes[k];
                    if ('Entity' == element2.nodeName)//Entity
                    {
                        getEntity(ent, element2);
                    }
                    else if ('Surface' == element2.nodeName)//mesh数据
                    {
                        //alert(element2.nodeName);
                        for (l = 0; l < element2.childNodes.length; l++)
                        {
                            var element3 = element2.childNodes[l];
                            if ('Mesh' == element3.nodeName)
                            {
                                //MeshBasicMaterial-不会被光源影响到
                                //MeshLambertMaterial-会被光源影响到
                                var material = new THREE.MeshBasicMaterial();//拿到该表面的材质
                                var bTex = false;
                                for (m = 0; m < element3.childNodes.length; m++)
                                {
                                    var element4 = element3.childNodes[m];
                                    if ('mat' == element4.nodeName)//贴图信息
                                    {
                                        for (n = 0; n < element4.childNodes.length; n++)
                                        {
                                            var element5 = element4.childNodes[n];
                                            if ('map' == element5.nodeName)
                                            {
                                                var sValue = element5.childNodes[0].nodeValue;//这里不能直接用element5.nodeValue
                                                sValue = sValue.trim();//去除前后空格
                                                // 加载贴图必须是网上的不能是本地的
                                                //http://localhost/static/pic/cubeTexture1.bmp
                                                var texPath = "scene/HomeKooTemp78257_2/tex/" + sValue + ".jpg";
                                                var texture = THREE.ImageUtils.loadTexture(texPath,null,function(t){});
                                                if (texture !== null && texture !== undefined)
                                                {
                                                    material.map = texture;
                                                    bTex = true;
                                                }
                                            }
                                            else if ('c' == element5.nodeName)
                                            {
                                                //mmat.ka.x,mmat.ka.y,mmat.ka.z,//amb color
												//mmat.kd.x,mmat.kd.y,mmat.kd.z,//diffuse color
												//mmat.ks.x,mmat.ks.y,mmat.ks.z,//spec	color
												//mmat.transparency,mmat.shininess,mmat.specPower);//透明度，高光范围，高光强度
                                                var arMatInfo;
                                                var sValue = element5.childNodes[0].nodeValue;//这里不能直接用element5.nodeValue
                                                sValue = sValue.trim();//去除前后空格
                                                arMatInfo = sValue.split(' ');
                                                if (arMatInfo.length >= 12 && false == bTex)
                                                {
                                                    var strR = Math.ceil(arMatInfo[3]*255).toString(16);
                                                    var strG = Math.ceil(arMatInfo[4]*255).toString(16);
                                                    var strB = Math.ceil(arMatInfo[5]*255).toString(16);
                                                    sValue = '0x' + strR + strG + strB;
                                                    alert(sValue);
                                                    material.color = 0x00FF00;//sValue;//'0xFF0000';//颜色值
                                                }
                                                
                                            }
                                        }
                                    }
                                    else if ('vert' == element4.nodeName)//顶点信息
                                    {
                                        var arVert, arTexture, arIndex;//顶点、贴图坐标、索引
                                        for (n = 0; n < element4.childNodes.length; n++)
                                        {
                                            var element5 = element4.childNodes[n];
                                            if ('v' == element5.nodeName)
                                            {
                                                var sValue = element5.childNodes[0].nodeValue;//这里不能直接用element5.nodeValue
                                                sValue = sValue.trim();//去除前后空格
                                                arVert = sValue.split(' ');//通过空格分开拿到数据
                                            }
                                            else if ('vt' == element5.nodeName)
                                            {
                                                var sValue = element5.childNodes[0].nodeValue;//这里不能直接用element5.nodeValue
                                                sValue = sValue.trim();//去除前后空格
                                                arTexture = sValue.split(' ');//通过空格分开拿到数据
                                            }
                                            else if ('vi' == element5.nodeName)
                                            {
                                                var sValue = element5.childNodes[0].nodeValue;//这里不能直接用element5.nodeValue
                                                sValue = sValue.trim();//去除前后空格
                                                arIndex = sValue.split(' ');//通过空格分开拿到数据
                                            }
                                        }
                                        
                                        var l1 = arVert.length;
                                        var l2 = arTexture.length;
                                        var l3 = arIndex.length;
                                        if (l1 == l2 && l1 / 3 * 2 == l3)
                                        {
                                            //alert('顶点数、贴图坐标数和顶点索引数正确');
                                            var geometry = new THREE.Geometry();
                                            for (n = 0; n < l1; n+=3)
                                            {
                                                geometry.vertices.push(new THREE.Vector3( arVert[n], arVert[n+1], arVert[n+2] ));
                                            }
                                            for (n = 0; n < l3; n+=6)
                                            {
                                                var p1 = geometry.vertices[arIndex[n]];
                                                var p2 = geometry.vertices[arIndex[n+2]];
                                                var p3 = geometry.vertices[arIndex[n+4]];
                                                var normal = get_Normal(p1, p2, p3);//计算三角面法向量
                                                geometry.faces.push( new THREE.Face3( arIndex[n], arIndex[n+2], arIndex[n+4], normal) );
                                            }
                                            //这里的贴图坐标还是有点问题，要进一步优化
                                            for (n = 0; n < l1/3; n+=3)
                                            {
                                                var index = n/3;
                                                
                                                var t0 = new THREE.Vector2(arTexture[3*n],arTexture[3*n+1]);//图片左下角
                                                var t1 = new THREE.Vector2(arTexture[3*(n+1)],arTexture[3*(n+1)+1]);//图片右下角
                                                var t2 = new THREE.Vector2(arTexture[3*(n+2)],arTexture[3*(n+2)+1]);//图片右上角
                                                var uv1 = [t0,t1,t2];//选中图片一个三角区域像素——映射到三角面1
                                                geometry.faceVertexUvs[0].push(uv1);//纹理坐标传递给纹理三角面属性
                                            }
                                            geometry.uvsNeedUpdate = true;
                                            geometry.computeBoundingSphere();
                                            var mesh = new THREE.Mesh( geometry,material );
                                            scene.add( mesh );
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if ('Attr' == element2.nodeName)//Attr属性
                    {
                        //alert(element2.nodeName);
                        for (l = 0; l < element2.childNodes.length; l++)
                        {
                            var element3 = element2.childNodes[l];
                            if ('id' == element3.nodeName)
                            {

                            }
                            else if ('motion_type' == element3.nodeName)
                            {

                            }
                            else if ('motion_pos' == element3.nodeName)
                            {

                            }
                            else if ('motion_vec' == element3.nodeName)
                            {

                            }
                            else if ('motion_valuecur' == element3.nodeName)
                            {

                            }
                            else if ('motion_valuemin' == element3.nodeName)
                            {

                            }
                            else if ('motion_valuemax' == element3.nodeName)
                            {

                            }
                        }
                    }
                }
            }

            //加载3DShow场景
            function loadScene_3DShow(sceneName)
            {                
                var arVvf = new Array();
                arVvf.push('10BFE957_21677');
                arVvf.push('10CD5352_609957');
                arVvf.push('1535B809_37532');
                arVvf.push('231A3A8A_87253');
                arVvf.push('254765E_12092701');
                arVvf.push('254765E_12092701_1');
                arVvf.push('290C4269_3756');
                arVvf.push('29B516A0_14929');
                arVvf.push('29E950FA_81400');
                arVvf.push('2AECA33B_1617378');
                arVvf.push('2B58D52C_21900');
                arVvf.push('2B58D52C_21900_0');
                arVvf.push('317CEDCC_5615');
                arVvf.push('36F2C465_697264');
                arVvf.push('3C143C86_5051');
                arVvf.push('3F340193_1434456');
                arVvf.push('48E71D44_6280203');
                arVvf.push('4E62AFAB_84124');
                arVvf.push('522F7F63_4285156');
                arVvf.push('5308B0AD_162434');
                arVvf.push('60D9EEA0_70159');
                arVvf.push('60D9EEA0_70159_0');
                arVvf.push('630FD683_3672');
                arVvf.push('7344E287_100692');
                arVvf.push('8200D07A_313300');
                arVvf.push('914E5D64_79990');
                arVvf.push('95FD5D67_471169');
                arVvf.push('98DA2D37_3672');
                arVvf.push('99AE16C6_70492');
                arVvf.push('99AE16C6_70492_0');
                arVvf.push('9A587A17_69898');
                arVvf.push('9A587A17_69898_1');
                arVvf.push('9EE7A7D9_3105');
                arVvf.push('A2C24367_21679');
                arVvf.push('A5BAE5A8_5914');
                arVvf.push('A7FC3FAD_12892');
                arVvf.push('A8F73169_28190');
                arVvf.push('A8F73169_28190_1');
                arVvf.push('B5302B8D_3840');
                arVvf.push('B84AE409_3588');
                arVvf.push('BF5C3B3C_3756');
                arVvf.push('C2C59204_3672');
                arVvf.push('C2D216FE_3756');
                arVvf.push('C35DC6F0_6139330');
                arVvf.push('C6B54D53_36703');
                arVvf.push('C8D10D1F_91147');
                arVvf.push('C8D10D1F_91147_0');
                arVvf.push('C9367C79_314339');
                arVvf.push('D289391B_18065');
                arVvf.push('E0E6528D_3672');
                arVvf.push('E94176EE_4281807');
                arVvf.push('EBC46E3_132904');
                arVvf.push('EC67D4B8_121390');
                arVvf.push('F04705A7_5612');
                arVvf.push('F261202B_267177');
                arVvf.push('F261202B_267177_1');
                arVvf.push('F2BBAEF3_267177');
                arVvf.push('F2BBAEF3_267177_1');

                

                //根节点vvFile
                //子节点Entity(vvFile只有一个Entity子节点，没有Attr)
                //Entity的子节点：多个Entity和一个Attr或者有Surface
                //Entity递归
                //Attr子节点:id、motion_type、motion_pos、motion_vec、motion_valuecur、motion_valuemin、motion_valuemax
                //Surface子节点:Mesh
                //Mesh子节点：mat、vert
                //mat子节点：map、c
                //vert子节点：v、vt、vi
                //alert('vvf');
                var ii, i, j, k, l, m, n;

                var arXmlDoc = new Array();
                for (ii = 0; ii < arVvf.length; ii++)
                {
                    var xmlfile = "scene/" + sceneName + "/scenedata/" + arVvf[ii] + ".xml";//一定要把vvf改名为xml才能加载
                    var xmlDoc=loadXMLDoc2(xmlfile);
                    arXmlDoc.push(xmlDoc);
                }
                alert('vvf');//要弹出这个后面才能读到数据，可能时异步加载xml导致的问题,页面刷新两次才可以

                for (ii = 0; ii < arVvf.length; ii++)
                {
                    var xmlfile = "scene/" + sceneName + "/scenedata/" + arVvf[ii] + ".xml";//一定要把vvf改名为xml才能加载
                    var xmlDoc=arXmlDoc[ii];
                    var vvf = xmlDoc.getElementsByTagName("vvFile");//vvFile
                    for (i = 0; i < vvf.length; i++)//vvFile 
                    {
                        for (j = 0; j < vvf[i].childNodes.length; j++)//拿到子节点的信息
                        {
                            var element1 = vvf[i].childNodes[j];
                            var ent = new Entity();
                            getEntity(ent, element1);
                        }         
                    }
                }
                
                
            }
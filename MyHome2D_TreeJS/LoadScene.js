//引入其他的js文件
document.write("<script language='javascript' src='js/Three.js'></script>");

//三维物体类
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
    this.children = new Array();
}

//解析xml文件
function parseXML(xmlFile){
    // 创建解析XML后的DOM对象
    var xmlDoc = null;
    // 根据不同浏览器进行解析
    if(window.DOMParser){
        // 其他浏览器  
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlFile,"application/xml");
    }else{
        // IE浏览器
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(xmlFile);
    }
    return xmlDoc;
}

void getEntity(ent, elements1)
{
    for (var i = 0; i < elements1.length; i++) 
    {
        elements1[i].childnode
        var attr = elements1[i].getElementsByTagName("Attr")[0].firstChild.nodeValue;
        var Entity = elements1[i].getElementsByTagName("Entity")[0].firstChild.nodeValue;               
    }
}

void loadVVF(xmlfile)
{
    var xmlDoc=parseXML(xmlfile);
    var ent = new Entity();
    var elements1 = xmlDoc.getElementsByTagName("Entity");
    for (var i = 0; i < elements1.length; i++) 
    {
        var attr = elements1[i].getElementsByTagName("Attr")[0].firstChild.nodeValue;
        var Entity = elements1[i].getElementsByTagName("Entity")[0].firstChild.nodeValue;               
    }
}
            

//加载3DShow场景
function loadScene_3DShow()
{
    var xmlfile = "scene/HomeKooTemp78257_2/scenedata/2AECA33B_1617378.vvf";
    var xmlDoc=parseXML(xmlfile);
    var elements1 = xmlDoc.getElementsByTagName("Entity");
    for (var i = 0; i < elements1.length; i++) 
    {
        var attr = elements1[i].getElementsByTagName("Attr")[0].firstChild.nodeValue;
        var Entity = elements1[i].getElementsByTagName("Entity")[0].firstChild.nodeValue;               
    }
}
function getElementViewTop(element){
　　var actualTop = element.offsetTop;
　　var current = element.offsetParent;
　　while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
　　}
    var elementScrollTop=0;
　　if (document.compatMode == "BackCompat"){
        elementScrollTop=document.body.scrollTop;
　　} else {
        elementScrollTop=document.documentElement.scrollTop; 
　　}
    return actualTop;
　//　return actualTop-elementScrollTop;
}
function getScroll()
{
    var top, left, width, height;
 
    if (document.documentElement && document.documentElement.scrollTop) {
        top = document.documentElement.scrollTop;
        left = document.documentElement.scrollLeft;
        width = document.documentElement.scrollWidth;
        height = document.documentElement.scrollHeight;
    } else if (document.body) {
        top = document.body.scrollTop;
        left = document.body.scrollLeft;
        width = document.body.scrollWidth;
        height = document.body.scrollHeight;
    }
    return { 'top': top, 'left': left, 'width': width, 'height': height };
}
var nav = document.getElementById('nav');   
var posTop = getElementViewTop(nav);
window.addEventListener('scroll',function(event){
    var scrollTop = getScroll().top;
    var output = document.getElementById('output');
    output.innerHTML = posTop +' '+scrollTop+' '+(posTop-scrollTop);
    if(posTop>=30 && posTop-scrollTop <= 30) 
        nav.className = 'nav fixed';
    else nav.className = 'nav';
},false);


        function menuFixed(id) {
            var obj = document.getElementById(id);
            var _getTop = obj.offsetTop;
            var _getLeft = obj.offsetLeft;
            var _getHeight = obj.offsetHeight;
            var _getWidth = obj.offsetWidth;
            window.onscroll = function(){
                changePos(id, _getTop, _getLeft, _getHeight, _getWidth);
            }
        }
        function changePos(id, top, left, Height, Width){
            var obj = document.getElementById(id);
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop < top){
                obj.style.position = 'relative';
            }else{
                // alert(id+","+top+","+left+","+Height+","+Width);
                obj.style.position = 'fixed';
                obj.style.height = Height;
                obj.style.width = Width;
            }
        }
        window.onload = function(){
            menuFixed('menu');
        }
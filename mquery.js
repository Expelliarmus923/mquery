/**
 * Created by lulizhou on 2015/7/15.
 */
/*������*/
function getByClass(oParent, sClass) {
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    var i=0;
    for(i=0;i<aEle.length;i++)
    {
        if(aEle[i].className==sClass)
        {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
function $(vArgs){
    return new mquery(vArgs);
}
function mquery(vArgs){
    this.elements=[];
    switch (typeof vArgs) {
        case 'function':
                EventUtil.addHandler(window,'load',vArgs);
            break;
        case 'string':
            switch (vArgs.charAt(0)){
                case '#':
                    this.elements.push(document.getElementById(vArgs.substring(1)));
                    break;
                case '.':
                    this.elements=getByClass(document,vArgs.substring(1));
                    break;
                default :
                    this.elements=document.getElementsByTagName(vArgs);
                    break;
            }
            break;
        case 'object':
            this.elements.push(vArgs);
            break;
    }
}
/*��������*/
mquery.prototype.attr=function(attr,value){
    if(arguments.length==2){
        var i;
        for(i=0;i<this.elements.length;i++){
            this.elements[i][attr]=value;
        }
    }else{
        return this.elements[0][attr];
    }
}
mquery.prototype.css=function(attr,value){
    if(arguments.length==2){
        var i;
        for(i=0;i<this.elements.length;i++)
        {
            this.elements[i].style[attr]=value;
        }
    }else{
        return this.elements[0].currentStyle ? this.elements[0].currentStyle[attr]   :
            getComputedStyle(this.elements[0], false)[attr];
    }
}
mquery.prototype.click=function(fn){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        EventUtil.addHandler(this.elements[i],'click',fn);
    }
}
mquery.prototype.hover=function(fn){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        EventUtil.addHandler(this.elements[i],'mouseover',fn);
    }
}
mquery.prototype.toggle=function(){
    var i= 0,_arguments=arguments,_this=this;
    for(i=0;i<this.elements.length;i++){
        var handler=(function(count){
            return function(){
                _arguments[count++%_arguments.length].call(_this.elements[i]);
            }
        })(0)
        EventUtil.addHandler(this.elements[i],'click',handler);
        handler=null;
    }
}
mquery.prototype.show=function(){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        this.elements[i].style.display='block';
    }

}
mquery.prototype.hide=function(){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none';
    }
}
mquery.prototype.eq=function(n){
    return $(this.elements[n]);
}
/*���ߺ���*/
var EventUtil={
    /*
     *element ��/���¼���Ԫ��
     *type	�¼�����
     *handler ִ�к���
     */
    addHandler:function  (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);/*DOM2���¼��������*/
        }else if(element.attachEvent){
            element.attachEvent("on"+type,function(){
                handler.call(element); /*���IE��thisָ��window*/
            });/*IE�¼��������*/
        }else{
            element["on"+type]=handler;/*DOM0���¼��������*/
        }
    },
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    getEvent:function(event){
        return event ? event : window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    }
}
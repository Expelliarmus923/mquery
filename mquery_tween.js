/**
 * Created by lulizhou on 2015/7/17.
 */
$().extend("animation",function(json,times,fx,endFn){
    var i=0;
    for(i=0;i<this.elements.length;i++){
        doMove(this.elements[i],json,times,fx,endFn);
    }
})
function doMove(obj,json,times,fx,endFn){

    if(obj==document.body){
        obj=obj;
    }

    var iCur={};//��ų�ʼֵb�ļ���

    for(var attr in json){
        iCur[attr]=0;

        if(attr=='opacity'){
            iCur[attr]=Math.round(getStyle(obj,attr)*100);
        }else{
            iCur[attr]=parseInt(getStyle(obj,attr));
        }
    }

    var startTime=new Date().getTime();//�˶���ʼ��ʱ��<���� 1970 �� 1 �� 1 ������ĺ�����>
    var t=0;

    clearInterval(obj.timer);
    obj.timer=setInterval(function(){

        var nowTime=new Date().getTime();//�˶���ǰ��ʱ��

        t=nowTime-startTime;
        if(t>times)t=times;

        for(var attr in json){
            var value=Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);//value�ǿɱ�ģ������˶����������ǰ��Ŀ���
            if(attr=='opacity'){
                obj.style.opacity=value/100;
                obj.style.filter='alpha(opacity='+value+')';
            }else{
                obj.style[attr]=value+'px';
            }
        }

        if(t==times){
            clearInterval(obj.timer);
            if(typeof endFn==='function'){
                endFn();
            }
        }
    },30)
}
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj)[attr];
    }
}
var Tween={
    linear:function(t,b,c,d){//����
        return c*t/d+b;
    },
    easeIn:function(t,b,c,d){//��������
        return c*(t/=d)*t+b;
    },
    easeOut:function(t,b,c,d){//��������
        return -c*(t/=d)*(t-2)+b;
    },
    easeBoth:function(t,b,c,d){//���ټ�������
        if((t/=d/2)<1){
            return c/2*t*t+b;
        }
        return -c/2 *((--t)*(t-2)-1)+b;
    },
    easeInStrong:function(t,b,c,d){//�Ӽ�������
        return c*(t/=d)*t*t*t+b;
    },
    easeOutStrong:function(t,b,c,d){//����������
        return -c *((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong:function(t,b,c,d){//�Ӽ��ټ���������
        if((t/=d/2)<1){
            return c/2*t*t*t*t+b;
        }
        return -c/2*((t-=2)*t*t*t-2)+b;
    },
    elasticIn:function(t,b,c,d,a,p){//����˥�����ߣ��������룩
        if(t===0){
            return b;
        }
        if((t/=d)==1){
            return b+c;
        }
        if(!p){
            p=d*0.3;
        }
        if(!a||a<Math.abs(c)){
            a=c;
            var s=p/4;
        }else{
            var s=p/(2*Math.PI)*Math.asin(c/a);
        }
        return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
    },
    elasticOut:function(t,b,c,d,a,p){//������ǿ���ߣ�����������
        if(t===0){
            return b;
        }
        if((t/=d)==1){
            return b+c;
        }
        if(!p){
            p=d*0.3;
        }
        if(!a||a< Math.abs(c)){
            a=c;
            var s=p/4;
        }else{
            var s=p/(2*Math.PI)*Math.asin(c/a);
        }
        return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;
    },
    elasticBoth:function(t,b,c,d,a,p){
        if(t===0){
            return b;
        }
        if((t/=d/2)==2){
            return b+c;
        }
        if(!p){
            p=d*(0.3*1.5);
        }
        if(!a||a<Math.abs(c)){
            a=c;
            var s=p/4;
        }
        else{
            var s=p/(2*Math.PI)*Math.asin(c/a);
        }
        if(t<1){
            return - 0.5*(a*Math.pow(2,10*(t-=1))*
                Math.sin((t*d-s)*(2*Math.PI)/p))+b;
        }
        return a*Math.pow(2,-10*(t-=1))*
            Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;
    },
    backIn:function(t, b, c, d, s){//���˼��٣����˽��룩
        if(typeof s=='undefined') {
            s=1.70158;
        }
        return c*(t/=d)*t*((s+1)*t-s)+b;
    },
    backOut:function(t,b,c,d,s){
        if (typeof s=='undefined'){
            s=3.70158;//�����ľ���
        }
        return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
    },
    backBoth:function(t,b,c,d,s){
        if(typeof s=='undefined'){
            s=1.70158;
        }
        if((t/=d/2)<1){
            return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
    },
    bounceIn:function(t,b,c,d){//������񣨵��򽥳���
        return c-Tween['bounceOut'](d-t,0,c,d)+b;
    },
    bounceOut:function(t,b,c,d){
        if((t/=d)<(1/2.75)){
            return c*(7.5625*t*t)+b;
        }else if(t<(2/2.75)){
            return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
        }else if(t<(2.5/2.75)){
            return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
    },
    bounceBoth:function(t,b,c,d){
        if(t<d/2){
            return Tween['bounceIn'](t*2,0,c,d)*0.5+b;
        }
        return Tween['bounceOut'](t*2-d,0,c,d)*0.5+c*0.5+b;
    }
}
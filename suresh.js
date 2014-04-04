function zxcFloatingMenu(o){
 this.mde=typeof(o.Mode)=='string'&&o.Mode.charAt(0).toUpperCase()=='V'?[1,'top','Top','Height']:[0,'left','Left','Width']
 var obj=document.getElementById(o.NavigationID);
 this.xy=obj['offset'+this.mde[2]];
 this.nav=new zxcAnimate(this.mde[1],obj,this.xy);
 this.mobj=obj.getElementsByTagName('DIV')[0];
 this.menu=new zxcAnimate('opacity',this.mobj,0);
 this.menu.oop=this;
 this.menu.Complete=function(){
  if (this.data[0]==0){
   this.obj.style.visibility='hidden';
   this.oop.move();
  }
 }
 this.nested=o.Nested||false
 this.parent=document.getElementById(this.nested)||obj.parentNode;
 this.mobj.style.visibility='hidden';
 this.os=obj['offset'+this.mde[3]]/2;
 this.fms=o.FadeDuration||1000;
 this.sms=o.ScrollSpeed||1000;
 this.min=o.MinTravel||0;
 this.max=o.MaxTravel||100000;
 this.addevt(obj,'mouseover','fade');
 this.addevt(obj,'mouseout','fade');
 this.addevt(document,'mousemove','msemove');
}

zxcFloatingMenu.prototype={

 msemove:function(e){
  clearTimeout(this.nav.to);
  var os=this.nested?this.pos(this.parent)[this.mde[0]]:0;
  this.xy=Math.max(Math.min(this.mse(e)[this.mde[0]]-this.os-os,this.max),this.min);
  if (this.mobj.style.visibility=='hidden'){
   this.move();
  }
 },

 move:function(e){
   this.nav.animate(this.nav.data[0],this.xy,this.sms);
 },

 fade:function(e){
  var eobj=(e.relatedTarget)?e.relatedTarget:(e.type=='mouseout')?e.toElement:e.fromElement;
  if (eobj){
   while (eobj.parentNode){
    if (eobj==this.nav.obj){
     return false;
    }
    eobj=eobj.parentNode;
   }
   this.menu.animate(this.menu.data[0],e.type=='mouseover'?100:0,this.fms,[0,100]);
   this.mobj.style.visibility='visible';
  }
 },

 addevt:function(o,t,f,p){
  var oop=this;
  if (o.addEventListener) o.addEventListener(t,function(e){ return oop[f](e,p);}, false);
  else if (o.attachEvent) o.attachEvent('on'+t,function(e){ return oop[f](e,p); });
 },

 mse:function(e){
  if (document.all) return [e.clientX+this.docs()[0],e.clientY+this.docs()[1]];
  return [e.pageX,e.pageY];
 },

 docs:function(){
  if (!document.body.scrollTop) return [document.documentElement.scrollLeft,document.documentElement.scrollTop];
  return [document.body.scrollLeft,document.body.scrollTop];
 },

 pos:function(obj){
  var rtn=[0,0];
  while(obj){
   rtn[0]+=obj.offsetLeft;
   rtn[1]+=obj.offsetTop;
   obj=obj.offsetParent;
  }
  return rtn;
 }



}





new zxcFloatingMenu({
 NavigationID:'nav',
 Mode:'Vertical',
 MinTravel:50,        // (optional) the minimum scroll position.                                    (digits, default = 0)
 MaxTravel:400        // (optional) the minimum scroll position.                                    (digits, default = 100000)
});



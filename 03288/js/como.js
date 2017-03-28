$(document).ready(function(){
	//load header\
	$("#headerBox").load("ajax/header.html");
	$("#footerBox").load("ajax/footer.html");
	
	//banner
	;(function(){
		//rwdImg
		function rwdImg(objId){
			var oBox = document.getElementById(objId);
			if(!oBox)return false;
			var aImg = oBox.getElementsByTagName("img");
			if(!aImg.length)return false;
			for (var i=0;i<aImg.length;i++) {
				var canResPond=aImg[i].getAttribute("data-respond");
				if (canResPond) {
					var sSrc = aImg[i].getAttribute("data-sImg");
					var bSrc = aImg[i].getAttribute("data-bImg");	
					
					var boxW = oBox.offsetWidth;
					console.log(boxW)
					if (boxW<1024) {
						aImg[i].setAttribute("src",sSrc)
					} else{
						aImg[i].setAttribute("src",bSrc)
					}
				}
				
			}
		}
		//rwd img
		rwdImg("indexbanner");
		
		//addbanner
		if(document.getElementById("indexbanner")) {

			var oIndexBannner = document.getElementById("indexbanner");
			var spBox = myLab.getByClass(oIndexBannner, "spBox")[0];
			var oBtmBox = myLab.getByClass(oIndexBannner, "btmBtn")[0];
			var aBtmBtns = oBtmBox.getElementsByTagName("span");
			var oLeftBtn = myLab.getByClass(oIndexBannner, "leftBtn")[0];
			var oRightBtn = myLab.getByClass(oIndexBannner, "rightBtn")[0];
			var aCtrBtn = myLab.getByClass(oIndexBannner, "ctrBtns");
			var aLi = spBox.getElementsByTagName("li");
			var iBoxW = 0;
			var lth = aLi.length;
			var iNow = 0;
			var canClick = true;
			var iTimer = null;

			if(aLi && aLi.length > 0) {

				//尺寸
				function spResize() {
					iBoxW = oIndexBannner.offsetWidth;
					for(var i = 0; i < aLi.length; i++) {
						aLi[i].style.width = iBoxW + "px"
					}
					spBox.style.width = lth * iBoxW + "px";
					var des = -iNow * iBoxW;
					spBox.style.marginLeft = des + "px";
				}
				spResize();
				window.spResize = spResize;

				//BtmBox
				if(aLi.length > 1) {
					//2倍内容
					spBox.innerHTML += spBox.innerHTML;
					aLi = spBox.getElementsByTagName("li");
					lth = aLi.length;
					spResize();
					
					//init
					for (var i=0;i<aBtmBtns.length;i++) {
						myLab.removeClass(aBtmBtns[i],"active")
					}
					myLab.addClass(aBtmBtns[iNow],"active");
					
					//resize
					myLab.bindEvent(window,"resize",function(){
						setTimeout(function(){
							spResize();//model 
							rwdImg("indexbanner")
						},10)
					})

					//autoPlay
					function autoPlay() {
						clearInterval(iTimer);
						iTimer = setInterval(function() {
							oRightBtnFn()
						}, 5000)
					}
					autoPlay();
					
					$(oIndexBannner).hover(function() {
						clearInterval(iTimer)
					},function(){
						autoPlay()
					})
					
					//oLeftBtnFn
					function oLeftBtnFn(){
						if (!canClick) {
							return false;
						}
						canClick=false;
						iNow--;
						if(iNow<0){
							iNow = (lth/2)-1;
							spBox.style.marginLeft = -(lth/2)*iBoxW +"px";
						}
						setTimeout(function(){
							sportFn()
						},0)
					}
					
					myLab.bindEvent(oLeftBtn,"click",function(){
						oLeftBtnFn()
					})

					//oRightBtnFn
					function oRightBtnFn() {
						if(!canClick) {
							return false
						};
						canClick = false;
						iNow++;
						setTimeout(function() {
							sportFn();
						}, 0)
					}

					myLab.bindEvent(oRightBtn, "click", function() {
						oRightBtnFn()
					})
					
					//aBtmBtns
					aBtmBtns= oBtmBox.getElementsByTagName("span");
					for (var i=0;i<aBtmBtns.length;i++) {
						aBtmBtns[i].index=i;
						myLab.bindEvent(aBtmBtns[i],"click",function(){
							if(!canClick) return false;
							canClick = false;
							var _tar = this;
							
							if(myLab.hasClass(_tar,"active")){
								return false;
							}else{
								iNow=_tar.index;
								sportFn()
							}
						})
					}
					
					//touch
					myLab.touch({obj:oIndexBannner,dirType:"pageX"},function(){
						oRightBtnFn()
					},function(){
						oLeftBtnFn()
					})

					//sportFn
					function sportFn() {
						var dis = -iNow * iBoxW;
						myLab.startMove(spBox, {'marginLeft':dis},500,'def', function() {
							if(iNow == lth / 2) {
								iNow = 0;
								spBox.style.marginLeft = 0;
							}

							for(var i = 0; i < aBtmBtns.length; i++) {
								myLab.removeClass(aBtmBtns[i], "active");
							}
							myLab.addClass(aBtmBtns[iNow], "active")
							canClick = true;
						})
					}
				}

			}else{
				oLeftBtn.style.display=oRightBtn.style.display=oBtmBox.style.display="none"
			}

		}

	})();
});	
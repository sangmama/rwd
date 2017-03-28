// JavaScript Document
//防止iframe嵌套
if(top.location != location) {
	top.location.href = location.href;
}

//xssAb
function xssAb(str){
	var str = window.location.href.toLowerCase() || str;
	var arr = ['<','>','script','window','location','href','src','alert','open','(',')','+','!'];
	
	for(var i=0; i<arr.length; i++){
		if(str.indexOf(arr[i])!=-1){
			window.location.href = window.location.href.substring(0,window.location.href.indexOf('?'));
			return false;	
		}
	}
}
//xssAb();

$(document).ready(function(){	
	/*
		1.banner
	*/
	
	//1.banner
	;(function(){
		
		//rwd_image
		function rwdImg(objId){
			var oBox = document.getElementById(objId);
			if(!oBox){return false}
			var aImg = oBox.getElementsByTagName('img');
			if(!aImg.length){return false;}
			for(var i=0; i<aImg.length; i++){
				var canResPond = aImg[i].getAttribute('data-respond');
				if(canResPond){					
					var sSrc = aImg[i].getAttribute('data-SImg');
					var mSrc = aImg[i].getAttribute('data-MImg');
					var bSrc = aImg[i].getAttribute('data-BImg');
					
					var boxW = oBox.offsetWidth;
					
					if(boxW<640){ //if(boxW<640){
 						aImg[i].setAttribute('src',sSrc);
					}else if(boxW>=640&&boxW<1024){ //if(boxW>=640&&boxW<1024){
						aImg[i].setAttribute('src',mSrc);
					}else if(boxW>=1024){ //if(boxW>=1024){
						aImg[i].setAttribute('src',bSrc);
					}
				}	
			}	
		};
		
		//其他页面头图响应式
		if(document.getElementById('rwdImgSkill')){
			rwdImg('rwdImgSkill');
			myLab.bindEvent(window,'resize',function(){
				rwdImg('rwdImgSkill');
			});	
		}
		
		//响应式图片
		rwdImg('indexBanner');
		
		//add banner
		if(document.getElementById('indexBanner')){
			
			var oIndexBanner = document.getElementById('indexBanner');	
			var spBox = myLab.getByClass(oIndexBanner,'spBox')[0]; 
			var oBtmBox = myLab.getByClass(oIndexBanner,'btm_Btn')[0];
			var aBtmBtns = oBtmBox.getElementsByTagName('span');
			var oLeftBtn = myLab.getByClass(oIndexBanner,'leftBtn')[0];
			var oRightBtn = myLab.getByClass(oIndexBanner,'rightBtn')[0];
			var aCtrBtns = myLab.getByClass(oIndexBanner,'ctrBtns'); 
			var aLi = spBox.getElementsByTagName('li');
			var iBoxW = 0;
			var lth = aLi.length;
			var iNow = 0;
			var canClick = true;
			var iTimer = null;
			var bannerTxtLi = null;
			if(myLab.getByClass(oIndexBanner,'bannerTxt').length>0){
				bannerTxtLi = myLab.getByClass(oIndexBanner,'bannerTxt')[0].getElementsByTagName('li');
			} 
			
			if(aLi && aLi.length>0){
				
				//尺寸
				function spResize(){
					iBoxW = oIndexBanner.offsetWidth;
					for(var i=0; i<aLi.length; i++){
						aLi[i].style.width = iBoxW + 'px';
					}
					spBox.style.width = lth*iBoxW + 'px';
					var des = -iNow*iBoxW;
					spBox.style.marginLeft = des + 'px'
				}
				spResize();
				window.spResize = spResize;
				
				//oBtmBox
				if(aLi.length>1){
					
					//两倍内容
					spBox.innerHTML+=spBox.innerHTML;
					aLi = spBox.getElementsByTagName('li');
					lth = aLi.length;
					spResize();
					
					//init
					for(var i=0; i<aBtmBtns.length; i++){
						myLab.removeClass(aBtmBtns[i],'active');
						myLab.removeClass(aLi[i],'showTxt');	
					}
					myLab.addClass(aBtmBtns[iNow],'active');
					myLab.addClass(aLi[iNow],'showTxt');
					
					//resize
					myLab.bindEvent(window,'resize',function(){
						setTimeout(function(){
							//模块重置尺寸
							spResize();	
							//响应式图片
							rwdImg('indexBanner');
						},10);
					});
					
					//oLeftBtn
					function oLeftBtnFn(){
						if(!canClick){return false;}
						canClick = false;
						iNow--;
						if(iNow<0){
							iNow = (lth/2)-1;
							spBox.style.marginLeft = -(lth/2)*iBoxW + 'px';		
						}
						setTimeout(function(){
							sportFn();
						},0);	
					}
					myLab.bindEvent(oLeftBtn,'click',function(){
						oLeftBtnFn();
					});
					
					//autoPlay
					function autoPlay(){
						clearInterval(iTimer);
						iTimer = setInterval(function(){
							oRightBtnFn();
						},5000);	
					}
					autoPlay();
					
					$(oIndexBanner).hover(function(){
						clearInterval(iTimer);
						oLeftBtn.style.display = oRightBtn.style.display = 'block';
					},function(){
						autoPlay();	
						oLeftBtn.style.display = oRightBtn.style.display = 'none';
					});
					
					//oRightBtn
					function oRightBtnFn(){
						if(!canClick){return false;}
						canClick = false;
						iNow++;
						setTimeout(function(){
							sportFn();
						},0);	
					}
					myLab.bindEvent(oRightBtn,'click',function(){
						oRightBtnFn();	
					});
					
					//aBtmBtns
					aBtmBtns = oBtmBox.getElementsByTagName('span');
					for(var i=0; i<aBtmBtns.length; i++){
						aBtmBtns[i].index = i;
						myLab.bindEvent(aBtmBtns[i],'click',function(){
							if(!canClick){return false;}
							canClick = false;
							//openTime();
							var _tar = this;
							if(myLab.hasClass(_tar,'acitve')){
								return false;	
							}else{
								iNow = _tar.index; 
								sportFn();	
							}	
						});	
					}
					
					//热区 touch
					myLab.touch({obj:oIndexBanner, dirType:'pageX'},function(){
						oRightBtnFn();
					},function(){
						oLeftBtnFn();
					});
					
					//sportFn
					function sportFn(){
						var dis = -iNow*iBoxW;
						myLab.startMove(spBox,{'marginLeft':dis},500,'def',function(){
							if(iNow==lth/2){
								iNow = 0;
								spBox.style.marginLeft = 0;	
							}
							for(var i=0; i<aBtmBtns.length; i++){
								myLab.removeClass(aBtmBtns[i],'active');	
								myLab.removeClass(aLi[i],'showTxt');	
							}
							myLab.addClass(aBtmBtns[iNow],'active');
							setTimeout(function(){
								myLab.addClass(aLi[iNow],'showTxt');
							},200);
							canClick = true;
							
							//2015.7.18
							if(bannerTxtLi!=null){
								$(bannerTxtLi).eq(iNow).show().siblings().hide();
								
								/*for(var i=0; i<bannerTxtLi.length; i++){
									myLab.removeClass(bannerTxtLi[i],'ac');	
								}
								setTimeout(function(){
									myLab.addClass(bannerTxtLi[iNow],'ac');
								},200);*/	
							}	
						});	
					}
				}else{
					oLeftBtn.style.display = oRightBtn.style.display = oBtmBox.style.display = 'none';	
				}
			}
			
			//load banner Pics
			var ImgArr = myLab.getChildAttr(oIndexBanner, 'img', 'src');
			var spBoxH = spBox.clientHeight;
			setTimeout(function() {
				myLab.loadImgArr(ImgArr,function(percent){
				},function(){
					oLeftBtn.style.display = oRightBtn.style.display = 'none';
					myLab.startMove(oIndexBanner,{height:spBoxH},400,'def',function(){
						this.style.height = 'auto';
					});
				});
			}, 0);
		}
			
	})();
	
	//rightReportList
	;(function(){
		if(document.getElementById('rightReportList')){
			var rightReportList = document.getElementById('rightReportList');
			var oUl = rightReportList.getElementsByTagName('ul')[0];
			var aLi = rightReportList.getElementsByTagName('li');
			var lth = aLi.length;
			var iTimer = null;
			var iSpeed = 5000;
			var num = 0;
			
			if(lth>=3){
				oUl.innerHTML += oUl.innerHTML;	
				lth = aLi.length; 
			}
			
			function autoPlay(){
				clearInterval(iTimer);
				iTimer = setInterval(function(){
					num++;
					var des = aLi[0].offsetHeight*num;
					myLab.startMove(oUl,{'marginTop':-des},500,'def',function(){
						if(num>=lth/2){
							num = 0;
							oUl.style.marginTop = 0;	
						}	
					});
				},iSpeed);	
			}
			
			$(rightReportList).hover(function(){
				clearInterval(iTimer);
				//console.log('stop');
			},function(){
				autoPlay();
				//console.log('go');
			});
		}	
	})();
	
	//news
	;(function(){
		
		if(document.getElementById('new_ban')){
			var new_ban = document.getElementById('new_ban');
			var btns = myLab.getByClass(new_ban,'btns');
			if(btns.length>0){	
				var topBtn = myLab.getByClass(new_ban,'topBtn')[0];	 
				var btmBtn = myLab.getByClass(new_ban,'btmBtn')[0];	 
			}
			var newBanLists = myLab.getByClass(new_ban,'newBanLists')[0]; 
			var aLi = newBanLists.getElementsByTagName('li');
			var iNow = 0;
			var lth = aLi.length;
			var canClick = true;
			var iBoxH = new_ban.clientHeight;
			var iTimer = null;
			
			if(aLi.length>0){
				topBtn.style.display = btmBtn.style.display = 'block';
				newBanLists.innerHTML+=newBanLists.innerHTML;	
				lth = newBanLists.getElementsByTagName('li').length;
			}else{
				topBtn.style.display = btmBtn.style.display = 'none';	
			}
			
			//autoPlay
			function autoPlay(){
				clearInterval(iTimer);
				iTimer = setInterval(function(){
					topFn();
				},5000)	
			}
			autoPlay();
			
			$(new_ban).hover(function(){
				clearInterval(iTimer);
			},function(){
				autoPlay();
			})
			
			//topFn
			function topFn(){
				if(!canClick){return false;}
				canClick = false;
				iNow++;	
				doSport();	
			}
			myLab.bindEvent(topBtn,'click',function(){
				topFn();
			});
			
			//btmFn
			function btmFn(){
				if(!canClick){return false;}
				canClick = false;
				iNow--;
				if(iNow<0){
					iNow = (lth/2)-1;
					newBanLists.style.marginTop = -(lth/2)*iBoxH + 'px';		
				}
				doSport();	
			}
			myLab.bindEvent(btmBtn,'click',function(){
				btmFn();
			});
			
			//doSport
			function doSport(){
				var dis = -iNow*iBoxH;
				myLab.startMove(newBanLists,{'marginTop':dis},500,'def',function(){
					if(iNow==lth/2){
						iNow = 0;
						newBanLists.style.marginTop = 0;	
					}
					canClick = true;	
				});			
			}
		}
			
	})();
	
	//5.公共模块
	;(function(){
		
		//返回顶部
		if(document.getElementById('myReturnTop')){
			var myReturnTop = document.getElementById('myReturnTop');
			myReturnTop.onclick = function(){
				scrollToTar.toTop();	
			}
			
			function showTheBtn(){
				if(getOffsetPos(myReturnTop).t<viewH()){
					myReturnTop.style.display = 'none';	
				}else{
					myReturnTop.style.display = 'block';	
				}	
			}
			showTheBtn();
			
			myLab.bindEvent(window,'resize',function(){
				showTheBtn();	
			});
			myLab.bindEvent(window,'scroll',function(){
				showTheBtn();	
			});			
		}
		
	})();
	
	//6.视频
	;(function(){
		if(document.getElementById('indexVideo') && document.getElementById('videoList')){
			var indexVideo = document.getElementById('indexVideo');
			var videoBtmTxt = document.getElementById('videoBtmTxt');
			
			//videoList
			var videoList = document.getElementById('videoList');
			var pages = myLab.getByClass(videoList,'pages');
			var aDl = videoList.getElementsByTagName('dl');
			var btnTop = myLab.getByClass(videoList,'btnTop')[0];
			var btnBtm = myLab.getByClass(videoList,'btnBtm')[0];
			var lth = pages.length;
			var spBox = myLab.getByClass(videoList,'spBox')[0]; 
			var num = 0;
			
			if(lth>1){
				myLab.bindEvent(btnBtm,'click',function(){
					num++;
					if(num>lth-1){
						num = lth-1;	
					}
					spMoveFn();
				});	
				
				myLab.bindEvent(btnTop,'click',function(){
					num--;
					if(num<0){
						num = 0;	
					}
					spMoveFn();
				});	
			}
			function spMoveFn(){
				var des = num * 497;
				myLab.startMove(spBox,{marginTop:-des},500,'def');
			}
			
			var indexVideoEle = document.getElementById('indexVideoEle');
			var indexVideoPic = document.getElementById('indexVideoPic');
			/*2015.12.29 注释*/
			/*for(var i=0; i<aDl.length; i++){
				aDl[i].index = i;
				myLab.bindEvent(aDl[i],'click',function(){
					var tar = this;
					var _index = tar.index;
					
					if(myLab.hasClass(tar,'active')){
						return false;	
					}					
					for(var i=0; i<aDl.length; i++){
						myLab.removeClass(aDl[i],'active');	
					}
					myLab.addClass(aDl[_index],'active');	
					videoBtmTxt.innerHTML = tar.getElementsByTagName('dd')[0].innerHTML;
					
					if(document.getElementById('indexVideoEle')){
						indexVideoPic.src = 'images/video/indexVideo/new/hxVideoPic'+(_index+1)+'.jpg';
						indexVideoEle.setAttribute('poster','/images/video/indexVideo/new/hxVideoPic'+(_index+1)+'.jpg');
						indexVideoEle.innerHTML = "\
							<source src='/images/video/indexVideo/new/hxVideo"+(_index+1)+".ogv' type='video/ogg'/>\
							<source src='/images/video/indexVideo/new/hxVideo"+(_index+1)+".webm' type='video/webm' >\
							<source src='/images/video/indexVideo/new/hxVideo"+(_index+1)+".mp4' type='video/mp4'>\
						";
						indexVideoEle.load && indexVideoEle.load();
					}
					
					//切换FLASH
					if(document.getElementById('cq') && document.getElementById('cq1')){
						var cq = document.getElementById('cq');
						var cq1 = document.getElementById('cq1'); 
						var flvPic = myLab.getByClass(indexVideo,'flvPic')[0];
						
						indexVideoPic.style.display = 'none';
						if(_index==0){
							cq.style.display = 'block';
							cq.videoStart && cq.videoStart('/images/video/indexVideo/new/hxVideo1.flv');
							cq1.style.display = 'none';
							cq1.videoStop && cq1.videoStop('/images/video/indexVideo/new/hxVideo2.flv');
						}else if(_index==1){
							cq1.style.display = 'block';
							cq1.videoStart && cq1.videoStart('/images/video/indexVideo/new/hxVideo2.flv');
							cq.style.display = 'none';
							cq.videoStop && cq.videoStop('/images/video/indexVideo/new/hxVideo1.flv');
						}
						setTimeout(function(){
							if(swfBoxesId.setHt){
								if(num==0){
									swfBoxesId = document.getElementById('cq');	
								}else if(num==1){
									swfBoxesId = document.getElementById('cq1');	
								}
								
								var _h = indexVideo.clientHeight;	
								swfBoxesId.setHt(_h);	
								flvPic.style.height = _h + 'px'; 
							}
						},500);
					}
				});	
			}*/
			
			if(myLab.getByClass(indexVideo,'flvPic').length>0){
				var flvPic = myLab.getByClass(indexVideo,'flvPic')[0];
				var h5Video = $('#indexVideoEle');
				var iTimer = null;
				var swfBoxesId = null;
				var videoBtm = document.getElementById('videoBtm');
				
				//flash 固定播放盒子 resize
				if(document.getElementById('cq')){
					myLab.addClass(videoBtm,'videoBtmIE8');
					
					if(num==0){
						swfBoxesId = document.getElementById('cq');	
					}else if(num==1){
						swfBoxesId = document.getElementById('cq1');	
					}
					
					function resizeFlashH(){
						if(swfBoxesId.setHt){
							if(num==0){
								swfBoxesId = document.getElementById('cq');	
							}else if(num==1){
								swfBoxesId = document.getElementById('cq1');	
							}
							
							var _h = indexVideo.clientHeight;	
							swfBoxesId.setHt(_h);	
							flvPic.style.height = _h + 'px'; 
						}
					}
					resizeFlashH();
					
					$(window).bind('resize',function(){
						clearTimeout(iTimer)
						iTimer = setTimeout(function(){
							resizeFlashH();
						},500);
					})	
				}
				
				myLab.bindEvent(flvPic,'click',function(){
					this.style.display = 'none';
					//flash
					if(document.getElementById('cq')){
						if(num==0){
							swfBoxesId = document.getElementById('cq');	
						}else if(num==1){
							swfBoxesId = document.getElementById('cq1');	
						}
						
						//swfBoxesId.videoStart && swfBoxesId.videoStart('http://test.agenda-bj.com.cn/wy/okflash/videos/video1.flv');
						swfBoxesId.videoStart && swfBoxesId.videoStart('/images/video/indexVideo/new/hxVideo'+(num+1)+'.flv');
						setTimeout(function(){
							resizeFlashH();
						},500);
					}
					//h5
					if(h5Video.length>0){
						h5Video.get(0).play && h5Video.get(0).play(); 
					}
				});
				
				if(!document.getElementById('cq')){
					setInterval(function(){
						if(h5Video.get(0).paused){
							flvPic.style.display = videoBtm.style.display = 'block';
						}else{
							flvPic.style.display = videoBtm.style.display ='none';
						}	
					},30)
				};
				
				/*if(document.getElementById('cq')){
					//var flashBody = document.getElementById('cq');	
					myLab.bindEvent(indexVideo,'click',function(){
						alert(1);
					});	
				}*/
			}	
		}	
	})();

});	
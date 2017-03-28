// JavaScript Document

$(document).ready(function(){

	/**
	 * 页面 头部 模块加载
	 * From Jerry
	 * Time: 2015-06-03
	 */
	$('#headbox').load("/ajax/head.html", function(){

		//修改img标签图片路劲
		/*
		$('.changePath_head').each(function(){
			$(this).attr('src', pathRoot+$(this).attr('src'))
		});
		*/

		if(document.getElementById('menuBox') && document.getElementById('head') && document.getElementById('sonMenuBox')){
			var oHead = $('#head');
			var headbox = $('#headbox')
			var menu_area = oHead.find('.menu_area');
			var menuBox = $('#menuBox');
			var aLi = menuBox.find('li');
			var hasNav = menuBox.find('.hasNav');
			var sonMenuBox = $('#sonMenuBox');
			var sonMenu = sonMenuBox.find('.sonMenu');
			var iTimer = null;
			var isPhone = false;
			//是否为PAD
			var isPad = myLab.isPad();
			
			for(var i=0; i<hasNav.length; i++){
				hasNav.get(i).sonIndex = i;
			}
			//aLi
			aLi.bind('mouseover',function(){
				//isPhone
				if(isPhone){return false;}
				
				var _tar = $(this);
				var _index = _tar.index();

				clearTimeout(iTimer);
				iTimer = setTimeout(function(){
					if(!_tar.hasClass('active')){
						_tar.addClass('active').siblings().removeClass('active');
						if(_tar.hasClass('hasNav')){
							var sonIndex = _tar.get(0).sonIndex;
							sonMenu.eq(sonIndex).stop(true,false).slideDown(300).siblings().stop(true,false).slideUp(300);
						}else{
							sonMenu.stop(true,false).slideUp(300);
						}
					}
				},300);
			});
			aLi.bind('mouseout',function(){
				//isPhone
				if(isPhone){return false;}
				
				var _tar = $(this);
				var _index = _tar.index();

				clearTimeout(iTimer);
				iTimer = setTimeout(function(){
					if(_tar.hasClass('active')){
						_tar.removeClass('active');
						sonMenu.stop(true,false).slideUp(300);
					}
				},300);
			});
			
			//aLi isPad 
			if(isPad){
				aLi.bind('click',function(){
					var _tar = $(this);
					var _index = _tar.index();
	
					clearTimeout(iTimer);
					iTimer = setTimeout(function(){
						if(!_tar.hasClass('active')){
							_tar.addClass('active').siblings().removeClass('active');
							if(_tar.hasClass('hasNav')){
								var sonIndex = _tar.get(0).sonIndex;
								sonMenu.eq(sonIndex).stop(true,false).slideDown(300).siblings().stop(true,false).slideUp(300);
							}else{
								sonMenu.stop(true,false).slideUp(300);
							}
						}else{
							_tar.removeClass('active');
							sonMenu.stop(true,false).slideUp(300);
						}
					},300);
				});	
			}

			//sonMenuBox
			sonMenuBox.bind('mouseover',function(){
				//isPhone
				if(isPhone){return false;}
				
				clearTimeout(iTimer);
			});
			sonMenuBox.bind('mouseout',function(){
				//isPhone
				if(isPhone){return false;}
				
				clearTimeout(iTimer);
				iTimer = setTimeout(function(){
					aLi.removeClass('active');
					sonMenu.stop(true,false).slideUp(300);
				},300);
			});

			//menu_area
			menu_area.bind('mouseout',function(){
				//isPhone
				if(isPhone){return false;}
				
				clearTimeout(iTimer);
				iTimer = setTimeout(function(){
					aLi.removeClass('active');
					sonMenu.stop(true,false).slideUp(300);
				},300);
			});
			
			//------------------------[ 移动端菜单点击 ]
			var menuOpenBtn = $('#head .menuOpenBtn');
			var searchBtn = $('#head .searchBtn');
			var search_area = $('#head .search_area'); 
			var sonMenuBox_c = $('#head .sonMenuBox_c'); 
			var phoneTitSkill = $('#head .phoneTitSkill'); 
			var listMenus = $('#head .listMenu');  
			
			searchBtn.bind('click',function(){
				var _tar = $(this);
				if(_tar.hasClass('searchBtnOn')){
					//search_area.removeClass('search_area_show');
					 search_area.slideUp(300);
					_tar.removeClass('searchBtnOn');
				}else{
					//search_area.addClass('search_area_show');
					sonMenuBox_c.slideUp(300);
					menuOpenBtn.removeClass('menuOpenBtnOn');
					
					 search_area.slideDown(300);
					_tar.addClass('searchBtnOn');	
				}
			});
			
			menuOpenBtn.bind('click',function(){
				var _tar = $(this);
				if(_tar.hasClass('menuOpenBtnOn')){
					//sonMenuBox_c.removeClass('sonMenuBox_c_show');
					sonMenuBox_c.slideUp(300);
					_tar.removeClass('menuOpenBtnOn');
				}else{
					//sonMenuBox_c.addClass('sonMenuBox_c_show');
					search_area.slideUp(300);
					searchBtn.removeClass('searchBtnOn');	
				
					sonMenuBox_c.slideDown(300);
					_tar.addClass('menuOpenBtnOn');	
				}
			});
			
			for(var i=0; i<phoneTitSkill.length; i++){
				phoneTitSkill.get(i).index = i;
			}	
			phoneTitSkill.bind('click',function(){
				var _tar = $(this);
				var _index = _tar.get(0).index;
				var _menu = _tar.siblings('.listMenu');
				if(_menu.length!=1){return false;}
				if(_tar.hasClass('phoneTit_ac')){
					//_menu.removeClass('listMenu_ac');
					
					_tar.removeClass('phoneTit_ac');
					_menu.slideUp(300);
				}else{
					//_menu.addClass('listMenu_ac');
					
					//_tar.addClass('phoneTit_ac');	
					phoneTitSkill.removeClass('phoneTit_ac').eq(_index).addClass('phoneTit_ac');
					//_menu.slideDown(300);
					listMenus.slideUp(300).eq(_index).slideDown(300);
				}
			});
			
			//------------------------[ 移动端/PC 切换  ]
			//是否为手机  通过媒体查询查找样式来判断，不然IE7 对resize会出错误
			function phoneStatueFn(){
				var _w = myLab.viewW();
				if(_w<=640){
					if(!isPhone){
						setTimeout(function(){
							sonMenu.show();
							//listMenus
							phoneTitSkill.removeClass('phoneTit_ac');
							listMenus.hide();
							//search_area sonMenuBox_c
							searchBtn.removeClass('searchBtnOn');
							menuOpenBtn.removeClass('menuOpenBtnOn');
							search_area.add(sonMenuBox_c).hide();
						},300);
						isPhone = true;
					}	
				}else{
					if(isPhone){
						setTimeout(function(){
							sonMenu.hide();
							//listMenus
							listMenus.show();
							//search_area sonMenuBox_c
							search_area.add(sonMenuBox_c).show();
						},300);   
						isPhone = false;	
					}
				}	
			}
			phoneStatueFn();
			myLab.bindEvent(window,'resize',function(){
				phoneStatueFn();
			});
			
			/*导航高亮*/
			var nowUrl = window.location.href;
			if(nowUrl.indexOf('aboutus')!=-1 || nowUrl.indexOf('news')!=-1){
				aLi.eq(1).addClass('').siblings().removeClass('onChannel');	
			} 
			if(nowUrl.indexOf('business_products')!=-1){
				aLi.eq(3).addClass('').siblings().removeClass('onChannel');	
			}
			if(nowUrl.indexOf('business_model')!=-1){
				aLi.eq(2).addClass('').siblings().removeClass('onChannel');	
			} 	
			if(nowUrl.indexOf('ir')!=-1){
				aLi.eq(3).addClass('').siblings().removeClass('onChannel');	
			} 
			
			/*子导航高亮 6.14*/
			if((typeof sonNavAc).toLowerCase()!='undefined' && sonNavAc!=''){
				if($(sonNavAc).length>0){
					$(sonNavAc).addClass('active');	
				}
			}
		}
		
		//搜索条
		$('#headSearchInput').bind('focus',function(){
			var _tar = $(this);
			if(_tar.val()=='搜索'){
				_tar.val('');	
			}	
		});
		$('#headSearchInput').bind('blur',function(){
			var _tar = $(this);
			if(_tar.val()==''){
				_tar.val('搜索');	
			}	
		});
	});


	/**
	 * 页面 底部 模块加载
	 * From Jerry
	 * Time: 2015-06-03
	 */
	$('#footbox').load("/ajax/foot.html", function(){

		//修改img标签图片路劲
		/*
		$('.changePath_foot').each(function(){
			$(this).attr('src', pathRoot+$(this).attr('src'))
		});
		*/

	});


	/**
	 * 页面返回顶部ICON
	 * From Jerry
	 * Time: 2015-06-02
	 */
	(function(){
		if ( document.getElementById('jerry_totop') ) {
			var oTop = $('#jerry_totop'),
				oNewsWrap = $('.news_wrap');
			
			if($('.news_wrap').length==0){
				oNewsWrap = $('.returnTop_wrap');
			}
			
			function viewW(){
				return document.documentElement.clientWidth;
			}
			
			var resetRight = function() {
				if(viewW()>1090){
					//pc	
					//var _tar = -(parseInt(oTop.width()) + 1090/2);
					oTop.css({'right':'50%','marginRight':'-605px'});
				}else if(viewW()<=640){
					oTop.css({'right':'10px','marginRight':'0'});	
				}
			};

			oTop.on('click', function(){
				$("html,body").animate({scrollTop:0},1000);//控制滚动条滑动
			});

			$(window).on('scroll', function(ev){
				var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				if ( scrollTop > $(window).height() ) {
					oTop.addClass('active');
				} else {
					oTop.removeClass('active');
				}
			});

			$(window).on('resize', function(){ resetRight(); });
			resetRight();
		}
	})();
	
	//2015.11.22
	;(function(){
		if(document.getElementById('business_model_main')){
			var business_model_main = $('#business_model_main');
			var txtBox = business_model_main.find('.txtBox'); 
			var aH5 = txtBox.find('h5');
			var aH6 = txtBox.find('h6');
			
			aH5.on('click',function(){
				var _tar = $(this);
				var conts = _tar.siblings('.conts'); 
				if(_tar.hasClass('active')){
					_tar.removeClass('active');
					conts.slideUp(400);	
				}else{
					_tar.addClass('active');
					conts.slideDown(400);		
				}
			});
			
			aH6.on('click',function(){
				var _tar = $(this);
				var h6_conts = _tar.next('.h6_conts'); 
				if(h6_conts.length<0){return false;}
				if(_tar.hasClass('h6_active')){
					_tar.removeClass('h6_active');
					h6_conts.slideUp(400);	
				}else{
					_tar.addClass('h6_active');
					h6_conts.slideDown(400);		
				}
			});	
		}	
	})();
	
	//png IE8
	function correctPNG()
	{
		for(var i=0; i<document.images.length; i++)
			{
				var img = document.images[i]
				var imgName = img.src.toUpperCase()
				if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
				{
				var imgID = (img.id) ? "id='" + img.id + "' " : ""
				var imgClass = (img.className) ? "class='" + img.className + "' " : ""
				var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
				var imgStyle = "display:inline-block;" + img.style.cssText
				if (img.align == "left") imgStyle = "float:left;" + imgStyle
				if (img.align == "right") imgStyle = "float:right;" + imgStyle
				if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
				var strNewHTML = "<span " + imgID + imgClass + imgTitle
				+ " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
				+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
				+ "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
				img.outerHTML = strNewHTML
				i = i-1
			}
		}
	}
	//window.attachEvent("onload", correctPNG);
	//IE8
	if(document.getElementById('ie8see') && document.getElementById('indexBanner')){
		myLab.bindEvent(window,'load',correctPNG);			
	}
});
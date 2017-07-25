// 预读图
function imagePreload() 
		{
  			var imgPreload = new Image();
  			for (i = 0; i < arguments.length; i++) 
			{
    			imgPreload.src = arguments[i];
 			 }
		}
function labeloffset()
{
	document.getElementById("sideMenuControl").offsetTop = document.body.clientHeight;
}
		imagePreload('images/侧边_button_L_1.png','images/侧边_button_R.png','images/侧边_button_R_1.png');
		labeloffset();
		
function valign()
{
	var height=document.documentElement.clientHeight/2;
 	var warp=document.getElementById("sideMenuControl");
	warp.style.top=height-55+"px";
	warp.style.transition="top 0.5s ease-out";
	//warp.style.-webkit-transition="0.5s ease-out";
}
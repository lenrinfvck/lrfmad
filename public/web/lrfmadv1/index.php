<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>LRFMAD</title>
    <?php include('header.inc'); ?>
  </head>
<body onload="showTime();valign()" onunload="stopInterval()" onresize="valign()">                     
<input type='checkbox' id='sideToggle' checked="checked" />
<aside><h2>Other Page</h2>
    <ul>
        <li><input type="image" src="images/empty_1.png"  onmousemove="this.src='images/empty.png'"   onmousedown="this.src='images/empty.png'" onmouseout="this.src='images/empty_1.png'" onclick="window.open('test/Slideshow/slide.html','_blank');" title="测试页面01" /></li>
     	<li><input type="image" src="images/empty_02.png"  onmouseover="this.src='images/empty_02_1.png'"   onmousedown="this.src='images/empty_02.png'" onmouseout="this.src='images/empty_02.png'" onclick="window.open('out/index.html','_blank');" alt="" /></li>
        <li><input type="image" src="images/empty.png"  onmousemove="this.src='images/empty_1.png'"   onmousedown="this.src='images/empty.png'" onmouseout="this.src='images/empty.png'" onclick="window.open('towiko/login.php','_blank');" alt="" /></li>
        <li><input type="image" src="images/empty.png"  onmousemove="this.src='images/empty_1.png'"   onmousedown="this.src='images/empty.png'" onmouseout="this.src='images/empty.png'" onclick="window.open('test/暑期工程实践/index.html','_blank');" alt="" /></li>
     	<li><input type="image" src="images/empty.png"  onmousemove="this.src='images/empty_1.png'"   onmousedown="this.src='images/empty.png'" onmouseout="this.src='images/empty.png'" onclick="window.open('http://tieba.baidu.com/f?kw=lenrinfvck&fr=index','_blank');" alt="" /></li>
        <li><input type="image" src="images/empty.png"  onmousemove="this.src='images/empty_1.png'"   onmousedown="this.src='images/empty.png'" onmouseout="this.src='images/empty.png'" onclick="window.open('http://tieba.baidu.com/f?kw=lenrinfvck&fr=index','_blank');" alt="" /></li>
        <li><input type="image" src="images/empty.png"  onmousemove="this.src='images/empty_1.png'"   onmousedown="this.src='images/empty.png'" onmouseout="this.src='images/empty.png'" onclick="window.open('http://tieba.baidu.com/f?kw=lenrinfvck&fr=index','_blank');" alt="" /></li>
     	<li><input type="image" src="images/empty.png"  onmousemove="this.src='images/empty_1.png'"   onmousedown="this.src='images/empty.png'" onmouseout="this.src='images/empty.png'" onclick="window.open('http://tieba.baidu.com/f?kw=lenrinfvck&fr=index','_blank');" alt="" /></li>
   		</ul>
</aside>
<div id='wrap'>
     <label id='sideMenuControl' for='sideToggle'></label>
</div>

<div id="container">
<div id="frame">
    <div id="logo"><img src="images/onbuilding.gif" alt="onbuilding" /></div>
    <div id="time">
			<img id="hour1" height="24" width="22" />
			<img id="hour2"  height="24" width="22" />
			<img id="m"  height="24" width="6" />
			<img id="minute1"  height="24" width="22" />
			<img id="minute2"  height="24" width="22"/>
			<img id="second1"  height="14" width="13" />
			<img id="second2"  height="14" width="13" />
    </div>
    <div id="rbutton">
     		<ul>
               	<li class="bigbnt" id="mainbnt_02" onclick="window.open('http://tieba.baidu.com/f?kw=lenrinfvck&fr=index','_blank')"; title="百度贴吧"></li>
     			<li class="bigbnt" id="mainbnt_03" onclick="window.open('http://towiko.net/','_blank');"  title="towiko官网">	</li>
				<li class="bigbnt" id="mainbnt_01" onclick="window.open('http://space.bilibili.tv/213959','_blank');"  title="bilibili空间" /></li>
    		</ul>
    </div>
    <div id="lblank">
    		<p>	<h3>lenrinfvck homepage(HK)</h3>
    			<h4>2014 web-project</h4>
    			php+mysql登陆完成，登陆测试账号：Q 密码：Q
    			<h5 onclick="window.open('http://www.hollowings.com','_blank');" title="hollowings官网">人物图-赤印(hollowings)</h5>
    		</p>
    </div>
    <div id="bottom">
-----GayTeam|Towiko MadTeam|HentaiQsama|LenRinFvck.cn 2014-----
</div>
</div>
    <div id="login">
    <form action="login.php" method="post" target="_blank"><table class="form"><tr><th>ID</th><td>:<input type="text" name="name"/></td></tr><tr><th>PS</th><td>:<input type="password" name="password"></td></tr><tr><td  colspan="2" align="right"><input type="button" id="loginbnt" onclick="submit()"/></td></tr></table></form>
    </div>
<!--<div id="ad">
宠物暂替位<br /><br />
<a href="index.html"><img src="images/back.png"  width="128px" height="128px" title="刷新"/></a>
</div>-->
</body>
</html>
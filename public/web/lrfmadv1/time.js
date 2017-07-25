num=new Array("images/0.png","images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png","images/7.png","images/8.png","images/9.png","images/m.png","images/m_1.png");
function getDigits()
{
var time=new Date()
hour=time.getHours()
if (hour<10)
	{
	document.getElementById('hour1').src=num[0]
	h2="'" + hour + "'"
	h2=h2.charAt(1)
	document.getElementById('hour2').src=num[h2]
	}
else
	{
	h1="'" + hour + "'"
	h1=h1.charAt(1)
	document.getElementById('hour1').src=num[h1]
	h2="'" + hour + "'"
	h2=h2.charAt(2)
	document.getElementById('hour2').src=num[h2]
	}
minute=time.getMinutes()
if (minute<10)
	{
	document.getElementById('minute1').src=num[0]
	m2="'" + minute + "'"
	m2=m2.charAt(1)
	document.getElementById('minute2').src=num[m2]
	}
else
	{
	m1="'" + minute + "'"
	m1=m1.charAt(1)
	document.getElementById('minute1').src=num[m1]
	m2="'" + minute + "'"
	m2=m2.charAt(2)
	document.getElementById('minute2').src=num[m2]
	}
second=time.getSeconds()
if (second<10)
	{
	document.getElementById('second1').src=num[0]
	s2="'" + second + "'"
	s2=s2.charAt(1)
	document.getElementById('second2').src=num[s2]
	}
else
	{
	s1="'" + second + "'"
	s1=s1.charAt(1)
	document.getElementById('second1').src=num[s1]
	s2="'" + second + "'"
	s2=s2.charAt(2)
	document.getElementById('second2').src=num[s2]
	}
if (second%2)
	{
	document.getElementById('m').src=num[10]	
	}
else
    {
	document.getElementById('m').src=num[11]
	}
}
function showTime()
{
timer=setTimeout("getDigits()",10)
interval=setInterval("getDigits()",1000)
}
function stopInterval()
{
clearTimeout(timer)
clearInterval(interval)
}


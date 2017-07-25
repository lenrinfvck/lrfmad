function linkgo()
{
var link = document.getElementById("link").value;
var url;
switch(link)
{
	case "1": url='test01.html';break;
	case "2": url='test02.html';break;
	default : return false;
}
window.open(url,'_blank');
}

/*function slidable()
{
document.getElementsByClassName("slidle").onmouseover=function(){document.getElementsByClassName("slidable").style.background="#FFF";}
}
slidable();*/
/*function changecolor(event) {
            var target = event.target;
            switch (target.id) {
                case 'c1': document.body.style.backgroundColor = "#08A7CF"; break;
                case 'c2': document.body.style.backgroundColor = "#FCC"; break;
                case 'c3': document.body.style.backgroundColor = "#000"; break;
                case 'c4': document.body.style.backgroundColor = "#123"; break;
            }
        }*/
  		/*function getParameter(param)
  		{
    		var query = window.location.search;
     		var iLen = param.length;
     		var iStart = query.indexOf(param);
      		if (iStart == -1)
        	return "";
     		iStart += iLen + 1;
     		var iEnd = query.indexOf("&", iStart);
     		if (iEnd == -1)
        	return query.substring(iStart); 
    		return query.substring(iStart, iEnd);
		 }*/
		function time(){
			var time=new Date();		
			var seven=time.getDay();
			var prseven;
			switch(seven){
				case 1: prseven='Monday';break;
				case 2: prseven='Tuesday';break;
				case 3: prseven='Wednesday';break;
				case 4: prseven='Thursday';break;
				case 5: prseven='Friday';break;
				case 6: prseven='Saturday';break;
				case 0: prseven='Sunday';break;
			}
			document.getElementById("timeex").innerHTML= time.getFullYear()+'-'+ (time.getMonth()+1) +'-'+  time.getDate() +' '+ prseven;
			/*var name = decodeURIComponent(getParameter("username"));

			var text=document.getElementsByClassName("nametext");
			for(i=0;i<text.length;i++){
				text.item(i).innerHTML=name;
			}*/
		}
var ON=new Object();
var on=new Object();
var ONcont;
var oncont;
function setClass(element,classname){
	element.className=classname;
}
function selected(event){
	var target = event.target;
	if(ONcont==undefined){
		ONcont=document.getElementById("contidx");
	}
	if(target!=ON){
		switch(target.id){
			/*case 'nav1': tarcont=document.getElementById("contid0");setClass(target,'tagon');setClass(ON,'tag');ON=target;setClass(tarcont,'conton');setClass(ONcont,'cont');ONcont=tarcont;break;
			case 'nav2': tarcont=document.getElementById("contid1");setClass(target,'tagon');setClass(ON,'tag');ON=target;setClass(tarcont,'conton');setClass(ONcont,'cont');ONcont=tarcont;break;
			case 'nav3': tarcont=document.getElementById("contid2");setClass(target,'tagon');setClass(ON,'tag');ON=target;setClass(tarcont,'conton');setClass(ONcont,'cont');ONcont=tarcont;break;*/
			default: 	
				if(oncont==undefined){
					oncont=document.getElementById("contid11");
					on=document.getElementById("nav11");
				}
				if(target!=on){
							switch(target.id){
								case 'nav11':tarcont=document.getElementById("contid11");setClass(target,'tagoninfo');setClass(on,'taginfo');on=target;setClass(tarcont,'conton');setClass(oncont,'cont');oncont=tarcont;break;
								case 'nav12':tarcont=document.getElementById("contid12");setClass(target,'tagoninfo');setClass(on,'taginfo');on=target;setClass(tarcont,'conton');setClass(oncont,'cont');oncont=tarcont;break;
								case 'nav13':tarcont=document.getElementById("contid13");setClass(target,'tagoninfo');setClass(on,'taginfo');on=target;setClass(tarcont,'conton');setClass(oncont,'cont');oncont=tarcont;break;
							}
						};break;
		}
	}
}
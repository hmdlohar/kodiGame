function kodiGame(currSvg,numNow,kodiContainer,homeWords=["red","green","blue","yellow"]){
	var s=Snap(currSvg);
	//var numNow=$("#numNow")[0];
	var currentMove=0;
	var doubleMove=false;
	var noAnalyze=false;
	var killFlag=false;
	var onTrhow=function(){console.log("onTrhow is not set");}
	var onTrhowReady=function(){console.log("onTrhowReady is not set");}
	s.attr({
		stroke: "#101010",
		strokeWidth:2,
		padding:"5px",
		viewBox: "0,0,1000,1000"
	});
	var lineAttr={stroke:"#101010",strokeWidth:2,fill:"red"};
	var pathAttr={stroke:"#101010",strokeWidth:15,fill:"none",opacity:0.3};
	var allPoints=[];
	for(i=0;i<=1005;i+=200){
		s.line(i,0,i,1000).attr(lineAttr);
		s.line(0,i,1000,i).attr(lineAttr);
	}
	for(i=100;i<=900;i+=200){
		for(j=100;j<=900;j+=200){
			allPoints.push({"x": i,"y": j});
		}
	}
	for(i in allPoints){
		//s.text(allPoints[i].x,allPoints[i].y,i);
	}
	var paths={
		"red":[10,15,20,21,22,23,24,19,14,9,4,3,2,1,0,5,6,7,8,13,18,17,16,11,12],
		"green":[22,23,24,19,14,9,4,3,2,1,0,5,10,15,20,21,16,11,6,7,8,13,18,17,12],
		"blue":[14,9,4,3,2,1,0,5,10,15,20,21,22,23,24,19,18,17,16,11,6,7,8,13,12],
		"yellow": [2,1,0,5,10,15,20,21,22,23,24,19,14,9,4,3,8,13,18,17,16,11,6,7,12]
	};

	var homes={"red":10,"green":22,"blue":14,"yellow":2};
	//var homeWords=["red","green","blue"];
	var rectWords=["red","green","blue","yellow","white"];
	var homes1=[10,22,14,2,12];
	var homes3=[10,22,14,2];
	var players=homeWords.length;
	var kodiNums=[1,2,3,4,8,1,2,3,4,8,1,2,3,4,8,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,1,2,1,2,3,4,8];
	var circles=[];
	var mainXY=allPoints[12];
	s.path("M " + mainXY.x +" ,"+mainXY.y+", "+(mainXY.x-100)+", "+(mainXY.y-100)+", "+(mainXY.x-100)+", "+(mainXY.y+100)).attr({fill:"yellow","opacity":0.3});
	s.path("M " + mainXY.x +" ,"+mainXY.y+", "+(mainXY.x+100)+", "+(mainXY.y-100)+", "+(mainXY.x-100)+", "+(mainXY.y-100)).attr({fill:"red","opacity":0.3});
	s.path("M " + mainXY.x +" ,"+mainXY.y+", "+(mainXY.x-100)+", "+(mainXY.y+100)+", "+(mainXY.x+100)+", "+(mainXY.y+100)).attr({fill:"blue","opacity":0.3});
	s.path("M " + mainXY.x +" ,"+mainXY.y+", "+(mainXY.x+100)+", "+(mainXY.y-100)+", "+(mainXY.x+100)+", "+(mainXY.y+100)).attr({fill:"green","opacity":0.3});
	var mainPoints={
		"yellow":[{x: mainXY.x-33,y:mainXY.y},{x: mainXY.x-75,y:mainXY.y},{x: mainXY.x-75,y:mainXY.y-40},{x: mainXY.x-75,y:mainXY.y+40}],
		"blue":[{x: mainXY.x,y:mainXY.y+33},{x: mainXY.x,y:mainXY.y+75},{x: mainXY.x-40,y:mainXY.y+75},{x: mainXY.x+40,y:mainXY.y+75}],
		"green":[{x: mainXY.x+33,y:mainXY.y},{x: mainXY.x+75,y:mainXY.y},{x: mainXY.x+75,y:mainXY.y-40},{x: mainXY.x+75,y:mainXY.y+40}],
		"red":[{x: mainXY.x,y:mainXY.y-33},{x: mainXY.x,y:mainXY.y-75},{x: mainXY.x-40,y:mainXY.y-75},{x: mainXY.x+40,y:mainXY.y-75}]
	};
	var ai=0;
	for(h of homes1){
		//console.log(h);
		s.line(allPoints[h].x-100,allPoints[h].y-100,allPoints[h].x+100,allPoints[h].y+100).attr(lineAttr);
		s.line(allPoints[h].x+100,allPoints[h].y-100,allPoints[h].x-100,allPoints[h].y+100).attr(lineAttr);
		s.rect(allPoints[h].x-100,allPoints[h].y-100,200,200).attr({"fill":rectWords[ai],"opacity":0.2});

		if(ai <4){
			var ar=paths[rectWords[ai]];
			//console.log(allPoints[ar[13]]);
			var x=allPoints[ar[13]].x;
			var y=allPoints[ar[13]].y;
			var pathStr="M"+x+" "+y;
			for(var j=13;j<17;j++){
				x=allPoints[ar[j]].x;
				y=allPoints[ar[j]].y;
				pathStr+=" "+x+" "+y;
				//s.circle(,,3).attr("fill","pink");

			}
			var path=s.path(pathStr).attr(pathAttr).attr("stroke",rectWords[ai]);
			path.node.style.markerEnd="url(#markerArrow)";
		}
		ai++;
	}


	// p is color name
	for(p in paths){
		if(homeWords.indexOf(p)<0){
			continue;
		}
		for(i=0;i<=3;i++){
			var c=s.circle(allPoints[paths[p][0]].x,allPoints[paths[p][0]].y,50).attr({"fill":p,"stroke":"none","data-current-pos":0,"data-color":p,"display":"none"});
			//paths[p].push(c);
			circles.push(c);
		}
	}
	/*
	var kodiG=s.g();
	kodiG.attr({"id":"kc"})
	var homeXY=allPoints[12];
	kodiG.add(s.image("kodiImage/kodifalse.png",homeXY.x,homeXY.y,100,100));
	kodiG.add(s.image("kodiImage/kodifalse.png",homeXY.x-100,homeXY.y,100,100));
	kodiG.add(s.image("kodiImage/kodifalse.png",homeXY.x,homeXY.y-100,100,100));
	kodiG.add(s.image("kodiImage/kodifalse.png",homeXY.x-100,homeXY.y-100,100,100));
	*/

	function addKc(){
		var homeXY=allPoints[12];
		var fo=document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
		fo.setAttribute("x",homeXY.x-100);
		fo.setAttribute("y",homeXY.y-100);
		fo.setAttribute("height",200);
		fo.setAttribute("width",200);
		fo.innerHTML=kc.outerHTML;
		kc.remove();
		s.node.appendChild(fo);
	}	
	
	

	kodiGame.prototype.startGame = function(){
		for(h of homeWords){
			for(c of circles){
				if(c.attr("data-color")==h){
					c.attr("display","block");
				}
			}
		}
		numNow.disabled=false;
		analyzeHomes();
		allowMove();
	}
	kodiGame.prototype.throwKodi = function(e){
		numNow.disabled=true;
		//console.log(e);
		changeNumNow();
	}
	kodiGame.prototype.setOnThrow = function(func){
		onTrhow=func;
	}	
	kodiGame.prototype.setOnTrhowReady = function(func){
		onTrhowReady=func;
	}

	function allowMove(){
		var color=homeWords[currentMove%players];	
		//numNow.style.backgroundColor=color;
		onTrhowReady(color);
	}
	function currentColorPoss(){
		var color=homeWords[currentMove%players];
		var arr=[];
		for(c of circles){
			if(c.attr("data-color")==color){
				var pos=getCurrentPoint(c);
				if(!isHome(pos)){
					arr.push(c.attr("data-current-pos"));
				}
			}
		}
		return arr;
	}
	function findRand(){
		var rand=Math.floor(Math.random()*kodiNums.length);
		//var poss=currentColorPoss();
		
		return rand;
	}
	function arrRand(){
		var arr=[];
		var total=0;
		for(i=0;i<4;i++){
			var t=Math.floor(Math.random() *2);
			arr.push(Boolean(t));
			total+=t;
		}
		var rand=0;
		if(total==0){
			rand=8;
		}
		else{
			rand=total;
		}
		return {arr:arr,rand:rand};
	}
	function changeNumNow(){
		var arRand=arrRand();
		var rand=arRand.rand;
		onTrhow(rand,arRand.arr);
		//console.log(rand,arRand.arr);
		numNow.value=rand;
		if(rand==4 || rand==8){
			console.log("dbl");
			doubleMove=true;
		}
		var color=homeWords[currentMove%players];
		var clickStatus=0;
		for(c of circles){
			if(c.attr("data-color")==color){
				var st=addClickListner(c);
				if(st){
					clickStatus++;
				}
			}
		}
		if(clickStatus == 0){
			for(c of circles){
				if(c.attr("data-color")==color){
					removeClickListner(c);
				}
			}
			nextMove();
		}
	}
	function nextMove(){
		currentMove++;
		allowMove();
	}
	function moveByValue(e){
		var val=parseInt(numNow.value);
		moveCircle(Snap(this),val);
	}
	function moveCircle(circle,t){
		var f=parseInt(circle.attr("data-current-pos"));
		t=f+t;
		var color=circle.attr("data-color");
		//console.log(circle,color,f,t);
		moveCircleCore(circle,color,f,t);
	}
	function killCircle(circle){
		var f=parseInt(circle.attr("data-current-pos"));
		var color=circle.attr("data-color");
		moveCircleCore(circle,color,f,0,true);
	}
	function moveCircleCore(circle,color,f,t,manual=false){
		//console.log("manual",manual);
		for(c of circles){
				if(c.attr("data-color")==color){
					removeClickListner(c);
				}
			}
		if(t==f){
			analyzeHomes(manual);
			for(c of circles){
				if(c.attr("data-color")==color){
					removeClickListner(c);
				}
			}
			if(!manual){
				if(!doubleMove){
					nextMove();
					console.log("turn change");
					//console.log("manual",manual);
				}
				else if(!manual){
					doubleMove=false;
					var color=homeWords[currentMove%players];
					onTrhowReady();
				}
			}
			if(!manual){
				numNow.disabled=false;
			}
			return;
		}
		if(t < f){
			f--;
		}
		else{
			f++;
		}
		var speed=manual?50:200;
		
		if(!manual){
			playAudio("move");
		}
		else{
			playAudio("kill");
		}

		circle.animate({cx:allPoints[paths[color][f]].x,cy:allPoints[paths[color][f]].y},speed,null,function(){
				circle.attr("data-current-pos",f);
				moveCircleCore(circle,color,f,t,manual);
		});
	}
	function getCurrentPoint(circle){
		var color=circle.attr("data-color");
		var pos=circle.attr("data-current-pos");
		return paths[color][pos];
	}
	function addClickListner(circle){
		var posNow=parseInt(circle.attr("data-current-pos"));
		var num=parseInt(numNow.value);
		if(24-num <posNow){
			return false;
		}
		circle.attr({"stroke":"black","strokeWidth":"3","r":"45","onclick1":"moveByValue(this)","filter":"url(#shadow)"});
		circle.node.ontouchstart=moveByValue;
		return true;
	}
	function removeClickListner(circle){
		circle.attr({"stroke":"none","strokeWidth":"2","onclick1":"null","filter":"none"});
		circle.node.ontouchstart=null;
	}



	function PointOutPath(color){
		for(i in color){
			s.text(allPoints[color[i]].x,allPoints[color[i]].y,i);
		}
	}

	function adjustHomes(point,cs){
		if(cs.length <=1){
			return;
		}
		if(cs.length >4){
			console.log("its fore");
			var p=allPoints[point];
			var points=[{x: p.x,y: p.y-60},{x: p.x,y: p.y+60},{x: p.x-60,y: p.y},{x: p.x+60,y: p.y},{x: p.x+60,y: p.y+60},{x: p.x+60,y: p.y-60},{x: p.x-60,y: p.y-60},{x: p.x-60,y: p.y+60}];
			for(x of points){
			var c=cs.pop();
			if(c){
					c.animate({cx:x.x,cy:x.y,r:30},200);
					//console.log({cx:x.x,cy:x.y,r:20},500);
				}
			}
			return;
		}
		var p=allPoints[point];
		var points=[{x: p.x,y: p.y-60},{x: p.x,y: p.y+60},{x: p.x-60,y: p.y},{x: p.x+60,y: p.y}];
		
		for(x of points){
			var c=cs.pop();
			if(c){
				c.animate({cx:x.x,cy:x.y,r:30},200);
				//console.log({cx:x.x,cy:x.y,r:20},500);
			}
		}
	}
	function adjustOthers(point,cs){
		if(cs.length<=1){
			return;
		}
		var cColor="";
		var killFlag=false;
		for(c of cs){
			var dColor=c.attr("data-color");
			if(cColor==""){
				cColor=dColor;
			}
			if(cColor != dColor){
				killFlag=true;
			}
		}
		var color=homeWords[currentMove%players];
		for(c of cs){
			if(c.attr("data-color")!=color && cs.length > 1){
				//console.log("kill",c);
				if(killFlag){
					doubleMove=true;
					killCircle(c);
					
					//noAnalyze=true;
					return;
				}
				
			}
		}

		var p=allPoints[point];
		var points=[{x: p.x,y: p.y-60},{x: p.x,y: p.y+60},{x: p.x-60,y: p.y},{x: p.x+60,y: p.y}];
		
		for(x of points){
			var c=cs.pop();
			if(c){
				c.animate({cx:x.x,cy:x.y,r:30},200);
				//console.log({cx:x.x,cy:x.y,r:20},500);
			}
		}
	}	
	function adjustMain(point,cs){
		for(c of cs){
			if(c.attr("r") != "15"){
				var cpt=mainPoints[c.attr("data-color")].pop();
				c.attr({cx:cpt.x,cy:cpt.y,r:15});
				if(mainPoints[c.attr("data-color")].length==0){
					alert(c.attr("data-color"),"won");
				}
				doubleMove=true;
			}
		}
	}
	function isHome(num){
		for(h of homes3){
			if(h==num){
				return true;
			}
		}
		return false;
	}
	function isMain(num){
		if(num == homes1[4]){
			return true;
		}
		return false;
	}
	function analyzeHomes(noOthers=false) {
		arr=[];
		for(c of circles){
			if(arr[getCurrentPoint(c)+"n"]!=undefined){
				arr[getCurrentPoint(c)+"n"].push(c);
			}
			else{
				arr[getCurrentPoint(c)+"n"]=[c];
			}
		}
		for(a in arr){
			var point=parseInt(a);
			var flag=false;
			if(isHome(point)){
				adjustHomes(h,arr[a]);
			}
			else if(!noOthers){	
				//console.log(point,"its pont",arr[a]);
				if(!isMain(point)){
					adjustOthers(point,arr[a]);
				}
				else{
					adjustMain(point,arr[a]);
				}
			}
		}
	}


}








//保存定时时间
var time=0;
//设置是否暂停标志，true表示暂停
var pause=true;
//设置定时函数
var set_timer;
//保存大DIV当前装的小DIV的编号
var d=new Array(10);
//保存大DIV编号的可移动位置编号
var d_direct=new Array(
	[0],//第一个元素不用
	[2,4],//大DIV编号为1的DIV可以去的位置，第一块可以去2,4号位置
	[1,3,5],//2
	[2,6],//3
	[1,5,7],//4
	[2,4,6,8],//5
	[3,5,9],//6
	[4,8],//7
	[5,7,9],//8
	[6,8]//9
);
//大IDV编号的位置
var d_posXY=new Array(
	[0],//不用
	[0,0],//第一个表示left，第二个表示top，第一块的位置：left:0px;top:0px
	[150,0],//2
	[300,0],//3
	[0,150],//4
	[150,150],//5
	[300,150],//6
	[0,300],//7
	[150,300],//8
	[300,300]//9
);
//默认按顺序排好，大DIV第九块没有，所以为0，我们用0表示空白块
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;
/*判断是否可移动函数，参数是大div编号，不是小div编号，因为小div编号
跟去哪没关系，小div是会动的*/
function whereCanTo(cur_div){
	var j=0;
	var move_flag=false;
	//遍历所有可能去的位置
	for(j=0;j<d_direct[cur_div].length;++j){
		//如果目标的值为0，说明目标位置没有装小div，则可以移动，跳出循环
		if(d[d_direct[cur_div][j]]==0){
			move_flag=true;
			break;
		}
	}
	//可以移动，则返回目标位置的编号，否则返回0，表示不可移动
	if(move_flag==true){
		return d_direct[cur_div][j];
	}else{
		return 0;
	}
}
function move(id){
	var i=1;
	//找出小DIV在大DIV中的位置
	for(i=1;i<10;++i){
		if(d[i]==id){
			break;
		}
	}
	//保存小DIV可以去的编号，0表示不能动
	var target_d=0;
	/*找出小DIV可以去的位置，如果返回0，表示不能移动，可以移动则返回
	可以去的位置的编号*/
	target_d=whereCanTo(i);
	/*如果target_d不为0，则表示可以移动，且target_d就是小div要去的大
	div的位置编号*/
	if(target_d!=0){
		/*把当前大div编号设置为0，因为当前小div已经移走，所以当前大
		div就没有装小div了*/
		d[i]=0;
		//把目标大div设置为被点击的小div的编号
		d[target_d]=id;
		//最后设置被点击的小div的位置，把它移到目标大div的位置
		document.getElementById("d"+id).style.left=
		d_posXY[target_d][0]+"px";
		document.getElementById("d"+id).style.top=
		d_posXY[target_d][1]+"px";
	}
	//设置游戏是否完成标志，true表示完成
	var finish_flag=true;
	/*从1开始，把每个大div保存的编号遍历一下，判断是否完成*/
	for(var k=1;k<9;++k){
		/*如果大div保存的编号和它本身的编号不同，则表示还不是全部按照
		顺序排，那么设置为false，跳出循环，后面就不用判断了，只要有一个
		不符，就没完成游戏*/
		if(d[k]!=k){
			finish_flag=false;
			break;
		}
	}
	/*如果为true，则表示游戏完成，如果当前没有暂停，则调用暂停函数,并
	弹出提示框，完成游戏*/
	if(finish_flag==true){
		if(!pause){
			//start()这个函数时开始，暂停一起的函数
			start();
		}
		alert("congratulation");
	}
}

//定时函数，每一秒执行一次
function timer(){
	time+=1;//一秒钟加一，单位是秒
	var min=parseInt(time/60);//把秒转换为分钟
	var sec=time%60;//取余就是秒
	//把时间更新显示出来
	document.getElementById("timer").innerHTML=min+"分"+sec+"秒";
}
//开始暂停函数
function start(){
	if(pause){
		//把按钮文字设置为暂停
		document.getElementById("start").innerHTML="暂停";
		pause=false;//暂停表示设置为false
		set_timer=setInterval(timer,1000);//启动定时
	}else{
		//如果当前是暂停，则开始
		document.getElementById("start").innerHTML="开始";
		pause=true;
		clearInterval(set_timer);
	}
}
//重置函数
function reset(){
	time=0;//把时间设置为0
	random_d();//把方块随机打乱函数
	if(pause)//如果暂停，则开始计时
		start();
}
/*随机打乱方块函数，从第九块开始，随机生成一个数，然后他们两块
对调一下*/
function random_d(){
	for(var i=9;i>1;--i){
		//产生随机数，范围为1到i，不能超出范围，因为没这个id的div
		var to=parseInt(Math.random()*(i-1)+1);
		//把当前的div位置设置为随机产生的div的位置
		if(d[i]!=0){
			document.getElementById("d"+d[i]).style.left=
			d_posXY[to][0]+"px";
			document.getElementById("d"+d[i]).style.top=
			d_posXY[to][1]+"px";
		}
		//把随机产生的div的位置设置为当前的div的位置
		if(d[to]!=0){
			document.getElementById("d"+d[to]).style.left=
			d_posXY[i][0]+"px";
			document.getElementById("d"+d[to]).style.top=
			d_posXY[i][1]+"px";
		}
		//然后把它们两个的div保存的编号对调一下
		var tem=d[to];
		d[to]=d[i];
		d[i]=tem;
	}
}
//初始化函数，页面加载的时候调用重置函数，重新开始
window.onload=function(){
	reset();
}
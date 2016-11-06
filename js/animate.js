var coreBalls=function(config){
	this.config=config||{};
	this.coreBallsEle=this.$('coreBalls');
	this.addBallsEle=this.$('addBalls');
	//console.log(this.getRotateAngle(this.coreBallsEle));
	this.bindUI();
}
coreBalls.prototype={
	$:function(id){
		var ele=document.getElementById(id);
		return ele;
	},
	getRotateAngle:function(ele) {
		var angle;
		var styleObj=window.getComputedStyle(ele);
		var matrixObj=ele.style.getPropertyValue("-webkit-transform")
						||styleObj.getPropertyValue('transform');
		var pattern=/matrix\((.*)\)/;
		if(pattern.test(matrixObj)){
			var matrix=pattern.exec(matrixObj)[1].split(',');
			// console.log(matrix);
			angle=Math.atan2(matrix[1],matrix[0])*180/Math.PI;
			if(angle<0) angle+=360;
		}else{
			pattern=/rotate\((.*)deg\)/;
			if(pattern.test(matrixObj)){
				angle=pattern.exec(matrixObj)[1];
			 }
		}
		 //console.log(angle);
		return angle;
	},
	addNewBall:function(e,_this) {
		var angleNow=_this.getRotateAngle(_this.coreBallsEle);
		var newBallNode=_this.addBallsEle.removeChild(e.target);
		_this.coreBallsEle.appendChild(newBallNode);
		var newAngle=90-angleNow;
		if(newAngle<0) newAngle+=360;
		newBallNode.style.webkitTransform='rotate('+newAngle+'deg)';
	},
	knocked:function(_this){
		var angleNow=_this.getRotateAngle(_this.coreBallsEle);
		var allCoreBallsList=_this.coreBallsEle.getElementsByTagName('LI');
		//console.log(allCoreBallsList);
		for(var i=0;i<=allCoreBallsList.length-1;i++){
			var angle=_this.getRotateAngle(allCoreBallsList[i]);
			//console.log(_this.getKnockedAngle(50,250));
			var newAngle=90-angleNow;
			if(newAngle<0) newAngle+=360;
			var flag=Math.abs(angle-newAngle)<=(_this.getKnockedAngle(50,250));
			console.log(newAngle+'--'+angle+'--'+flag);
			if(flag) return true;
		}
		return false;
	},
	getKnockedAngle:function(ballRadius,lineLong){
		return Math.ceil(2*Math.asin(ballRadius/2/lineLong)*180/Math.PI);
	},
	gameOver:function(){
		alert('U lose!Game Over!');

	},
	bindUI:function(){
		var self=this;
		this.$('addBalls').addEventListener('click', function (event) {
			//判断是否碰撞上
			var flag=self.knocked(self);
			if(!flag){
				//添加上去
				self.addNewBall(event,self);
				if(self.addBallsEle.getElementsByTagName('LI').length==0) alert('win!');
			}else
				self.gameOver();
		},true);
	},
};


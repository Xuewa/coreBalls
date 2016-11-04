var coreBalls=function(config){
	this.config=config||{};
	this.coreBallsEle=this.$('coreBalls');
	console.log(this.getRotateAngle());
}
coreBalls.prototype={
	$:function(id){
		var ele=document.getElementById(id);
		return ele;
	},
	getRotateAngle:function() {
		var style=window.getComputedStyle(this.coreBallsEle);
		var matrixObj=this.coreBallsEle.style.getPropertyValue("-webkit-transform") || style.getPropertyValue('transform');
		var matrix=/matrix\((.*)\)/g.exec(matrixObj)[1].split(',');
		// console.log(matrix);
		var angle=Math.atan2(matrix[1],matrix[0])*180/Math.PI;
		return angle;
	},
	addNewBall:function() {
	// body...
	},

};


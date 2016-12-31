function Drag(options){
	//必填并且必须是一个对象
	if( typeof options === "undefined" || options.constructor !== Object ){

		//抛出错误
		throw new Error("传入的参数错误，必须是对象");
		return;
	}

	//不能直操作传进来的对象
	this.defaults = {
		targetEle:null,
		moveEle:null
	}

	for( var attr in options ){
		if(options.hasOwnProperty(attr)){
			this.defaults[attr] = options[attr];
		}
	}

	//拖拽的目标
	//this.element是移动的目标
	if( this.defaults.moveEle ){
		this.element = this.defaults.moveEle;
	}else{
		this.element = this.defaults.targetEle;
	}

	
	this.init();
}

Drag.prototype = {
	constructor: Drag,
	init(){
		//要把一个函数的this改变为指定的值，并且不调用函数
		this.defaults.targetEle.onmousedown = this.downFn.bind(this);
	},
	downFn(ev){
		//this => 实例
		this.disX = ev.clientX - this.element.offsetLeft;
		this.disY = ev.clientY - this.element.offsetTop;

		document.onmousemove = this.moveFn.bind(this);
		document.onmouseup = this.upFn;

		ev.preventDefault();
	},
	limit(){
		if( this.x < 0 ){
			this.x = 0;
		}
		if( this.x > document.documentElement.clientWidth - this.element.offsetWidth ){
			this.x = document.documentElement.clientWidth - this.element.offsetWidth;
		}
		if( this.y < 0 ){
			this.y = 0;
		}
		if( this.y > document.documentElement.clientHeight - this.element.offsetHeight ){
			this.y = document.documentElement.clientHeight - this.element.offsetHeight;
		}
	},
	moveFn(ev){

		//限制的两个运算后的值

		this.x = ev.clientX - this.disX;
		this.y = ev.clientY - this.disY;

		this.limit();

		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	},
	upFn(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
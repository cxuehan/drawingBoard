//菜单栏
var menu = document.getElementById("menu");
for(var i = 0; i<4; i++){
    menu.children[i].children[0].onclick = function(){
        this.parentNode.children[1].style.display = "block";
    };
    for(var j = 0; j<menu.children[i].children[1].children.length; j++){
        menu.children[i].children[1].children[j].children[0].onblur = function(){
            this.parentNode.parentNode.style.display = "none";
        }
    }
}

//工具栏 
var tools = document.getElementById("tools");
var streak = document.getElementById("none");
for(var i = 0; i<tools.children.length; i++){
    tools.children[i].s = 0;
    tools.children[i].onclick = function(){
        if(this.id == "eraser"){
            streak.id = "dis";
        }
        else if(this.id == "star" || this.id == "pencil" || this.id == "line" || this.id == "rect"){
            streak.id = "streak";
        }
        else{
            streak.id = "none";
        }
        for(var j=0; j<tools.children.length; j++){
            tools.children[j].style.borderTopColor = "white";
            tools.children[j].style.borderLeftColor = "white";
            tools.children[j].style.borderBottomColor = "black";
            tools.children[j].style.borderRightColor = "black";
            tools.children[j].style.backgroundColor = "rgb(210,210,210)";tools.children[j].s = 0;
        }
        if(this.s == 0){
            this.style.borderTopColor = "black";
            this.style.borderLeftColor = "black";
            this.style.borderBottomColor = "white";
            this.style.borderRightColor = "white";
            this.style.backgroundColor = "rgb(220,220,220)";
            this.s = 1;
        }
    }
}

//调节
for(var i = 0; i<3; i++){
    streak.children[i].s = i;
    streak.children[i].onclick = function(){
        streak.s = this.s;
        this.backgroundColor = "white";
    }
}

//色板
var choose = document.getElementById("choose").children[1];
var colors = document.getElementById("colors");
for(var i = 0; i < colors.children.length; i++){
    colors.children[i].onclick = function(){
        choose.style.backgroundColor = this.id;
        choose.id = this.id;
    }
}

//画板
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var content = document.getElementById("content");

var line = document.getElementById("line");
var rect = document.getElementById("rect");
var eraser = document.getElementById("eraser");
var pencil = document.getElementById("pencil");
var down = 0;
var star = document.getElementById("star");
function drawStar(x, y, R, r){
    for(var i = 0; i<5; i++){
        var x0 = x+R*Math.cos((18+72*i)/180*Math.PI);
        var y0 = y-R*Math.sin((18+72*i)/180*Math.PI);
        var x1 = x+r*Math.cos((54+72*i)/180*Math.PI);
        var y1 = y-r*Math.sin((54+72*i)/180*Math.PI);
        var x2 = x+R*Math.cos((18+72+72*i)/180*Math.PI);
        var y2 = y-R*Math.sin((18+72+72*i)/180*Math.PI);
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = choose.id;
        switch(streak.s){
            case 0: context.lineWidth = 2;
            break;
            case 1: 
            context.lineWidth = 4;
            break;
            case 2: context.lineWidth = 8;
            break;
            default: context.lineWidth = 2;
        }
        context.lineCap = "round";
        context.stroke();
        context.closePath();
    }
}
var fill = document.getElementById("fill");

canvas.onmousedown = function(e){
    down = 1;
    context.beginPath();
    var x1 = e.pageX-83;
    var y1 = e.pageY-35;
    var disappear;
    if(eraser.s == 1 && down == 1){
        context.moveTo(x1, y1);
        canvas.onmousemove = function(event){
            if(eraser.s == 1 && down == 1){
                context.lineTo(event.pageX-83, event.pageY-35);
                switch(streak.s){
                    case 0: context.lineWidth = 4;
                    break;
                    case 1: context.lineWidth = 8;
                    break;
                    case 2: context.lineWidth = 12;
                    break;
                    default: context.lineWidth = 2;
                }
                context.strokeStyle = "white";
                context.stroke();
                context.closePath();
                context.moveTo(event.pageX-83, event.pageY-35);
            }
        }
    }
    if(pencil.s == 1 && down == 1){
        context.moveTo(x1, y1);
        canvas.onmousemove = function(event){
            if(pencil.s == 1 && down == 1){
                context.lineTo(event.pageX-83, event.pageY-35);
                switch(streak.s){
                    case 0: context.lineWidth = 2;
                    break;
                    case 1: 
                    context.lineWidth = 4;
                    break;
                    case 2: context.lineWidth = 8;
                    break;
                    default: context.lineWidth = 2;
                }
                context.strokeStyle = choose.id;
                context.stroke();
                context.closePath();
                context.moveTo(event.pageX-83, event.pageY-35);
            }
        }
    }
    canvas.onmouseup = function(e){
        down = 0;
        if(line.s == 1){
            context.moveTo(x1, y1);
            var x2 = e.pageX-83;
            var y2 = e.pageY-35;
            context.lineTo(x2, y2);
            context.strokeStyle = choose.id;
            switch(streak.s){
                case 0: context.lineWidth = 2;
                break;
                case 1: 
                context.lineWidth = 4;
                break;
                case 2: context.lineWidth = 8;
                break;
                default: context.lineWidth = 2;
            }
            context.stroke();
            context.closePath();
        }
        else if(rect.s == 1){
            var x2 = e.pageX-83-x1;
            var y2 = e.pageY-35-y1;
            context.rect(x1, y1, x2, y2);
            context.strokeStyle = choose.id;
            switch(streak.s){
                case 0: context.lineWidth = 2;
                break;
                case 1: 
                context.lineWidth = 4;
                break;
                case 2: context.lineWidth = 8;
                break;
                default: context.lineWidth = 2;
            }
            context.stroke();
            context.closePath();
        }
        else if(star.s == 1){
            var x2 = e.pageX-83;
            var y2 = e.pageY-35;
            var x = x1+(x2-x1)/3;
            var y = y1+(y2-y1)/3;
            var a = ((x2-x1)>0)?(x2-x1)/3:(x1-x2)/3;
            var b = ((y2-y1)>0)?(y2-y1)/3:(y1-y2)/3;
            var R = Math.sqrt(4*a*a+4*b*b);
            var r = R/2;
            drawStar(x, y, R, r);
        }
        else if(fill.s = 1){
            context.fillStyle = choose.id;
            context.fill();
        }
    }
}

//菜单
function menu2None(){
    for(var i=0; i<4; i++){
        menu.children[i].children[1].style.display = "none";
    }
}
    //清除
var clear = document.getElementById("clear");
clear.onclick = function(){
    context.clearRect(0, 0, 830, 450);
    menu2None();
}
    //新建
var creatNew = document.getElementById("new");
creatNew.onclick = function(){
    context.clearRect(0, 0, 830, 450);
    menu2None();
}
    //打开文件
var fl = document.getElementById("file");
fl.onclick = function(){
    var time = setInterval(function(){
        if(fl.files.length>0){
            context.clearRect(0,0,830,450);
            var file = fl.files[fl.files.length-1];
            if(!/image\/\w+/.test(file.type)){
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            var re = reader.readAsDataURL(file);
            reader.onload = function(e){
                var img = new Image();
                img.src = this.result;
                img.onload = function(){
                    context.drawImage(img, 10, 10);
                }
            }
            clearInterval(time);
        }
    },100);
    menu2None();
}
    //保存
var save = document.getElementById("save");
var img = document.getElementById("img");
save.onclick = function(){
    save.href = canvas.toDataURL();
    img.src = canvas.toDataURL();
    menu2None();
}
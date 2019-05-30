let qt;

function setup(){
   createCanvas(400,400);
   let boundary = new Rectangle(0,0,400,400);
   qt = new QuadTree(boundary, 4);
   
   for (i=0;i<40;i++){
      let p = new Point(random(width),random(height));
      qt.insert(p);
   }
   
   
   console.log(qt);   
   
   //console.log(points);
}

function draw(){
   background(0);
   qt.show();
   
   stroke(0,255,0);
   strokeWeight(1);
   let range = new Rectangle(mouseX,mouseY,width/4,height/4);
   rect(range.x, range.y, range.w, range.h);
   let points = [];
   qt.query(range,points);
   for (let p of points) {
      strokeWeight(3);
      point(p.x,p.y);
   }
   
   textSize(32);
   text(points.length, 350,50);
}


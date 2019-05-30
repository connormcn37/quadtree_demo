class Point {
   constructor(x,y){
      this.x = x;
      this.y = y;
   }
}

class Rectangle {
   constructor(x,y,w,h){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
   }
   contains(point) {
      return (point.x > this.x &&
         point.x <= this.x + this.w &&
         point.y > this.y &&
         point.y <= this.y + this.h);
   }
   intersects(range){
      return !(this.x > range.x + range.w ||
         this.x + this.w < range.x ||
         this.y > range.y + range.h ||
         this.y + this.h < range.y);
   }
}

class QuadTree {
   constructor(boundary, n){
      this.boundary = boundary;
      this.capacity = n;
      this.points = [];
      this.divided = false;
   }
   
   subdivide(){
      let nw = new Rectangle(
         this.boundary.x,
         this.boundary.y,
         this.boundary.w / 2,
         this.boundary.h / 2
      );
      this.nw = new QuadTree(nw, this.capacity);
      let ne = new Rectangle(
         this.boundary.x + this.boundary.w / 2,
         this.boundary.y,
         this.boundary.w / 2,
         this.boundary.h / 2
      );
      this.ne = new QuadTree(ne, this.capacity);
      let sw = new Rectangle(
         this.boundary.x,
         this.boundary.y + this.boundary.h / 2,
         this.boundary.w / 2,
         this.boundary.h / 2
      );
      this.sw = new QuadTree(sw, this.capacity);
      let se = new Rectangle(
         this.boundary.x + this.boundary.w / 2,
         this.boundary.y + this.boundary.h / 2,
         this.boundary.w / 2,
         this.boundary.h / 2
      );
      this.se = new QuadTree(se, this.capacity);
      this.divided = true;
   }
   
   insert(point){
      if (!this.boundary.contains(point)){
         return;
      }
      this.points.push(point);
      if (this.points.length > this.capacity){
         if(!this.divided){
            this.subdivide();
         }
         while (this.points.length > 0){
            point = this.points.pop()
            this.ne.insert(point);
            this.nw.insert(point);
            this.se.insert(point);
            this.sw.insert(point);
         }
      }
   }
   
   query(range, found){
      if (!found){
         found = [];
      }
      if (!this.boundary.intersects(range)) {
         return;
      } else {
         if (!this.divided){
            for (let p of this.points) {
               if (range.contains(p)){
                  found.push(p);
               }
            }
         } else {
            this.nw.query(range,found);
            this.ne.query(range,found);
            this.sw.query(range,found);
            this.se.query(range,found);
         }
      }
      
   }
   
   show() {
      stroke(255);
      noFill();
      strokeWeight(1);
      rect(this.boundary.x, this.boundary.y, this.boundary.w,this.boundary.h);
      
      if (this.divided) {
         this.nw.show();
         this.ne.show();
         this.se.show();
         this.sw.show();
      } else {
         for (let p of this.points){
            strokeWeight(4);
            point(p.x,p.y);
         }
      }
   }
}
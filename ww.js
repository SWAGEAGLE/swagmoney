// Stage
// Note: Yet another way to declare a class, using .prototype.

function Stage(width, height, stageElementID){
    this.actors=[]; // all actors on this stage (monsters, player, boxes, ...)
    this.player=null; // a special actor, the player

    // the logical width and height of the stage
    this.width=width;
    this.height=height;

    // the element containing the visual representation of the stage
    this.stageElementID=stageElementID;

    // take a look at the value of these to understand why we capture them this way
    // an alternative would be to use 'new Image()'
    this.blankImageSrc=document.getElementById('blankImage').src;
    this.monsterImageSrc=document.getElementById('monsterImage').src;
    this.playerImageSrc=document.getElementById('playerImage').src;
    this.boxImageSrc=document.getElementById('boxImage').src;
    this.wallImageSrc=document.getElementById('wallImage').src;
}

// initialize an instance of the game
Stage.prototype.initialize=function(){
    // Create a table of blank images, give each image an ID so we can reference it later
    var s='<table class = "table">';
    // YOUR CODE GOES HERE
    s+="</table>";
    // Put it in the stageElementID (innerHTML)
    $('#'.concat(this.stageElementID)).append(s);
    for (var i = 0 ; i < this.width ; i++){
        $(".table").append("<tr></tr>");
    }
    for(var i = 0  ; i < this.width; i++){
        for(j = 0 ; j < this.height ; j++)
            $('.table tr').eq(i).append('<td class="game"> <img class = "autosize" src =""/></td>');

    }
    // Add the player to the center of the stage
    var player = 
    {
        name: 'player',
        x : Math.floor(this.width/2),
        y : Math.floor(this.height/2)
    };
    this.player = player;
    this.addActor(player);
    this.setImage(player.x,player.y,this.playerImageSrc);
    

    // Add walls around the outside of the stage, so actors can't leave the stage
    for (var i = 1 ; i <= this.height ; i++){

        var w1 = 
            {
            name: 'wall',
            x : 1,
            y: i
            };
        this.addActor(w1);
        var w2 = 
            {
            name: 'wall',
            x : this.width,
            y: i
            };
        this.addActor(w2)
        this.setImage(w1.x,w1.y,this.wallImageSrc);
        this.setImage(w2.x,w2.y,this.wallImageSrc);
    }
        

    for (var i = 1 ; i <= this.width ; i++){
        var w1 =
            {
            name: 'wall',
            x : i,
            y: 1
            };

        var w2 = 
            {
            name: 'wall',
            x : i,
            y: this.height
            };
        this.addActor(w1);
        this.addActor(w2)
        this.setImage(w1.x,w1.y,this.wallImageSrc);
        this.setImage(w2.x,w2.y,this.wallImageSrc);
    }

    // Add some Boxes to the stage
    for (var i = 2; i < this.width ; i++){
            for (var j = 2 ; j < this.height; j++){
                if(j % 3 == 0 && i % 7 == 0){
                    var m = 
                        {
                        name: 'box',
                            x : i,
                            y: j
                        };
                    this.addActor(m);
                    this.setImage(m.x,m.y,this.boxImageSrc);
                }
            }
        }

    // Add in some Monsters
    for (var i = 2; i < this.width ; i++){
        for (var j = 2 ; j < this.height; j++){
            if(j % 6 == 0 && i % 4 == 0){
                var m = 
                    {
                        name: 'monster',
                        x : i,
                        y: j
                    };
                this.addActor(m);
                this.setImage(m.x,m.y,this.monsterImageSrc);
            }
        }
    }

        

    }
// Return the ID of a particular image, useful so we don't have to continually reconstruct IDs
Stage.prototype.getStageId=function(x,y){ return ""; }

Stage.prototype.addActor=function(actor){
    this.actors.push(actor);
}

Stage.prototype.removeActor=function(actor){
    // Lookup javascript array manipulation (indexOf and splice).
    this.actors.splice(this.actors.indexOf(actor),1);
}

// Set the src of the image at stage location (x,y) to src
Stage.prototype.setImage=function(x, y, src){
    
    $('.table tr:eq('.concat(x-1,')',' td:eq(',y-1,') img')).attr('src',src);
}
Stage.prototype.randNum=function(){
    return Math.random() * (5 - 1) + 1;
}
// Take one step in the animation of the game.  
Stage.prototype.step=function(){
    for(var i=0;i<this.actors.length;i++){
        var actor = this.actors[i];
        if(actor.name ==  "monster"){
            console.log(actor.name + " at x: " + actor.x + " y: " + actor.y );
            var movement;
            if((movement = this.monstermove(actor,0,1)) == true)//EAST
                continue;
            if((movement == "GAME OVER"))
                break;
            if((movement = this.monstermove(actor,1,0)) == true) // NORTH
                continue;
            if((movement = this.monstermove(actor,0,-1)) == true)
                continue;
            if((movement == "GAME OVER"))
                break;
            if((movement = this.monstermove(actor,-1,0)) == true)
                continue;
            if((movement == "GAME OVER"))
                break
            if((movement = this.monstermove(actor,-1,1)) == true)
                continue;
            if((movement == "GAME OVER"))
                break;
            if((movement = this.monstermove(actor,-1,-1)) == true)
                continue;
            if((movement == "GAME OVER"))
                break;
            if((movement = this.monstermove(actor,1,-1)) == true)
                continue;
            if((movement == "GAME OVER"))
                break;
            if((movement == "GAME OVER"))
                break;
            if((movement = this.monstermove(actor,1,1)) == true)
                continue;
            if((movement == "GAME OVER"))
                break;
            this.removeMonster(actor);

        }
    }
    
}

Stage.prototype.removeMonster = function(monster){
    this.setImage(monster.x,monster.y,'');
    this.removeActor(monster);



}
Stage.prototype.monstermove = function(actor,x,y){
    var adjacent = this.getActor(actor.x + x,actor.y + y);
    if(adjacent == null){
        this.move(actor,x,y,this.monsterImageSrc);
        return true;
    }

    if(adjacent.name == 'player')
            return "GAME OVER";
    //if(adjacent.name == 'monster')
    //  if(this.monstermove(adjacent,x,y)){
        //  this.move(actor,x,y,this.monsterImageSrc);
        //  return true;
    //  }
    return false;
    
}



// return the first actor at coordinates (x,y) return null if there is no such actor
// there should be only one actor at (x,y)!
Stage.prototype.getActor=function(x, y){
    for(var i = 0; i < this.actors.length ; i++){
        if(this.actors[i].x == x && this.actors[i].y == y)
            return this.actors[i];
    }
    return null;
}

Stage.prototype.movebox = function(box,x,y){
      var newBox = this.getActor(box.x + x, box.y + y); 
      if(newBox== null){
        box.x += x;
        box.y += y;
        this.setImage(box.x,box.y,this.boxImageSrc);
        return true;
      }
      if(newBox.name == 'monster' || newBox.name == 'wall')
        return false;
      if(this.movebox(newBox,x,y)){
        box.x += x;
        box.y += y;
        this.setImage(box.x,box.y,this.boxImageSrc);
        return true;
      }
      return false;


}

Stage.prototype.move = function(actor,x,y,img){
    this.setImage(actor.x ,actor.y,"");
    actor.x += x;
    actor.y += y;
    this.setImage(actor.x,actor.y,img);
}

Stage.prototype.playeraction = function(direction){
    switch(direction){
        case 'N':
            var actor = this.getActor(this.player.x - 1,this.player.y);
            if(actor == null)
                this.move(this.player,-1,0,this.playerImageSrc);    
            else if(actor.name == 'box')
                if(this.movebox(actor,-1,0))
                    this.move(this.player,-1,0,this.playerImageSrc);;
            break;
        case 'E':
            var actor = this.getActor(this.player.x,this.player.y + 1);
            if(actor == null) //case free panel
                this.move(this.player,0,1,this.playerImageSrc);
            else if(actor.name == 'box')
                if(this.movebox(actor,0,1))
                    this.move(this.player,0,1,this.playerImageSrc);;
            break;
        case 'S':
            var actor = this.getActor(this.player.x + 1,this.player.y);
            if(actor == null)
                this.move(this.player,1,0,this.playerImageSrc);
            else if(actor.name == 'box')
                if(this.movebox(actor,1,0))
                    this.move(this.player,1,0,this.playerImageSrc);;
            break;
        case 'W':
            var actor = this.getActor(this.player.x ,this.player.y - 1);
            if(actor == null)
                this.move(this.player,0,-1,this.playerImageSrc);
            else if(actor.name == 'box')
                if(this.movebox(actor,0,-1))
                    this.move(this.player,0,-1,this.playerImageSrc);;
            break;
        case 'NE':  
            var actor = this.getActor(this.player.x - 1,this.player.y + 1);
            if(actor == null)
                this.move(this.player,-1,1,this.playerImageSrc);
            break;
        case 'NW':
            var actor = this.getActor(this.player.x - 1,this.player.y - 1);
            if(actor == null) //case free panel
                this.move(this.player,-1,-1,this.playerImageSrc);
            break;

        case 'SE':
            var actor = this.getActor(this.player.x + 1,this.player.y + 1);
            if(actor == null) //case free panel
                this.move(this.player,1,1,this.playerImageSrc);     
            break;

        case 'SW':
            var actor = this.getActor(this.player.x + 1,this.player.y - 1);
            if(actor == null)
                this.move(this.player,1,-1,this.playerImageSrc);    
            break;

    }


    


}


//not working (keyboard navigation..trying to implement so that we don't have repeating code)
Stage.prototype.keysaction=function (e) {

    e = e || window.event;
    switch(e.keyCode){
        case 37:
            this.playeraction('W');
            break;
        case 38:
            this.playeraction('N');
            break;
        case 39:
            alert('east');
            this.playeraction('E');
        case 40:
            this.playeraction('S');

    }


}

// End Class Stage


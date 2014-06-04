(function(root) {
  var App = root.App = (root.App || {});

  var Snake = App.Snake = function(rootEl) {
    this.$el = rootEl;
    this.headPos = [0,2];
    this.direction = "right";
    this.segments = [[0,0], [0,1], [0,2]];
    this.speed = 500;
    this.foodPos;
  }

  Snake.prototype.setUpGame = function() {
    var that = this;

    function createTile(row,col){
      that.$el.append("<div class='tile off' id='"+row+col+"'></div>");
    }

    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        createTile(x,y);
      }
    }
    this.genRandomFood();
    this.render();
    this.startGame();
  }

  Snake.prototype.startGame = function() {
    var that = this;
    $('body').keydown(function(e) {
      if (e.which == 37) {
        that.turn("left");
      } else if (e.which == 38) {
        that.turn("up");
      } else if (e.which == 39) {
        that.turn("right");
      } else if (e.which == 40) {
        that.turn("down");
      }
    });

    this.render();
    this.commence();
  }

  Snake.prototype.turn = function(dir) {
    if ((dir=="up"||dir=="down")&&(this.direction=="up"||this.direction=="down")) {
      return;
    }
    if ((dir=="left"||dir=="right")&&(this.direction=="left"||this.direction=="right")) {
      return;
    }

    this.direction = dir;
  }

  Snake.prototype.lost = function() {
    var that = this;
    var x = this.headPos[0];
    var y = this.headPos[1];

    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return true;
    }

    var returnBool = false;
    var segmentsToCheck = this.segments.slice(0,this.segments.length-1);

    for (var z = 0; z < segmentsToCheck.length; z++) {
      if (segmentsToCheck[z][0] == x && segmentsToCheck[z][1] == y){
        returnBool = true;
      }
    }

    return returnBool;
  }

  Snake.prototype.checkForLoss = function() {
    if (this.lost()) {
      alert("You lost!");
      window.clearInterval(INTERVAL);
      $("#play-button-div").append("<button id='play'>Click to play Snake!</button>");
      $("#snakeBoard").empty();

      var a = new App.Snake($("#snakeBoard"));

      $("#play").on("click", function() {
        $("#play-button-div").empty();
        document.getElementById("snakeBoard").focus();
        a.setUpGame();
      });
    }
  }

  Snake.prototype.commence = function() {
    var that = this;
    INTERVAL = window.setInterval(function(){
      that.step();
      that.checkForLoss();
      that.render();
    }, this.speed)
  }

  Snake.prototype.genRandomFood = function() {
    var that = this;
    var x = Math.floor((Math.random() * 10));
    var y = Math.floor((Math.random() * 10));

    for (var z = 0; z < this.segments.length; z++) {
      if (this.segments[z][0] == x && this.segments[z][1] == y) {
        var redo = true;
      }
    }

    if (redo) {
      return this.genRandomFood();
    }

    var string = "#" + x + y;
    $(string).addClass("food");
    this.foodPos = [x,y];
  }

  Snake.prototype.render = function() {
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {

        var string = "#" + x + y;
        var tile = $(string);
        tile.removeClass("on");
        tile.addClass("off");

        _(this.segments).each(function(seg) {
          if (seg[0] == x && seg[1] == y) {
            tile.removeClass("off");
            tile.addClass("on");
          }
        })
      }
    }
  }

  Snake.prototype.step = function() {
    switch(this.direction) {
    case "up":
      var change = [-1, 0];
      break;
    case "down":
      var change = [1, 0];
      break;
    case "left":
      var change = [0, -1];
      break;
    case "right":
      var change = [0, 1];
      break;
    }

    var x = this.headPos[0] + change[0];
    var y = this.headPos[1] + change[1];

    this.headPos = [x,y];
    this.segments.push(this.headPos);

    var foodX = this.foodPos[0];
    var foodY = this.foodPos[1];

    if (this.headPos[0]==foodX && this.headPos[1]==foodY){
      //Remove class from food square so they don't exist forever.
      var string = "#" + foodX + foodY;
      $(string).removeClass("food");
      this.genRandomFood();

      //Reset interval for faster gameplay.
      window.clearInterval(INTERVAL);
      this.speed -= 30;
      this.commence();
    } else {
      this.segments.shift();
    }
  }
})(this);

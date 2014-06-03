(function(root) {
  var App = root.App = (root.App || {});

  var Snake = App.Snake = function(rootEl) {
    this.$el = rootEl;
  }

  Snake.prototype.setUpGame = function() {
    this.board = [ ];
    this.headPos;
    this.direction;
    this.segments;
    var that = this;

    function createTile(row,col){
      that.$el.append("<div class='tile' id'"+row+col+"'></div>");
      var string = "#" + row + col;
      that.board.push($(string));
      debugger;
      console.log(string);
    }

    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        createTile(x,y);
      }
    }

    this


  }


})(this);

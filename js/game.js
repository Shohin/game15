var app = angular.module ('gameApp', []);
app.factory('TileModel', function (){
	var Tile = function (id, val){
		this.value = (id == 15) ? null : val;
		this.id = id;
		//console.log(val);
	};
	/*Tile.prototype.updatePositon = function(newPos) {
		this.x = newPos.x;
		this.y = newPos.y;
	};*/
	
	return Tile;
});
app.controller ('GameController', function(TileModel, $filter){
	this.size = 4;
	this.count = this.size * this.size;
	this.tiles = [];
	this.countAttempt = 0;
	this.generateBoard = function(){
		for (var i = 0; i < this.count; i++) {
			this.tiles.push(new TileModel(i, i + 1));
		}
		for (var i = 0; i < 1000; i++)
		{
			var randomIndex = Math.floor((Math.random() * 15));
			this.checkAndChangeTile (randomIndex);
		}
		this.countAttempt = 0;
		if (this.checkWin()) {
			this.generateBoard();
		}
		/*for (var i = 0; i < this.count; i++) {
			this.tiles.push(new TileModel(Math.random(), i));
		}
		var orderBy = $filter('orderBy');
		this.tiles = orderBy(this.tiles, 'id');//this.tiles.sort();
		for (var i = 0; i < this.count; i++) {
			this.tiles[i].id = i;
		}*/
		/*for (var i = 0; i < this.count; i++) {
			if (i == emptyIndex) {
				n++;
				this.tiles.push(new TileModel(n, null));
				continue;
			}
			var x;
			do {
				var check = true;
				x = Math.floor((Math.random() * 15) + 1);
				for (var j = 0; j < n; j++) {
					if (x == this.tiles[j].value) {
						check = false;
					}
				}
			}while (!check);
			this.tiles.push(new TileModel(n, x));
			n++;
		}
		if (this.checkWin()) {
			this.generateBoard();
		}*/
	};
	this.checkWin = function(){
		for (var i = 0; i < 15; i++) {
			console.log(this.tiles[i].value);
			if (this.tiles[i].value != i + 1) {
				return false;
			}
		}
		return true;
	};
	this.game = function(tileId) {
		this.checkAndChangeTile (tileId);
		if (this.checkWin()) {
			alert('Yutdingiz!');
		}
	};
	this.checkAndChangeTile = function(tileId) {
		var j = tileId % this.size;
		var i = (tileId - j) / this.size;
		var leftJ = j - 1;
		var rightJ = j + 1;
		var upI = i - 1;
		var downI = i + 1;
		var leftId = tileId - 1;
		var rightId = tileId + 1;
		var upId = tileId - this.size;
		var downId = tileId + this.size;
	
		if (leftJ > -1) {
			if (this.changeTileValueById(tileId, leftId)) {
				return;
			}
		}
		if (rightJ < this.size) {
			if (this.changeTileValueById(tileId, rightId)) {
				return;
			}
		}
		if (upI > -1) {
			if (this.changeTileValueById(tileId, upId)) {
				return;
			}
		}
		if (downI < this.size) {
			if (this.changeTileValueById(tileId, downId)) {
				return;
			}
		}
	};
	this.changeTileValueById = function(tileId, swapId) {
		if (this.tiles[swapId].value == null) {
				this.swap(tileId, swapId);
				return true;
		}
		return false;
	};
	this.swap = function(tileId, changeTileId) {
		this.countAttempt++;
		var k = this.tiles[tileId].value;
		this.tiles[tileId].value = null;
		this.tiles[changeTileId].value = k;
	};
	this.generateBoard();
});
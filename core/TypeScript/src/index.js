var num = [1, 2, 3];
var arr = [{}];
var arr2 = [1, 2, 3];
arr2.filter(function (item) {
    return item > 2;
});
function getList(params) {
}
getList({
    id: 111
});
function getID(id) {
}
getID(1 || '1111');
function getData(params) {
    return params;
}
var data = getData(11111);
function getDataList(params) {
    return '';
}
var input = document.getElementById('input');
var Num = 1111;
function testNewType2(params) {
}
testNewType2(false);
var obj = {
    key: 'assign'
};
obj.key = "assign";
function handleRequest(url, method) {
    // ...
}
var req = { url: 'https://example.com', method: 'GET' };
handleRequest(req.url, req.method);
function NotNull(params) {
    console.log(params.toUpperCase());
    //等价于if
    if (params) {
        console.log(params.toUpperCase());
    }
}
NotNull('hahahaha');
function move(animal) {
    if ("swim" in animal) {
        return animal.swim();
    }
    return animal.fly();
}
move({
    fly: function () { }
});
// ts源码
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.Up); // 1
function get_List(params) {
}
get_List({
    id: 11111,
    elseProps: 'some data'
});

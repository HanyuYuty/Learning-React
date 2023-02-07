let num: number[] = [1, 2, 3]


let arr: Array<object> = [{}]


let arr2 = [1, 2, 3];

arr2.filter(item => {
    return item > 2;
})

function getList(params: { id: number, count?: string }) {

}

getList({
    id: 111,
})


function getID(id: number | string) {

}

getID(1 ||'1111')


type myType = string


type newType = myType | number

function getData(params:any):myType {

    return params    
}

let data = getData(11111);

function getDataList(params:myType):newType {

    return ''
    
}


interface mySecondType {
    key:number
}

interface mySecondType {
    anyOther:string
}

interface myThirdType extends mySecondType{
    list:object[]
}





const input = document.getElementById('input') as HTMLInputElement


let Num = (1111 as any) as string



type newType2 = false

function testNewType2(params:newType2) {
    
}


testNewType2(false)


const obj = {
    key:'assign' 
}


obj.key = "assign"

function handleRequest(url: string, method: 'GET' | 'POST' | 'GUESS') {
    // ...
    }
  
const req = { url: 'https://example.com', method: 'GET'  as const} 
handleRequest(req.url, req.method );



function NotNull(params?:string | null) {
    console.log(params!.toUpperCase());

    //等价于if
    if(params){
        console.log(params.toUpperCase());
    }
    
    
}

NotNull('hahahaha')


type Fish = { swim: () => void  } ;
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };


function move(animal: Fish | Bird | Human  ) {

    if ("swim" in animal) {
        return (animal as Fish).swim();
    }
    return (animal as Bird).fly();
}

move({
    fly:()=>{}
})


// ts源码
enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
    }
    console.log(Direction.Up) // 1


    type Params ={id:number,count?:string,[propName:string]:any}
    function get_List(params:Params) {
    
    }

    get_List({
        id:11111,
        elseProps:'some data'
    })



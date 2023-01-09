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
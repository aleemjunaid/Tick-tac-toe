const tick_cross=document.querySelectorAll(`${'.tick_cross'}`)
const Turn_X_O=document.querySelector(`${'p'}`)
let Turn = "X"
let game_Over=false;
const changeTurn = ()=>{
    return Turn === "X" ? "O" : "X"
}
const check_Win = ()=> {
    let Win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    Win.forEach((value)=>{
        if((tick_cross[value[0]].innerText === tick_cross[value[1]].innerText) && (tick_cross[value[2]].innerText === tick_cross[value[1]].innerText) && (tick_cross[value[0]].innerText !== ""))
        {
            Turn_X_O.innerText = tick_cross[value[0]].innerText + " " + "Won"
            tick_cross.forEach((display)=>{
                display.classList.add('pointer_none')
            })
            game_Over = true;
        }
    })
}
let data=JSON.parse(localStorage.getItem('data'))
if(data)
{
        tick_cross.forEach((ele,i)=>{
        ele.innerText=data.box[i]
    })
    Turn=data.turn
    check_Win()
    if(!game_Over){
    Turn_X_O.innerText="Turn For" + " " + Turn
}
    }
tick_cross.forEach((item)=>{
    item.addEventListener('click',()=>{
        if(item.innerText=="")
        {
            item.innerText = Turn
            Turn = changeTurn()
            check_Win()
            if(!game_Over){
            Turn_X_O.innerText="Turn For" + " " + Turn
        }
        let obj={
            box:Array.from(tick_cross, (ele) => ele.innerText),
            turn:Turn,
        }
        localStorage.setItem('data',JSON.stringify(obj))
        }
    })
})
function restartGame(){
    tick_cross.forEach((restart)=>{
        restart.innerText = ""
        Turn = "X";
        game_Over = false;
        Turn_X_O.innerText="Turn For" + " " + Turn
        tick_cross.forEach((display)=>{
            display.classList.remove('pointer_none')
        })
        localStorage.clear('data')
    })
}
comment
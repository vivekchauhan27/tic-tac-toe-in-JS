let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newBtn=document.querySelector("#new-game");
let msg=document.querySelector("#msg")

let turnO=true;
let count=0;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msg.classList.add("hide");
    boxes.forEach((box)=>{
        box.innerText="";
    });

};

boxes.forEach((box) => { 
    box.addEventListener("click", ()=>{
       
        if (turnO){
            box.innerText="O";
            box.style.color="#219ebc";
            turnO=false;
        }else{
            box.innerText="X"
            turnO=true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }

    });
});

const gameDraw=()=>{
    msg.innerText="DRAW!";
    msg.classList.remove("hide");
    disableBoxes();

}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congradulations, Winner is ${winner}`;
    msg.classList.remove("hide");
    disableBoxes();

};
const checkWinner=()=>{
    for (let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("WINNER!", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
    
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
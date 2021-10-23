import React from "react";
import Box from "./box";
import History from "./history";
import './style.css'
class GameBoard extends React.Component{   
    state={isX_O:'X',board:[
        '','','',
        '','','',
        '','',''
    ],msg:'',winner:null,allBoards:[],history:-1,isGameOver:false,backToNormal:null}
         /*  
        Set all state to default after click on reset

        @params:
        @return : void
    */
    setStatesToDefault=()=>{
        this.setState({allBoards: [],
        board: ['', '', '', '', '', '', '', '', ''],
        history: -1,
        isGameOver: false,
        isX_O: "X",
        msg: "",
        winner: null})
    }
       /*  
        Checks if there is a winner and updates accordingly

        @params: 
        @return : void   
    */
    getWinner=()=>{
        let temp=this.state.board;
        let lastPlayer=this.state.isX_O=='X'?'O':'X';
        if(temp[0]&&temp[0]==temp[1]&&temp[1]==temp[2]
        ||temp[0]&&temp[0]==temp[3]&&temp[3]==temp[6]
        ||temp[0]&&temp[0]==temp[4]&&temp[4]==temp[8]
        ||temp[1]&&temp[1]==temp[4]&&temp[4]==temp[7]
        ||temp[2]&&temp[2]==temp[5]&&temp[5]==temp[8]
        ||temp[2]&&temp[2]==temp[4]&&temp[4]==temp[6]
        ||temp[3]&&temp[3]==temp[4]&&temp[4]==temp[5]
        ||temp[6]&&temp[6]==temp[7]&&temp[7]==temp[8])
        this.setState({winner:lastPlayer,isGameOver:true})
    }
    /*  
        Set states accordingly after clickin on history item

        @params:e : event
        @return : void
    */
    handleListItem=async(e)=>{
        let num=parseInt(e.target.id);
        let temp=this.state.allBoards;
        this.setState({isX_O:num%2?'O':'X',allBoards:temp.slice(0,num+1),history:num,board:temp[e.target.id],isGameOver:false,winner:null})
        }
       /*  
        Set states accordingly after clickin on  empty box 

        @params:boxNumber : number (clickedBoxNumber)
        @return : void
    */
    setGameBoard=async (boxNumber)=>{
        let temp=[...this.state.board];
        let boardsTemp=[...this.state.allBoards];
         boardsTemp.push(temp);
        temp[boxNumber]=this.state.isX_O;
       await new Promise(resolve=>{
         this.setState({isX_O:this.state.isX_O=='X'?'O':'X'})
         this.setState({board:temp,allBoards:boardsTemp,history:this.state.history+1},resolve)
        })
        //after upadting  box check if theres a winner
        this.getWinner();
     }
      /*  
        Set states accordingly after clickin on  any box 
        Activates the conditions according to the click

        @params:boxNumber : number (clickedBoxNumber)
        @return : void
    */
    getBoxNumber=(boxNumber)=>{
        //if Game over disable
        if(this.state.isGameOver)
        return
        //set number of clicks , incase its equal to 9 it means no winner (draw)  
        if(this.state.allBoards.length==8)
        this.setState({winner:'Draw',isGameOver:true})
        //in case user clicked box we want to change player turn ,update board,check if it has been clicked before
        if(!this.state.board[boxNumber])
        this.setGameBoard(boxNumber)       
         //Display message that box already been clicked
        else {
            this.setState({msg:'Box Already been Clicked'})
            setTimeout(()=>{
                this.setState({msg:''})
            },2000)
         }
    }
    render(){
        return(
            <>
            <h1>Tic Tac Toe</h1>
            <p className="msg">{this.state.msg}</p>
            <div className="game-board">
                {
                Array.from({length:9}).map((_,idx)=>{
                    return <Box key={idx} id={idx} clickedBox={this.getBoxNumber} board={this.state.board}/>
                })
            }
            </div>
            <div className={this.state.winner?'winner':'turn'}>{
               this.state.winner&&this.state.winner!='Draw'?'Player '+this.state.winner+' is Winner':this.state.winner=='Draw'?'Draw Game': 'Player ' +this.state.isX_O+' Turn'
              
            }
            </div>
            <History history={this.state.history} handleItem={this.handleListItem}></History>
            <button className="reset" onClick={(e)=>this.setStatesToDefault()}>reset</button>
            </>
        )
    }
}
export default GameBoard;
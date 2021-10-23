import React from 'react'

const Box=({id,clickedBox,board})=>{  
       return <div className="box"
        onClick={()=>clickedBox(id)}>
            {board[id]}
            </div>  
}

export default Box

const History = ({history,handleItem}) => {
    return ( 
        <div className="history">
                <ul className="history-list">
                    {   
                        Array.from({length:history}).map((_,idx)=>{
                            return <li id={idx} key={idx} onClick={(e)=>handleItem(e)}>Move To {idx+1} Step</li>
                        })
                    }
                </ul>
            </div>
     );
}
 
export default History;
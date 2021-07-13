import React, { useState, useEffect } from 'react';


const MainNote = ( {setEditing, editing, initialTitle, mainContent , setMainContent, sideBarOn} )=>{
    const [text, setText] = useState(initialTitle)

    function editingToggle(){
        setEditing(prevState => !prevState)
    }
    return (
    <div className={sideBarOn ? 'overflow-hidden w-100 mainNoteOff' : 'overflow-hidden w-100 mainNoteOn'}>
        {!mainContent 
        ? <h2 className='anyGroup'>Any Group Selected</h2>  
        :
        <main className='mainNote'>
            <h3 className="card overflow-hidden w-75" >
                <div>
                    <input
                    style={editing ? {display:'none'} : {width:'50%'}}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    />
                    <span
                    style={editing ? {} : {display:'none'}}
                    >
                    {mainContent[1]}
                    </span>
                <button onClick={editingToggle} style={{border:'none', backgroundColor:'transparent',  marginLeft:'15px', width:'30px', height:'30px'}}>
                <i style={{color:'grey', fontSize:'30px'}} className="fa fa-edit"></i>
                </button>
                </div>
                <h6 className="mainNoteCreationDate">
                {new Date(mainContent[0]).toLocaleDateString("es-AR")} 
                </h6>
            </h3>
            <div className='mainNoteContent'>
                {mainContent[2].length !== 0 ?                 
                <ul className=" mainNoteContentList list-group"> 
                {mainContent[2].map(activity=>(
                    <li  className="list-group-item "> 
                        <div className='activityContainer'>
                        <div className='activityText'>
                            <p className=' activity'>{activity}</p>
                            <p className=' activityDate' >13/06/2021</p>
                        </div>
                        <div className='activityBtnContainer'>
                            <button  className="addActivityBtnContainer">
                            <i className="fa fa-check-square mx-1"></i>
                            </button >
                            <button className="addActivityBtnContainer">
                            <i className="fa fa-minus-square mx-1"></i>
                            </button>
                        </div>
                        </div>

                    </li>
                ))} 
                </ul> : <h5 style={{textAlign:'center', margin:'0', color:'gray'}}>Any Acvtivity</h5>}
                
            </div>
            <div>
            </div>
            <button onClick={() => setMainContent(false)} style={!mainContent ? {display:"none"} : {}} className='mainBtn btn btn-danger' >
            Close Group
            </button>
            
        </main>
        }

    </div>
)}


export default MainNote
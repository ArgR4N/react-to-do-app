

const MainNote = ( {mainContent , setMainContent, sideBarOn} )=>{
    return (
    <div className={sideBarOn ? 'overflow-hidden w-100 mainNoteOff' : 'overflow-hidden w-100 mainNoteOn'}>
        {!mainContent 
        ? <h2 className='anyGroup'>Any Group Selected</h2>  
        :
        <main className='mainNote'>
            <h3 className="card overflow-hidden w-75" >
                {mainContent[1]} 
            </h3>
            <div className='mainNoteContent'>
                <ul className=" mainNoteContentList list-group"> 
                {mainContent[2].map(activity=>(
                    <li  className="list-group-item "> 
                        <p className=' activity'>{activity}</p>
                    </li>
                ))} 
                </ul>
            </div>
            <button onClick={() => setMainContent(false)} style={!mainContent ? {display:"none"} : {}} className='mainBtn btn btn-danger' >
            Close Group
            </button>
        </main>
        }

    </div>
)}


export default MainNote
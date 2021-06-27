

const MainNote = ( {mainContent , setMainContent} )=>{



    return (
    <div   className='overflow-hidden d-flex flex-column justify-content-center align-items-center'>
        {!mainContent ? <h2>Any Note Selected</h2>  :
        <main className='w-100 d-flex flex-column justify-content-center align-items-center'>
            <h3  className=" card overflow-hidden w-75" style={{border:'none'}} > {mainContent[1]} </h3>
            <p  className=' card w-75 overflow-hidden '  style={{border:'none'}}> {mainContent[0]} </p>
            <ul className=" w-75 list-group"> {typeof(mainContent[2]) === typeof([ ]) ? mainContent[2].map(activity=>(
                <li  className="overflow-auto list-group-item d-flex flex-row align-items justify-content-between"> {activity}
                    <i className="mx-1 deleteActivityBtn fa fa-minus-square "/>
                </li>
            )) : mainContent[2] } 
            </ul>
        </main>
        }
        <button onClick={() => setMainContent(false)} style={!mainContent ? {display:"none"} : {}} className='w-25 position-absolute bottom-0 my-3 btn btn-danger' >
        Close Note
        </button>
    </div>
)}


export default MainNote
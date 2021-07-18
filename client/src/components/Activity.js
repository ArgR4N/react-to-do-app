const Activity = ({deleteActivity, mainContent, activity, today}) =>{
    const {title, _id, dateFor} = activity
    const handleDeleteActivity = () =>{
        deleteActivity(_id)
    }
    const handleCompleteActivity = () =>{
        console.log('in dev');
    }
    const dateFormatFunction = (initailDate) =>{
        let separateDate = initailDate.split('-');
        let finalDate = [];
        separateDate[2] = separateDate[2].split('').splice(0,2).join('')
        for (let i = separateDate.length; i > 0; i--) {
            finalDate.push(separateDate[i - 1])
        }
        return finalDate.join('/')
    }
    const dateState = (dateFor, today)=>{
        let timeDifference = Date.parse(dateFor) - Date.parse(today)

        if (Date.parse(dateFor) === Date.parse(today)) {
            return <span style={{color:'blue'}}>Is Today!</span>
        }
        if (Date.parse(dateFor) > Date.parse(today)) {
            return <span style={{color:'grey'}}>{Math.floor((timeDifference/86400)/1000)} Days left</span>
        }
        if (Date.parse(dateFor) < Date.parse(today)) {
            return <span style={{color:'red'}}>Is Late!</span>
        }

        return 
    }
    return (
        <li  className="list-group-item "> 
        <div className=' activityContainer'>
            <div className='w-50 activityText'>
                <p className=' activity'>{title}</p>
                <p className=' activityDate' >Is for: {dateFormatFunction(dateFor)}</p>
                <p className='activity' ><strong> {dateState(dateFor, today)} </strong></p>

            </div>
            <div className='activityBtnContainer'>
                <button onClick={handleCompleteActivity}  className="addActivityBtnContainer">
                   <i className="fa fa-check-square mx-1"></i>
                </button > 
                <button onClick={handleDeleteActivity} className="addActivityBtnContainer">
                   <i className="fa fa-minus-square mx-1"></i>
                </button>
            </div>
        </div>
        </li>
    )
}

export default Activity;
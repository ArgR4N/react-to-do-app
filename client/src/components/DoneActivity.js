const DoneActivity = ({deleteActivity, mainContent, activity, today, completeActivity}) =>{
    const {title,  dateFor} = activity
    const dateFormatFunction = (initailDate) =>{
        let separateDate = initailDate.split('-');
        let finalDate = [];
        separateDate[2] = separateDate[2].split('').splice(0,2).join('')
        for (let i = separateDate.length; i > 0; i--) {
            finalDate.push(separateDate[i - 1])
        }
        return finalDate.join('/')
    }

    return (
        <li  className="list-group-item "> 
        <div className=' activityContainer'>
            <div className='w-50 activityText'>
                <p className=' activity'>{title}</p>
                <p className=' activityDate' >Were for: {dateFormatFunction(dateFor)}</p>

            </div>
        </div>
        </li>
    )
}

export default DoneActivity;
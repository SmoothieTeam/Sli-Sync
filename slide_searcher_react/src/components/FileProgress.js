import './FileProgress.css';

function FileProgress({ className, file, progress }) {
    return (<div className={className}>
        <div className='icon'>
            <img src='cloud.svg'/>
        </div>
        <div className='div_progress'>
            {Math.round(progress * 100)} % <br/>
            <div className='progress_container'>
                <progress className='progress' min={0} value={progress}/> <br/>
            </div>
            {file?.name ?? ''}
        </div>
    </div>);
}

export default FileProgress;
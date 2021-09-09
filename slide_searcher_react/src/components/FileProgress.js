import './FileProgress.css';

function FileProgress({ className }) {
    return (<div className={className}>
        <div className='icon'>
            <img src='cloud.svg'/>
        </div>
        <div className='div_progress'>
            20 % <br/>
            <div className='progress_container'>
                <progress className='progress' min={0} value={0.5}/> <br/>
            </div>
            filename.pdf
        </div>
    </div>);
}

export default FileProgress;
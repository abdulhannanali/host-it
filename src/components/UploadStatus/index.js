import React, {Component} from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import filesize from 'filesize'
import UploadButton from '../UploadButton'
import './index.css'

export default class UploadStatus extends Component {
    constructor () {
        super()

        this.state = {
            startUpload: false,
            pauseUpload: false,
            progress: 0
        }
    }
    
    startUpload () {

    }

    getSize (size) {
        return filesize(size)
    }

    /**
     * onStart
     * onStart function is called when the upload needs to get start
     */
    onStart (event) {
        this.props.startUpload()
    }

    onCancel () {
        /**
         * onCancel
         * called when the upload needs to get cancelled
         */
    }

    onPause () {
        /**
         * onPause
         * called when the upload needs to get paused
         */
    }

    getActionButtons () {
        const startBtn = (
            <UploadButton
                onClick={this.onStart}
                color='green'>Start Upload</UploadButton>
        )

        const pauseBtn = (
            <UploadButton color='blue'>Pause Upload</UploadButton>
        )

        const cancelBtn = (
            <UploadButton color='red'>Cancel Upload</UploadButton>
        )

        return ([
            startBtn,
            pauseBtn,
            cancelBtn
        ])
    }
    
    render () {
        const file = this.props.file

        if (file && !file.size) {
            return null
        } else {
            const fileDetails = (
                <div className='FileDetails'>
                    <h1 className='FileDetails-name'>{file.name}</h1>
                    <h2 className='FileDetails-size'>Size: {this.getSize(file.size)}</h2>
                    <h3 className='FileDetails-type'>Type: {file.type}</h3>
                </div>
            )

            return (
                <div className='UploadStatus'>
                    <h1 className='UploadStatus-text'>Upload Status</h1>
                    <div className='UploadStatus-progress'>
                        <LinearProgress mode='determinate' style={{ 
                            width: '400px',
                            'margin-right': 'auto',
                            'margin-left': 'auto'
                        }} />
                        <div className='UploadStatus-percentage'>
                            {this.state.progress}%
                        </div>
                    </div>
                    {fileDetails}
                    <div className='UploadActionButtons'>
                        {this.getActionButtons()}
                    </div>
                </div>
            )
        }
    }
}
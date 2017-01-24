import DragCard from '../components/DragCard'
import React, { Component } from 'react'
import UploadStatus from '../components/UploadStatus'
import {storage} from 'firebase'
import shortid from 'shortid'

export default class FbUpload extends Component {
    constructor () {
        super()

        this.state = {
            file: {},
            uploadProgress: false, // Is the upload in progress or not?
            uploadPaused: false,
            uploadCancelled: false
        }
    }

    startFileUpload () {
        const { file } = this.state

        if (!file) {
            console.error('No file to start upload for')
        } else {
            // Adding firebase as a storage reference here
            // Firebase acts as the state container for our upload state here
            const storageRef = storage().ref().child(shortid.generate())
            this.uploadTask = storageRef.put(file)
            this.handleUploadState()
        }
    }

    /**
     * cancelUpload
     * cancels the upload and remove the event listener too
     */
    cancelUpload () {
        if (this.uploadTask) {
            this.uploadTask.cancel()
            this.setState({
                uploadCancelled: true,
                uploadPaused: false,
                uploadProgress: false,
                progress: 0
            })
        }
    }

    /**
     * handles the state of the upload being done
     */
    handleUploadState () {
        this.stateChangeListener = this.uploadTask.on('state_changed', function (snapshot) {
            const {
                bytesTransferred,
                totalBytes
            } = snapshot

            const progress = this.calculateProgress(bytesTransferred, totalBytes)
            
            switch (snapshot.state) {
                case storage.TaskState.PAUSED:
                    this.setState({
                        uploadPaused: true,
                        uploadProgress: false,
                        uploadCancelled: false
                    })
                    break;
                case storage.TaskState.RUNNING:
                    this.setState({
                        uploadPaused: false,
                        uploadProgress: true,
                        uploadCancelled: false
                    })
                    break;
                case storage.TaskState.PROGRESS:
                    this.setState({
                        progress
                    })
                    break;
                default:
                    break;
            }
        }, function (error) {
            console.error(error)
        })
    }

    /**
     * pauseUpload
     * pauses the provided upload
     */
    pauseUpload () {
        if (this && this.uploadTask) {
            this.uploadTask.pause()
        }
    }

    /**
     * calculateProgress
     * calculates the total progress of the data transferred
     * in percentages
     *
     */
    calculateProgress (bytesTransferred = 0, totalBytes = 0) {
        return (bytesTransferred / totalBytes) * 100
    }

    // onFiles
    onFiles (acceptedFiles) {
        this.setState({
            file: acceptedFiles[0]
        })
    }

    render () {
        return (
            <div>
                <DragCard onDrop={this.onFiles.bind(this)} uploadProgress={this.state.uploadProgress} />
                <UploadStatus 
                    file={this.state.file}
                    startUpload={this.startFileUpload}
                    cancelUpload={this.cancelUpload} />
            </div>
        )
    }
}
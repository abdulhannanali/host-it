import Dropzone from 'react-dropzone'
import React, { Component } from 'react'
import classnames from 'classnames'
import LinearProgress from 'material-ui/LinearProgress'

import UploadButton from './UploadButton'
import './DragCard.css'

export default class DragCard extends Component {
    constructor () {
        super()

        this.onButtonClick = this.onButtonClick.bind(this)
        this.render = this.render.bind(this)
        this.onDragEnter = this.onDragEnter.bind(this)
        this.onDragLeave = this.onDragLeave.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.timeoutCount = 1000

        this.state = {
            dragEnter: false,
            dragLeave: false,
            dragOver: false,
            zoneOpen: false,
            acceptedFiles: false
        }
    }

    onDragEnter (event) {
        clearTimeout(this.timeout)
        this.setState({
            dragEnter: true,
            dragLeave: false,
            dragOver: false
        })

    }

    onDragLeave (event) {
        this.setState({
            dragEnter: false,
            dragLeave: true
        })

        this.timeout = setTimeout(() => {
            this.setState({
                dragEnter: false,
                dragLeave: false,
                dragOver: false
            })
        }, this.timeoutCount)
    }

    onDragOver (event) {
        clearTimeout(this.timeout) // Clear any timeout set because of onDragLeave if any,
                                   // this is more of a safety check

        this.setState({
            dragEnter: false,
            dragLeave: false,
            dragOver: true
        })

        console.log(event)
    }

    onDrop (acceptedFiles) {
        this.setState({
            dragEnter: false,
            dragLeave: false,
            dragOver: false
        })
        
        if (acceptedFiles && acceptedFiles[0]) {
            this.showAcceptedFiles()
        }

        if (this.props.onDrop) {
            // Passing files to the parent component, so it can do with this whatever it wants2
            this.props.onDrop(acceptedFiles)
        }
    }

    showAcceptedFiles () {
        this.setState({
            acceptedFiles: true
        })
    }

    onButtonClick () {
        this.dropzone.open()
    }

    getBoxText () {
        if (this.state.acceptedFiles) {
            return 'File accepted!'
        }

        if (this.state.dragEnter) {
            return 'You can now free the files to me, free the button, free this files'
        } else if (this.state.dragLeave) {
            return 'No, please come back'
        } else {
            return 'Drag a file here in order to upload it'
        }
    }

    render () {
        if (this.props.uploadProgress || this.state.acceptedFiles) {
            return null
        }

        const cardClassNames = classnames('DragCard', {
            'DragCard--drag': this.state.dragEnter
        })

        const dragTextClasses = classnames('DragCard-text', {
            'DragCard-text--drag': this.state.dragEnter
        })

        const uploadBtn = !this.state.dragEnter ? (
            <UploadButton color="green" onClick={this.onButtonClick}>Click to browse</UploadButton>
        ) : undefined
     
        return (
            <Dropzone
                multiple={false}
                style={{}}
                onDragLeave={this.onDragLeave}
                ref={(node) => { this.dropzone = node; }}
                disableClick={true}
                onDragEnter={this.onDragEnter}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
            >
                <div className={cardClassNames}>
                    <div className={dragTextClasses}>
                        {this.getBoxText()}
                    </div>
                    {uploadBtn}
                </div>
            </Dropzone>
        )
    }

}

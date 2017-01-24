import React, { Component } from 'react'
import './index.css'

export default class UploadButton extends Component {
    render () {
        const classNames = 'action-button shadow animate ' + (this.props.color || 'blue')

        return (
            <a href={this.props.href || '#'} className={classNames} {...this.props} >{this.props.children}</a>
        )
    }
}
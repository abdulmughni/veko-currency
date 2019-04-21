import React, {Component} from 'react'
import {Row, Col} from 'antd'

export default class FileList extends Component {
    render() {
        const {fileList} = this.props
        const files = fileList.map(file => {
            return <Row>
                <div><a target="_blank" href={file.url}>{file.name}</a></div>
            </Row>
        });
        return (
            <Row>
                <Col>Attachments</Col>
                <Col>{files}</Col>
            </Row>
        )
    }
}
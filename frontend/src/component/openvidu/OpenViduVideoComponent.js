import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return(
            // width={'1460px'} height={'710px'}
            <video width={'85%'} autoPlay={true} ref={this.videoRef}/>
        )
    }
}
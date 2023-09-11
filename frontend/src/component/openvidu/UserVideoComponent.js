import { Box, Center } from '@chakra-ui/react';
import OpenViduVideoComponent from './OpenViduVideoComponent'
import React, { Component } from 'react';

export default class UserVideoComponent extends Component {
    constructor(props) {
        super(props);

        this.handleVideoClicked = this.handleVideoClicked.bind(this);
    }

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    handleVideoClicked(event) {
        // Triggers event for the parent component to update its main video display (other UserVideoComponent)
        if (this.props.mainVideoStream) {
            this.props.mainVideoStream(this.props.streamManager);
        }
    }

    render() {
        return (
            <Box className="streamcomponent" onClick={this.handleVideoClicked} >
                <Center>
                <OpenViduVideoComponent streamManager={this.props.streamManager} />
                </Center>
                {/* <div><p>{this.getNicknameTag()}</p></div> */}
            </Box>
        )
    }
}
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { Component } from 'react';
import UserVideoComponent from './UserVideoComponent';
import { Box } from '@chakra-ui/react';

// const API_SERVER_URL = "http://localhost:8080/broadcast/";
const API_SERVER_URL = "https://i9a407.p.ssafy.io:8080/broadcast/";

class OnlineMeeting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mySessionId: '',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
            publisher: undefined,
            subscribers: [],
            
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
    }
    componentDidMount(){
        if(this.state.session === undefined) {
            this.joinSession()
        }
        
    }

    componentWillUnmount() {
        this.leaveSession()
    }
    
    joinSession() {
        
        this.OV = new OpenVidu();
        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;
                // --- 3) Specify the actions when events take place in the session ---
                // On every new Stream received...
                mySession.on('streamCreated', (event) => {

                    const storedRootData = sessionStorage.getItem('persist:root');
                    const parsedRootData = JSON.parse(storedRootData);

                    // 'login' 데이터를 파싱합니다.
                    const parsedLoginData = JSON.parse(parsedRootData.login);

                    // 해당 객체에서 'role' 값을 가져옵니다.
                    const userRole = parsedLoginData.role;
                    if (userRole === "ROLE_ADMIN" ) {
                        // console.log('You do not have ADMIN permissions to perform this action.');
                        return;
                    }

                    if (this.state.subscribers.length >= 1 ) {
                        // console.log(this.state.subscribers.length)
                        // console.log(this.state.subscribers)
                        return;
                    }
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);
                  
                    //We use an auxiliar array to push the new stream
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    // Update the state with the new subscribers
                    this.setState({
                        mainStreamManager: subscribers[0],
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {
                    event.preventDefault();
                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // --- 4) Connect to the session with a valid user token ---
                this.getToken().then((token) => {

                    const storedRootData = sessionStorage.getItem('persist:root');
                    const parsedRootData = JSON.parse(storedRootData);

                    // 'login' 데이터를 파싱합니다.
                    const parsedLoginData = JSON.parse(parsedRootData.login);

                    // 해당 객체에서 'role' 값을 가져옵니다.
                    const userRole = parsedLoginData.role;

                    mySession.connect(token, { clientData: this.state.myUserName })
                    .then(async () => {
                        // --- 5) Get your own camera stream ---
                        let publisher = await this.OV.initPublisherAsync(undefined, {
                            audioSource: undefined, // The source of audio. If undefined default microphone
                            videoSource: undefined, // The source of video. If undefined default webcam
                            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                            publishVideo: true, // Whether you want to start publishing with your video enabled or not
                            resolution: '7680x4320', // The resolution of your video
                            frameRate: 30, // The frame rate of your video
                            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                            mirror: false, // Whether to mirror your local video or not
                        });

                        // --- 6) Publish your stream ---
                        if (userRole !== "ROLE_ADMIN") {
                            // console.log('You do not have ADMIN permissions to perform this action.');
                            return;
                        }

                        mySession.publish(publisher);
                        // Set the main video in the page to display our webcam and store our Publisher
                        this.setState({
                            mainStreamManager: publisher
                        });
                    })
                    .catch((error) => {
                        // console.log('There was an error connecting to the session:', error.code, error.message);
                    });
                });
            }
        );
    }

    async getToken() {
        return await this.createToken();
    }
    
    async createToken() {
	// console.log(API_SERVER_URL)
    // console.log(this.props.useId + "유저아이디")
    const uid = this.props.useId;
        if(uid!=0){

            const response = await axios.post(API_SERVER_URL + 'connection/' +uid, {}, {
                headers: { 'Content-Type': 'application/json', },
            });
            return response.data; // The token
            
        }
    }

    leaveSession() {
        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }
    
        // Empty all properties...
        this.OV = null;
        this.setState({
            mySessionId: '',
            myUserName: 'Participant',
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],
        });
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }
    
    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    render() {
        return(
            <>
                {this.state.session !== undefined ? (
                    <Box id="session">
                            <Box id="video-container" >
                                {this.state.mainStreamManager !== undefined ? (
                                    <Box id="main-video">
                                        <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                    </Box>
                                ) : null}                      
                            </Box>
                    </Box>
                ) : null}
            </>
        )
    }
    
}

export default OnlineMeeting;

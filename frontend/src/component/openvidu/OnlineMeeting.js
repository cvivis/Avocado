import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { Component } from 'react';
import UserVideoComponent from './UserVideoComponent';

// const API_SERVER_URL = "http://localhost:8080/broadcast/";
const API_SERVER_URL = "https://i9a407.p.ssafy.io:8080/broadcast/";

class OnlineMeeting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mySessionId: '',
            myUserName: 'Participant',
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
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);

                    //We use an auxiliar array to push the new stream
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    // Update the state with the new subscribers
                    this.setState({
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
                            resolution: '720x720', // The resolution of your video
                            frameRate: 30, // The frame rate of your video
                            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                            mirror: false, // Whether to mirror your local video or not
                        });

                        // --- 6) Publish your stream ---
                        if (userRole !== "ROLE_ADMIN") {
                            console.log('You do not have ADMIN permissions to perform this action.');
                            return;
                        }

                        mySession.publish(publisher);
                        // Set the main video in the page to display our webcam and store our Publisher
                        this.setState({
                            mainStreamManager: publisher
                        });
                    })
                    .catch((error) => {
                        console.log('There was an error connecting to the session:', error.code, error.message);
                    });
                });
            }
        );
    }

    async getToken() {
        return await this.createToken(this.state.mySessionId);
    }
    
    async createToken(sessionId) {
	console.log(API_SERVER_URL)
        const response = await axios.post(API_SERVER_URL + 'connection/' + sessionId, {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
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
            <div className = "container">
                {
                this.state.session === undefined ? (
                    <div id="join">
                        <form className="form-group" onSubmit={this.joinSession}>
                            <p>
                                <label>Participant: </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="userName"
                                    value={this.myUserName}
                                    onChange={this.handleChangeUserName}
                                    required
                                />
                            </p>
                            <p>
                                <label> Session: </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="sessionId"
                                    value={this.myUserName}
                                    onChange={this.handleChangeSessionId}
                                    required
                                />
                            </p>
                            <p className="text-center">
                                <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                            </p>
                        </form>
                    </div>
                ) : null}

                {this.state.session !== undefined ? (
                    <div id="session">
                        <div id="session-header">
                            <input
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="Leave session"
                            />
                        </div>

                        <div id="video-container" className="col-md-6">
                            
                        {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />

                            </div>
                        ) : null}
                        <div id="video-container" className="col-md-6">
                            {this.state.publisher !== undefined ? (
                                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                    <span>{sub.id}</span>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>
			            </div>
                   </div>
                ) : null}
            </div>
        )
    }
}

export default OnlineMeeting;

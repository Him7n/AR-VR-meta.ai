import React, { useEffect, useState } from 'react';
import { SocketManager } from '../Socketmanager';
import { InputBox } from '../Component/InputBox';
import { Button } from '../Component/Button';
import { socket } from '../Socketmanager';
import '../Pages/VoiceChat.css';
import { Peer } from "peerjs";
import { connect } from 'socket.io-client';

const VoiceChat = () => {
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [roomId, setRoomId] = useState('');
    const myPeer = new Peer();
    const [mystream, setMystream] = useState(null);
    const [remotestream, setRemoteStream] = useState(null);

    useEffect(() => {
        const videoGrid = document.getElementById('video-grid');
        myPeer.on('open', id => {
            console.log("Peer joined room: " + id);
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setMystream(stream);
                const myVideo = document.createElement('video');
                myVideo.srcObject = stream;
                // myVideo.muted = true;
                myVideo.play();
                videoGrid.appendChild(myVideo);

                myPeer.on('call', call => {
                    call.answer(stream);
                    const video = document.createElement('video');
                    call.on('stream', userVideoStream => {
                        addVideoStream(video, userVideoStream);
                    });
                });

                socket.on('user-connected', userId => {
                    connectToNewUser(userId, stream);
                });
            })
            .catch(error => {
                console.error('Error accessing webcam:', error);
            });

        return () => {
            // Cleanup code here if needed
        };
    }, []);

    function addVideoStream(video, stream) {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        document.getElementById('video-grid').appendChild(video);
    }

    function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
        call.on('close', () => {
            // video.remove();
        });
    }

    const handleCreateRoom = () => {
        console.log('Room created:', roomId);
        // Implement room creation logic here
    };

    const handleJoinRoom = () => {
        console.log('Joining Room:', roomId);
        // Implement join room logic here
    };

    return (
        <>
            <div>VoiceChat</div>
            <InputBox label="RoomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
            <Button label="Create Room" onClick={handleCreateRoom} />
            <InputBox label="Join Room" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
            <Button label="Join Room" onClick={handleJoinRoom} />
            <SocketManager />

            {joinedRoom && <h1>Audio Joined</h1>}

            {/* {mystream && (
                <div>
                    <h2>Webcam Stream</h2>
                    <video autoPlay muted style={{ width: '100%', maxWidth: '400px' }} ref={(videoRef) => { if (videoRef) videoRef.srcObject = mystream; }} />
                </div>
            )} */}

            {/* {remotestream && (
                <div>
                    <h2>Remote Webcam Stream</h2>
                    <video autoPlay muted style={{ width: '100%', maxWidth: '400px' }} ref={(videoRef) => { if (videoRef) videoRef.srcObject = remotestream; }} />
                </div>
            )} */}

            <div id="video-grid"></div>
        </>
    );
};

export default VoiceChat;

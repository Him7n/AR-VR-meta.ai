import React, { useCallback, useEffect, useState } from 'react';
import { SocketManager } from '../Socketmanager';
import { InputBox } from '../Component/InputBox';
import { Button } from '../Component/Button';
import { socket } from '../Socketmanager';
import peer from '../Services/Peer';
const VoiceChat = () => {
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [remoteSocketid, setRemoteSocketid] = useState();
    const [remoteStream, setRemoteStream] = useState();

    const [mystream, setMystream] = useState(null); // Changed to null initially
    const [roomId, setRoomId] = useState('');

    const handleJoinedRoom = async (room) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMystream(stream);
            console.log(mystream)
            console.log('Joined Room: ' + room);
            setJoinedRoom(true);
            setRemoteSocketid(room);
            console.log(remoteSocketid);

            // Start webRTC functionality here
            const offer = await peer.getOffer();
            socket.emit("user:call", { to: room, offer });

        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    };
    const sendStreams = useCallback(() => {
        console.log(mystream)
        if (mystream && mystream.getTracks) { // Add null and method existence check
            for (const track of mystream.getTracks()) {
                peer.peer.addTrack(track, mystream);
            }
            console.log('Sending streams:', mystream.getTracks());
        } else {
            console.warn('mystream is null or getTracks is not available.');
        }
    }, [mystream]);
    const handleNegoNeedIncomming = useCallback(
        async ({ from, offer }) => {
            const ans = await peer.getAnswer(offer);
            socket.emit("peer:nego:done", { to: from, ans });
        },
        [socket]
    );
    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        console.log('Sending offer: nego');
        socket.emit("peer:nego:needed", { offer, to: remoteSocketid });
    }, [remoteSocketid, socket]);
    const handleCallAccepted = useCallback(
        ({ from, ans }) => {
            peer.setLocalDescription(ans);
            console.log("Call Accepted!");
            sendStreams();
        },
        [sendStreams]
    );
    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        console.log("nego final");
        console.log(remoteStream);
        await peer.setLocalDescription(ans);
    }, []);
    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);
    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);
    const handleIncommingCall = useCallback(
        async ({ from, offer }) => {
            setRemoteSocketid(from);
            console.log("Incommingcall!");
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMystream(stream);
            console.log(mystream);
            console.log(stream)
            console.log(`Incoming Call`, from, offer);
            const ans = await peer.getAnswer(offer);
            socket.emit("call:accepted", { to: from, ans });
        },
        [socket]
    );

    useEffect(() => {
        socket.on('joined Room', handleJoinedRoom);
        socket.on("incomming:call", handleIncommingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);
        return () => {
            socket.off('joined Room', handleJoinedRoom);
            socket.off("incomming:call", handleIncommingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncomming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
        };
    }, []);
    useEffect(() => {
        console.log('mystream updated:', mystream);
    }, [mystream]);
    useEffect(() => {
        console.log(remoteSocketid);
    }, [remoteSocketid]);
    const handleCreateRoom = useCallback(() => {
        console.log('Room created:', roomId);
        // Implement room creation logic here
    }, [roomId]);

    const handleJoinRoom = useCallback(() => {
        console.log('Joining Room:', roomId);
        // Implement join room logic here
    }, [roomId]);

    return (
        <>
            <div>VoiceChat</div>
            <InputBox label="RoomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
            <Button label="Create Room" onClick={handleCreateRoom} />
            <InputBox label="Join Room" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
            <Button label="Join Room" onClick={handleJoinRoom} />
            <SocketManager />

            {joinedRoom && <h1>Audio Joined</h1>}
            {mystream && (
                <div>
                    <h2>Webcam Stream</h2>
                    <video autoPlay muted style={{ width: '100%', maxWidth: '400px' }} ref={(videoRef) => { if (videoRef) videoRef.srcObject = mystream; }} />
                </div>
            )}

            {remoteStream && (
                <div>
                    <h2>Webcam Stream</h2>
                    <video autoPlay muted style={{ width: '100%', maxWidth: '400px' }} ref={(videoRef) => { if (videoRef) videoRef.srcObject = remoteStream; }} />
                </div>
            )}
        </>
    );
};

export default VoiceChat;

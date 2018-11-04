import axios from 'axios';

const BACKEND_HOST = "http://192.168.0.3:8000";

function play(roomId, round) {
    let payload = {
        roomId: roomId,
        round: round
    };
    return axios
      .post(`${BACKEND_HOST}/play`, payload, {withCredentials: true});
}

function getRoom(id) {
    return axios
      .get(`${BACKEND_HOST }/rooms/${id}`, {withCredentials: true});
}

function createRoom() {
    return axios
      .post(`${BACKEND_HOST}/rooms`, {name: ""}, {withCredentials: true});
}

function joinRoom(id) {
    return axios
      .post(`${BACKEND_HOST}/rooms/${id}/join`, null, {withCredentials: true});
}

function start(id) {
    return axios
      .post(`${BACKEND_HOST}/rooms/${id}/start`, null, {withCredentials: true});
}

function getMe() {
    return axios
      .get(`${BACKEND_HOST}/me`, {withCredentials: true});
}

function login(name) {
    return axios
      .post(`${BACKEND_HOST}/login`, {name: name}, {withCredentials: true});
}

export default {
    getRoom,
    play,
    createRoom,
    joinRoom,
    getMe,
    login,
    start
};
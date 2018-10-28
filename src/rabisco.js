import axios from 'axios';

const BACKEND_HOST = "http://192.168.0.3:8000";

function play(roomId, round) {
    let payload = {
        roomId: roomId,
        round: round
    };
    return axios
      .post(BACKEND_HOST + '/play', payload, {headers: {"X-Player-ID": "diadorim"}});
}

function getRoom(id) {
    return axios
      .get(BACKEND_HOST + '/rooms/' + id, {headers: {"X-Player-ID": "diadorim"}});
}

export default {
    getRoom,
    play
};

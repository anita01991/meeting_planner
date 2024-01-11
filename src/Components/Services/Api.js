import * as Constants from '../Services/Constants';
import axios from 'axios';
const ApiEndpint=process.env.REACT_APP_API_END_pOINT;

const allMeetingRoom=async(data)=>{
    const result = await axios.get(ApiEndpint + Constants.GET_ALL_MEETINGROOM);
    return result.data;
}

export {allMeetingRoom}

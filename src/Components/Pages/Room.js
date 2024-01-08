import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Room = () => {
    let [roomData, setRoomData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [isSave, setIsSave] = useState(false);
    let [roomClientList, setRoomClientList] = useState([]);
    let [roomObj, setRoomobj] = useState({

        "roomId": 0,
        "roomName": "",
        "roomLocation": "",
        "roomSeatingCapacity": 0,
        "isRoomActive": true,
        "clientId": 30,
        "createdDate": new Date(),
        "lastUpdatetd": new Date()
    })

    const Api = "https://onlinetestapi.gerasim.in/api/Meeting/";

    useEffect(() => {
        showMeetingRoomData();
        showClientList();
    }, [])

    const showMeetingRoomData = async () => {

        try {
            const result = await axios.get(Api + 'GetAllRooms');
            setIsLoader(false);
            setRoomData(result.data.data);
        } catch (error) {
            alert(error.code)

        }
    }

    const showClientList = async () => {
        try {
            const result = await axios.get(Api + "GetAllClients?clientId=clientName");
            setRoomClientList(result.data.data);
            console.log(result.data.data);

        } catch (error) {
            console.log(error.code);

        }

    }

    const inputChangeRoomObj = (event, key) => {
        setRoomobj(prevObj => ({ ...prevObj, [key]: event.target.value }))

    }

    const isActiveChange = (event) => {
        setRoomobj(prevObj => ({ ...prevObj, isRoomActive: event.target.checked }))
    }

    const addMeetingRoomData = async () => {
        setIsSave(true);
        try {
            const result = await axios.post(Api + 'CreateRoom', roomObj);
            setIsLoader(false);
            if (result.data.result) {
                alert('Room Data Added Successfully');
                setIsSave(false);
                showMeetingRoomData();
                resetRoomData();
            }
            else {
                alert(result.data.message);
            }

        } catch (error) {
            alert(error.code);
            setIsLoader(false);
        }
    }

    const editMeetingRoomData = async (id) => {
        const result = await axios.get(Api + 'GetRoomById?id=' + id);
        if (result.data.result) {
            setRoomobj(result.data.data);
        }
        else {
            alert(result.data.message);
        }

    }

    const updateMeetingRoomData = async () => {
        try {
            const result = await axios.post(Api + 'UpdateRoom', roomObj);
            if (result.data.result) {
                {
                    alert("Meeting Room Data Updated SuccessFully");
                    showMeetingRoomData();
                    resetRoomData();

                }
            }

        } catch (error) {
            alert(error.code);

        }
    }

    const deleteMeetingRoomData = async (id) => {
        const isDelete = window.confirm("Are you sure want to Delete");
        if (isDelete) {
            try {
                const result = await axios.post(Api + 'DeleteRoomById?id=' + id);
                if (result.data.result) {
                    alert("Meeting Room Deleted Successfully");
                    showMeetingRoomData();
                }
                else {
                    alert(result.data.message);
                }

            } catch (error) {
                alert(error.code)

            }
        }

    }

    const resetRoomData = () => {
        setRoomobj({

            "roomId": 0,
            "roomName": "",
            "roomLocation": "",
            "roomSeatingCapacity": 0,
            "isRoomActive": true,
            "clientId": 30,
            "createdDate": "",
            "lastUpdatetd": ""

        })
    }

    return (

        <div className='row'>
            <div className='col-5'>
                <div className='card'>
                    <div className='card header bg-success'>
                        <div className='row'>
                            <div className='col-12 text-center'>
                                <strong>Room From</strong>

                            </div>
                        </div>

                    </div>
                    <div className='card-body'>
                        <div className='row mt-4'>
                            <div className='col-6'>
                                <label><b>Room Name</b></label>
                                <input type='text' value={roomObj.roomName} onChange={(event) => { inputChangeRoomObj(event, 'roomName') }} className='form-control' placeholder='enter  room name' />
                            </div>
                            <div className='col-6'>
                                <label><b>Room Location</b></label>

                                <select className='form-control' value={roomObj.roomLocation} onChange={(event) => { inputChangeRoomObj(event, 'roomLocation') }}>
                                    <option value=''>Select</option>
                                    <option value='mumbai'>Mumbai</option>
                                    <option value='pune'>Pune</option>
                                </select>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-6'>
                                <label><b>RoomSeatingCapacity</b></label>
                                <input type='text' value={roomObj.roomSeatingCapacity} onChange={(event) => { inputChangeRoomObj(event, 'roomSeatingCapacity') }} className='form-control' placeholder='enter  roomSeatingCapacity' />
                            </div>
                            <div className='col-6'>
                                <label><b>Client Name</b></label>
                                <select className='form-control' value={roomObj.clientId} onChange={(event) => { inputChangeRoomObj(event, 'clientId') }}>
                                    <option value=''>Select client</option>
                                    {
                                        roomClientList.map((item) =>
                                        (
                                            <option key={item.clientId} value={item.clientId}>{item.clientName}</option>
                                        )
                                        )
                                    }

                                </select>


                            </div>
                        </div>


                        <div className='row mt-4'>
                            <div className='col-6 form-check'>
                                <label className='form-check-label'><b>IsRoomActive</b></label>
                                <input type='checkbox' checked={roomObj.isRoomActive} onChange={(event) => { isActiveChange(event) }} className='form-check-input' />
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-3'>
                                <button className='btn btn-sm bg-success' onClick={resetRoomData}>Reset</button>
                            </div>
                            <div className='col-6 text-end'>
                                {roomObj.roomId == 0 && <button className='btn btn-sm bg-success text-end' disabled={roomObj.roomName == '' || roomObj.createdDate == '' || roomObj.clientId == '' || roomObj.lastUpdatetd == '' ||
                                    roomObj.roomLocation == '' || roomObj.roomSeatingCapacity == ''} onClick={addMeetingRoomData}>{isSave && <span className='spinner-border spinner-border-sm'></span>}Save</button>
                                }

                                {roomObj.roomId !== 0 && <button className='btn btn-sm bg-success' onClick={updateMeetingRoomData}>Update</button>}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div className='col-7'>
                <div className='card'>
                    <div className='card header bg-success'>
                        <div className='row'>
                            <div className='col-12 text-center'>
                                <strong>Room Data</strong>

                            </div>
                        </div>

                    </div>
                    <div className='card-body' style={{ overflow: 'auto' }}>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Room Name</th>
                                    <th>Location</th>
                                    <th>Capacity</th>
                                    <th>Client Name</th>
                                    <th>IsActive</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {isLoader && <tbody>
                                <tr>
                                    <td colSpan="8" >
                                        <div className="spinner-border text-muted"></div>
                                        <div className="spinner-border text-primary"></div>
                                        <div className="spinner-border text-success"></div>
                                        <div className="spinner-border text-info"></div>
                                        <div className="spinner-border text-warning"></div>
                                        <div className="spinner-border text-danger"></div>
                                        <div className="spinner-border text-secondary"></div>
                                        <div className="spinner-border text-dark"></div>
                                        <div className="spinner-border text-light"></div>
                                    </td>
                                </tr>
                            </tbody>}
                            <tbody>
                                {
                                    roomData.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.roomName}</td>
                                                <td>{item.roomLocation}</td>
                                                <td>{item.roomSeatingCapacity}</td>
                                                <td>{item.clientName}</td>
                                                <td>{item.isRoomActive ? 'Yes' : 'No'}</td>
                                                <td><button className='btn btn-danger btn-sm' onClick={() => editMeetingRoomData(item.roomId)}>Edit</button></td>
                                                <td><button className='btn btn-primary btn-sm' onClick={() => deleteMeetingRoomData(item.roomId)}>Delete</button></td>

                                            </tr>)
                                    })
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Room;
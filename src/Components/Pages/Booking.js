import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Booking = () => {
    const Api = "https://onlinetestapi.gerasim.in/api/Meeting/";
    let [bookingRoomList, setBookRoomList] = useState([]);
    let [bookingRoomObj, setbookingRoomObj] = useState({

        "bookingId": 0,
        "roomId": 0,
        "userId": 0,
        "bookingDate": "2024-01-09T06:42:26.135Z",
        "fromTime": 0,
        "toTime": 0,
        "createdDate": new Date(),
        "lastUpdated": new Date()
    })

    let [roomList, SetRoomList] = useState([]);
    let [userList, setUserList] = useState([]);
    let [timeList, setTimeList] = useState([]);

    let [isLoader, setIsLoader] = useState(true);
    let [isSaveLoader, setIsSaveLoder] = useState(false);

    useEffect(() => {

        getAllRoomList();
        getAllUserList();
        getTimeList();
        getAllBooking();
    }, [])

    const getAllRoomList = async () => {
        try {
            let result = await axios.get(Api + 'GetAllRooms?roomId=roomName');
            if (result.data.result) {
                SetRoomList(result.data.data);
                console.log(result.data.data)

            }

        } catch (error) {
            console.log(error.code);

        }
    }

    const getAllUserList = async () => {
        try {
            let result = await axios.get(Api + 'GetAllusers?userId=userName');
            if (result.data.result) {
                setUserList(result.data.data);
                console.log(result.data.data)

            }

        } catch (error) {
            console.log(error.code);

        }

    }

    const getTimeList = async () => {
        try {
            let result = await axios.get(Api + 'GetTimeList?timeId=time');
            if (result.data.result) {
                setTimeList(result.data.data);
                console.log(result.data.data)

            }

        } catch (error) {
            console.log(error.code);

        }

    }

    const inputChangeClientObj = (event, key) => {
        setbookingRoomObj(prevObj => ({ ...prevObj, [key]: event.target.value }))

    }

    const getAllBooking = async () => {
        let result = await axios.get(Api + 'GetAllBookings');
        setIsLoader(false);
        setBookRoomList(result.data.data);


    }

    const addBookingData = async () => {
        setIsSaveLoder(true);
        try {
            let result = await axios.post(Api + 'CreateBooking', bookingRoomObj);
            if (result.data.result) {
                alert("Room Booking Data Added SuccessFully");
                getAllBooking();
                setIsSaveLoder(false);
                resetBookingData();
            }
            else {
                alert(result.data.message);
                setIsSaveLoder(false);
                resetBookingData();
            }

        } catch (error) {
            console.log(error.code);
            setIsSaveLoder(false);
            resetBookingData();

        }

    }
    const editBookingRoomData = async (id) => {
        const result = await axios.get(Api + 'GetBookingById?id=' + id);
        if (result.data.result) {
            setbookingRoomObj(result.data.data);
        }
        else {
            alert(result.data.message);
        }

    }


    const updateBookigRoomData = async () => {
        try {
            let result=await axios.post(Api + 'UpdateBooking',bookingRoomObj)
            if(result.data.result){
                alert(" Booking Room Data Updated SuccessFully");
                getAllBooking();
                resetBookingData();
            }
            
        } catch (error) {
            alert(error.code)
            
        }

    }

    const deleteBookingtData = async (id) => {
        const isDelete = window.confirm("Are you sure want to Delete");
        if (isDelete) {
            try {
                const result = await axios.post(Api + 'DeleteBookingById?id=' + id);
                if (result.data.result) {
                    alert("BookingRoom Data Deleted Successfully");
                    getAllBooking();
                }
                else {
                    alert(result.data.message);
                }

            } catch (error) {
                alert(error.code)

            }
        }

    }

    const resetBookingData = () => {
        setbookingRoomObj({
            "bookingId": 0,
            "roomId": 0,
            "userId": 0,
            "bookingDate": "2024-01-09T06:42:26.135Z",
            "fromTime": 0,
            "toTime": 0,
            "createdDate": new Date(),
            "lastUpdated": new Date()

        })
    }


    return (
        <div>
            <div className='row'>
                <div className='col-5'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <strong>Booking From</strong>

                                </div>
                            </div>

                        </div>
                        <div className='card-body'>
                            <div className='row mt-4'>
                                <div className='col-6'>
                                    <label><b>Room Name</b></label>
                                    <select value={bookingRoomObj.roomId} onChange={(event) => { inputChangeClientObj(event, 'roomId') }} className='form-select' aria-label='Default select' >
                                        <option value=''>Select client</option>
                                        {
                                            roomList.map((item, index) => {
                                                return (<option key={index} value={item.roomId}>{item.roomName}</option>)
                                            })
                                        }
                                    </select>

                                </div>
                                <div className='col-6'>
                                    <label><b> User Name</b></label>
                                    <select value={bookingRoomObj.userId} onChange={(event) => { inputChangeClientObj(event, 'userId') }} className='form-select' aria-label='Default select'>
                                        <option value='' >Select user</option>
                                        {
                                            userList.map((item, index) => {
                                                return (<option key={index} value={item.userId}>{item.userName}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-6'>
                                    <label><b>Booking Date</b></label>
                                    <input type='date' value={bookingRoomObj.bookingDate} onChange={(event) => { inputChangeClientObj(event, 'bookingDate') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label><b> From Time</b></label>
                                    <select value={bookingRoomObj.fromTime} onChange={(event) => { inputChangeClientObj(event, 'fromTime') }} className='form-select' aria-label='Default select'>
                                        <option value='' >Select From time</option>
                                        {
                                            timeList.map((item, index) => {
                                                return (<option key={item.timeId} value={item.timeId}>{item.time}</option>)
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className='row mt-4'>
                                <div className='col-6'>
                                    <label><b>To Time</b></label>
                                   
                                    <select value={bookingRoomObj.toTime} onChange={(event) => { inputChangeClientObj(event, 'toTime') }} className='form-select' aria-label='Default select'>
                                        <option value='' >Select To time</option>
                                        {
                                            timeList.map((item, index) => {
                                                return (<option key={item.timeId} value={item.timeId}>{item.time}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-3'>
                                    <button className='btn btn-sm bg-success' onClick={resetBookingData}>Reset</button>
                                </div>
                                <div className='col-6 text-end'>
                                    {bookingRoomObj.bookingId == 0 && <button className='btn btn-sm bg-success text-end' disabled={bookingRoomObj.roomId == '' || bookingRoomObj.userId == '' || bookingRoomObj.bookingDate == '' ||
                                        bookingRoomObj.toTime == '' || bookingRoomObj.fromTime == ''} onClick={addBookingData}>{isSaveLoader && <span className='spinner-border spinner-border-sm'></span>}Save</button>
                                    }

                                    {bookingRoomObj.bookingId !== 0 && <button className='btn btn-sm bg-success' onClick={updateBookigRoomData}>Update</button>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='col-7'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <strong> Room Booking Data</strong>

                                </div>
                            </div>

                        </div>
                        <div className='card-body' style={{ overflow: 'auto' }}>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Client Name</th>
                                        <th>Room Name</th>
                                        <th>User Name</th>
                                        <th>bookingDate</th>
                                        <th>From Time</th>
                                        <th>To time</th>
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
                                    {bookingRoomList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.clientName}</td>
                                                <td>{item.roomName}</td>
                                                <td>{item.userName}</td>
                                                <td>{item.bookingDate}</td>
                                                <td>{item.fromTime}</td>
                                                <td>{item.toTime}</td>
                                                <td><button className='btn btn-danger btn-sm' onClick={() => editBookingRoomData(item.bookingId)}>Edit</button></td>
                                                <td><button className='btn btn-primary btn-sm' onClick={() => deleteBookingtData(item.bookingId)}>Delete</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>


    );
};

export default Booking;
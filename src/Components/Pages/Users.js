import axios from 'axios';

import React, { useEffect, useState } from 'react';

const Users = () => {

    const Api = 'https://onlinetestapi.gerasim.in/api/Meeting/';
    let [usersData, setUsersData] = useState([]);
    let [clientData, setClientData] = useState([]);
    let [isSave, setIsSave] = useState(false);
    let [isLoader, setIsloader] = useState(true);
    let [usersObj, setUsersObj] = useState({

        "userId": 0,
        "clientId": 0,
        "userName": "",
        "userPassword": "",
        "createdDate": new Date(),
        "lastUpdated": new Date(),
        "isActive": true,
        "role": ""
    })

    useEffect(() => {
        ShowAllUsersData();
        showClientList();

    }, [])

    const ShowAllUsersData = async () => {

        try {
            const result = await axios.get(Api + 'GetAllusers');
            if (result.data.result) {
                setIsloader(false);
                setUsersData(result.data.data);
            }
            else {
                alert(result.data.message);
            }

        } catch (error) {
            alert(error.code);
        }

    }
    const showClientList = async () => {
        try {
            const result = await axios.get(Api + "GetAllClients?clientId=clientName");
            setClientData(result.data.data);

        } catch (error) {
            console.log(error.code);

        }
    }

    const isActiveChange = (event) => {
        setUsersObj(prvObj => ({ ...prvObj, isActive: event.target.checked }))
    }

    const inputHandle = (event, key) => {
        setUsersObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const addUsersData = async () => {
        setIsSave(true);
        try {
            const result = await axios.post(Api + 'AddUsers', usersObj);
            if (result.data.result) {
                alert("Users created Successfully");
                setIsSave(false);
                ShowAllUsersData();
                resetUserData();
            }
            else {
                alert(result.data.message);
                setIsSave(false);
            }

        } catch (error) {
            alert(error.code);
            setIsSave(false);

        }

    }

    const editUsersData = async (id) => {
        try {

            const result = await axios.get(Api + 'GetUsersById?id=' + id);
            if (result.data.result) {
                setUsersObj(result.data.data);
            }
        } catch (error) {
            alert(error.code);

        }
    }

    const updateUserData = async () => {
        try {
            const result = await axios.post(Api + 'UpdateUser', usersObj);
            if (result.data.result) {
                alert(' User Data Updated Successfuly');
                ShowAllUsersData();
                resetUserData();
            }

        } catch (error) {
            alert(error.code);

        }

    }

    const deleteUserData = async (id) => {
        const isDelete = window.confirm("Are you sure want to Delete");
        if (isDelete) {

            try {
                const result = await axios.post(Api + 'DeleteUsersById?id=' + id);
                if (result.data.result) {
                    alert("User Data Deleted Sucessfully");
                    ShowAllUsersData();
                }
                else {
                    alert(result.data.message);
                }
            } catch (error) {
                alert(error.code);
            }
        }
    }

    const resetUserData = () => {
        setUsersObj({
            "userId": 0,
            "clientId": 0,
            "userName": "",
            "userPassword": "",
            "createdDate": new Date(),
            "lastUpdated": new Date(),
            "isActive": true,
            "role": ""
        })

    }

    return (
        <div>
            <div className='row'>
                <div className='col-5'>
                    <div className='card'>
                        <div className='card header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <strong>Users From</strong>

                                </div>
                            </div>

                        </div>
                        <div className='card-body'>
                            <div className='row mt-3'>
                                <div className='col-6'>
                                    <label><b>Users Name</b></label>
                                    <input type='text' value={usersObj.userName} onChange={(event) => { inputHandle(event, 'userName') }} className='form-control' placeholder='enter users Name' />

                                </div>
                                <div className='col-6'>
                                    <label><b>PassWord</b></label>
                                    <input type='password' value={usersObj.userPassword} onChange={(event) => { inputHandle(event, 'userPassword') }} className='form-control' placeholder='enter password' />

                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label><b>ClientId</b></label>
                                    <select className='form-control' value={usersObj.clientId} onChange={(event) => { inputHandle(event, 'clientId') }}>
                                        <option value=''>select Client</option>
                                        {
                                            clientData.map((item) => {
                                                return (
                                                    <option key={item.clientId} value={item.clientId}>{item.clientName}</option>
                                                )

                                            })
                                        }

                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label><b>Role</b></label>
                                    <select className='form-control' value={usersObj.role} onChange={(event) => { inputHandle(event, 'role') }}>
                                        <option value=''> Select Role</option>
                                        <option value='admin'>Admin</option>
                                        <option value='user'>User</option>
                                        <option value='clientuser'>Client user</option>

                                    </select>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-6 form-check'>
                                    <label className='form-check-label'><b>IsActive</b></label>
                                    <input type='checkbox' checked={usersObj.isActive} onChange={(event) => { isActiveChange(event) }} className='form-check-input' />
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-3'>
                                    <button className='btn btn-sm bg-success' onClick={resetUserData} >Reset</button>
                                </div>
                                <div className='col-6 text-end'>
                                    {usersObj.userId === 0 && <button className='btn btn-sm bg-success text-end' onClick={addUsersData}>{isSave && <span className='spinner-border spinner-border-sm'></span>}Save</button>
                                    }

                                    {usersObj.userId !== 0 && <button className='btn btn-sm bg-success' onClick={updateUserData}>Update</button>}
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
                                    <strong>Users Data</strong>

                                </div>
                            </div>

                        </div>
                        <div className='card-body' style={{ overflow: 'auto' }}>
                            <div className='row mt-4'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Users Name</th>
                                            <th>U-Password</th>
                                            <th>Role</th>
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
                                            usersData.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.userName}</td>
                                                        <td>{item.userPassword}</td>
                                                        <td>{item.role}</td>
                                                        <td>{item.clientName}</td>
                                                        <td>{item.isActive ? 'Yes' : 'No'}</td>
                                                        <td><button className='btn btn-primary btn-sm' onClick={() => editUsersData(item.userId)} >Edit</button></td>
                                                        <td><button className='btn btn-danger btn-sm' onClick={() => { deleteUserData(item.userId) }}>Delete</button></td>

                                                    </tr>)
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Users;



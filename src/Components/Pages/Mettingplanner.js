import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Mettingplanner = () => {
    let [userData, setuserData] = useState([]);
    let [userObj, setuserObj] = useState({
        "userId": 0,
        "clientId": 0,
        "userName": "",
        "userPassword": "",
        "createdDate": new Date(),
        "lastUpdated": new Date(),
        "isActive": false,
        "role": ""
    }
    )
    let [clientList, setclientList] = useState([]);


    const getallclient = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllClients')
        setclientList(result.data.data);

    }


    useEffect(() => {
        getAllUser();
        getallclient()
    }, [])



    const getAllUser = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllusers');
        setuserData(result.data.data);

    }

    const addUserObj = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/AddUsers', userObj);

        if (result.data.result) {
            alert('userdata deleted succfully')
            getAllUser()
        }

        else {
            alert(result.data.message)
        }

    }


    const changeFormvalue = (event, key) => {
        setuserObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const isActiveChange = (event) => {
        setuserObj(prevObj => ({ ...prevObj, isActive: event.target.checked }))
    }

    const editUserdata = async (id) => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetUsersById?id=' + id)
        debugger;
        if (result.data.result) {
            setuserObj(result.data.data)


        }
        else {
            alert(result.data.message)
        }

    }
    const updateUserData = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateUser', userObj)
        if (result.data.result) {
            alert('updated successfully')
            getAllUser()
        }

        else {
            alert(result.data.message)
        }
    }

    const deleteUserdata = async (id) => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/DeleteUsersById?id=' + id);
        if (result.data.result) {

            alert('userData Deleted')
            getAllUser()
        }
        else {
            alert(result.data.message)
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-info'>
                            Userpage
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>User Name</th>
                                        <th>U.password</th>
                                        <th>clinetName</th>
                                        <th>IsActive</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userData.map((item, index) => {
                                            return (<tr>
                                                <td>{index + 1}</td>
                                                <td>{item.userName}</td>
                                                <td>{item.userPassword}</td>
                                                <td>{item.clientName}</td>
                                                <td>{item.isActive ? 'true' : 'false'}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    <button className='btn btn-primary btn-sm' onClick={() => { editUserdata(item.userId) }} >Edit</button>
                                                    <button className='btn btn-danger btn-sm' onClick={() => { deleteUserdata(item.userId) }} >Delete</button>
                                                </td>
                                            </tr>)
                                        })

                                    }
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-danger text-white'>
                            New user page
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>user Name</label>
                                    <input type='text' value={userObj.userName} onChange={(event) => { changeFormvalue(event, 'userName') }} className='form-control' />

                                </div>
                                <div className='col-6'>
                                    <label>user password</label>
                                    <input type='password' value={userObj.userPassword} onChange={(event) => { changeFormvalue(event, 'userPassword') }} className='form-control' />

                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>clientName</label>
                                    <select className='form-select' value={userObj.clientId} onChange={(event) => { changeFormvalue(event, 'clientId') }}>
                                        <option value=''>select clientName</option>
                                        {
                                            clientList.map((item) => {
                                                return (
                                                    <option value={item.clientId}>{item.clientName}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label>Role</label>
                                    <select className='form-select' value={userObj.role} onChange={(event) => { changeFormvalue(event, 'role') }}>
                                        <option>select</option>
                                        <option value='manager'>manager</option>
                                        <option value='admin'>admin</option>
                                        <option value='user'>user</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6 pt-3'>
                                    <label>isActive</label>
                                    <input type='checkbox' checked={userObj.isActive} onChange={(event) => { isActiveChange(event) }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 pt-3 text-center'>
                                    {userObj.userId == 0 && <button className='btn btn-success' disabled={userObj.userName === "" || userObj.userPassword === ""} onClick={addUserObj}>Add</button>}
                                    {userObj.userId !== 0 && <button className='btn btn-warning' onClick={() => updateUserData(userObj.userId)}>update data</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Mettingplanner;
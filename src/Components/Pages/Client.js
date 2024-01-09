import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Client = () => {
    let [ClientList, setCilentList] = useState([]);

    let [ClientObj, setClientObj] = useState(
        {
            "clientId": 0,
            "clientName": "",
            "companyName": "",
            "address": "",
            "city": "",
            "pinCode": "",
            "state": "",
            "employeeStrength": 0,
            "gstNo": "",
            "contactNo": ""
        }
    )

    useEffect(() => {
        getAllClient();
    }, []);

    const getAllClient = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllClients');
        setCilentList(result.data.data)
    }

    const SaveClient = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/AddClients', ClientObj)
        if (result.data.result) {
            alert('Client Created Succuessfully')
            getAllClient()
        } else {
            alert(result.data.message)
        }
    }
    const changeFormValue = (event, key) => {
        setClientObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }


    const DeleteClient = async (clientId) => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/DeleteClients?id=' + clientId);
        if (result.data.result) {
            alert('Client Deleted Succuessfully');

        } else {
            alert(result.data.message);
        }

    }

    const editClient = async (id) => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetClientsById?id=' + id)
        debugger;
        if (result.data.result) {
            setClientObj(result.data.data)


        } else {
            alert(result.data.message)
        }
    }

    const UpdateClient = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateClients', ClientObj)
        if (result.data.result) {
            alert('Client Updated Succuessfully')
            getAllClient()
        } else {
            alert(result.data.message)
        }

    }
    return (
        <div>
            <div className='row container-fluid'>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-warning'>
                            Create Client Form
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Client Name</label>
                                    <input type='text' className='form-control' value={ClientObj.clientName} onChange={(e) => changeFormValue(e, 'clientName')} />
                                </div>
                                <div className='col-6'>
                                    <label>Company Name</label>
                                    <input type='text' className='form-control' value={ClientObj.companyName} onChange={(e) => changeFormValue(e, 'companyName')} />
                                </div>
                                <div className='col-6'>
                                    <label>Address</label>
                                    <textarea className='form-control' value={ClientObj.address} onChange={(e) => changeFormValue(e, 'address')} />
                                </div>
                                <div className='col-6'>
                                    <label>City</label>
                                    <input type='text' className='form-control' value={ClientObj.city} onChange={(e) => changeFormValue(e, 'city')} />
                                </div>

                                <div className='col-6'>
                                    <label>Pincode</label>
                                    <input type='text' className='form-control' value={ClientObj.pinCode} onChange={(e) => changeFormValue(e, 'pinCode')} />
                                </div>
                                <div className='col-6'>
                                    <label>State</label>
                                    <input type='text' className='form-control' value={ClientObj.State} onChange={(e) => changeFormValue(e, 'State')} />
                                </div>

                                <div className='col-6'>
                                    <label>Employee Strength</label>
                                    <input type='text' className='form-control' value={ClientObj.employeeStrength} onChange={(e) => changeFormValue(e, 'employeeStrength')} />
                                </div>
                                <div className='col-6'>
                                    <label>Gst No</label>
                                    <input type='text' className='form-control' value={ClientObj.gstNo} onChange={(e) => changeFormValue(e, 'gstNo')} />
                                </div>


                                <div className='col-6'>
                                    <label>Contact No</label>
                                    <input type='text' className='form-control' value={ClientObj.contactNo} onChange={(e) => changeFormValue(e, 'contactNo')} />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-12 pt-3'>

                                    {ClientObj.clientId == 0 && <button className='btn btn-sm btn-primary' onClick={SaveClient}>Save</button>}
                                    {ClientObj.clientId !== 0 && <button className='btn btn-sm btn-warning' onClick={UpdateClient}>Update</button>}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-warning'>
                            Client List
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>clientName</th>
                                            <th>companyName</th>
                                            <th>address</th>
                                            <th>employeeStrength</th>
                                            <th>contactNo</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ClientList.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.clientName}</td>
                                                    <td>{item.companyName}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.employeeStrength}</td>
                                                    <td>{item.contactNo}</td>
                                                    <td>
                                                        <button className='btn btn-info btn-sm' onClick={() => editClient(item.clientId)}>edit</button>
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-danger btn-sm' onClick={() => DeleteClient(item.clientId)}>delete</button>
                                                    </td>
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

export default Client
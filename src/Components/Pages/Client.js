import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Client = () => {
    let [ClientList, setCilentList] = useState([]);
    let [isSave,setIsSave]=useState(false);
    let [isLoader,setIsLoader]=useState(true);
    let [showincard, setShowinCard] = useState(true);

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
        setIsSave(true);
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/AddClients', ClientObj)
        if (result.data.result) {
            alert('Client Created Succuessfully');
            setIsLoader(false);
            setIsSave(false);
            getAllClient();
            resetClientData();
            
        } else {
            alert(result.data.message);
            setIsSave(false);
        }
    }
    const changeFormValue = (event, key) => {
        setClientObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }


    const DeleteClient = async (clientId) => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/DeleteClients?id=' + clientId);
        if (result.data.result) {
            alert('Client Deleted Succuessfully');
            getAllClient();

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
            alert('Client Updated Succuessfully');
            getAllClient();
            resetClientData();
        } else {
            alert(result.data.message)
        }

    }

    const resetClientData=()=>{
        setClientObj({
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
        })

    }

    
    return (
        <div>
            <div className='row container-fluid'>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-success'>
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

                                    {ClientObj.clientId == 0 && <button className='btn btn-sm btn-primary' onClick={SaveClient}>{isSave && <span className='spinner-border spinner-border-sm'></span>}Save</button>}
                                    {ClientObj.clientId !== 0 && <button className='btn btn-sm bg-success' onClick={UpdateClient}>Update</button>}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                        <button className='btn btn-sm btn-primary text-end ' onClick={() => getAllClient(setShowinCard(!showincard))}>Client List</button>
                            
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                            {!showincard &&    <table className='table table-bordered'>
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
                                            ClientList.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.clientName}</td>
                                                    <td>{item.companyName}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.employeeStrength}</td>
                                                    <td>{item.contactNo}</td>
                                                    <td>
                                                        <button className='btn btn-primary btn-sm' onClick={() => editClient(item.clientId)}>edit</button>
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-danger btn-sm' onClick={() => DeleteClient(item.clientId)}>delete</button>
                                                    </td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>}
                                
                        <div className='container'>
                            <div className='row'>
                                {showincard &&
                                    ClientList.map((client, index) => (
                                        <div key={index} className='col-lg-3 d-flex m-2'>
                                            <div className="card text-dark bg-light" >
                                                <div className="card-header">
                                                    <p>{index + 1}</p>
                                                    <span>Client Name:</span>{client.clientName}
                                                </div>
                                                <div className="card-body" style={{ 'width': '800px', 'height': "400px" }}>
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                           <span>Com-Name:</span> <p>{client.companyName}</p>
                                                           <span>Address:</span><p>{client.address}</p>
                                                           <span>Strength:</span><p>{client.employeeStrength}</p>
                                                           <span>Number:</span><p>{client.contactNo}</p>
                                                           <span>Active</span><p>{client.isRoomActive ? 'Yes' : 'No'}</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                            <button className='btn btn-primary btn-sm m-2' onClick={() => editClient(client.roomId)}>Edit</button>
                                                            <button className='btn btn-danger btn-sm' onClick={() => DeleteClient(client.roomId)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client
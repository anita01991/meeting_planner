import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Client = () => {
    const Api = "https://onlinetestapi.gerasim.in/api/Meeting/";
    let [clientList, setClientList] = useState([]);
    let [isSave, setIsSave] = useState(false);
    let [isLoader, setLoader] = useState(true);
    let [clientObj, setClientObj] = useState({
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
    useEffect(() => {
        GetAllClientData();

    }, [])
    const inputChangeClientObj = (event, key) => {
        setClientObj(prevObj => ({ ...prevObj, [key]: event.target.value }))

    }

    const GetAllClientData = async () => {
        let result = await axios.get(Api + 'GetAllClients');
        setLoader(false);
        setClientList(result.data.data);

    }

    const addClientData = async () => {

        setIsSave(true);
        try {
            let result = await axios.post(Api + 'AddClients', clientObj);
            if (result.data.result) {
                alert("Client Data Added SuccessFully");
                GetAllClientData();
                setIsSave(false);
                resetClientData();
            }
            else {
                alert(result.data.message);
            }

        } catch (error) {
            console.log(error.code);

        }
    }

    const editClientData=async(id)=>{
        const result = await axios.get(Api + 'GetClientsById?id=' + id);
        if (result.data.result) {
            setClientObj(result.data.data);
        }
        else {
            alert(result.data.message);
        }

    }

    const updateClientData = async() => {
        try {
            let result=await axios.post(Api + 'UpdateClients',clientObj)
            if(result.data.result){
                alert(" Client Data Updated SuccessFully");
                GetAllClientData();
                resetClientData();
            }
            
        } catch (error) {
            alert(error.code)
            
        }

    }
     const deleteClientData=async(id)=>{
        const isDelete = window.confirm("Are you sure want to Delete");
        if (isDelete) {
            try {
                const result = await axios.post(Api + 'DeleteClients?id=' + id);
                if (result.data.result) {
                    alert("Client Data Deleted Successfully");
                    GetAllClientData();
                }
                else {
                    alert(result.data.message);
                }

            } catch (error) {
                alert(error.code)

            }
        }
     }

    const resetClientData = () => {
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
            <div className='row'>
                <div className='col-5'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <strong>Client From</strong>

                                </div>
                            </div>

                        </div>
                        <div className='card-body'>
                            <div className='row mt-4'>
                                <div className='col-6'>
                                    <label><b>Client Name</b></label>
                                    <input type='text' value={clientObj.clientName} onChange={(event) => { inputChangeClientObj(event, 'clientName') }} className='form-control' placeholder='enter  client name' />
                                </div>
                                <div className='col-6'>
                                    <label><b>Company Name</b></label>
                                    <input type='text' value={clientObj.companyName} onChange={(event) => { inputChangeClientObj(event, 'companyName') }} className='form-control' placeholder='enter  companyName' />
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-6'>
                                    <label><b>Address</b></label>
                                    <input type='text' value={clientObj.address} onChange={(event) => { inputChangeClientObj(event, 'address') }} className='form-control' placeholder='enter  address name' />
                                </div>
                                <div className='col-6'>
                                    <label><b>city</b></label>
                                    <input type='text' value={clientObj.city} onChange={(event) => { inputChangeClientObj(event, 'city') }} className='form-control' placeholder='enter   city Name' />
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-6'>
                                    <label><b>Pincode</b></label>
                                    <input type='text' maxLength={6} value={clientObj.pinCode} onChange={(event) => { inputChangeClientObj(event, 'pinCode') }} className='form-control' placeholder='enter  pincode' />
                                </div>
                                <div className='col-6'>
                                    <label><b>State</b></label>
                                    <input type='text' value={clientObj.state} onChange={(event) => { inputChangeClientObj(event, 'state') }} className='form-control' placeholder='enter   state' />
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-4'>
                                    <label><b>Employee Strength</b></label>
                                    <input type='text' value={clientObj.employeeStrength} onChange={(event) => { inputChangeClientObj(event, 'employeeStrength') }} className='form-control' placeholder='enter  employeeStrength' />
                                </div>
                                <div className='col-4'>
                                    <label><b>GstNo</b></label>
                                    <input type='text' value={clientObj.gstNo} onChange={(event) => { inputChangeClientObj(event, 'gstNo') }} className='form-control' placeholder='enter  gstNo' />
                                </div>
                                <div className='col-4'>
                                    <label><b>Contact No</b></label>
                                    <input type='text' maxLength={10} value={clientObj.contactNo} onChange={(event) => { inputChangeClientObj(event, 'contactNo') }} className='form-control' placeholder='enter  contactNo' />
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-3'>
                                    <button className='btn btn-sm bg-success' onClick={resetClientData}>Reset</button>
                                </div>
                                <div className='col-6 text-end'>
                                    {clientObj.clientId == 0 && <button className='btn btn-sm bg-success text-end' disabled={clientObj.clientName === '' || clientObj.companyName === '' || clientObj.city === '' || clientObj.pinCode === '' ||
                                        clientObj.state === '' || clientObj.employeeStrength === '' || clientObj.address === '' || clientObj.gstNo === '' || clientObj.contactNo === ''}
                                        onClick={addClientData}>{isSave && <span className='spinner-border spinner-border-sm'></span>}Save</button>
                                    }

                                    {clientObj.clientId !== 0 && <button className='btn btn-sm bg-success' onClick={updateClientData}>Update</button>}
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
                                    <strong> Client Data</strong>

                                </div>
                            </div>

                        </div>
                        <div className='card-body' style={{ overflow: 'auto' }}>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Client Name</th>
                                        <th>Company Name</th>
                                        <th>Employee Strength</th>
                                        <th>Address</th>
                                        <th>Contact No</th>
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
                                    {clientList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.clientName}</td>
                                                <td>{item.companyName}</td>
                                                <td>{item.employeeStrength}</td>
                                                <td>{item.address}</td>
                                                <td>{item.contactNo}</td>
                                                <td><button className='btn btn-danger btn-sm' onClick={() => editClientData(item.clientId)}>Edit</button></td>
                                                <td><button className='btn btn-primary btn-sm' onClick={() => deleteClientData(item.clientId)}>Delete</button></td>
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

export default Client;
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ClientPackage = () => {

    let [isLoader, setIsLoader] = useState(true);

    let [clientList, setClientList] = useState([]);

    let [packageList, setPackageList] = useState([]);

    const StartPoint = 'https://onlinetestapi.gerasim.in/api/Meeting/'

    let [allPackage, setAllPAckage] = useState([]);
    let [showincard, setShowinCard] = useState(true);
    





    let [clientPackageObj, setClientPackageObj] = useState({

        "clientPackageId": 0,
        "clientId": 0,
        "packageId": 0,
        "createdDate": new Date(),
        "lastUpdated": new Date(),
        "packageStartDate": "",
        "packageEndDate": " ",
        "isActive": true

    })

    useEffect(() => {
        // getAllClientPackage();
        getAllClient();
        getAllPackage();

    }, [])

    const getAllClient = async () => {
        const result = await axios.get(StartPoint + 'GetAllClients')

        setIsLoader(false);
        setClientList(result.data.data);


    }

    const getAllPackage = async () => {
        const result = await axios.get(StartPoint + 'GetAllPackages')

        setIsLoader(false);
        setPackageList(result.data.data);


    }


    const getAllClientPackage = async () => {
        const result = await axios.get(StartPoint + 'GetAllClientPackags')

        setIsLoader(false);
        setAllPAckage(result.data.data);


    }

    const saveClientPackage = async () => {
        const result = await axios.post(StartPoint + 'AddNewClientPackage', clientPackageObj);
        if (result.data.result) {
            alert('Package created succuessfully')
            getAllClientPackage();


        } else {
            alert(result.data.message);
        }
    }

    const changeFormValue = (event, key) => {
        setClientPackageObj(prevObj => ({ ...prevObj, [key]: event.target.value }))

    }

    const changeCheboxValue = (event) => {
        setClientPackageObj(prevObj => ({ ...prevObj, isActive: event.target.checked }))
    }

    const ediClientPackage = async (id) => {
        const result = await axios.get(StartPoint + 'GetClientPackageById?id=' + id);
        if (result.data.result) {
            setClientPackageObj(result.data.data)
        } else {
            alert(result.data.message)
        }
    }

    const updateClientPackage = async () => {
        const result = await axios.post(StartPoint + 'UpdateClientPackage', clientPackageObj);

        if (result.data.result) {

            alert('Client Package Updated Successfully');
            getAllClientPackage();
            

           
        } else {
            alert(result.data.message)
        }
    }

    const deleteClientPackage = async (id) => {
        const result = await axios.post(StartPoint + 'DeleteClientPackageById?id=' + id)

        if (result.data.result) {
           
            alert('deleted successfully');
            getAllClientPackage();
        } else {
            alert(result.data.message)
        }
    }

    const OnReset = () => {
        setClientPackageObj({
            "clientPackageId": '0',
            "clientId": '',
            "packageId": 0,
            "createdDate": "",
            "lastUpdated": "",
            "packageStartDate": "",
            "packageEndDate": " ",
            "isActive": ''

        })

    }
    return (
        <div >
            <div className='row container-fluid'>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            Client Package Form

                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Select Client</label>
                                    <select className='form-select' value={clientPackageObj.clientId} onChange={(e) => changeFormValue(e, 'clientId')} >
                                        <option value=''>Select Client</option>
                                        {
                                            clientList.map((item) => {
                                                return (<option value={item.clientId}>{item.clientName}</option>)

                                            })
                                        }
                                    </select>

                                </div>
                                <div className='col-6'>
                                    <label>Select Package</label>
                                    <select className='form-select' value={clientPackageObj.packageId} onChange={(e) => changeFormValue(e, 'packageId')} >
                                        <option value=''>Select Package</option>
                                        {
                                            packageList.map((item) => {
                                                return (<option value={item.packageId}>{item.packageName}</option>)

                                            })
                                        }
                                    </select>

                                </div>

                            </div>
                          
                            <div className='row pt-2'>
                                <div className='col-6'>
                                    <label>Package Start Date</label>
                                    <input type='date' value={clientPackageObj.packageStartDate} onChange={(e) => changeFormValue(e, 'packageStartDate')} />

                                </div>
                                <div className='col-6'>
                                    <label>Package End Date</label>
                                    <input type='date' value={clientPackageObj.packageEndDate} onChange={(e) => changeFormValue(e, 'packageEndDate')} />

                                </div>

                            </div>
                            <div className='row pt-2'>
                                <div className='col-6'>

                                    <input type='checkbox' checked={clientPackageObj.isActive} onChange={(e) => changeCheboxValue(e)} />
                                    <label>Is Active</label>

                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-6 text-end'>
                                    {clientPackageObj.clientPackageId == 0 && <button className='btn btn-success' onClick={saveClientPackage}>Add</button>}
                                    {clientPackageObj.clientPackageId !== 0 && <button className='btn btn-warning' onClick={updateClientPackage}>Update</button>}

                                </div>
                                <div className='col-6'>
                                    <button className='btn btn-secondary' onClick={OnReset}>Reset</button>


                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success text-end'>
                          
                            <button className='btn btn-sm btn-primary text-end ' onClick={() => getAllClientPackage(setShowinCard(!showincard))}>Client List</button>

                        </div>
                       <div className='card-body'>
                       { !showincard &&<table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Client Name</th>
                                        <th>Package Name</th>
                                        <th>Package Start Date</th>
                                        <th>Package End Date</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>

                                </thead>
                                {
                                    isLoader && <tbody>
                                        <tr>
                                            <td colSpan={9} className='text-center'>
                                                <div class="spinner-border text-muted"></div>
                                                <div class="spinner-border text-primary"></div>
                                                <div class="spinner-border text-success"></div>
                                                <div class="spinner-border text-info"></div>
                                                <div class="spinner-border text-warning"></div>
                                                <div class="spinner-border text-danger"></div>
                                                <div class="spinner-border text-secondary"></div>
                                                <div class="spinner-border text-dark"></div>
                                                <div class="spinner-border text-light"></div>
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                                {
                                    <tbody>
                                        {
                                            allPackage.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.clientName}</td>
                                                        <td>{item.packageName}</td>

                                                        <td>{item.packageStartDate}</td>
                                                        <td>{item.packageEndDate}</td>
                                                        <td><button className='btn btn-primary btn-sm' onClick={() => ediClientPackage(item.clientPackageId)}>Edit</button></td>
                                                        <td> <button className='btn btn-danger btn-sm' onClick={() => deleteClientPackage(item.clientPackageId)}>Delete</button>

                                                        </td>
                                                    </tr>
                                                )

                                            })
                                        }
                                    </tbody>
                                }

                            </table>}
                            <div className='container'>
                            <div className='row'>
                                {showincard &&
                                    allPackage.map((item, index) => (
                                        <div key={index} className='col-sm-3 d-flex m-2'>
                                            <div className="card text-dark bg-light" >
                                                <div className="card-header">
                                                    <p>{index + 1}</p>
                                                    <span>Client Name:</span>{item.clientName}
                                                </div>
                                                <div className="card-body" style={{"height": "300px", 'width': '600px',  }}>
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                           <span>P-Name:</span> <p>{item.packageName}</p>
                                                           <span>Start Date</span><p>{item.packageStartDate}</p>
                                                           
                                                           <span>End Date:</span><p>{item.packageEndDate}</p>
                                                          
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                            <button className='btn btn-primary btn-sm m-2' onClick={() => ediClientPackage(item.clientPackageId)}>Edit</button>
                                                            <button className='btn btn-danger btn-sm' onClick={() => deleteClientPackage(item.clientPackageId)}>Delete</button>
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
    );
};

export default ClientPackage;
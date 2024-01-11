import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Package = () => {

    let [packageList, setPackageList] = useState([]);
    let [isSave, setIsSave] = useState(false);
    let [packageObj, setPackageObj] = useState({
        "packageId": 0,
        "packageName": "",
        "packageCost": "",
        "packageDescription": "",
        "isPackageActive": false
    }
    )




    const resetFormValue = () => {
        let prevId = packageObj.packageId;
        setPackageObj({
            "packageId": prevId,
            "packageName": "",
            "packageCost": "",
            "packageDescription": "",
            "isPackageActive": false
        })
    }


    useEffect(() => {
        getAllPackages();



    }, [])


    const changeFormValue = (event, key) => {

        setPackageObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const isPackageActive = (event) => {
        setPackageObj(prevObj => ({ ...prevObj, IsPackageActive: event.target.checked }))
    }

    const getAllPackages = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllPackages');
        setPackageList(result.data.data);
    }

    const createPackages = async () => {
        setIsSave(true);
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/CreatePackage', packageObj);

        if (result.data.result) {
            alert("Package Created Succefully");
            setIsSave(false);
            getAllPackages();
            resetFormValue();

        } else {
            alert(result.data.message);
            setIsSave(false);
        }
    }

    const UpdatePackges = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdatePackge', packageObj);


        if (result.data.result) {
            alert("Package Updated Succefully");
            getAllPackages();
            setIsSave(true);
            resetFormValue();

        } else {
            alert(result.data.message)
        }
    }

    const deletePackages = async (id) => {
        const result = await axios.post(`https://onlinetestapi.gerasim.in/api/Meeting/DeletePackgeById?id=${id}`);

        if (result.data.result) {
            alert("Packages Deleted Succefully");
            getAllPackages();

        } else {
            alert(result.data.message)
        }
    }


    const editPackages = async (id) => {
        const result = await axios.get(`https://onlinetestapi.gerasim.in/api/Meeting/GetPackgeById?id=${id}`);
      
        if (result.data.result) {
            setPackageObj(result.data.data)

        } else {
            alert(result.data.message)
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                    <strong>Package Data</strong>

                                </div>

                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>PackageName</th>
                                        <th>packageCost</th>
                                        <th>PackageDescription</th>
                                        <th>IsPackageActive</th>

                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        packageList.map((item, index) => {
                                            return (<tr>
                                                <td> {index + 1} </td>
                                                <td> {item.packageName} </td>
                                                <td>  {item.packageCost} </td>
                                                <td>  {item.packageDescription} </td>
                                                <td>{item.isPackageActive ? 'true' : 'false'}</td>

                                                <td>
                                                    <button className='btn btn-sm btn-primary' onClick={() => { editPackages(item.packageId) }}>Edit</button>

                                                    <button className='btn btn-sm btn-danger' onClick={() => { deletePackages(item.packageId) }}>Delete</button>
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
                        <div className='card-header bg-success'>
                            <b>Create New Package</b>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Package Name</label>
                                    <input type='text' value={packageObj.packageName} onChange={(event) => { changeFormValue(event, 'packageName') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>package Cost</label>
                                    <input type='text' value={packageObj.packageCost} onChange={(event) => { changeFormValue(event, 'packageCost') }} className='form-control' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Package Description</label>
                                    <input type='text' value={packageObj.packageDescription} onChange={(event) => { changeFormValue(event, 'packageDescription') }} className='form-control' />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Is Package Active</label>
                                    <input type='checkbox' onChange={(event) => { isPackageActive(event) }} />
                                </div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-6 text-center'>
                                    <button className='btn btn-sm btn-success' onClick={resetFormValue}> Reset</button>
                                </div>
                                <div className='col-6 text-center'>



                                    {packageObj.packageId == 0 && <button className='btn btn-sm btn-success' onClick={createPackages}>{isSave && <span className='spinner-border spinner-border-sm'></span>} Save package</button>}



                                    {packageObj.packageId !== 0 && <button className='btn btn-sm btn-warning' onClick={UpdatePackges}> Update package</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Package;


















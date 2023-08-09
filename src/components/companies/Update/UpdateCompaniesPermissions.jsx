import React, {forwardRef, useImperativeHandle, useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const UpdateCompaniesPermissions = forwardRef((props, ref) => {

    const errors={};
    var [alreadyPermissions, setAlreadyPermissions] = useState([]);
    const [checkedItemss, setCheckedItemss] = useState({});
    const [user_id, setUser_id] = useState('');
    var [requestPermissionsList, setRequestPermissionsList] = useState([]);
    const [errorss,setErrorss] = useState([]);
    const handleMasterChange = (masterType) => {

        setCheckedItems((prevCheckedItems) => {
            const newCheckedItems = { ...prevCheckedItems };
            const allChecked = groupedPermissionsList
                .find(dataType => dataType[masterType])
                [masterType].every(item => prevCheckedItems[item.permission_id]);

            groupedPermissionsList
                .find(dataType => dataType[masterType])
                [masterType].forEach((item) => {
                newCheckedItems[item.permission_id] = !allChecked;
            });

            return newCheckedItems;

        });
        if (event.target.checked) {
            let module_permissions = [];

            groupedPermissionsList
                .find(dataType => dataType[masterType])
                [masterType].forEach((item) => {
                module_permissions.push(item.permission_id)
            });
            let temp=[];
            temp=alreadyPermissions.filter(val => !module_permissions.includes(val));
            alreadyPermissions=temp
            setAlreadyPermissions(alreadyPermissions)


         //   setAlreadyPermissions(alreadyPermissions.filter(val => !module_permissions.includes(val)));

            module_permissions.forEach((value2,index)=>{
                alreadyPermissions.push(value2)
            })
            console.log(alreadyPermissions)
        }
        else{
            let module_permissions = [];
            groupedPermissionsList
                .find(dataType => dataType[masterType])
                [masterType].forEach((item) => {
                module_permissions.push(item.permission_id)
            });
            let temp=[];
           temp=alreadyPermissions.filter(val => !module_permissions.includes(val));
           alreadyPermissions=temp
           setAlreadyPermissions(alreadyPermissions)
            console.log(alreadyPermissions);
        }
    };
    const handleChildChange = (childId) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [childId]: !prevCheckedItems[childId]
        }));
        if(event.target.checked){
            if ( alreadyPermissions.includes(childId)) {
                alreadyPermissions.splice(alreadyPermissions.indexOf(childId), 1)
            }
            else{
                alreadyPermissions.push(childId)
            }
            console.log(alreadyPermissions)

        }
        else {

            if (alreadyPermissions.includes(childId)) {
                alreadyPermissions.splice(alreadyPermissions.indexOf(childId), 1)
            }
            else{
                alert("dfsfsjnghkjfbgdkgbfskjdg")
             //   alreadyPermissions.push(childId)
            }
            console.log(alreadyPermissions)
        }


    };
    const renderChildren = (childType) => {
        const dataType = groupedPermissionsList.find(data => data[childType]);
        if (!dataType) return null;

        return dataType[childType].map((item) => (


            <div key={item.permission_id} className="col-md-3  mb-2">

                <label>

                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={checkedItems[item.permission_id] || false}
                        onClick={() => handleChildChange(item.permission_id)}
                    /> {item.name}
                </label>
            </div>

        ));
    };
    const [groupedPermissionsList,setgroupedPermissionsList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const setPermissionsData = (permissions) => {
        setgroupedPermissionsList(permissions)
    }
    const resetCheckedItemsData = () => {
        setCheckedItems({});
        setAlreadyPermissions([]);
        setUser_id('');
    }
    const setCheckedItemsData = (child) => {

        setCheckedItems((prevState) => {
            const newCheckedItems = { ...prevState };
            newCheckedItems[child] = !newCheckedItems[child];
            return newCheckedItems;
        })

     alreadyPermissions.push(child);
        setAlreadyPermissions(alreadyPermissions);
        console.log(alreadyPermissions)

        //checkedItems[childId] = !checkedItems[childId];
    }
    const setUserPermissions = (permissions) => {
        handleChildChange(permissions);
    }
    const setUserId = (id) => {
        setUser_id(id);
    }
    const saveForm= () => {
        console.log(alreadyPermissions)

        requestPermissionsList=[];
        setRequestPermissionsList(requestPermissionsList)
        requestPermissionsList=groupedPermissionsList;
        setRequestPermissionsList(groupedPermissionsList)
        requestPermissionsList.forEach((value,index)=>{
            Object.keys(value).forEach((v,i)=>{
                value[v].forEach((value2)=>{
                    if(alreadyPermissions.includes(value2.permission_id)){
                        value2.isChecked=true;
                    }
                    else{
                        if (value2.isChecked){
                            delete value2.isChecked
                        }
                    }
                })
            })
        })




        let screen_key_errors = ['permissions'];
        if (alreadyPermissions.length == 0) {
                let temp =[];
                temp.push("Please select at least one permission");
                errors['permissions']=temp;
            }
            setErrorss(errors);
            if(errors && Object.keys(errors).length>0) {
                screen_key_errors.forEach(value => {
                    if (Object.keys(errors).includes(value)) {
                        return false;
                    }
                })
            }
            else {
                let formData = {
                    user_id: user_id,
                    permissions: requestPermissionsList
                }
                axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_COMPANY_PERMISSIONS_UPDATE_URL, formData).
                then((response) => {
                    Swal.fire("Success", "Company Updated Successfully", "success");
                  //  props.companies();
                    props.updatePermissionModal.hide();


                }).catch((error_data) => {
                    setErrorss(error_data.response.data.errors);
                })

            }


    }
    useImperativeHandle(ref, () => ({
        setPermissions:  setPermissionsData,
        setUserPermissions:  setUserPermissions,
        resetCheckedItemsData:resetCheckedItemsData,
        setCheckedItemsData:setCheckedItemsData,
        setUserID:setUserId
    }));

    return (
        <div>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">User Permissions</h5>

                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div>
                        {errorss['permissions']
                            ?
                            <span className="text-danger">{errorss['permissions'][0]}</span>
                            :
                            ''
                        }
                        {groupedPermissionsList.map((data) => {
                            const masterType = Object.keys(data)[0];
                            return (

                                <div className="card m-3" key={masterType}>

                                    <h5 className="card-header">
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={data[masterType].every(item => checkedItems[item.permission_id])}
                                                onChange={() => handleMasterChange(masterType)}
                                            /> { masterType }
                                        </label>
                                    </h5>
                                    <div className="card-body">
                                        <div className="row ">
                                            {renderChildren(masterType)}
                                        </div>
                                    </div>
                                </div>

                            );
                        })}

                        { errorss['permissions']
                            ?
                            <span className="text-danger">{errorss['permissions'][0]}</span>
                            :
                            ''
                        }

                    </div>

                    {/* {
                        groupedPermissionsList.map((value, index) => {
                            return (
                                <>
                                    <div className="card m-3">
                                        <h5 className="card-header">
                                            <label> <input className="form-check-input mb-1" type="checkbox" id={Object.keys(value)+'_'+index}  name={Object.keys(value)} value={(Object.keys(value))} onChange={()=>handleCheckChange(event,index)} /> {(Object.keys(value).toString()).charAt(0).toUpperCase() + (Object.keys(value).toString()).slice(1)}</label>
                                        </h5>
                                        <div className="card-body">
                                            <div className="row ">
                                            {
                                                value[(Object.keys(value))].length>0
                                                &&
                                                value[(Object.keys(value))].map((value2, index2) => {
                                                    return (

                                                        <div class="col-md-3  mb-2">
                                                            <label>
                                                            <input
                                                                className="form-check-input pt-1"
                                                                type="checkbox"
                                                                name={value2.name}
                                                                id={value[(Object.keys(value))]+'_'+index2}
                                                                value={value2.permission_id}
                                                                onChange={()=>handleCheckChangeChild(event,value,index)}

                                                            /> { value2.name }
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>


                                        </div>
                                    </div>

                                 </>

                            )
                        })
                    }*/}

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={()=>saveForm()} className="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
});

export default UpdateCompaniesPermissions;
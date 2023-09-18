import axios from "axios";
import React from "react";
import { Fragment, useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const listMarine = () => {

    const [list, setList] = useState([]);

    function getCategory () {
        let mounted = true;

        axios.get("http://34.254.97.212:8080/api/marine-category/all").then((res)=>{
            // console.log("cat", res.data);
            setList((list) => [...list, ...res.data]);
            console.log(list)
        })
    }

    function deletecategory (id) {
        console.log(id)
        axios.delete("http://34.254.97.212:8080/api/marine-category/"+id).then((resp) => {
            if(resp.status == 200){
                Swal.fire({
                    title: 'Done!!',
                    text: resp.data.message,
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                })
            }else{
                Swal.fire({
                    title: 'Error!!',
                    text: "Something wrong from backend!!!",
                    icon: 'Danger',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                })
            }
        })
    }

    useEffect (() => {
        getCategory();
        // deletecategory()
    }, [])

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">
                        Marine Professionals
                    </CardTitle>
                </CardHeader>

                <CardBody>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category Image</th>
                                <th>description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {list.length > 0 && list.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>
                                        <img
                                            src={`http://34.254.97.212:8080/${row.image}`}
                                            alt="Category Image"
                                            width="40px"
                                        />
                                    </td>
                                    <td>{row.description}</td>
                                    <td>
                                        {/* {row.status} */}
                                        {row.status == false ? (<div>False</div>) : (<div>True</div>)}
                                    </td>
                                    <td>
                                        <Link to={`/admin/marine-category/update/${row.id}`}>
                                            <Button.Ripple color='primary' id={`editTooltip${i}`} className="p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36">
                                                    <path fill="currentColor" d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H4V8h28Z" className="clr-i-outline clr-i-outline-path-1"/>
                                                    <path fill="currentColor" d="M9 14h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Z" className="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M9 18h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Z" className="clr-i-outline clr-i-outline-path-3"/>
                                                    <path fill="currentColor" d="M9 22h10a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Z" className="clr-i-outline clr-i-outline-path-4"/>
                                                    <path fill="none" d="M0 0h36v36H0z"/>
                                                </svg>
                                            </Button.Ripple>
                                        </Link>

                                        <Button.Ripple color='primary' onClick={() => deletecategory(row.id)} id={`editTooltip${i}`} className="p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                            </svg>
                                        </Button.Ripple>
                                    </td>
                                </tr>
                            ))}
                            

                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default listMarine
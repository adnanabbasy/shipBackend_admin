import axios from "axios";
import React from "react";
import { Fragment, useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from "reactstrap";
import { Link } from 'react-router-dom';

const listMarine = () => {

    const [list, setList] = useState([]);

    function getCategory () {
        let mounted = true;

        axios.get("http://34.254.97.212:8080/api/marine-professional/all").then((res)=>{
            // console.log("cat", res.data);
            setList((list) => [...list, ...res.data]);
            console.log(list)
            // if(mounted){
            // // console.log("category = ",res);
            //     var newAr = [];
            //     res.data.data.map((el)=>{
            //         // console.log(el._source.Name);
            //         newAr.push({ value: el._id, label: el._source.Name });
            //     })
            //     setList(newAr);
            //     // console.log(catList);
            // }
        })
    }

    useEffect (() => {
        getCategory();
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
                                <th>Profile Image</th>
                                <th>Category</th>
                                <th>Services</th>
                                {/* <th>description</th> */}
                                <th>Address</th>
                                {/* <th>longitude</th>
                                <th>latitude</th> */}
                                <th>URL</th>
                                <th>Phone</th>
                                <th>Multi Images</th>
                                {/* <th>reviews_id</th> */}
                                {/* <th>status</th> */}
                                {/* <th>createdAt</th>
                                <th>updatedAt</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {list.length > 0 && list.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>
                                        {row.profile_image && JSON.parse(row.profile_image).map(item => (
                                            <img
                                                key={item.filename}
                                                src={`http://localhost:8080/${item.path}`}
                                                alt="Profile Image"
                                                width="40px"
                                            />
                                        ))}
                                    </td>
                                    <td>
                                        {JSON.parse(row.category)}
                                        {/* {row.services && JSON.parse().map(item => (
                                            <div>{item.value}</div>
                                        ))} */}
                                    </td>
                                    <td>
                                        {JSON.parse(row.services).replace(/\\/g, '')}
                                        {/* {row.services && JSON.parse().map(item => (
                                            <div>{item.value}</div>
                                        ))} */}
                                    </td>
                                    {/* <td>{row.description}</td> */}
                                    <td>{row.address}</td>
                                    {/* <td>{row.longitude}</td>
                                    <td>{row.latitude}</td> */}
                                    <td>{row.url}</td>
                                    <td>{row.phone}</td>
                                    <td>
                                        {row.multi_images &&
                                            JSON.parse(row.multi_images).map(item => (
                                                <img
                                                    key={item.filename}
                                                    src={`http://localhost:8080/${item.path}`}
                                                    alt="Multi Image"
                                                    width="40px"
                                                />
                                            ))}
                                    </td>
                                    {/* <td>{row.reviews_id}</td> */}
                                    {/* <td>{row.status}</td> */}
                                    {/* <td>{row.createdAt}</td>
                                    <td>{row.updatedAt}</td> */}
                                    <td>
                                        <Link to={`/admin/marine/update/${row.id}`}>
                                            <Button.Ripple color='primary' id={`editTooltip${i}`} className="p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36">
                                                    <path fill="currentColor" d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H4V8h28Z" className="clr-i-outline clr-i-outline-path-1"/>
                                                    <path fill="currentColor" d="M9 14h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Z" className="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M9 18h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Z" className="clr-i-outline clr-i-outline-path-3"/>
                                                    <path fill="currentColor" d="M9 22h10a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Z" className="clr-i-outline clr-i-outline-path-4"/>
                                                    <path fill="none" d="M0 0h36v36H0z"/>
                                                </svg>
                                            </Button.Ripple>
                                        </Link>
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
import axios from "axios";
import React from "react";
import { Fragment, useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from "reactstrap";
import { Link } from 'react-router-dom';

const listMarine = () => {

    const [list, setList] = useState([]);

    const status = [
        { value: '0', label: 'false' },
        { value: '1', label: 'true' }
    ]

    function getService () {
        let mounted = true;

        axios.get("http://34.254.97.212:8080/api/reviews/all").then((res)=>{
            // console.log("cat", res.data);
            setList((list) => [...list, ...res.data]);
            console.log(list)
        })
    }

    useEffect (() => {
        getService();
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
                                <th>Review</th>
                                <th>Review Images</th>
                                {/* <th>Service Id</th> */}
                                {/* <th>Status</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {list.length > 0 && list.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.review}</td>
                                    <td>
                                        {row.multi_images &&
                                            JSON.parse(row.review_images).map(item => (
                                                <img
                                                    key={item.filename}
                                                    src={`http://localhost:8080/${item.path}`}
                                                    alt="Multi Image"
                                                    width="40px"
                                                />
                                            ))}
                                    </td>
                                    {/* <td>{row.service_id}</td> */}
                                    {/* <td>{row.status}</td> */}
                                    <td>
                                        <Link to={`/admin/marine-service/update/${row.id}`}>
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
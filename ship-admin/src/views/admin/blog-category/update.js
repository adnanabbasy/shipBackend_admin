// ** React Imports
import { Fragment, useState, useEffect } from 'react'


// ** Third Party Components
import axios from 'axios'
import Swal from 'sweetalert2'
import Select, { components } from 'react-select'

// ** Reactstrap Imports
import { selectThemeColors } from '@utils'
import { Row, Col, Card, Form, Input, Label, Button, CardHeader, CardBody, CardTitle, CardText, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useParams } from 'react-router-dom'

const blogCategoryUpdate = () => {
    const params = useParams();
    var catId = params.id;
    // ** States
    let apiKey = "";
    // Set services  

    const [name, setName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState(1);


    // const serviceArr = [{ value: 'all', label: 'All' }, ...marineReviews];

    const status = [
        { value: '0', label: 'false' },
        { value: '1', label: 'true' }
    ]

    function getBlogCategory () {
        axios.get('http://34.254.97.212:8080/api/blogcategory/'+catId).then((res) => {
            console.log("single list", res.data)
            let listData = res.data;
            setName(listData.name);
            if(listData.status == false){
                setCategoryStatus({value: '0', label: 'false'});
            }else {
                setCategoryStatus({value: '1', label: 'true'});
            }
         });
    }

    const submitBlogCategory = async(event) => {
        event.preventDefault();
        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("status", categoryStatus['value']);
        const payload = {
            "name": name,
            "status": categoryStatus['label']
        }

        // validation 
        if(!name && !categoryStatus['value']){
            console.log("please fill the field")
            Swal.fire({
                title: 'Warning!!',
                text: "please fill the fields",
                icon: 'danger',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            })
            return
        }

        // console.log(name, categoryStatus['value'])
        // return

        await axios({
            method: "put",
            url: "http://34.254.97.212:8080/api/blogcategory/"+catId,
            data: payload,
            headers: {  Authorization: apiKey },
        })
        .then((res) => {
          console.log("data",res.data['description']);
            if(res.status == 200){
                Swal.fire({
                    title: 'Done!!',
                    text: res.data.message,
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                })
                getBlogCategory();
            }else{
                return Swal.fire({
                    title: 'Error!!!',
                    text:  res.data.message,
                    icon: 'Warning',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                })
            }
        })
        .catch((error) => console.error("Error: ${error}"));
        
    }

    const handleStatus = (event) => {
            setCategoryStatus({ value: event["value"], label: event["label"] })
        // console.log(event["value"])
    }

    useEffect(() => {   
        getBlogCategory()
    }, []);


  return (
    <Fragment>

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Update Blog category</CardTitle>
            </CardHeader>

            <CardBody>
                <form onSubmit={submitBlogCategory} > 
                    <Row key={catId}>

                        <Col lg='6' className='mb-1'>
                            <Label className='form-label' for='nameMarine'>
                                Name
                            </Label>
                            <Input type='text' required name='name' value={name} onChange={(e)=> setName(e.target.value)} id='nameMarine' placeholder='Marine Name' />
                        </Col>

                        <Col lg='6' className='mb-1'>
                            <Label className='form-label' for='statusMarine'>
                                Status
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                id='statusMarine'
                                className='react-select'
                                classNamePrefix='select'
                                value={categoryStatus}
                                // defaultValue={colourOptions[0]}
                                onChange={handleStatus}
                                options={status}
                                isClearable={false}
                            />
                        </Col>

                        <Col sm='12'>
                            <div className='d-flex'>
                                <Button className='me-1' color='primary' type='submit' >
                                    Submit
                                </Button>
                                
                                <Button outline color='secondary' type='reset'>
                                    Reset
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </CardBody>
        </Card>
        
        
    </Fragment>
  )
}

export default blogCategoryUpdate


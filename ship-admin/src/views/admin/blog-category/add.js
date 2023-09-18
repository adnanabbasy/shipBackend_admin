// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'
import Repeater from '@components/repeater'

// ** Third Party Components
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import { SlideDown } from 'react-slidedown'
import { X, Plus, Hash } from 'react-feather'
import Select, { components } from 'react-select'

// ** Reactstrap Imports
import { selectThemeColors } from '@utils'
import { Row, Col, Card, Form, Input, Label, Button, CardHeader, CardBody, CardTitle, CardText, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddBlogCategory = () => {
    // ** States
    let apiKey = "";
    
    const [name, setName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState(1);

    const status = [
        { value: '0', label: 'false' },
        { value: '1', label: 'true' }
    ]

    const submitCategory = async(event) => {
        event.preventDefault();
        const payload = {
            "name": name,
            "status": categoryStatus
        }

        // validation 
        if(!name){
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

        try {     
            const response = await axios({
                method: "post",
                url: "http://34.254.97.212:8080/api/blogcategory/add",
                data: payload,
                headers: {  Authorization: apiKey },
            })
            console.log(response)
            if(response.code == 200){
                Swal.fire({
                    title: 'Done!!',
                    text: response.data.message,
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                })
            }else{
                return Swal.fire({
                    title: 'Error!!',
                    text:  response.data.message,
                    icon: 'Warning',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                })
            }
        } catch (error) {
            console.log(error);
            // setFlag(false);
            return Swal.fire({
                title: 'Error!!',
                text:  'Something went wrong. Server is not responding!',
                icon: 'error',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
            })
        }
    }

    const handleStatus = (event) => {
        setCategoryStatus(event["value"])
    }

    useEffect(() => {
    }, []);


  return (
    <Fragment>
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Add Blog categroy</CardTitle>
            </CardHeader>

            <CardBody>
                <form onSubmit={submitCategory} > 
                    <Row>
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
                                defaultValue={categoryStatus}
                                id='statusMarine'
                                className='react-select'
                                classNamePrefix='select'
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

export default AddBlogCategory


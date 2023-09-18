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

const AddMarine = () => {
    // ** States
    let apiKey = "";
    // Set services  
    const [selectedFile, setSelectedFile] = useState([]);
    const [podcastName, setPodcastName] = useState('');
    const [description, setDescription] = useState('');
    const [podcastStatus, setPodcastStatus] = useState('1');

    const status = [
        { value: '0', label: 'false' },
        { value: '1', label: 'true' }
    ]

    let mounted = true;

    const submitPodcast = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("media_file", selectedFile);
        formData.append("name", podcastName);
        formData.append("description", description);
        formData.append("status", podcastStatus);

        // validation 
        if(!podcastName){
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
                url: "http://34.254.97.212:8080/api/podcast/add",
                data: formData,
                headers: { "Content-Type": "multipart/form-data", Authorization: apiKey },
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

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
        // console.log("single", event.target.files);
    }

    const handleStatus = (event) => {
        setPodcastStatus(event["value"])
    }

    useEffect(() => {
    }, []);


  return (
    <Fragment>
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Add new marine</CardTitle>
            </CardHeader>

            <CardBody>
                <form onSubmit={submitPodcast} > 
                    <Row>
                        <Col lg='3' className='mb-1'>
                            <Label className='form-label' for='logoMarine'>
                                Podcast
                            </Label>
                            <Input type='file' name="profileLogo" onChange={handleFileSelect}   id="logoMarine" placeholder="Marine Image"  />
                        </Col>

                        <Col lg='3' className='mb-1'>
                            <Label className='form-label' for='nameMarine'>
                                Name
                            </Label>
                            <Input type='text' required name='name' value={podcastName} onChange={(e)=> setPodcastName(e.target.value)} id='nameMarine' placeholder='Marine Name' />
                        </Col>

                        <Col lg='3' className='mb-1'>
                            <Label className='form-label' for='nameMarine'>
                                Description
                            </Label>
                            <Input type='text' required name='name' value={description} onChange={(e)=> setDescription(e.target.value)} id='nameMarine' placeholder='Marine Name' />
                        </Col>

                        <Col lg='3' className='mb-1'>
                            <Label className='form-label' for='statusMarine'>
                                Status
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                defaultValue={status[1]}
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

export default AddMarine


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

const podcastUpdate = () => {
    const params = useParams();
    var podcastId = params.id;
    // ** States
    let apiKey = "";
    // Set services  

    const [selectedFile, setSelectedFile]   = useState([]);
    const [media, setMedia]                 = useState([]);
    const [podcastName, setPodcastName]     = useState('');
    const [description, setDescription]     = useState('');
    const [podcastStatus, setPodcastStatus] = useState('1');


    // const serviceArr = [{ value: 'all', label: 'All' }, ...marineReviews];

    const status = [
        { value: '0', label: 'false' },
        { value: '1', label: 'true' }
    ]

    function gePodcast () {
        axios.get('http://34.254.97.212:8080/api/podcast/'+podcastId).then((res) => {
        // axios.get('http://localhost:8080/api/podcast/'+podcastId).then((res) => {
            console.log("single list", res.data)
            let listData = res.data;
            if(listData.media_file){
                let mediaFile = listData.media_file
                setMedia(mediaFile.replaceAll('"', ''));
            }
            setPodcastName(listData.name);
            setDescription(listData.description);
            setPodcastStatus(listData.status);
        });
    }

    const submitPodcast = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", podcastName);
        formData.append("media_file", selectedFile);
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

        await axios({
            method: "put",
            url: "http://34.254.97.212:8080/api/podcast/"+podcastId,
            // url: "http://localhost:8080/api/podcast/"+podcastId,
            data: formData,
            headers: { "Content-Type": "multipart/form-data", Authorization: apiKey },
        })
        .then((res) => {
            // console.log("data",res.data['description']);
            if(res.status == 200){
                console.log(res)
                Swal.fire({
                    title: 'Done!!',
                    text: res.data.message,
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                })
                gePodcast();
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

    const handleFileSelect = (event) => {
        // setSelectedFile([])
        setSelectedFile(event.target.files[0])
        
        // console.log("single", event.target.files);
    }

    const handleStatus = (event) => {
        setPodcastStatus(event["value"])
        console.log(event["value"])
    }

    useEffect(() => {   
        gePodcast()
    }, []);


  return (
    <Fragment>

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit Podcast</CardTitle>
            </CardHeader>

            <CardBody>
                <form onSubmit={submitPodcast} > 
                    <Row>
                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='logoMarine'>
                                Podcast
                            </Label>
                            <Input type='file' name="profileLogo" onChange={handleFileSelect}   id="logoMarine" placeholder="Marine Image"  />
                            <br />
                            <div className="media">
                                <audio controls >
                                    <source src={`http://34.254.97.212:8080/${media}`} type="audio/mpeg" />
                                    {/* <source src={`http://localhost:8080/${media}`} type="audio/mpeg" /> */}
                                </audio>
                            </div>
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='namePodcast'>
                                Name
                            </Label>
                            <Input type='text' required name='name' value={podcastName} onChange={(e)=> setPodcastName(e.target.value)} id='namePodcast' placeholder='Name' />
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='descPodcast'>
                                Description
                            </Label>
                            <Input type='text' required name='desc' value={description} onChange={(e)=> setDescription(e.target.value)} id='descPodcast' placeholder='Description' />
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='statusPodcast'>
                                Status {podcastStatus}
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                defaultValue={podcastStatus}
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

export default podcastUpdate


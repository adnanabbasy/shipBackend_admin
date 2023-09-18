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

const marineUpdate = () => {
    const params = useParams();
    var marineId = params.id;
    // ** States
    let apiKey = "";
    // Set services  

    const [marineName, setMarineName] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    const [prologo, setProLogo] = useState([]);
    const [services, setServices] = useState([]);
    const [description, setDescription] = useState('');
    const [marineStatus, setMarineStatus] = useState('1');

    const [marineService, setMarineService] = useState([]);


    // const serviceArr = [{ value: 'all', label: 'All' }, ...marineReviews];

    const status = [
        { value: '0', label: 'false' },
        { value: '1', label: 'true' }
    ]

    let mounted = true;

    function getMarine () {
        axios.get('http://34.254.97.212:8080/api/marine-brands/'+marineId).then((res) => {
            console.log("single list", res.data)
            let listData = res.data;
            setMarineName(listData.name);
            setProLogo(listData.image);
            setSelectedFile(listData.image);
            setDescription(listData.description);
            setServices(listData.service_id)
            setMarineStatus(listData.status);
         });
    }

    const submitMarine = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        // formData.append("id", marineId);
        formData.append("name", marineName);
        formData.append("image", selectedFile);
        formData.append("service_id", services);
        formData.append("description", description);
        if(marineStatus === false){
            formData.append("status", 0);
        }else if(marineStatus === true){
            formData.append("status", 1);
        }else{
            formData.append("status", marineStatus);
        }

        // const payload = {
        //     "name": marineName,
        //     "image": selectedFile,
        //     "service_id": services,
        //     "description": description,
        //     "status": marineStatus
        // }

        console.log("FormData:", formData);

        // validation 
        if(!marineName){
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
            url: "http://34.254.97.212:8080/api/marine-brands/"+marineId,
            data: formData,
            headers: { "Content-Type": "multipart/form-data", Authorization: apiKey },
        })
        .then((res) => {
          console.log("data",res);
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
        .catch((error) => console.error(error));
        
    }

    const handleFileSelect = (event) => {
        // setSelectedFile([])
        setSelectedFile(event.target.files[0])
        
        // console.log("single", event.target.files);
    }

    const handleStatus = (event) => {
        setMarineStatus(event["value"])
    }

    const handleService = (event) => {
        setServices(event["value"])
        console.log("category Id", event["value"])
    }

    useEffect(() => {   
        getMarine()

        axios.get('http://34.254.97.212:8080/api/marine-service/all').then((res) => {
            
            if (mounted) {
                if (res.status === 200) {
                    // Spread the existing marineReviews array and add the new data from setData
                    var newAr = [];
                    console.log('check');
                    // setMarineReviews((marineReviews) => [...marineReviews, ...valuesArray]);
                    res.data.map((el)=>{
                        // console.log(el);
                        newAr.push({ value: el.id , label: el.name });
                    })
                    setMarineService(newAr);
                }
            }
        });
    }, []);


  return (
    <Fragment>

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit marine brands</CardTitle>
            </CardHeader>

            <CardBody>
                <form onSubmit={submitMarine} > 
                    <Row key={marineId}>

                        <Col lg='4' className='mb-1' >
                            <Label className='form-label' for='logoMarine'>
                                Category Image
                            </Label>
                            <br/>
                            <Input type='file' name="image" onChange={handleFileSelect}   id="logoMarine" placeholder="Marine Image"  />
                            <br />
                            <div className="logoImage">
                                <div className='box'>
                                    <img src={`http://34.254.97.212:8080/${prologo}`}  />
                                </div>
                            </div>
                        </Col>

                        <Col lg='8' className='mb-1'>
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='nameMarine'>
                                Name
                            </Label>
                            <Input type='text' required name='nameMarine' value={marineName} onChange={(e)=> setMarineName(e.target.value)} id='nameMarine' placeholder='Marine Name' />
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='statusMarine'>
                                Marine Service {services}
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                // defaultValue={marineService.filter(obj => services.includes(obj.services))}
                                // defaultValue={marineService.filter(obj => obj.services)}
                                value={eval(marineService[services - 1 ])}
                                id='statusMarine'
                                className='react-select'
                                classNamePrefix='select'
                                // defaultValue={colourOptions[0]}
                                onChange={handleService}
                                options={marineService}
                                isClearable={false}
                            />
                        </Col>

                        <Col lg='4' className='mb-1'>
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

                        <Col sm='12' className='mb-1'>
                            <Label className='form-label' for='descriptionMarine'>
                                Description
                            </Label>
                            {/* <Input type='password' name='password' id='passwordVertical' placeholder='Password' /> */}
                            <Input type='textarea' name='text' value={description} onChange={(e)=> setDescription(e.target.value)} id='descriptionMarine' rows='3' placeholder='Description' />
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

export default marineUpdate

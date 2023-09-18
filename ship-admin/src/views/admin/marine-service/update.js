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
import { json, useParams } from 'react-router-dom'

const marineUpdate = () => {
    const params = useParams();
    var marineId = params.id;
    // ** States
    let apiKey = "";
    // Set services  

    const [marineName, setMarineName] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    const [prologo, setProLogo] = useState([]);
    const [category, setCategory] = useState([]);
    const [description, setDescription] = useState('');
    const [marineStatus, setMarineStatus] = useState('1');
    
    const [marineCategory, setMarineCategory] = useState([]);


    // const serviceArr = [{ value: 'all', label: 'All' }, ...marineReviews];

    const status = [
        { value: '0', label: 'false' },
        { value: '1', label: 'true' }
    ]

    let mounted = true;

    function getMarineService () {
        axios.get('http://34.254.97.212:8080/api/marine-service/'+marineId).then((res) => {
            
            let listData = res.data;
            let catid = JSON.parse(listData.category_id)
            let cat = catid.replace(/\\/g, "")
            console.log("single list", cat)
            setMarineName(listData.name);
            setProLogo(listData.image);
            // setSelectedFile(listData.image);
            setCategory(cat)
            setCategory(listData.category_id)
            setDescription(listData.description);

            setMarineStatus(listData.status);
         });
    }

    const submitMarine = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        // formData.append("id", marineId);
        formData.append("name", marineName);
        formData.append("image", selectedFile);
        formData.append("category_id", category);
        formData.append("description", description);
        if(marineStatus === false){
            formData.append("status", 0);
        }else if(marineStatus === true){
            formData.append("status", 1);
        }else{
            formData.append("status", marineStatus);
        }

        console.log("array", category)
        return
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
        try {     
            const response = await axios({
                method: "put",
                url: "http://34.254.97.212:8080/api/marine-service/"+marineId,
                data: formData,
                headers: { "Content-Type": "multipart/form-data", Authorization: apiKey },
            })
            console.log(response)
            if(response.status == 200){
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
        // setSelectedFile([])
        setSelectedFile(event.target.files[0])
        
        // console.log("single", event.target.files);
    }

    const handleStatus = (event) => {
        setMarineStatus(event["value"])
    }

    const handleCategory = (event) => {
        setCategory(JSON.stringify(event));
        // setCategory(event);
        // console.log(event['value'])
    }

    useEffect(() => {   
        getMarineService()

        axios.get('http://34.254.97.212:8080/api/marine-category/all').then((res) => {
            
            if (mounted) {
                if (res.status === 200) {
                    // Spread the existing marineReviews array and add the new data from setData
                    var newAr = [];
                    // console.log('check');
                    // setMarineReviews((marineReviews) => [...marineReviews, ...valuesArray]);
                    res.data.map((el)=>{
                        // console.log(el);
                        newAr.push({ value: el.id , label: el.name });
                    })
                    setMarineCategory(newAr);
                }
            }
        });
        // console.log(marineCategory)
    }, []);


  return (
    <Fragment>

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit Marine</CardTitle>
            </CardHeader>

            <CardBody>
                <form onSubmit={submitMarine} > 
                    <Row key={marineId}>

                        <Col lg='4' className='mb-1' >
                            <Label className='form-label' for='logoMarine'>
                                Service Image
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
                            <Input type='text' required name='name' value={marineName} onChange={(e)=> setMarineName(e.target.value)} id='nameMarine' placeholder='Marine Name' />
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='statusMarine'>
                                Marine Category  
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                value={marineCategory.filter(obj => category.includes(obj.label))}
                                isMulti
                                id='statusMarine'
                                className='react-select'
                                classNamePrefix='select'
                                // defaultValue={colourOptions[0]}
                                onChange={handleCategory}
                                options={marineCategory}
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


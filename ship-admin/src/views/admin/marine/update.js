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
    const [marineService, setMarineService] = useState([]);
    const [marineReviews, setMarineReviews] = useState([]);
    const [marineCategory, setMarineCategory] = useState([]);

    const [marineName, setMarineName] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    const [profileLogo, setProfileLogo] = useState([]);
    const [prologo, setProLogo] = useState([]);
    const [category, setCategory] = useState([]);
    const [services, setServices] = useState([]);
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [url, setUrl] = useState('');
    const [phone, setPhone] = useState('');
    const [reviews, setReviews] = useState([]);
    const [updateMultiFiles, setUpdateMultiFiles] = useState([]);
    const [moreImages, setMoreImages] = useState([]);
    const [marineStatus, setMarineStatus] = useState('1');


    // const serviceArr = [{ value: 'all', label: 'All' }, ...marineReviews];

    const status = [
        { value: '0', label: 'false' },
        { value: '1', label: 'true' }
    ]

    let mounted = true;

    function getMarine () {
        axios.get('http://34.254.97.212:8080/api/marine-professional/'+marineId).then((res) => {
            console.log("single list", res.data)
            let listData = res.data;
            setMarineName(listData.name);

            var logo_img =[];
            let parsedData = JSON.parse(listData.profile_image);
            if (Array.isArray(parsedData)) {
                parsedData.map((item) => {
                    logo_img.push(item.path)
                });
            } else {
                // console.error("Parsed data is not an array.");
                if(listData.profile_image != "{}" && listData.profile_image != null){
                    JSON.parse(parsedData).map((item)=>{
                        logo_img.push(item.path)
                    })
                }
            }
            setProLogo(logo_img);


            setSelectedFile(listData.profile_image);
            
            setCategory(listData.category)
            setServices(listData.services)
            setDescription(listData.description);
            setAddress(listData.address);
            setLongitude(listData.longitude);
            setLatitude(listData.latitude);
            setUrl(listData.url);
            setPhone(listData.phone);
            setReviews(JSON.parse(listData.reviews_id));

            var bulkImage =[];
            JSON.parse(listData.multi_images).map((item)=>{
                bulkImage.push(item.path)
            })
            setMoreImages(bulkImage)
            // setMultiFiles(listData.multi_images)

            setMarineStatus(listData.status);
        });
    }

    const submitMarine = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        // formData.append("id", marineId);
        formData.append("name", marineName);
        formData.append("profile_image", selectedFile);
        formData.append("category", category);
        formData.append("services", services);
        formData.append("description", description);
        formData.append("address", address);
        formData.append("longitude", longitude);
        formData.append("latitude", latitude);
        formData.append("url", url);
        formData.append("phone", phone);
        for (let i = 0; i < updateMultiFiles.length; i++) {
            formData.append('multi_images', updateMultiFiles[i])
        }
        
        formData.append("reviews_id", reviews);
        if(marineStatus === false){
            formData.append("status", 0);
        }else if(marineStatus === true){
            formData.append("status", 1);
        }else{
            formData.append("status", marineStatus);
        }

        // const payload = {
        //     "id": marineId,
        //     "name": marineName,
        //     "profile_image": selectedFile,
        //     "services": services,
        //     "description": description,
        //     "address": address,
        //     "longitude": longitude,
        //     "latitude": latitude,
        //     "url": url,
        //     "phone": phone,
        //     "multi_images": [],
        //     "reviews_id": marineId,
        //     "status": marineId,
        // }
        // for (let i = 0; i < updateMultiFiles.length; i++) {
        //     payload.multi_images.push(updateMultiFiles[i]);
        // }

        // console.log("name", marineName, "<br>");
        // console.log("profile_image", selectedFile, "<br>");
        // console.log("services", services, "<br>");
        // console.log("description", description, "<br>");
        // console.log("address", address, "<br>");
        // console.log("longitude", longitude, "<br>");
        // console.log("latitude", latitude, "<br>");
        // console.log("url", url, "<br>");
        // console.log("phone", phone, "<br>");
        // console.log("multi_images", updateMultiFiles, "<br>");
        // console.log("reviews_id", reviews, "<br>");
        // console.log("status", marineStatus, "<br>");
        // return

        // console.log(payload)
        // return

        // validation 
        if(!marineName && !address && !longitude && !latitude && !phone){
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
            url: "http://34.254.97.212:8080/api/marine-professional/"+marineId,
            data: formData,
            headers: { "Content-Type": "multipart/form-data", Authorization: apiKey },
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
        // try {     
            
        //     // console.log(response)
        //     // if(response){
        //     //     Swal.fire({
        //     //         title: 'Done!!',
        //     //         text: response.data.message,
        //     //         icon: 'success',
        //     //         customClass: {
        //     //             confirmButton: 'btn btn-primary'
        //     //         },
        //     //         buttonsStyling: false
        //     //     })
        //     // }else{
        //     //     return Swal.fire({
        //     //         title: 'Error!!!',
        //     //         text:  response,
        //     //         icon: 'Warning',
        //     //         customClass: {
        //     //             confirmButton: 'btn btn-primary'
        //     //         },
        //     //         buttonsStyling: false
        //     //     })
        //     // }
        // } catch (error) {
        //     console.log(error);
        //     // setFlag(false);
        //     return Swal.fire({
        //         title: 'Error!!',
        //         text:  'Something went wrong. Server is not responding!',
        //         icon: 'error',
        //         customClass: {
        //             confirmButton: 'btn btn-primary'
        //         },
        //         buttonsStyling: false
        //     })
        // }
        
    }

    const handleFileSelect = (event) => {
        // setSelectedFile([])
        setSelectedFile(event.target.files[0])
        
        console.log("single", event.target.files);
    }

    const handleMultiImages = (event) => {
        setUpdateMultiFiles(event.target.files)
    }

    const handleCategory = (event) => {
        // setCategory(JSON.stringify(event))
        setCategory(JSON.stringify(event))
        console.log(JSON.stringify(event))
    }

    const handleService = (event) => {
        setServices(JSON.stringify(event))

        console.log("Services", event)
    }

    const handleReviews = (event) => {
        setReviews(JSON.stringify(event))
    }

    const handleStatus = (event) => {
        setMarineStatus(event["value"])
    }

    useEffect(() => {
        axios.get('http://34.254.97.212:8080/api/reviews/all').then((res) => {
            // console.log("review", res);
            
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
                    setMarineReviews(newAr);
                }
            }
        });

        axios.get('http://34.254.97.212:8080/api/marine-service/all').then((res) => {
            console.log("services", res);

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

        axios.get('http://34.254.97.212:8080/api/marine-category/all').then((res) => {
            console.log("category", res);

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
                    setMarineCategory(newAr);
                }
            }
        })

        getMarine()
    }, []);

    useEffect(() => {
        // console.log("reviews", marineReviews);
        console.log("category", marineCategory);
        // console.log("reviews--", reviews);
        // console.log("services--", marineService);
        // console.log("multi", multiFiles);
        // console.log("status", marineStatus);
        
        
    }, [marineReviews, marineService, marineStatus, marineCategory]);

  return (
    <Fragment>

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Add new marine</CardTitle>
            </CardHeader>

            <CardBody>
                <form onSubmit={submitMarine} > 
                    <Row key={marineId}>

                        <Col lg='4' className='mb-1' >
                            <Label className='form-label' for='logoMarine'>
                                Marine Logo
                            </Label>
                            <br/>
                            <Input type='file' name="profileLogo" onChange={handleFileSelect}   id="logoMarine" placeholder="Marine Image"  />
                            <br />
                            <div className="logoImage">
                                {/* <div className='removeLogo'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                    </svg>
                                </div> */}
                                {
                                    prologo == "" ? (
                                        ""
                                    ): (
                                        
                                        <div className='box'>
                                            <img src={`http://localhost:8080/${prologo}`}  />
                                        </div>
                                    )
                                }
                            </div>
                        </Col>

                        <Col lg='8' className='mb-1'>
                            <Label className='form-label' for='imagesMarine'>
                                Marine Images
                            </Label>
                            <br/>
                            <Input type='file' name='multiImages' onChange={handleMultiImages} id='imagesMarine' placeholder='Multi Images' multiple  />
                            <br />
                            <div className="logoImage">
                                {/* <div className='removeLogo'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                    </svg>
                                </div> */}
                                    {
                                        moreImages == "[]" ? (
                                            ""
                                        ) : (
                                            <div className='imgGroup'>
                                                {moreImages.map((file, i) => (
                                                    <div className='box'>
                                                        <img
                                                            key={i}
                                                            src={`http://34.254.97.212:8080/${file}`}
                                                            width="60px"
                                                            alt={`Image ${i + 1}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) 
                                    }
                                
                            </div>
                        </Col>

                        <Col lg='6' className='mb-1'>
                            <Label className='form-label' for='nameMarine'>
                                Name
                            </Label>
                            <Input type='text' required name='name' value={marineName} onChange={(e)=> setMarineName(e.target.value)} id='nameMarine' placeholder='Marine Name' />
                        </Col>

                        <Col lg='6' className='mb-1'>
                            <Label className='form-label' for='servicesCategory'>
                                Category 
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                // defaultValue={services}
                                value={category == null ? ("") : (marineCategory.filter(obj => category.includes(obj.label)))}
                                // value={category}
                                isMulti
                                id='servicesCategory'
                                className='react-select'
                                classNamePrefix='select'
                                // defaultValue={colourOptions[0]}
                                onChange={handleCategory}
                                options={marineCategory}
                                isClearable={false}
                            />
                        </Col>

                        <Col lg='6' className='mb-1'>
                            <Label className='form-label' for='servicesMarine'>
                                Services
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                // defaultValue={services}
                                value={marineService.filter(obj => services.includes(obj.label))}
                                isMulti
                                id='servicesMarine'
                                className='react-select'
                                classNamePrefix='select'
                                // defaultValue={colourOptions[0]}
                                onChange={handleService}
                                options={marineService}
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

                        <Col sm='12' className='mb-1'>
                            <Label className='form-label' for='addressMarine'>
                                Address
                            </Label>
                            <Input type='text' name='address' value={address} onChange={(e) => setAddress(e.target.value)} id='addressMarine' required placeholder='Marine Address' />
                        </Col>

                        <Col lg='3' className='mb-1'>
                            <Label className='form-label' for='addressMarine'>
                                Longitude
                            </Label>
                            <Input type='number' required name='longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)} id='addressMarine' placeholder='Marine Address' />
                        </Col>

                        <Col lg='3' className='mb-1'>
                            <Label className='form-label' for='addressMarine'>
                                Latitude
                            </Label>
                            <Input type='tenumberxt' required name='longitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} id='addressMarine' placeholder='Marine Address' />
                        </Col>

                        <Col lg='3' className='mb-1'>
                            <Label className='form-label' for='webMarine'>
                                URL
                            </Label>
                            <Input type='url' name='link' value={url} onChange={(e) => setUrl(e.target.value)} id='webMarine' placeholder='Marine Web' />
                        </Col>

                        <Col lg='3' className='mb-1'>
                            <Label className='form-label' for='phoneMarine'>
                                Phone
                            </Label>
                            <Input type='number' required name='link' value={phone} onChange={(e) => setPhone(e.target.value)} id='phoneMarine' placeholder='Phone Number' />
                        </Col>

                        <Col lg='6' className='mb-1'>
                            <Label className='form-label' for='reviewsMarine'>
                                Reviews
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                value={marineReviews.filter(obj => reviews.includes(obj.value))}
                                id='reviewsMarine'
                                className='react-select'
                                classNamePrefix='select'
                                // defaultValue={colourOptions[0]}
                                onChange={handleReviews}
                                options={marineReviews}
                                isClearable={false}
                            />
                        </Col>

                        <Col lg='6' className='mb-1'>
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

export default marineUpdate


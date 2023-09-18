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
    const [marineCategory, setMarineCategory] = useState([]);
    const [marineService, setMarineService] = useState([]);
    const [marineReviews, setMarineReviews] = useState([]);

    const [marineName, setMarineName] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    const [category, setCategory] = useState([]);
    const [services, setServices] = useState([]);
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [url, setUrl] = useState('');
    const [phone, setPhone] = useState('');
    const [reviews, setReviews] = useState([]);
    const [multiFiles, setMultiFiles] = useState([]);
    const [marineStatus, setMarineStatus] = useState('1');


    // const serviceArr = [{ value: 'all', label: 'All' }, ...marineReviews];

    const status = [
        { value: '0', label: 'false' },
        { value: '1', label: 'true' }
    ]

    // const services = [
    //     {value:"1", labe:"Engine"},
    //     {value:"2", labe:"Outboard"},
    //     {value:"3", labe:"Sterndrive"}
    // ]

    let mounted = true;

    const submitMarine = async(event) => {
        event.preventDefault();
        const formData = new FormData();
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
        for (let i = 0; i < multiFiles.length; i++) {
            formData.append('multi_images', multiFiles[i])
        }
        formData.append("reviews_id", reviews);
        formData.append("status", marineStatus);

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

        try {     
            const response = await axios({
                method: "post",
                url: "http://34.254.97.212:8080/api/marine-professional/add",
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

    /**
        * @license
        * Copyright 2019 Google LLC. All Rights Reserved.
        * SPDX-License-Identifier: Apache-2.0
    */
    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.749933, lng: -73.98633 },
            zoom: 13,
            mapTypeControl: false,
        });
        const card = document.getElementById("pac-card");
        const input = document.getElementById("pac-input");
        const biasInputElement = document.getElementById("use-location-bias");
        const strictBoundsInputElement =
        document.getElementById("use-strict-bounds");
        const options = {
            fields: ["formatted_address", "geometry", "name"],
            strictBounds: false,
            types: ["establishment"],
        };
    
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
    
        const autocomplete = new google.maps.places.Autocomplete(
            input,
            options
        );
    
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo("bounds", map);
    
        const infowindow = new google.maps.InfoWindow();
        const infowindowContent = document.getElementById("infowindow-content");
    
        infowindow.setContent(infowindowContent);
    
        const marker = new google.maps.Marker({
            map,
            anchorPoint: new google.maps.Point(0, -29),
        });
    
        autocomplete.addListener("place_changed", () => {
            infowindow.close();
            marker.setVisible(false);
    
            const place = autocomplete.getPlace();

            if (!place.geometry || !place.geometry.location) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert(
                    "No details available for input: '" + place.name + "'"
                );
                return;
            }
    
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            infowindowContent.children["place-name"].textContent = place.name;
            infowindowContent.children["place-address"].textContent = place.formatted_address;
            infowindow.open(map, marker);
        });
    
        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
            const radioButton = document.getElementById(id);

            radioButton.addEventListener("click", () => {
                autocomplete.setTypes(types);
                input.value = "";
            });
        }
    
        setupClickListener("changetype-all", []);
        setupClickListener("changetype-address", ["address"]);
        setupClickListener("changetype-establishment", ["establishment"]);
        setupClickListener("changetype-geocode", ["geocode"]);
        setupClickListener("changetype-cities", ["(cities)"]);
        setupClickListener("changetype-regions", ["(regions)"]);
        biasInputElement.addEventListener("change", () => {
            if (biasInputElement.checked) {
                autocomplete.bindTo("bounds", map);
            } else {
                // User wants to turn off location bias, so three things need to happen:
                // 1. Unbind from map
                // 2. Reset the bounds to whole world
                // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
                autocomplete.unbind("bounds");
                autocomplete.setBounds({
                    east: 180,
                    west: -180,
                    north: 90,
                    south: -90,
                });
                strictBoundsInputElement.checked = biasInputElement.checked;
            }
    
            input.value = "";
        });

        strictBoundsInputElement.addEventListener("change", () => {
            autocomplete.setOptions({
                strictBounds: strictBoundsInputElement.checked,
            });

            if (strictBoundsInputElement.checked) {
                biasInputElement.checked = strictBoundsInputElement.checked;
                autocomplete.bindTo("bounds", map);
            }
    
            input.value = "";
        });
    }
  
    window.initMap = initMap;

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
        
        // console.log("single", event.target.files);
    }

    const handleMultiImages = (event) => {
        setMultiFiles(event.target.files)
    }

    const handleService = (event) => {
        setServices(JSON.stringify(event))
    }

    const handleCategory = (event) => {
        setCategory(JSON.stringify(event))
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
    
            // Replace backslashes with an empty string
            // let setData = valuesArray.replaceAll('\\',''); 
            
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
        })

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

        
    }, []);

    useEffect(() => {
        // console.log("reviews", marineReviews);
        // console.log("services", marineService);
        console.log("Category", marineCategory);
        // console.log("multi", multiFiles);
        console.log("status", marineStatus);
        
        
    }, [marineReviews, marineService, multiFiles, marineStatus, marineCategory]);

  return (
    <Fragment>

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Add new marine</CardTitle>
            </CardHeader>

            <CardBody>
                <form onSubmit={submitMarine} > 
                    <Row>
                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='nameMarine'>
                                Name
                            </Label>
                            <Input type='text' required name='name' value={marineName} onChange={(e)=> setMarineName(e.target.value)} id='nameMarine' placeholder='Marine Name' />
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='logoMarine'>
                                Marine Logo
                            </Label>
                            <Input type='file' name="profileLogo" onChange={handleFileSelect}   id="logoMarine" placeholder="Marine Image"  />
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='servicesMarine'>
                                Category
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                defaultValue={marineCategory[0]}
                                // isMulti
                                id='servicesMarine'
                                className='react-select'
                                classNamePrefix='select'
                                // defaultValue={colourOptions[0]}
                                onChange={handleCategory}
                                options={marineCategory}
                                isClearable={false}
                            />
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='servicesMarine'>
                                Services
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                defaultValue={marineService[0]}
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

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='imagesMarine'>
                                Marine Images
                            </Label>
                            <Input type='file' name='multiImages' onChange={handleMultiImages} id='imagesMarine' placeholder='Multi Images' multiple  />
                        </Col>

                        <Col lg='4' className='mb-1'>
                            <Label className='form-label' for='reviewsMarine'>
                                Reviews
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                defaultValue={marineReviews[0]}
                                id='reviewsMarine'
                                className='react-select'
                                classNamePrefix='select'
                                // defaultValue={colourOptions[0]}
                                onChange={handleReviews}
                                options={marineReviews}
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


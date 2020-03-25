import React, {useState} from 'react';
import ReactDom from 'react-dom';
import b from './images/box.png';
import './App.css';
import { Button, Container} from '@material-ui/core';
import {Element} from "react-scroll";
import ModalWrapper from './ModalWrapper';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import ajax from 'axios';
import {Route, Switch, Redirect} from 'react-router-dom';



const header = {
    'Content-Type': 'application/json;charset=UTF-8'
};
const BASE_URL = 'http://localhost:8080/label';
axios.create({
    baseURL: BASE_URL,
    responseType: "json"
})
function App() {

    const [createL, setCreate] = useState(false);
  return (
      <div>
          {createL && <LabelCreate/>}
        <div className="App">
          <header className="App-header">
              Create Label For your Package
            <img src={b} className="App-logo" alt="logo" />
              <Button color={"primary"} variant="contained" onClick={() => setCreate(!createL)}> Create Label </Button>
          </header>
        </div>
      </div>
  );
}

class LabelCreate extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        goback: false,
        redirect: false,
        Lid: "",
        addressFromId: "",
        addressToId: "",
        addressSuccess: false,
        parcelSuccess: false,

        name: "",
        company: "",
        street1: "",
        street2: "",
        city: "",
        zip: "",
        state: "",
        country: "",
        phone: "",
        email: "",
        carrier_facility: "",
        residential: "",
        federal_tax_id: "",

        namet: "",
        companyt: "",
        street1t: "",
        street2t: "",
        cityt: "",
        zipt: "",
        statet:"",
        countryt: "",
        phonet: "",
        emailt: "",
        carrier_facilityt: "",
        residentialt: "",
        federal_tax_idt: "",

        parcelId: "",
        height: "",
        width: "",
        length: "",
        weight: "",

        labelUrl: ""
    };

    handleCreateParcel = () => {
        if (this.state.street1 === "" ||
            this.state.city === "" ||
            this.state.zip === "" ||
            this.state.country === "" ||
            this.state.street1t === "" ||
            this.state.cityt === "" ||
            this.state.zipt === "" ||
            this.state.countryt === "") {
            alert("Please fill out the required fields");
            return ;
        }
        console.log("called");
        ajax.post(BASE_URL + "/address",  {
            name: this.state.name,
            namet:this.state.namet,
            street1: this.state.street1,
            street1t: this.state.street1t,
            street2: this.state.street2,
            street2t: this.state.street2t,
            city: this.state.city,
            cityt: this.state.cityt,
            state: this.state.state,
            statet: this.state.statet,
            zip: this.state.zip,
            zipt: this.state.zipt,
            country: this.state.country,
            countryt: this.state.countryt,
            company: this.state.company,
            companyt: this.state.companyt,
            phone: this.state.phone,
            phonet : this.state.phonet,
            email: this.state.email,
            emailt: this.state.emailt,
            carrier_facility: this.state.carrier_facility,
            carrier_facilityt: this.state.carrier_facilityt,
            carrier_residential: this.state.residential,
            carrier_residentialt: this.state.residentialt,
            federal_tax_id: this.state.federal_tax_id,
            federal_tax_idt: this.state.federal_tax_idt,
        }, {
            headers: header,
        }).then(res=> {
            if (res.data.success) {
                alert("successfully entered the address");
                console.log("data param: {}", res.data);
                this.setState({
                    addressSuccess: true,
                    addressFromId: res.data.addressFromId,
                    addressToId: res.data.addressToId,
                    Lid: res.data.Lid
                });
            } else {
                alert("wrong address. Please check your address again")
            }
        })
    };

    handleGeneration = () => {
        console.log(this.state.addressFromId);
        console.log(this.state.street1);
        console.log(this.state.street2);
        if (this.state.height === "" ||
            this.state.width === "" ||
            this.state.length === "" ||
            this.state.weight === ""
            ) {
            alert("Please fill out the required fields for parcel");
            return ;
        }
        console.log(this.state.Lid);
        console.log(this.state.addressFromId);
        console.log(this.state.addressToId);
        ajax.post(BASE_URL + "/parcel",  {
            addressFromId:this.state.addressFromId,
            addressToId: this.state.addressToId,

            name: this.state.name,
            namet:this.state.namet,
            street1: this.state.street1,
            street1t: this.state.street1t,
            street2: this.state.street2,
            street2t: this.state.street2t,
            city: this.state.city,
            cityt: this.state.cityt,
            state: this.state.state,
            statet: this.state.statet,
            zip: this.state.zip,
            zipt: this.state.zipt,
            country: this.state.country,
            countryt: this.state.countryt,
            company: this.state.company,
            companyt: this.state.companyt,
            phone: this.state.phone,
            phonet : this.state.phonet,
            email: this.state.email,
            emailt: this.state.emailt,

            width: this.state.width,
            height: this.state.height,
            weight: this.state.weight,
            length: this.state.length,
        }, {
            headers: header,
        }).then(res=> {
            if (res.data.success) {
                alert("successfully created the parcel");
                console.log("label url : {}", res.data.labelUrl);
                console.log(this.state.addressSuccess);
                console.log(this.state.parcelSuccess);
                console.log("this is link");
                console.log(res.data.labelUrl);
                this.setState({
                    parcelSuccess: true,
                    Lid: res.data.Lid,
                    parcelId: res.data.parcelId,
                    addressFromId: res.data.addressFromId,
                    addressToId: res.data.addressToId,
                    labelUrl: res.data.labelUrl
                });
            } else {
                alert("invalid dimension for parcel. Please check your parcel selections again")
            }
        })
    };

    turnOnRedirect = () => {
        this.setState({redirect: !this.state.redirect})
    };



    handleGoto = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.labelUrl}/>
        }
    };

    handleChange = (e) => {
        console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value } )
    };
    render() {
        const readonly = {
            border: 'gainsboro solid 1px',
            background: 'white',
            borderRadius: '5px',
        };
        return (
            <div>
            <div align={"center"}>
                <ModalWrapper>
                    {this.state.addressSuccess && this.state.parcelSuccess &&
                        <div style ={{marginTop: '200px'}}>
                    <Button color={"secondary"}  size={'large'} variant={"contained"} onClick={() => {
                        let win = window.open('')
                        win.location.replace(this.state.labelUrl)
                    }}> Click here to get the label </Button>
                            {'     '}
                            <Button color={"primary"}  size={'large'} variant={"contained"} onClick={() => {
                                this.setState({
                                    addressSuccess: !this.state.addressSuccess,
                                    parcelSuccess: !this.state.parcelSuccess,
                                })
                                return <App/>
                            }}
                            > Create another Label </Button>
                        </div>
                    }

                    {this.state.addressSuccess && !this.state.parcelSuccess &&
                    <header style={{display: "inline-block"}} className={"App-header4"}> Parcel Options </header>
                    }
                    {!this.state.addressSuccess &&
                    <div style={{display: "inline-block"}}>
                        <header style={{display: "inline-block"}} className={"App-header2"}> Delivering From</header>
                        <header style={{display: "inline-block"}} className={"App-header3"}> Delivering To</header>
                    </div>
                    }
                    <Element className="element" id="scroll-container" style={{
                        position: 'relative',
                        overflow: 'scroll',
                        height: '440px',
                        width: '960px',
                        // marginBottom: '100px'
                    }}>
                        <Container style = {{marginTop: "10px"}}>
                            {this.state.addressSuccess && !this.state.parcelSuccess &&
                            <div style={{display: "inline-block", width: "100%"}}>
                                <div className={"form-group form-control-lg row col-md-6 float-left"}
                                     style={{marginBottom: "50px"}}>
                                    <label
                                        className={"required-field"}
                                        style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                        Height (inch)
                                    </label>
                                    <input className={"form-control input-lg"} name={"height"}
                                           placeholder="Please enter the desired parcel height"
                                           onChange={this.handleChange}
                                           value={this.state.height}/>
                                </div>


                                <div className={"form-group form-control-lg row col-md-6 float-right"}
                                     style={{marginBottom: "50px"}}>
                                    <label
                                        className={"required-field"}
                                        style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                        Width (inch)
                                    </label>
                                    <input className={"form-control input-lg"} name={"width"}
                                           placeholder="Please enter the desired parcel width"
                                           onChange={this.handleChange}
                                           value={this.state.width}/>
                                </div>

                                <div className={"form-group row form-control-lg col-md-6 float-left"}
                                     style={{marginBottom: "50px"}}>
                                    <label
                                        className={"required-field"}
                                        style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                        Length (inch)
                                    </label>
                                    <input className={"form-control input-lg"} name={"length"}
                                           placeholder="Please enter the desired parcel length"
                                           onChange={this.handleChange}
                                           value={this.state.length}/>
                                </div>

                                <div className={"form-group row form-control-lg col-md-6 float-right"}
                                     style={{marginBottom: "50px"}}>
                                    <label
                                        className={"required-field"}
                                        style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                        Weight (.lb)
                                    </label>
                                    <input className={"form-control input-lg"} name={"weight"}
                                           placeholder="Please enter the desired parcel weight"
                                           onChange={this.handleChange}
                                           value={this.state.weight}/>
                                </div>

                            </div>
                            }
                            {!this.state.addressSuccess && !this.state.parcelSuccess &&
                            <div style={{display: "inline-block", width: "100%"}}>
                                    <div className={"form-group form-control-lg row col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Name
                                        </label>
                                        <input className={"form-control input-lg"}  name={"name"}
                                               placeholder="Please enter your name"
                                               onChange={this.handleChange}
                                               value={this.state.name}/>
                                    </div>


                                    <div className={"form-group form-control-lg row col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Name
                                        </label>
                                        <input className={"form-control input-lg"}  name={"namet"}
                                               placeholder="Please enter your name"
                                               onChange={this.handleChange}
                                               value={this.state.namet}/>
                                    </div>

                                    <div className={"form-group row form-control-lg col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Company
                                        </label>
                                        <input className={"form-control input-lg"} id={"company"} name={"company"}
                                               placeholder="Please enter your Company"
                                               onChange={this.handleChange}
                                               value={this.state.company}/>
                                    </div>

                                    <div className={"form-group row form-control-lg col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Company
                                        </label>
                                        <input className={"form-control input-lg"} id={"company"} name={"companyt"}
                                               placeholder="Please enter your Company"
                                               onChange={this.handleChange}
                                               value={this.state.companyt}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"title"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Address1
                                        </label>
                                        <input className={"form-control input-lg"} id={"user_email"} name={"street1"}
                                               placeholder="Please enter the full address"
                                               onChange={this.handleChange}
                                               value={this.state.street1}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"title"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Address1
                                        </label>
                                        <input className={"form-control input-lg"} name={"street1t"}
                                               placeholder="Please enter the full address"
                                               onChange={this.handleChange}
                                               value={this.state.street1t}/>
                                    </div>

                                    <div className={"form-group row form-control-lg col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Address2
                                        </label>
                                        <input className={"form-control input-lg"} name={"street2"}
                                               placeholder="Please enter the additional address"
                                               onChange={this.handleChange}
                                               value={this.state.street2}/>
                                    </div>

                                    <div className={"form-group row form-control-lg col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Address2
                                        </label>
                                        <input className={"form-control input-lg"} name={"street2t"}
                                               placeholder="Please enter the additional address"
                                               onChange={this.handleChange}
                                               value={this.state.street2t}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"city"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            City
                                        </label>
                                        <input className={"form-control input-lg"}  name={"city"}
                                               placeholder="Please enter the city"
                                               onChange={this.handleChange}
                                               value={this.state.city}/>
                                    </div>


                                    <div className={"form-group form-control-lg row col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"city"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            City
                                        </label>
                                        <input className={"form-control input-lg"}  name={"cityt"}
                                               placeholder="Please enter the city"
                                               onChange={this.handleChange}
                                               value={this.state.cityt}/>
                                    </div>

                                    <div className={"form-group row form-control-lg col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            className={"required-field"}
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            State
                                        </label>
                                        <input className={"form-control input-lg"} name={"state"}
                                               placeholder={"Please enter the state tax id information"}
                                               style={readonly}
                                               value={this.state.state} onChange={this.handleChange}/>
                                    </div>
                                    <div className={"form-group row form-control-lg col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label className={"required-field"}
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            State
                                        </label>
                                        <input className={"form-control input-lg"} name={"statet"}
                                               placeholder={"Please enter the state tax id information"}
                                               value={this.state.statet} onChange={this.handleChange}/>
                                    </div>

                                    <div className={"form-group row form-control-lg col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"zip"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Zipcode
                                        </label>
                                        <input className={"form-control input-lg"} name={"zip"}
                                               placeholder={"Please enter the zip code"}
                                               onChange={this.handleChange}
                                               value={this.state.zip}/>
                                    </div>

                                    <div className={"form-group row form-control-lg col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"zip"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Zipcode
                                        </label>
                                        <input className={"form-control input-lg"} name={"zipt"}
                                               placeholder={"Please enter the zip code"}
                                               onChange={this.handleChange}
                                               value={this.state.zipt}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"country"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Country
                                        </label>
                                        <input className={"form-control input-lg"}  name={"country"}
                                               placeholder="Please enter the country"
                                               onChange={this.handleChange}
                                               value={this.state.country}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"country"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Country
                                        </label>
                                        <input className={"form-control input-lg"}  name={"countryt"}
                                               placeholder="Please enter the country"
                                               onChange={this.handleChange}
                                               value={this.state.countryt}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"phone"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Phone Number
                                        </label>
                                        <input className={"form-control input-lg"}  name={"phone"}
                                               placeholder="Please enter the phone number"
                                               onChange={this.handleChange}
                                               value={this.state.phone}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label className="required-field" htmlFor={"phone"}
                                               style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Phone Number
                                        </label>
                                        <input className={"form-control input-lg"}  name={"phonet"}
                                               placeholder="Please enter the phone number"
                                               onChange={this.handleChange}
                                               value={this.state.phonet}/>
                                    </div>


                                    <div className={"form-group row form-control-lg col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Email
                                        </label>
                                        <input className={"form-control input-lg"} name={"email"}
                                               placeholder={"Please enter the email"}
                                               onChange={this.handleChange}
                                               value={this.state.email}/>
                                    </div>

                                    <div className={"form-group row form-control-lg col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Email
                                        </label>
                                        <input className={"form-control input-lg"} name={"emailt"}
                                               placeholder={"Please enter the email"}
                                               onChange={this.handleChange}
                                               value={this.state.emailt}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Carrier Facility
                                        </label>
                                        <input className={"form-control input-lg"} name={"carrier_facility"}
                                               placeholder="Please enter the career facility"
                                               onChange={this.handleChange}
                                               value={this.state.carrier_facility}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Carrier Facility
                                        </label>
                                        <input className={"form-control input-lg"} name={"carrier_facilityt"}
                                               placeholder="Please enter the career facility"
                                               onChange={this.handleChange}
                                               value={this.state.carrier_facilityt}/>
                                    </div>

                                    <div className={"form-group row form-control-lg col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Residential
                                        </label>
                                        <input className={"form-control input-lg"} name={"residential"}
                                               placeholder={"Please enter the residential information"}
                                               onChange={this.handleChange}
                                               value={this.state.residential}/>
                                    </div>


                                    <div className={"form-group row form-control-lg col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '282c34'}}>
                                            Residential
                                        </label>
                                        <input className={"form-control input-lg"} name={"residentialt"}
                                               placeholder={"Please enter the residential information"}
                                               onChange={this.handleChange}
                                               value={this.state.residentialt}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-left"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Federal Tax ID
                                        </label>
                                        <input className={"form-control input-lg"} name={"federal_tax_id"}
                                               placeholder="Please enter the federal tax id information"
                                               onChange={this.handleChange}
                                               value={this.state.federal_tax_id}/>
                                    </div>

                                    <div className={"form-group form-control-lg row col-md-6 float-right"}
                                         style={{marginBottom: "50px"}}>
                                        <label
                                            style={{fontSize: "15px", fontWeight: "50", color: '#282c34'}}>
                                            Federal Tax ID
                                        </label>
                                        <input className={"form-control input-lg"} name={"federal_tax_idt"}
                                               placeholder="Please enter the federal tax id information"
                                               onChange={this.handleChange}
                                               value={this.state.federal_tax_idt}/>
                                    </div>

                                </div>
                            }
                            {this.state.addressSuccess && !this.state.parcelSuccess &&
                            <Button color={"primary"} variant="contained" onClick={this.handleGeneration}> Get
                                Shipment and Label</Button>
                            }
                            {!this.state.addressSuccess && !this.state.parcelSuccess &&
                            <Button style={{marginBottom: '20px'}} color={"primary"} variant="contained"
                                    onClick={this.handleCreateParcel}> Create Parcel </Button>
                            }
                        </Container>
                    </Element>
                </ModalWrapper>
            </div>
            </div>
        )
    }

}


export default App;

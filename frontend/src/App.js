import React, { Component, useRef, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { GoogleLogout, GoogleLogin } from 'react-google-login';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      items:[],
      isSignedIn: false,
      authInstance  : null
    }
  }
 
  
  componentDidMount(){
 //console.log("component mounted")
  } 
///#region CRUD

  getItems(){
      const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' ,
    
  },
};
  fetch('https://react-293106.wn.r.appspot.com/crud', requestOptions)
    .then(response => { 
    return response.json();
    })
    .then(items => {
      this.setState({items})
      ;})
    .catch(err => {console.log("Error in getting items");console.log(err);});

  }

  addItemToState = (item) => {
    console.log("add item to state")
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
    this.getItems();
  }

  updateState = (item) => {
    console.log("update state")
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (_id) => {
    const updatedItems = this.state.items.filter(item => item._id !== _id)
    this.setState({ items: updatedItems })
  }
//#endregion 

  render() {
    const clientId ='915175076448-gkru4ir0hd83bbibcrui511pmrff0uk3.apps.googleusercontent.com'
        
    const successLogin = response => {
      this.setState({isSignedIn:!isSignedIn})
      this.getItems()
      console.log(response) // eslint-disable-line
    }
    const successLogout = response => {
      this.setState({isSignedIn:false})
      this.getItems()
      console.log(response) // eslint-disable-line
    }

    const error = response => {
      console.error(response) // eslint-disable-line
    }

    const errorLogout = response=>{
      this.setState({isSignedIn:false})
      this.setState({items:null})
    }

    const MountTest = () => {
      const [showButton, toggleShow] = useState(true)
    
      if (showButton) {
        return (
          <>
          <GoogleLogin
            onSuccess={res => {
              toggleShow(false)
              successLogin(res)
            }}
            onFailure={error}
            clientId={clientId}
          >
            Login with Google
          </GoogleLogin>
           
         </>
        )
      }
      return null
    }

    var {isSignedIn} = this.state;
    
    const renderTable = ()=>{
        return (
          <>
          <Row>
          <h1 style={{margin: "20px 0"}}>Threat Listing</h1>
          <Col>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
        <Row>
          <Col>
          <DataTable isLoggedIn={this.state.isLoggedIn} items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
        </>
        )
    }
    return (
      <Container className="App">
      <Row>
      <Col>
      <div className="container">
          <h1>REACT Demo</h1>
          <p>Front End Auth and CRUD Demo</p>
          {this.state.isSignedIn && <GoogleLogout
            onLogoutSuccess ={res => {
             
              successLogout(res)
            }}
            onFailure={error}
            clientId={clientId}
          >
            Logout
          </GoogleLogout>}
          
          {!this.state.isSignedIn && <MountTest />}
          <br />
      </div>
        
      </Col>
    </Row>
      {this.state.isSignedIn && renderTable(this.props.isSignedIn)}
      </Container>
    )
  }
}

export default App

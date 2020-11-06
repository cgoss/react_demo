import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    _id:"",
    id: 0,
    Title: "",
    Description: "",
    RelatedAsset: "",
    Classification: "",
    Impact: 0,
    Likelihood: 0,
    RiskLevel: 0
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
    console.log("set state", e);
  }
  //Set the value of the property by the value changed.

  submitFormAdd = e => {
    e.preventDefault()
    var data = {

      _id:this.state._id,
      id: this.state.id,
      Title: this.state.Title,
      Description: this.state.Description,
      RelatedAsset: this.state.RelatedAsset,
      Classification: this.state.Classification,
      Impact: this.state.Impact,
      Likelihood: this.state.Likelihood,
      RiskLevel: this.state.RiskLevel
    };

    console.log(data);
    this.setState({RiskLevel :(Number(this.state.Impact) + Number(this.state.RiskLevel))/2});
    fetch('https://react-293106.wn.r.appspot.com/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'https://react-293106.wn.r.appspot.com/crud' 
      },
      body: JSON.stringify(data )
    })
      .then(response => 
        {
          console.log(response);
        })
      .then(item => {
        this.props.toggle();
        this.props.addItemToState({
          _id: this.state._id,
          id: this.state.id,
          Title: this.state.Title,
          Description: this.state.Description,
          RelatedAsset: this.state.RelatedAsset,
          Classification: this.state.Classification,
          Impact: this.state.Impact,
          Likelihood: this.state.Likelihood,
          RiskLevel: this.state.RiskLevel
        });
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    this.setState({RiskLevel: (Number(this.state.Impact) + Number(this.state.RiskLevel))/2})
    e.preventDefault()
    fetch('https://react-293106.wn.r.appspot.com/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'https://react-293106.wn.r.appspot.com/crud'
      },
      body: JSON.stringify({
        _id: this.state._id,
        id: this.state.id,
        Title: this.state.Title,
        Description: this.state.Description,
        RelatedAsset: this.state.RelatedAsset,
        Classification: this.state.Classification,
        Impact: this.state.Impact,
        Likelihood: this.state.Likelihood,
        RiskLevel: this.state.RiskLevel
      })
    })
      .then(response => {
        console.log(response);
      })
      .then(item => {
       this.props.toggle();
        this.props.updateState({
          _id: this.state._id,
          id: this.state.id,
          Title: this.state.Title,
          Description: this.state.Description,
          RelatedAsset: this.state.RelatedAsset,
          Classification: this.state.Classification,
          Impact: this.state.Impact,
          Likelihood: this.state.Likelihood,
          RiskLevel: this.state.RiskLevel
        });
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { _id,id,Title,Description,RelatedAsset,Classification,Impact,Likelihood,RiskLevel } = this.props.item
      this.setState({_id, id,Title,Description,RelatedAsset,Classification,Impact,Likelihood,RiskLevel })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="id">ID</Label>
          <Input type="text" name="id" id="id" onChange={this.onChange} value={this.state.id === null ? '' : this.state.id} />
        </FormGroup>
        <FormGroup>
          <Label for="Title">Title</Label>
          <Input type="text" name="Title" id="Title" onChange={this.onChange} value={this.state.Title === null ? '' : this.state.Title} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="Description" id="Description" onChange={this.onChange} value={this.state.Description === null ? '' : this.state.Description}  />
        </FormGroup>
        <FormGroup>
          <Label for="relatedAsset">RelatedAsset</Label>
          <Input type="text" name="RelatedAsset" id="RelatedAsset" onChange={this.onChange} value={this.state.RelatedAsset === null ? '' : this.state.RelatedAsset}  />
        </FormGroup>
        <FormGroup>
          <Label for="classification">Classification</Label>
          <Input type="text" name="Classification" id="Classification" onChange={this.onChange} value={this.state.Classification === null ? '' : this.state.Classification}  placeholder="S.T.R.I.D.E." />
        </FormGroup>
        <FormGroup>
          <Label for="impact">Impact</Label>
          <Input type="number"  max="3" min="0"  name="Impact" id="Impact" onChange={this.onChange} value={this.state.Impact === null ? '' : this.state.Impact} placeholder="0" />
        </FormGroup>
        <FormGroup>
          <Label for="likelihood">Likelihood</Label>
          <Input type="number" max="3" min="0" name="Likelihood" id="Likelihood" onChange={this.onChange} value={this.stateLlikelihood}  placeholder="0" />
        </FormGroup>
        <FormGroup>
         <Label for="riskLevel">RiskLevel</Label>
          <Input type="number" max="3" min="0" disabled name="RiskLevel" id="RiskLevel" onChange={this.onChange} value={this.state.RiskLevel}  placeholder="0" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
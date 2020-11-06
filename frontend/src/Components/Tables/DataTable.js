import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import Pagination from 'react-bootstrap/Pagination'

class DataTable extends Component {
constructor(props)
{
  super(props);
  this.state = {
    currentPage:0,
    itemsPerPage:10,
    items:[],
  };
  this.handleClick = this.handleClick.bind(this);
}

componentDidMount()
{
  //console.log("table component loaded")
}

handleClick(event) {
  this.setState({
    currentPage: Number(event.target.id-1),
  });
}

  deleteItem = _id => {
    let confirmDelete = window.confirm('Delete item forever?')
    console.log(_id);
    if(confirmDelete){
      fetch('https://react-293106.wn.r.appspot.com/crud', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        '_id':_id
      })
    })
      .then(response => {
        this.props.deleteItemFromState(_id);
      })
      .catch(err => console.log(err))
    }
  }; 


  render() {
  
    const {currentPage, itemsPerPage } = this.state;

    let items = [];
    const displayItems = this.props.items.slice(currentPage*itemsPerPage,(currentPage+1)*itemsPerPage);
    
  for (let i = 1; i <= Math.ceil(this.props.items.length / itemsPerPage); i++) {
    items.push(
      <Pagination.Item key={i} id={i} >
        {i}
      </Pagination.Item>,
    );
  }

  const paginationBasic = (
    <div>
      <Pagination onClick={this.handleClick}>
        {items}
        </Pagination>
      <br />
    </div>
  );
  if(this.props.items !==null)
  {
    const items = displayItems.map(item => {
     
      return (
        <>
        {
        <tr key={item.id}>
          <td width="10px" >{item.id}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item._id)}>Del</Button>
            </div>
          </td>
          <td>{item.Title}</td>
            <td width="55px">{item.Description}</td>
            <td>{item.RelatedAsset}</td>
            <td>{item.Classification}</td>
            <td>{item.Impact}</td>
            <td>{item.Likelihood}</td>
          <td>{item.RiskLevel}</td>
              </tr>}
        </>
        );
      });

    return (
      <>
      {paginationBasic}
      <Table responsive hover>
        <thead>
          <tr>
            <th scope="row">ID</th>
            <th width="10px"></th>
            <th>Title</th>
            <th>Description</th>
            <th>RelatedAsset</th>
            <th>Classification</th>
            <th>Impact</th>
            <th>Likelihood</th>
            <th>RiskLevel</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
        <tfoot>
        </tfoot>
      </Table>
      
      </>
    )
  }
}
}

export default DataTable
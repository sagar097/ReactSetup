import React, { Component } from 'react';
import './Customer.css';
import { connect } from 'react-redux';
import {getCustomerApi} from '../../redux/services/getCustomerApi';
import { getAllUserDetail } from "../../redux/actions/customerDetailsAction";

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    getCustomerApi().then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
    this.props.getAllUserDetail();
    
  }

  render() {
    console.log("CustomerDetailsReducers",this.props.CustomerDetailsReducers)
    return (
      <div>
        <h2>Customers</h2>
        <ul>
        {this.state.customers.map(customer => 
         ( <li key={customer.id}>{customer.firstName} {customer.lastName}</li>)
        )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ CustomerDetailsReducers }) => ({
  CustomerDetailsReducers: CustomerDetailsReducers.CustomerDataList
});

const mapDispatchToProps = dispatch => {
  return {
    getAllUserDetail: params => dispatch(getAllUserDetail(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customers);
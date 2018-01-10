import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { EditUser } from './index'
import { getAdminUsers, deleteUserThunk } from '../store'


export class AdminUserRow extends Component{
  constructor(){
    super();
    this.state = {editOpen: false}
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(){
    this.setState({editOpen: false});
  }

  render() {
    const user = this.props.user;
    return (
      <tbody>
        <tr key={user.id}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin ? 'yes' : 'no'}</td>
          <td><button className="btn btn-info btn-round" onClick={() => { this.setState({editOpen: !this.state.editOpen}) }}>Edit User</button></td>
          <td><button className="btn btn-info btn-round" onClick={() => this.props.deleteUser(user.id)}>x</button></td>
        </tr>
        <tr>
          <td colSpan="6">{this.state.editOpen &&
            <EditUser
              editUser={user}
              closeForm={this.handleEdit}
              updateThunk={getAdminUsers} />}</td>
        </tr>
      </tbody>
    )
  }

}

const mapState = null

const mapDispatch = dispatch => {
  return {
    deleteUser(userId){
      dispatch(deleteUserThunk(userId, getAdminUsers));
    }
  }
}

export default connect(mapState, mapDispatch)(AdminUserRow)

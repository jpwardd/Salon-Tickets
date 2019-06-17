import React, { useState, useEffect } from 'react'

import { Form, Box, TextInput, FormField, CheckBox } from 'grommet'
import { CirclePicker } from 'react-color';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import { setAlert, register, loadUser } from '../../actions'
import './CreateEmployee.css'


const colors = ['#902EA8', '#19ADA9', '#DA8620', '#29C569', '#128FCC', '#F0544F', '#BEFFC7', '#315b63', '#B0413E', '#fbb7c0', '#FFEB3B', '#607D8B']


const CreateEmployee = ({loadUser, register, setAlert, history}) => {
   useEffect(() => {
     loadUser()
   }, [loadUser])

  
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     color: '',
     employee: false,
     manager: false,
     owner: false,
     password: '',
     password2: ''
   });

  const { name, email, color, employee, manager, owner, password, password2} = formData
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const ownerChange = e => setFormData({ ...formData, owner: e.target.checked})
  const managerChange = e => setFormData({ ...formData, manager: e.target.checked})
  const employeeChange = e => setFormData({ ...formData, employee: e.target.checked})




  const handleChangeComplete = color => setFormData({ ...formData, color: color.hex })
  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    }

    register({ name, email, color, employee, manager, owner, password });
    // history.push('/dashboard')
  }


  return (
    
    <div className="ns-container">
     <Box
      align="center"
      pad="0"
      margin="0"
     >
      <h2 style={{ fontSize: "50px"}} className="title">New Employee</h2>
     </Box>
      
  
       <Form className="ns-form-container" onSubmit={e => onSubmit(e)}>
        <FormField>

          <TextInput 
            onChange={e => onChange(e)}
            placeholder="name"
            name="name"
            value={name}
          />
        </FormField>

        <FormField>
          <TextInput 
            onChange={e => onChange(e)}
            placeholder="email"
            name="email"
            value={email}
          />
        </FormField>
        <Box margin="5px">

        <h3 className="color-title">Choose a color</h3>
        <CirclePicker 
          color={color}
          onChangeComplete={handleChangeComplete}
          colors={colors}
        />
        
        </Box>

        <CheckBox
          checked={manager}
          label="manager"
          name="manager"
          onChange={e => managerChange(e)}
        />
        <CheckBox
          checked={employee}
          label="Employee"
          name="employee"
          onChange={e => employeeChange(e)}
        />
        <CheckBox
          label="Owner"
          checked={owner}
          name="owner"
          onChange={e => ownerChange(e)}
        />
        <FormField>
          <TextInput 
            onChange={e => onChange(e)}
            placeholder="password"
            name="password"
            value={password}
          />
        </FormField>

        <FormField>
          <TextInput 
            onChange={e => onChange(e)}
            placeholder="re-enter password"
            name="password2"
            value={password2}
          />
        </FormField>
    
          <Box align="center">

          <Button 
            buttonText="Create"
            className="add-service-btn"
            type="submit"
          />
          </Box>
        </Form>
     
    </div>
  )
}
CreateEmployee.propTypes = {

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth
})
export default connect(mapStateToProps, {register, setAlert, loadUser})(CreateEmployee)

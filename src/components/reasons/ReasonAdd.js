import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { addReason } from '../../actions'
import dropdowns from '../../dropdowns.json'

class ReasonAdd extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderDropdowns(list) {
    return list.map((reason, index) => {
      return (
        <option value={reason} key={index} />
      )
    })
  }

  renderInput = ({ input, label, meta, list }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label htmlFor="">{label}</label>
        <input
          {...input}
          autoComplete="off"
          list={list.name}
          name={list.name}
          />
        <datalist id={list.name}>
          {this.renderDropdowns(list.list)}
        </datalist>
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    if (this.props.isSignedIn) {
      this.props.addReason(formValues)
      this.props.reset()
    } else {
      window.alert('You must sign in!')
    }
  }

  render() {
    return (
      <form
      className="ui form error segment"
      onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
        name="reason"
        component={this.renderInput}
        label="Enter Reason"
        list={dropdowns.reasons}
        />
        <Field
        name="team"
        component={this.renderInput}
        label="Select Team"
        list={dropdowns.teams}
        />
      <button className="ui button" type="submit">Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {}
  if (!formValues.reason) {
    errors.reason = 'You must enter a reason'
  }
  if (!formValues.team) {
    errors.team = 'You must select a team'
  }
  return errors
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

const formWrapped = reduxForm({
  form: 'reasonAdd',
  validate,
})(ReasonAdd)

export default connect(mapStateToProps, { addReason })(formWrapped)

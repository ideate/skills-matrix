import {connect} from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import {visibilitySelectFieldChange} from '../modules/visibility-select-field'
import {displayVisibility, visibility} from '../../../config'
import React, {Component, PropTypes} from 'react'

class VisibilitySelectField extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    visibilitySelectFieldState: PropTypes.object.isRequired
  }

  changeVisibility = (event, index, value) => {
    const {dispatch, visibilitySelectFieldState} = this.props

    if (!visibilitySelectFieldState.disabled) {
      dispatch(visibilitySelectFieldChange({visibility: value}))
    }
  }

  render () {
    return (
      <SelectField
        disabled={false}
        floatingLabelText={displayVisibility}
        fullWidth={true}
        value={this.props.visibilitySelectFieldState.visibility}
        onChange={this.changeVisibility}
      >
        {this.renderMenuItems()}
      </SelectField>
    )
  }
  
  renderMenuItems () {
    return (
      visibility.map(function (visible) {
        return (
          <MenuItem
            key={visible}
            primaryText={visible}
            value={visible}
          />
        )
      })
    )
  }
}

export default connect((state) => ({
  visibilitySelectFieldState: state.visibilitySelectField
}))(VisibilitySelectField)

import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
<<<<<<< 636285151a9b5d7640f1f2fddf197df54c26546d
=======
import FlatButton from 'material-ui/FlatButton'
>>>>>>> Updated ag-grid to use ag-material theme
=======
>>>>>>> Added checkboxes to grids
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import {skillsRead} from '../modules/async/skills-read'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Skills extends Component {
  
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
<<<<<<< 8da5f9b225926be164daf43ebaca9c93b2b8bcac
  constructor () {
    super()

    this.state = {
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
      headerHeight: 48,
      rowHeight: 48,
      icons: {
=======
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-remove"/>',
        filter: '<i class="fa fa-filter"/>',
        menu: '<i class="fa fa-bars"/>',
>>>>>>> Grid branch (#11)
=======
      headerHeight: 48,
      rowHeight: 48,
      icons: {
>>>>>>> Added very rudimentary ag-grid set up on skills
        sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
        sortDescending: '<i class="fa fa-sort-alpha-desc"/>'
      }
    }
=======
  constructor() {
      super();

      this.state = {
          icons: {
              columnRemoveFromGroup: '<i class="fa fa-remove"/>',
              filter: '<i class="fa fa-filter"/>',
              menu: '<i class="fa fa-bars"/>',
              sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
              sortDescending: '<i class="fa fa-sort-alpha-desc"/>',
          }
      };
>>>>>>> Added material-ui theme with some fontawesome icons to ag-grid
=======
  constructor () {
    super()

    this.state = {
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-remove"/>',
        filter: '<i class="fa fa-filter"/>',
        menu: '<i class="fa fa-bars"/>',
        sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
        sortDescending: '<i class="fa fa-sort-alpha-desc"/>'
      }
    }
>>>>>>> Added checkboxes to grids
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    skillsState: PropTypes.object.isRequired
  }
  
  componentDidUpdate () {
    this.handleResize(this.refs.grid)
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(skillsRead())
  }
  
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
=======
>>>>>>> Added very rudimentary ag-grid set up on skills
  componentWillUnmount () {
    this.refs.grid.api.destroy()
  }
  
  getTableHeight () {
    let tableHeight = 0
    
    if (typeof this.props.skillsState.data.length !== 'undefined') {
      tableHeight = (this.props.skillsState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
    }
    
    const tableHeightStyle = {
      height: tableHeight
    }

    return tableHeightStyle
  }
  
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
=======
>>>>>>> Grid branch (#11)
=======
>>>>>>> Added very rudimentary ag-grid set up on skills
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked (event) {
<<<<<<< bbbe4d06221b46a4a8b214ee9b714e83153dcbb7
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
    browserHistory.push('/skills/' + event.data.id)
=======
    if (event.value === this.state.editIcon) {
      browserHistory.push('/skills/' + event.data.id)
    }
>>>>>>> Grid branch (#11)
=======
    browserHistory.push('/skills/' + event.data.id)
>>>>>>> Added very rudimentary ag-grid set up on skills
=======
=======
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
>>>>>>> Fixes to coding style
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
    browserHistory.push('/skills/' + event.data.id)
=======
    if (event.value == this.state.editIcon) {
=======
    if (event.value === this.state.editIcon) {
>>>>>>> Fixes to coding style
      browserHistory.push('/skills/' + event.data.id)
    }
>>>>>>> Added checkboxes to grids
>>>>>>> Added checkboxes to grids
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderSkills () {
    const {skillsState} = this.props
    const editIcon = this.state.editIcon

    if (skillsState && skillsState.data && skillsState.data.length) {
      const columnDefs = [
<<<<<<< bbbe4d06221b46a4a8b214ee9b714e83153dcbb7
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
        {headerName: 'Skill', field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
      ]
      const rowData = []
      
      skillsState.data.map(function (skill) {
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
=======
        {
          headerName: '',
          checkboxSelection: true,
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
          suppressSorting: true,
          width: 15
        },
=======
>>>>>>> Added very rudimentary ag-grid set up on skills
=======
=======
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
>>>>>>> Fixes to coding style
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
>>>>>>> Added checkboxes to grids
        {headerName: 'Skill', field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
=======
          {
            headerName: '',
            checkboxSelection: true,
            suppressMenu: true,
            suppressMovable: true,
            suppressResize: true,
            suppressSorting: true,
            width: 15
          },
          {headerName: 'Skill', field: 'title', cellStyle: {color: '#FF4081'}},
          {headerName: 'Description', field: 'description'},
          {
            headerName: 'Edit',
            field: 'edit',
            suppressMenu: true,
            suppressMovable: true,
            suppressResize: true,
            suppressSorting: true,
            width: 20
          },
>>>>>>> Added checkboxes to grids
=======
        {
          headerName: '',
          checkboxSelection: true,
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
          suppressSorting: true,
          width: 15
        },
        {headerName: 'Skill', field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'},
        {
          headerName: 'Edit',
          field: 'edit',
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
          suppressSorting: true,
          width: 20
        }
>>>>>>> Fixes to coding style
      ]
      const rowData = []
      
      skillsState.data.map(function (skill) {
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
        rowData.push({id: skill._id, title: skill.title, description: skill.description, edit: editIcon})
>>>>>>> Grid branch (#11)
=======
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
>>>>>>> Added very rudimentary ag-grid set up on skills
=======
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
=======
        rowData.push({id: skill._id, title: skill.title, description: skill.description, edit: editIcon})
>>>>>>> Added checkboxes to grids
>>>>>>> Added checkboxes to grids
      })
      
      return (
        <AgGridReact
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
=======
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
>>>>>>> Added checkboxes to grids
          columnDefs={columnDefs}
<<<<<<< 636285151a9b5d7640f1f2fddf197df54c26546d
          enableSorting='true'
          headerHeight={this.state.headerHeight}
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
          rowHeight={this.state.rowHeight}
          suppressMovableColumns='true'
=======
<<<<<<< c3f8fbdfa436574bf875076b06cb027967fd015f
          autoResize='true'
=======
>>>>>>> Added very rudimentary ag-grid set up on skills
          columnDefs={columnDefs}
          enableSorting='true'
          headerHeight={this.state.headerHeight}
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
          rowHeight='48'
          rowSelection='multiple'
>>>>>>> Grid branch (#11)
=======
          rowHeight={this.state.rowHeight}
          suppressMovableColumns='true'
>>>>>>> Added very rudimentary ag-grid set up on skills
=======
          enableColResize="true"
          enableFilter="true"
          enableSorting="true"
=======
          autoResize='true'
          columnDefs={columnDefs}
          enableColResize='true'
          enableFilter='true'
          enableSorting='true'
>>>>>>> Added checkboxes to grids
          headerHeight='48'
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
          rowHeight='48'
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
>>>>>>> Updated ag-grid to use ag-material theme
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
>>>>>>> Updated ag-grid to use ag-material theme
=======
=======
          rowSelection="multiple"
>>>>>>> Added checkboxes to grids
<<<<<<< bbbe4d06221b46a4a8b214ee9b714e83153dcbb7
>>>>>>> Added checkboxes to grids
=======
=======
          rowSelection='multiple'
>>>>>>> Fixes to coding style
>>>>>>> Fixes to coding style
          onCellClicked={this.onCellClicked.bind(this)}
          onGridReady={this.onGridReady.bind(this)}
        />
      )
    }
  }

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Skills' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/skills/create'))}
            />
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
<<<<<<< c3f8fbdfa436574bf875076b06cb027967fd015f
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          <div className='ag-material'
            style={this.getTableHeight()}>
=======
          <div className='ag-material'>
>>>>>>> Grid branch (#11)
=======
          <div className='ag-material'
            style={this.getTableHeight()}>
>>>>>>> Added very rudimentary ag-grid set up on skills
=======
=======
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
>>>>>>> Added checkboxes to grids
<<<<<<< 636285151a9b5d7640f1f2fddf197df54c26546d
          <div className='ag-material'
            style={this.getTableHeight()}>
=======
          <div className="ag-material">
>>>>>>> Updated ag-grid to use ag-material theme
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
>>>>>>> Updated ag-grid to use ag-material theme
=======
=======
          <div className='ag-material'>
>>>>>>> Added checkboxes to grids
>>>>>>> Added checkboxes to grids
           {this.renderSkills()}
           </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  skillsState: state.skills
}))(Skills)
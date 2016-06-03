
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
      headerHeight: 48,
      rowHeight: 48,
      icons: {
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
  
<<<<<<< d78a9706a3fb054a9c9db41ba4ca16c9fddf5622
<<<<<<< 533c859894aa613c8db24284e3eca3aa73f91faf
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
=======
>>>>>>> Added very rudimentary ag-grid set up on skills
=======
<<<<<<< 219f2baf49a0cf5ba055321bc07c51554febe6f9
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
=======
<<<<<<< eefa0f4c063e9470f96194614938ac4224fcdca2
<<<<<<< 219f2baf49a0cf5ba055321bc07c51554febe6f9
=======
>>>>>>> Fixing rebasing issues
>>>>>>> Fixing rebasing issues
  componentWillUnmount () {
    this.refs.grid.api.destroy()
  }
  
<<<<<<< eefa0f4c063e9470f96194614938ac4224fcdca2
  getTableHeight () {
    let tableHeight = 0
    
    if (typeof this.props.skillsState.data.length !== 'undefined') {
      tableHeight = (this.props.skillsState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
    }
=======
  getTableHeight () {
    const tableHeight = (this.props.skillsState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
<<<<<<< 0e3b2265113f6fccc932d54282bc1198e96dc07e
<<<<<<< ab5d13db5007fe3815c3a90eb3e8322cbf35656b
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
    
=======

>>>>>>> Added ag-grid to capabilities for selection
=======

>>>>>>> Latest ag-grid updates to each page to clean up the display some and trim down unnecessary code snippets
=======
  getTableHeight () {
    let tableHeight = 0
    
    if (typeof this.props.skillsState.data.length !== 'undefined') {
      tableHeight = (this.props.skillsState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
    }
    
>>>>>>> Fixing rebasing issues
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
<<<<<<< 010243e20a201c2c47a41e225f0ae519f0e18983
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
=======
<<<<<<< f5fe3a349604b7f579ad35dd3843cf50431ffc88
>>>>>>> Fixes #14, #15, and #16, removing the checkbox and edit options from skills, and bringing back row selection drilldowns
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
<<<<<<< 010243e20a201c2c47a41e225f0ae519f0e18983
>>>>>>> Added checkboxes to grids
=======
=======
    browserHistory.push('/skills/' + event.data.id)
>>>>>>> Fixes #14, #15, and #16, removing the checkbox and edit options from skills, and bringing back row selection drilldowns
>>>>>>> Fixes #14, #15, and #16, removing the checkbox and edit options from skills, and bringing back row selection drilldowns
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderSkills () {
    const {skillsState} = this.props

    if (skillsState && skillsState.data && skillsState.data.length) {
      const columnDefs = [
<<<<<<< 010243e20a201c2c47a41e225f0ae519f0e18983
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
=======
<<<<<<< f5fe3a349604b7f579ad35dd3843cf50431ffc88
>>>>>>> Fixes #14, #15, and #16, removing the checkbox and edit options from skills, and bringing back row selection drilldowns
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
=======
        {headerName: 'Skill', field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
>>>>>>> Fixes #14, #15, and #16, removing the checkbox and edit options from skills, and bringing back row selection drilldowns
      ]
      const rowData = []
      
      skillsState.data.map(function (skill) {
<<<<<<< 533c859894aa613c8db24284e3eca3aa73f91faf
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
        rowData.push({id: skill._id, title: skill.title, description: skill.description, edit: editIcon})
>>>>>>> Grid branch (#11)
=======
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
>>>>>>> Added very rudimentary ag-grid set up on skills
=======
=======
<<<<<<< 219f2baf49a0cf5ba055321bc07c51554febe6f9
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
=======
        rowData.push({id: skill._id, title: skill.title, description: skill.description, edit: editIcon})
>>>>>>> Added checkboxes to grids
<<<<<<< 533c859894aa613c8db24284e3eca3aa73f91faf
>>>>>>> Added checkboxes to grids
=======
=======
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
      })
      
      return (
        <AgGridReact
<<<<<<< f83e801b16e44e61232f83dc8df6451bc3e0f2d5
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
=======
=======
<<<<<<< 1ff0d78f1e591543fd4ac55225ceca607e71b3e2
>>>>>>> Fixes #20 and #13, removing ag-filters menu and fixing the ag-grid header font to be sans-serif
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
<<<<<<< 0e3b2265113f6fccc932d54282bc1198e96dc07e
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
=======
>>>>>>> Fixes #20 and #13, removing ag-filters menu and fixing the ag-grid header font to be sans-serif
          columnDefs={columnDefs}
          enableSorting='true'
<<<<<<< 219f2baf49a0cf5ba055321bc07c51554febe6f9
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
=======
          headerHeight={this.state.headerHeight}
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
          rowHeight={this.state.rowHeight}
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
          rowSelection='multiple'
<<<<<<< 1ff0d78f1e591543fd4ac55225ceca607e71b3e2
>>>>>>> Fixes to coding style
<<<<<<< f83e801b16e44e61232f83dc8df6451bc3e0f2d5
>>>>>>> Fixes to coding style
=======
=======
=======
>>>>>>> Latest ag-grid updates to each page to clean up the display some and trim down unnecessary code snippets
          suppressMovableColumns='true'
>>>>>>> Fixes #20 and #13, removing ag-filters menu and fixing the ag-grid header font to be sans-serif
>>>>>>> Fixes #20 and #13, removing ag-filters menu and fixing the ag-grid header font to be sans-serif
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
<<<<<<< 533c859894aa613c8db24284e3eca3aa73f91faf
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
=======
<<<<<<< 219f2baf49a0cf5ba055321bc07c51554febe6f9
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
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
<<<<<<< 533c859894aa613c8db24284e3eca3aa73f91faf
>>>>>>> Added checkboxes to grids
=======
=======
          <div className='ag-material'
            style={this.getTableHeight()}>
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
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
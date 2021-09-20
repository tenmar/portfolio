import React from 'react'

import './Projects.css'

import { withCamera } from '../Model'

interface IProjectsProps {
  camera: any
}

class Projects extends React.Component<IProjectsProps> {
  constructor(props: IProjectsProps) {
    super(props)

    this.renderNav = this.renderNav.bind(this)
  }
  renderNav() {
    return <button disabled={this.props.camera.isAtCenter()} className="back-button" onClick={(evt: any) => { this.props.camera.backToCenter() }}><h1>▼</h1></button>
  }

  render() {
    return <div className="projects" style={{ flexDirection: 'column', borderWidth: 0.5, borderColor: 'white', width: 550 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}><h1 style={{ flex: 1 }}>Projects</h1>{this.renderNav()}</div>
    </div>
  }
}

export default withCamera(Projects)

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
    return <div className="projects" style={{ flexDirection: 'column', width: 550 }}>
      <div><h1 style={{ flex: 1, textAlign: 'center' }}>Projects</h1></div>
      <div className='horizontal-divider-center' />
    </div>
  }
}

export default withCamera(Projects)

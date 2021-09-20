import React from 'react'

import './Experience.css'

import { withCamera } from '../Model'

interface IExperienceProps {
  camera: any
}

class Experience extends React.Component<IExperienceProps> {
  constructor(props: IExperienceProps) {
    super(props)

    this.renderNav = this.renderNav.bind(this)
  }
  renderNav() {
    return <button disabled={this.props.camera.isAtCenter()} className="back-button" onClick={(evt: any) => { this.props.camera.backToCenter() }}><h1>▶</h1></button>
  }

  render() {
    return <div className="experience" style={{ flexDirection: 'column', borderWidth: 0.5, borderColor: 'white', width: 550 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}><h1 style={{ flex: 1 }}>Experience</h1>{this.renderNav()}</div>
      <h2>Handimaps</h2>
      <h3>CoderDojo</h3>
    </div>
  }
}

export default withCamera(Experience)

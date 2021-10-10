import React from 'react'

import './Skills.css'

import { withCamera } from '../Model'

interface ISkillsProps {
  camera: any
}

class Skills extends React.Component<ISkillsProps> {
  constructor(props: ISkillsProps) {
    super(props)

    this.renderNav = this.renderNav.bind(this)
  }
  renderNav() {
    return <button disabled={this.props.camera.isAtCenter()} className="back-button" onClick={(evt: any) => { this.props.camera.backToCenter() }}><h1>◀</h1></button>
  }

  render() {
    return <div className="skills" style={{ flexDirection: 'column', width: 550 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}><h1 style={{ flex: 1 }}>Skills</h1></div>
      <div className='horizontal-divider-right' />

    </div>
  }
}

export default withCamera(Skills)

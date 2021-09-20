import React from 'react'

import './Landing.css';

interface ILandingProps {

}

interface ILandingState {

}


class Landing extends React.Component<ILandingProps, ILandingState> {
  constructor(props: ILandingProps) {
    super(props)

    this.state = {

    }
  }

  render() {

    return <div className="landing-container">
      <div className="column">
        <div className="row"><h1>Hi I'm <b className="highlight">Tenma Rollins</b>,</h1></div>
        <div className="row"><h2>a <b>Software Engineer</b> from Washington</h2></div>

        <button>Experience</button>
        <button>Skills</button>
        <button>Projects</button>
        <button>Credits</button>
      </div>
    </div>
  }
}

export default Landing

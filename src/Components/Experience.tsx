import React from "react";

import "./Experience.css";

import { withCamera } from "../Model";

interface IExperienceProps {
  camera: any;
}

class Experience extends React.Component<IExperienceProps> {
  constructor(props: IExperienceProps) {
    super(props);

    this.renderNav = this.renderNav.bind(this);
  }
  renderNav() {
    return (
      <button
        disabled={this.props.camera.isAtCenter()}
        className="back-button"
        onClick={(evt: any) => {
          this.props.camera.backToCenter();
        }}
      >
        A
      </button>
    );
  }

  render() {
    return (
      <div
        className="experience"
        style={{ flexDirection: "column", width: 550 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h1 style={{ flex: 1 }}>Experience</h1>
        </div>
        <div className="horizontal-divider-left" />
        <h2>Handimaps</h2>
        <ol>
          <li>Lead Software Developer</li>
          <li>Associate Software Developer</li>
          <li>Intern Developer</li>
        </ol>
        <h3>CoderDojo</h3>
        <ol>
          <li>Volunteer Teaching Assistant</li>
        </ol>
      </div>
    );
  }
}

export default withCamera(Experience);

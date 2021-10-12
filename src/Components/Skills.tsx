import React from "react";

import "./Skills.css";

import { withCamera } from "../Model";

interface ISkillsProps {
  camera: any;
}

class Skills extends React.Component<ISkillsProps> {
  constructor(props: ISkillsProps) {
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
        <h1>◀</h1>
      </button>
    );
  }

  render() {
    return (
      <div className="skills" style={{ flexDirection: "column", width: 550 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h1 style={{ flex: 1 }}>Skills</h1>
        </div>
        <div className="horizontal-divider-right" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Languages</h2>
          <ul>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Kotlin</li>
            <li>Swift</li>
            <li>Java</li>
            <li>C#</li>
            <li>Python</li>
            <li>SQL</li>
          </ul>
          <h2>Technology</h2>
          <ul>
            <li>ReactJS</li>
            <li>React Native</li>
            <li>Redux</li>
            <li>Node.js</li>
            <li>Google Cloud Platform</li>
            <li>Android Studio</li>
            <li>XCode</li>
            <li>Visual Studio</li>
            <li>Git</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withCamera(Skills);

import React from "react";

import "./Skills.css";

import { withCamera } from "../Model";

interface ISkillsProps {
  camera: any;
}

const LANGUAGES: string[] = ['JavaScript','TypeScript','Kotlin','Swift','Java','C#','Python','SQL']
const TECNOLOGY: string[] = ['ReactJS','React Native','Redux','Node.js','Android Studio','XCode','Visual Studio','Git', 'Google Cloud Platform']


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
          <ul>{LANGUAGES.map(lang => <li>{lang}</li>)}</ul>
          <h2>Technology</h2>
          <ul>{TECNOLOGY.map(tech => <li>{tech}</li>)}</ul>
        </div>
      </div>
    );
  }
}

export default withCamera(Skills);

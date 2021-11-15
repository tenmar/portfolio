import React from "react";

import "./Credits.css";

import { withCamera } from "../Model";

interface ICreditsProps {
  camera: any;
}

class Credits extends React.Component<ICreditsProps> {
  constructor(props: ICreditsProps) {
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
        <h1>▲</h1>
      </button>
    );
  }

  render() {
    return (
      <div className="credits" style={{ flexDirection: "column", width: 550 }}>
        <div>
          <h1 style={{ flex: 1, textAlign: "center" }}>Credits</h1>
        </div>
        <div className="horizontal-divider-center" />
        <div className="row" style={{ textAlign: "left" }}>
          <div className="col">
            <h4>Packages & Frameworks</h4>
            <a href="https://reactjs.org/">React</a>
            <a href="http://reactcommunity.org/react-transition-group/">
              react-transition-group
            </a>
            <a href="https://create-react-app.dev/">create-react-app</a>
          </div>
          <div className="col" style={{ flex: 1 }} />
          <div className="col" style={{ textAlign: "right" }}>
            <h4>Misc</h4>
            <a href="https://www.typescriptlang.org/">TypeScript</a>
            <a href="https://code.visualstudio.com/">VS Code</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withCamera(Credits);

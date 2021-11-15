import React from "react";
import { Project } from "../Model";

import "./OverlayProject.css";

interface IOverlayProjectsProps {
  project?: Project;
  onClose?: React.MouseEventHandler<any>;
  style?: React.CSSProperties;
}

class OverlayProject extends React.PureComponent<IOverlayProjectsProps> {
  get Title() {
    return this.props.project?.title || "";
  }

  get Description() {
    let result = "";

    if (this.props.project?.shortDescription) {
      result += this.props.project?.shortDescription;
    }

    if (this.props.project?.longDescription) {
      if (result.length > 0) {
        result += "\n\n"
      }
      result += this.props.project?.longDescription;
    }

    return result;
  }

  render() {
    return (
      <div
        className='overlay-project'
        style={this.props.style}>
        <div
          className="content-container"
          style={{
            backgroundImage: `url(${this.props.project?.imageBG})`,
            backgroundSize: 'cover',
            padding: 32,
          }}>
            <div id="content-container-bg"  style={{ padding: 32, backgroundColor: 'rgba(0,0,0,0.6)' }}>
              <div id="content-header">
                <h1>{this.Title}</h1>
              </div>
              <div id="content-divider" />
              <p id="content-description">{this.Description}</p>
            </div>
            <div id="return-button-container">
            <div id="return-button" onClick={this.props.onClose}>
              Return
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default OverlayProject;

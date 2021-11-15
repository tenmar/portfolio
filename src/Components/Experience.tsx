import React from "react";

import "./Experience.css";

import { withCamera } from "../Model";
import ResumePreviewBG from '../Media/resume_preview_bg.png'

import ResumePDF from '../Media/rollins_tenma_resume.pdf';

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
        <a href={ResumePDF} target="_blank" rel="noreferrer">
        <div className="resume-preview-container">
          <img
            src={ResumePreviewBG}
            className='resume-preview'
            alt="Blurred preview of my resume."
          />
          <h2>Resume</h2>
        </div>
        </a>
      </div>
    );
  }
}

export default withCamera(Experience);

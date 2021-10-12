import React from "react";

import "./Projects.css";

import { withCamera } from "../Model";
import { Project } from "../Model/types";
import { OverlayProject } from ".";
import { Transition } from "react-transition-group";

const DEFAULT_PROJECT: Project = {
  image: "",
  title: "Project Title Here",
  description:
    "Project description and what I did to make it and some other relevant information about it.",
  date: new Date().getTime(),
};

interface IGridListProps {
  data: Project[];
  pageSize: number;
  renderListItem: (item: Project) => React.ReactElement;
}
interface IGridListState {
  page: number;
}
class GridList extends React.Component<IGridListProps, IGridListState> {
  static defaultProps: Partial<IGridListProps> = {
    data: [DEFAULT_PROJECT, DEFAULT_PROJECT, DEFAULT_PROJECT, DEFAULT_PROJECT],
    pageSize: 4,
    renderListItem: (item) => <div />,
  };

  constructor(props: IGridListProps) {
    super(props);

    this.state = {
      page: 0,
    };

    this.renderContainer = this.renderContainer.bind(this);
  }

  renderContainer(item: Project, index: number) {
    const imageSize = 100;

    return (
      <div className="list-item-container"
        style={{ display: "flex", maxHeight: imageSize, flexDirection: "row" }}
      >
        <div className="list-item-image"
          style={{
            height: imageSize,
            width: imageSize,
            marginRight: 8,
            backgroundColor: "rgba(255,255,255, 0.2)",
          }}
        />
        <div style={{ maxHeight: imageSize, flex: 1, display: "flex", flexDirection: "column" }}>
          <h2 style={{ flex: 0, fontSize: 18, lineHeight: '18px', margin: 0, padding: 0, marginBottom: 8 }}>
            {item.title}
          </h2>
          <p
            style={{
              flex:1, 
              fontSize: 12,
              lineClamp: 4,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              margin: 0,
              padding: 0,
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    );
  }

  renderPagination() {
    const total = this.props.data.length;
    const pages = Math.ceil(total / 4);

    if (pages === 1) {
      return <></>;
    }

    const pageButtons = Array(pages)
      .fill(undefined)
      .map((_: undefined, index: number) => {
        return (
          <button
            style={{
              flex: 0,
              aspectRatio: "1",
              height: 30,
              margin: "auto",
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: 4,
              border: "none",
              color: "white",
            }}
          >
            {index}
          </button>
        );
      });

    console.log("Page buttons?", pageButtons);

    return pageButtons;
  }

  render() {
    let offset = 4 * this.state.page;
    let getNextFour = this.props.data.slice(offset, offset + 4);

    const gapAmount = 32;

    return (
      <div className="list-container" style={{ paddingTop: gapAmount }}>
        <div
          className="list-content-container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: gapAmount,
            rowGap: gapAmount,
          }}
        >
          {getNextFour.map(this.renderContainer)}
        </div>
        <div
          className="list-pagination"
          style={{
            display: "flex",
            marginTop: gapAmount,
            justifyContent: "center",
          }}
        >
          {this.renderPagination()}
        </div>
      </div>
    );
  }
}

interface IProjectsProps {
  camera: any;
}
interface IProjectsState {
  selectedProject?: Project
}
class Projects extends React.Component<IProjectsProps, IProjectsState> {
  constructor(props: IProjectsProps) {
    super(props);

    this.state = {}

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
        <h1>▼</h1>
      </button>
    );
  }

  render() {


    return <>
      <div className="projects" style={{ flexDirection: "column", width: 550 }}>
        <div>
          <h1 style={{ flex: 1, textAlign: "center" }}>Projects</h1>
        </div>
        <div className="horizontal-divider-center" />

        <GridList></GridList>
      </div>
      <Transition
        in={this.state.selectedProject !== undefined}
        timeout={500}
        appear={true}
        unmountOnExit={true}
      >
        <OverlayProject project={{ image: '', title: 'hello world', description: 'description'}} />
      </Transition>
    </>
  }
}

export default withCamera(Projects);

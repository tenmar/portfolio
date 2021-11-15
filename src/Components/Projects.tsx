import React from "react";

import "./Projects.css";

import { withCamera } from "../Model";
import { Project } from "../Model/types";
import { OverlayProject } from ".";
import { Transition, TransitionStatus } from "react-transition-group";

import { AllProjects } from '../Model/projects'

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
    data: [],
    pageSize: 4,
    renderListItem: (item) => <div></div>
  };

  constructor(props: IGridListProps) {
    super(props);

    this.state = {
      page: 0,
    };
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
              backgroundColor: "black",
              padding: 4,
              border: "none",
              color: "white",
            }}>
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
      <div className='list-container' style={{ paddingTop: gapAmount }}>
        <div
          className='list-content-container'
          style={{
            columnGap: gapAmount,
            rowGap: gapAmount,
          }}>
          {getNextFour.map(this.props.renderListItem)}
        </div>
        <div
          className='list-pagination'
          style={{
            display: "flex",
            marginTop: gapAmount,
            justifyContent: "center",
          }}>
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
  projects: Project[];
  selectedProject: Project;
  overlayOpen: boolean;
}
class Projects extends React.Component<IProjectsProps, IProjectsState> {
  constructor(props: IProjectsProps) {
    super(props);

    this.state = {
      projects: AllProjects,
      selectedProject: AllProjects[0],
      overlayOpen: false
    };

    this.renderNav = this.renderNav.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
  }

  get Projects(): Project[] {
    return this.state.projects.sort((a, b) => a.date - b.date);
  }

  renderNav() {
    return (
      <button
        disabled={this.props.camera.isAtCenter()}
        className='back-button'
        onClick={(evt: any) => {
          this.props.camera.backToCenter();
        }}>
        <h1>▼</h1>
      </button>
    );
  }

  renderListItem(item: Project) {
    const imageSize = 100;

    const handleSelectItem: React.MouseEventHandler<any> = (event: React.MouseEvent<any>) => {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ selectedProject: item, overlayOpen: true });
      this.props.camera.toggleReturnButtonState();
    };


    return (
      <div
        className='list-item-container'
        style={{ display: "flex", maxHeight: imageSize, flexDirection: "row" }}
        onClick={handleSelectItem}
        key={item.title + item.date}>
        <img
          src={item.imageThumb}
          className='list-item-image'
          alt="Preview thumbnail of project."
          style={{
            height: imageSize,
            width: imageSize,
          }}
        />
        <div className='list-item-text' style={{ maxHeight: imageSize }}>
          <h2 style={{ flex: 0, fontSize: 18, lineHeight: "18px", margin: 0, marginTop: 2, padding: 0, marginBottom: 8 }}>
            {item.title}
          </h2>
          <p
            style={{
              flex: 1,
              fontSize: 12,
              lineClamp: 4,
              textOverflow: "ellipsis",
              overflow: "hidden",
              margin: 0,
              padding: 0,
            }}>
            {item.shortDescription}
          </p>
        </div>
      </div>
    );
  }

  render() {
    const handleOnClose: React.MouseEventHandler<any> = (event: React.MouseEvent<any>) => {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ overlayOpen: false }, () => this.props.camera.toggleReturnButtonState());
    };

    type AnimStyles = Record<TransitionStatus, React.CSSProperties>;

    const trans = `transform 500ms, opacity 500ms ease-in-out`;
    const animStylesOverlay: AnimStyles = {
      entering: {
        transform: `scale(1)`,
        opacity: 1,
      },
      entered: {
        transform: `scale(1)`,
        opacity: 1,
      },
      exiting: {
        transform: `scale(2)`,
        opacity: 0,
      },
      exited: {
        transform: `scale(2)`,
        opacity: 0,
        pointerEvents: "none",
      },
      unmounted: {
        transform: `scale(2)`,
        opacity: 0,
        pointerEvents: "none",
      },
    };
    const animStylesMainContent: AnimStyles = {
      entering: {
        transform: `scale(1)`,
        opacity: 1,
      },
      entered: {
        transform: `scale(1)`,
        opacity: 1,
      },
      exiting: {
        transform: `scale(0.5)`,
        opacity: 0,
      },
      exited: {
        transform: `scale(0.5)`,
        opacity: 0,
        pointerEvents: "none",
      },
      unmounted: {
        transform: `scale(0.5)`,
        opacity: 0,
        pointerEvents: "none",
      },
    };

    return (
      <>
        <Transition in={!this.state.overlayOpen} timeout={500} appear={false}>
          {(state) => (
            <div
              className='projects'
              style={{ flexDirection: "column", width: 550, transition: trans, ...animStylesMainContent[state] }}>
              <div>
                <h1 style={{ flex: 1, textAlign: "center" }}>Projects</h1>
              </div>
              <div className='horizontal-divider-center' />

              <GridList data={this.Projects} renderListItem={this.renderListItem}></GridList>
            </div>
          )}
        </Transition>
        <Transition in={this.state.overlayOpen} timeout={500}>
          <div className="projects-overlay-bg" />
        </Transition>
        <Transition in={this.state.overlayOpen} timeout={500} appear={false}>
          {(state) => (
            <OverlayProject
              style={{ zIndex: 20, transition: trans, ...animStylesOverlay[state] }}
              onClose={handleOnClose}
              project={this.state.selectedProject}
            />
          )}
        </Transition>
      </>
    );
  }
}

export default withCamera(Projects);

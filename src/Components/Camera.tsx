import React, { CSSProperties } from "react";
import "./Camera.css";

import { Transition, TransitionStatus } from "react-transition-group";

import { CameraPos, withCamera } from "../Model";

import { ReactComponent as TriangleLeftIcon } from "../Media/tri_left.svg";
import { ReactComponent as TriangleRightIcon } from "../Media/tri_right.svg";
import { ReactComponent as TriangleUpIcon } from "../Media/tri_up.svg";
import { ReactComponent as TriangleDownIcon } from "../Media/tri_down.svg";

interface ICameraProps {
  center?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  up?: React.ReactNode;
  down?: React.ReactNode;
  camera: any;
}

type AnimStyles = Record<TransitionStatus, React.CSSProperties>;

interface ICameraState {
  lastPosition: CameraPos;
  currentPosition: CameraPos;
  centerStyles: AnimStyles;
  bgStyles: AnimStyles;
  leftStyles: AnimStyles;
  rightStyles: AnimStyles;
  upStyles: AnimStyles;
  downStyles: AnimStyles;
}

const BASE_DURATION = 750;

function constructStates(
  amount: any,
  horizontal: boolean = true,
  duration: number = BASE_DURATION
): AnimStyles {
  const type = horizontal ? "X" : "Y";
  const trans = `transform ${duration}ms, opacity ${duration}ms ease-in-out`;
  return {
    entering: {
      transform: `translate${type}(0)`,
      opacity: 1,
      transition: trans,
    },
    entered: {
      transform: `translate${type}(0)`,
      opacity: 1,
      transition: trans,
    },
    exiting: {
      transform: `translate${type}(${amount})`,
      opacity: 0,
      transition: trans,
    },
    exited: {
      transform: `translate${type}(${amount})`,
      opacity: 0,
      transition: trans,
    },
    unmounted: { transform: `translate${type}(${amount})`, opacity: 0 },
  };
}

function getCenterClassStyles(from: CameraPos, to: CameraPos): AnimStyles {
  const isHorizontal =
    CameraPos.LEFT === to ||
    CameraPos.RIGHT === to ||
    CameraPos.LEFT === from ||
    CameraPos.RIGHT === from;
  const amount =
    CameraPos.LEFT === to ||
    CameraPos.UP === to ||
    CameraPos.LEFT === from ||
    CameraPos.UP === from
      ? `100%`
      : `-100%`;

  return constructStates(amount, isHorizontal);
}

function getBGClassStyle(
  from: CameraPos,
  to: CameraPos,
  duration: number = BASE_DURATION
): AnimStyles {
  const baseTranslate = `translateX(-32px) translateY(-32px)`;
  const transition = `transform ${duration}ms`;

  let y = -32;
  let x = -32;

  const offsetCheck = 10;

  if (to === CameraPos.LEFT || from === CameraPos.LEFT) {
    x = 0 + offsetCheck;
  } else if (to === CameraPos.RIGHT || from === CameraPos.RIGHT) {
    x = -(64 + offsetCheck);
  } else if (to === CameraPos.DOWN || from === CameraPos.DOWN) {
    y = -(64 + offsetCheck);
  } else if (to === CameraPos.UP || from === CameraPos.UP) {
    y = 0 + offsetCheck;
  }

  const exitTrans = `translateX(${x}px) translateY(${y}px)`;

  return {
    entering: { transform: baseTranslate, transition: transition },
    entered: { transform: baseTranslate, transition: transition },
    exiting: { transform: exitTrans, transition: transition },
    exited: { transform: exitTrans, transition: transition },
    unmounted: {},
  };
}

class Camera extends React.Component<ICameraProps, ICameraState> {
  bgRef: React.RefObject<any>;
  centerRef: React.RefObject<any>;
  leftRef: React.RefObject<any>;
  upRef: React.RefObject<any>;
  downRef: React.RefObject<any>;
  rightRef: React.RefObject<any>;
  controlRef: React.RefObject<any>;

  constructor(props: ICameraProps) {
    super(props);

    const defaultStyles = {
      entering: {},
      entered: {},
      exiting: {},
      exited: {},
      unmounted: {},
    };

    this.state = {
      lastPosition: CameraPos.CENTER,
      currentPosition: CameraPos.CENTER,
      centerStyles: defaultStyles,
      bgStyles: defaultStyles,
      leftStyles: defaultStyles,
      rightStyles: defaultStyles,
      upStyles: defaultStyles,
      downStyles: defaultStyles,
    };

    this.bgRef = React.createRef();
    this.centerRef = React.createRef();
    this.leftRef = React.createRef();
    this.upRef = React.createRef();
    this.downRef = React.createRef();
    this.rightRef = React.createRef();
    this.controlRef = React.createRef();

    this.checkPos = this.checkPos.bind(this);
    this.getControlStyle = this.getControlStyle.bind(this);

    this.renderReturnControl = this.renderReturnControl.bind(this);

    this.renderTransition = this.renderTransition.bind(this);
    this.renderDebugControls = this.renderDebugControls.bind(this);
    this.renderNav = this.renderNav.bind(this);
  }

  checkPos(pos: CameraPos) {
    const { currentPosition, lastPosition } = this.state;
    return currentPosition === pos || lastPosition === pos;
  }

  getControlStyle(
    transitionState: TransitionStatus,
    duration: number = BASE_DURATION / 2
  ): CSSProperties {
    const { currentPosition, lastPosition } = this.state;

    let style: CSSProperties = {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      display: "flex",
    };
    const offset = 32;

    if (this.checkPos(CameraPos.LEFT)) {
      style.right = offset;
      style.height = "100%";
    } else if (this.checkPos(CameraPos.RIGHT)) {
      style.left = offset;
      style.height = "100%";
    } else if (this.checkPos(CameraPos.DOWN)) {
      style.top = offset;
      style.width = "100%";
    } else if (this.checkPos(CameraPos.UP)) {
      style.bottom = offset;
      style.width = "100%";
    } else {
      console.log("Huh?? how did we get here", currentPosition, lastPosition);
    }

    const baseTrans = `all ${duration / 2}ms ease-in-out`;
    const enterTrans = `all ${duration}ms ease-in-out ${duration}ms`;

    const transitionStyle: Record<string, CSSProperties> = {
      entering: { opacity: 1, transition: enterTrans },
      entered: { opacity: 1, transition: enterTrans },
      exiting: { opacity: 0, transition: baseTrans },
      exited: { opacity: 0, transition: baseTrans },
      unmounted: { opacity: 0, transition: baseTrans },
    };
    return {
      ...transitionStyle[transitionState],
      ...style,
    };
  }

  renderReturnControl(transitionState: TransitionStatus) {
    let TriIcon = TriangleDownIcon;
    let style: CSSProperties = { marginTop: "4px" };
    if (this.checkPos(CameraPos.LEFT)) {
      TriIcon = TriangleRightIcon;
      style = { marginLeft: "4px" };
    } else if (this.checkPos(CameraPos.RIGHT)) {
      TriIcon = TriangleLeftIcon;
      style = { marginRight: "4px" };
    } else if (this.checkPos(CameraPos.DOWN)) {
      TriIcon = TriangleUpIcon;
      style = { marginBottom: "4px" };
    }

    let handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault();
      event.stopPropagation();
      this.props.camera.setCameraPos(CameraPos.CENTER);
    };

    return (
      <div
        ref={this.controlRef}
        style={{ ...this.getControlStyle(transitionState) }}
      >
        <button className="return-button" onClick={handleOnClick}>
          <TriIcon style={style} fill="black" />
        </button>
      </div>
    );
  }

  renderTransition(
    pos: CameraPos,
    child?: React.ReactNode,
    ref?: React.RefObject<any>
  ) {
    const { leftStyles, rightStyles, upStyles, downStyles, currentPosition } =
      this.state;

    const animationStyles =
      CameraPos.LEFT === pos
        ? leftStyles
        : CameraPos.RIGHT === pos
        ? rightStyles
        : CameraPos.UP === pos
        ? upStyles
        : downStyles;
    const baseStyle: React.CSSProperties = {};

    const defaultChild = (
      <div className="content">
        <h1 style={{ color: "white" }}>{CameraPos[pos]} Content</h1>
        {this.renderNav(CameraPos.CENTER)}
      </div>
    );

    return (
      <Transition
        nodeRef={ref}
        in={currentPosition === pos}
        timeout={500}
        appear={true}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {(state) => {
          return (
            <div
              ref={ref}
              className="container"
              style={{ ...baseStyle, ...animationStyles[state] }}
            >
              {child || defaultChild}
            </div>
          );
        }}
      </Transition>
    );
  }

  renderDecoration(
    state: TransitionStatus,
    duration: number = BASE_DURATION / 2
  ) {
    let isVertical =
      this.checkPos(CameraPos.UP) || this.checkPos(CameraPos.DOWN);

    let style: CSSProperties = {};
    if (isVertical) {
      style.width = "100%";
    } else {
      style.height = "100%";
    }

    let xEnter = 0;
    let yEnter = 0;
    let xExit = 0;
    let yExit = 0;

    const anchor: CSSProperties = {};

    if (this.checkPos(CameraPos.LEFT)) {
      // xEnter = -50
      xExit = -100;
      anchor.left = 0;
    } else if (this.checkPos(CameraPos.RIGHT)) {
      // xEnter = 50
      xExit = 100;
      anchor.right = 0;
    } else if (this.checkPos(CameraPos.DOWN)) {
      // yEnter = 50
      yExit = 100;
      anchor.bottom = 0;
    } else if (this.checkPos(CameraPos.UP)) {
      // yEnter = -50
      yExit = -100;
      anchor.left = 0;
    }

    const transform = `translateX(${xEnter}%) translateY(${yEnter}%)`;
    const transformExit = `translateX(${xExit}%) translateY(${yExit}%)`;
    const baseTrans = `all ${duration / 2}ms ease-out `;
    const enterTrans = `all ${duration}ms ease-out ${
      duration + duration / 2
    }ms`;

    const transitionStyle: Record<string, CSSProperties> = {
      entering: { transform: transform, transition: enterTrans, ...anchor },
      entered: { transform: transform, transition: enterTrans, ...anchor },
      exiting: { transform: transformExit, transition: baseTrans, ...anchor },
      exited: { transform: transformExit, transition: baseTrans, ...anchor },
      unmounted: { transform: transformExit, transition: baseTrans, ...anchor },
    };

    return <div style={transitionStyle[state]} />;

    // return (
    //   <div
    //     className="foreground-decoration"
    //     style={{
    //       position: "fixed",
    //       zIndex: 10,
    //       display: "flex",
    //       flexDirection: isHorizontal
    //         ? "column"
    //         : isVertical
    //         ? "row"
    //         : "column",
    //       ...style,
    //       ...transitionStyle[state],
    //     }}
    //   >
    //     <div
    //       style={{
    //         width: 400,
    //         height: 400,
    //         transform: "translateX(200px) translateY(-200px)",
    //         borderRadius: 200,
    //         backgroundColor: "black",
    //       }}
    //     />
    //     <div style={{ flex: 1 }} />
    //     <div style={{ flex: 1 }} />
    //     <div
    //       style={{
    //         width: 350,
    //         height: 350,
    //         borderRadius: 175,
    //         transform: "translateX(175px) translateY(175px)",
    //         backgroundColor: "black",
    //       }}
    //     />
    //   </div>
    // );
  }

  renderDebugControls(state: boolean = false) {
    if (!state) {
      return <></>;
    }

    return (
      <div style={{ position: "absolute", zIndex: 10 }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button className="debug" disabled />
          {this.renderNav(CameraPos.UP)}
          <button className="debug" disabled />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {this.renderNav(CameraPos.LEFT)}
          {this.renderNav(CameraPos.CENTER)}
          {this.renderNav(CameraPos.RIGHT)}
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button className="debug" disabled />
          {this.renderNav(CameraPos.DOWN)}
          <button className="debug" disabled />
        </div>
      </div>
    );
  }

  renderNav(pos: CameraPos) {
    const { currentPosition } = this.state;
    const atCenter = currentPosition === CameraPos.CENTER;

    return (
      <button
        disabled={pos === CameraPos.CENTER ? atCenter : !atCenter}
        onClick={(evt: any) => {
          this.props.camera.setCameraPos(pos);
        }}
      >
        {CameraPos[pos]}
      </button>
    );
  }

  render() {
    const { center, left, right, up, down } = this.props;

    const { bgStyles, centerStyles, currentPosition } = this.state;

    return (
      <div className="camera">
        <Transition
          nodeRef={this.bgRef}
          in={currentPosition === CameraPos.CENTER}
          unmountOnExit={false}
          timeout={BASE_DURATION}
        >
          {(state) => (
            <div ref={this.bgRef} className="bg-container">
              <div className="bg-back" style={{ ...bgStyles[state] }} />
              <div className="bg-front" style={{ ...bgStyles[state] }} />
            </div>
          )}
        </Transition>

        {this.renderDebugControls(false)}

        <Transition
          nodeRef={this.centerRef}
          in={currentPosition === CameraPos.CENTER}
          timeout={BASE_DURATION}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={false}
        >
          {(state) => (
            <div
              ref={this.centerRef}
              className="container"
              style={{ ...centerStyles[state] }}
            >
              {center}
            </div>
          )}
        </Transition>

        {this.renderTransition(CameraPos.LEFT, left, this.leftRef)}
        {this.renderTransition(CameraPos.UP, up, this.upRef)}
        {this.renderTransition(CameraPos.RIGHT, right, this.rightRef)}
        {this.renderTransition(CameraPos.DOWN, down, this.downRef)}

        <Transition
          nodeRef={this.controlRef}
          in={currentPosition !== CameraPos.CENTER && this.props.camera.shouldHideReturn === false}
          timeout={BASE_DURATION}
          appear={true}
          unmountOnExit={true}
        >
          {(state) => this.renderReturnControl(state)}
        </Transition>
      </div>
    );
  }

  static getDerivedStateFromProps(props: ICameraProps) {
    const { lastPosition, currentPosition } = props.camera;

    const centerStyles = getCenterClassStyles(lastPosition, currentPosition);
    const bgStyles = getBGClassStyle(lastPosition, currentPosition);

    const leftStyles = constructStates("-100%", true);
    const rightStyles = constructStates("100%", true);
    const upStyles = constructStates("-100%", false);
    const downStyles = constructStates("100%", false);

    return {
      lastPosition: lastPosition,
      currentPosition: currentPosition,
      centerStyles: centerStyles,
      bgStyles: bgStyles,
      leftStyles: leftStyles,
      rightStyles: rightStyles,
      upStyles: upStyles,
      downStyles: downStyles,
    };
  }
}

export default withCamera(Camera);

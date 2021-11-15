import React, { CSSProperties } from "react";

import "./Landing.css";

import { withCamera, CameraPos } from "../Model";

import { ReactComponent as GHLogo } from "../Media/github.svg";
import { ReactComponent as INLogo } from "../Media/linkedin.svg";
import { Transition, TransitionStatus } from "react-transition-group";

interface ILandingProps {
  camera: any;
}

interface ILandingState {
  hover: boolean;
  hoverPos: CameraPos;
}

const POINT_SIZE = 30;
const LINE_WIDTH = 2;

interface Point {
  x: number;
  y: number;
}

function ConstellationDebug({
  first,
  second,
  size = POINT_SIZE,
  length = POINT_SIZE,
}: {
  first: Point;
  second: Point;
  size?: number;
  length?: number;
}) {
  const x1 = first.x;
  const y1 = first.y;
  const x2 = second.x;
  const y2 = second.y;
  const rp = size / 2;
  const skew = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  return (
    <>
      <div
        style={{
          transform: `translate(${x1 + rp - 1}px, ${y1 + rp - 1}px) rotate(${skew}deg) scaleY(${length})`,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "yellow",
          height: 0,
          width: 0,
        }}
      />
      <div
        style={{
          transform: `translate(${x2 + rp - 1}px, ${y2 + rp - 1}px) rotate(${skew}deg) scaleX(${length})`,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "yellow",
          width: 0,
          height: 0,
        }}
      />
      <div
        style={{
          transform: `translate(${x2 + rp - 1}px, ${y2 + rp - 1}px) rotate(${skew}deg) scaleY(${length})`,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "yellow",
          height: 0,
          width: 0,
        }}
      />
      <div
        style={{
          transform: `translate(${x1 + rp - 1}px, ${y1 + rp - 1}px) rotate(${skew}deg) scaleX(${length})`,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "yellow",
          width: 0,
          height: 0,
        }}
      />
    </>
  );
}

function ConstellationPoint({ point, size = POINT_SIZE, children }: { point: Point; size?: number; children?: any }) {
  let style: React.CSSProperties = {
    transform: `translate(${point.x}px, ${point.y}px)`,
  };
  return <div style={{ ...style }}>{children}</div>;
}

function ConstellationLine({
  start,
  end,
  size = POINT_SIZE,
  width = LINE_WIDTH,
  debug = false,
}: {
  start: Point;
  end: Point;
  size?: number;
  width?: number;
  debug?: boolean;
}) {
  const x1 = start.x;
  const y1 = start.y;
  const x2 = end.x;
  const y2 = end.y;
  const rp = size / 2;

  const offset = 8;
  const xLen = Math.abs(x2 - x1);
  const yLen = Math.abs(y2 - y1);
  const lineLength = Math.sqrt(Math.pow(xLen, 2) + Math.pow(yLen, 2)) + width;
  const skew = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const leftright_style: React.CSSProperties = {
    height: width,
    width: lineLength - rp * 2 - offset * 2,
    borderRadius: width / 2,
    backgroundColor: "white",
    transformOrigin: `${width / 2}px ${width / 2}px`,
    transform: `translate(${x1 + rp - width / 2}px, ${y1 + rp - width / 2}px) rotate(${skew}deg) translate(${
      offset + rp
    }px, 0)`,
  };
  return (
    <>
      {debug ? <ConstellationDebug first={start} second={end} /> : null}
      <div className='line' style={{ ...leftright_style }} />
    </>
  );
}

class Landing extends React.Component<ILandingProps, ILandingState> {
  navLabelRef: React.RefObject<any>;

  constructor(props: ILandingProps) {
    super(props);

    this.state = {
      hover: false,
      hoverPos: CameraPos.CENTER,
    };

    this.navLabelRef = React.createRef();

    this.renderNav = this.renderNav.bind(this);
    this.renderNavInfo = this.renderNavInfo.bind(this);
  }

  renderNav(pos: CameraPos) {
    const { currentPosition } = this.props.camera;
    const atCenter = currentPosition === CameraPos.CENTER;

    const handleOnPointerOver: React.PointerEventHandler<HTMLButtonElement> = (
      evt: React.PointerEvent<HTMLButtonElement>
    ) => {
      this.setState({ hover: true, hoverPos: pos });
    };
    const handleOnPointerLeave: React.PointerEventHandler<HTMLButtonElement> = (
      evt: React.PointerEvent<HTMLButtonElement>
    ) => {
      this.setState({ hover: false });
    };
    const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (evt: React.MouseEvent<HTMLButtonElement>) => {
      this.props.camera.setCameraPos(pos);
    };

    const disable = pos === CameraPos.CENTER ? atCenter : !atCenter;

    return (
      <button
        className='btn'
        style={{
          width: `${POINT_SIZE}px`,
          height: `${POINT_SIZE}px`,
          borderRadius: `${POINT_SIZE / 2}px`,
        }}
        disabled={disable}
        onPointerOver={handleOnPointerOver}
        onPointerLeave={handleOnPointerLeave}
        onClick={handleOnClick}
      />
    );
  }

  renderNavInfo() {
    const navNames: Record<CameraPos, string> = {
      [CameraPos.CENTER]: "",
      [CameraPos.LEFT]: "Experience",
      [CameraPos.UP]: "Projects",
      [CameraPos.RIGHT]: "Skills",
      [CameraPos.DOWN]: "Credits",
    };

    const trans: string = `opacity 250ms ease-in-out`;
    const transitionStyle: Record<TransitionStatus, CSSProperties> = {
      entering: { opacity: 1, transition: trans },
      entered: { opacity: 1, transition: trans },
      exiting: { opacity: 0, transition: trans },
      exited: { opacity: 0, transition: trans },
      unmounted: { opacity: 0, transition: trans },
    };

    return (
      <Transition ref={this.navLabelRef} in={this.state.hover} timeout={250} unmountOnExit={false}>
        {(state) => (
          <div
            ref={this.navLabelRef}
            className='constellation'
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: 20,
              transition: trans,
              ...transitionStyle[state],
            }}>
            {navNames[this.state.hoverPos]}
          </div>
        )}
      </Transition>
    );
  }

  render() {
    const offset = 16;
    const min = 0 + offset;
    const max = 320 - POINT_SIZE - offset;
    const len = max - min;
    const mid = min + len / 2;

    const p1: Point = { x: min, y: mid };
    const p2: Point = { x: mid, y: min };
    const p3: Point = { x: max, y: mid };
    const p4: Point = { x: mid, y: max };

    return (
      <div className='landing-container'>
        <div className='landing-container-content'>
          <div className='col'>
            <div className='row'>
              <h1>
                Hi I'm <b className='highlight'>Tenma Rollins</b>,
              </h1>
            </div>
            <div className='row'>
              <h2>
                a <b>Software Engineer</b> from Washington
              </h2>
            </div>

            <div className='constellation' style={{ marginTop: 32 }}>
              {this.renderNavInfo()}
              <ConstellationLine start={p1} end={p2} />
              <ConstellationLine start={p2} end={p3} />
              <ConstellationLine start={p3} end={p4} />
              <ConstellationLine start={p4} end={p1} />
              <ConstellationPoint point={p1}>{this.renderNav(CameraPos.LEFT)}</ConstellationPoint>
              <ConstellationPoint point={p2}>{this.renderNav(CameraPos.UP)}</ConstellationPoint>
              <ConstellationPoint point={p3}>{this.renderNav(CameraPos.RIGHT)}</ConstellationPoint>
              <ConstellationPoint point={p4}>{this.renderNav(CameraPos.DOWN)}</ConstellationPoint>
            </div>
          </div>
        </div>

        <div className='links' style={{ flexDirection: "row", marginTop: 32, marginLeft: "auto" }}>
          <a href='https://github.com/tenmar' target='_blank' rel="noreferrer">
            <GHLogo style={{ height: POINT_SIZE }} fill='white' />
          </a>
          <a href='https://www.linkedin.com/in/tenmarollins/' target='_blank' rel="noreferrer">
            <INLogo style={{ height: POINT_SIZE, marginLeft: 8 }} fill='white' />
          </a>
        </div>
      </div>
    );
  }
}

/*
 */

export default withCamera(Landing);

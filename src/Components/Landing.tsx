import React from 'react'

import './Landing.css';

import { withCamera, CameraPos } from '../Model'

interface ILandingProps {
  camera: any
}

interface ILandingState {

}

const POINT_SIZE = 30;

interface Point {
  x: number,
  y: number
}


class Landing extends React.Component<ILandingProps, ILandingState> {
  constructor(props: ILandingProps) {
    super(props)

    this.state = {

    }

    this.renderNav = this.renderNav.bind(this)
  }

  renderNav(pos: CameraPos, title?: string) {
    const { lastPosition, currentPosition } = this.props.camera
    const atCenter = currentPosition === CameraPos.CENTER

    return <button style={{ width: `${POINT_SIZE}px`, height: `${POINT_SIZE}px`, borderRadius: `${POINT_SIZE/2}px` }} disabled={pos == CameraPos.CENTER ? atCenter : !atCenter} onClick={(evt: any) => { this.props.camera.setCameraPos(pos) }}>
        <div style={{ position: 'relative' }}>{title || CameraPos[pos]}</div>
      </button>
  }

  renderLine(p1: Point, p2: Point, lineSize: number = 4, size: number = POINT_SIZE) {
    const x1 = p1.x
    const y1 = p1.y
    const x2 = p2.x
    const y2 = p2.y
    const rp = size /2

    const offset = 0
    const xLen = Math.abs(x2 - x1)
    const yLen = Math.abs(y2 - y1)
    const lineLength = Math.sqrt(Math.pow(xLen, 2) + Math.pow(yLen, 2)) + lineSize
    const skew = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
    const leftright_style: React.CSSProperties = {
        height: lineSize,
        width: lineLength,
        borderRadius: lineSize*2,
        backgroundColor: 'green',
        transformOrigin: `${lineSize/2}px ${lineSize/2}px`,
        transform: `translate(${x1 + rp - lineSize/2}px, ${y1 + rp - lineSize/2}px) rotate(${skew}deg) translate(${offset}px, 0) scaleX(${(lineLength)/lineLength})`
    }

    return <div className='line' style={{...leftright_style}}/>
  }

  renderDebugOnPoints(p1: Point, p2: Point, size: number = POINT_SIZE / 2, length: number = POINT_SIZE / 2) {
    const x1 = p1.x
    const y1 = p1.y
    const x2 = p2.x
    const y2 = p2.y
    const rp = size
    const skew = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI

    return <>
      <div style={{ transform: `translate(${x1 + rp - 1}px, ${y1 + rp - 1}px) rotate(${skew}deg) scaleY(${length})`, borderWidth: 1, borderStyle: 'solid', borderColor: 'yellow', height: 0, width: 0 }} />
      <div style={{ transform: `translate(${x2 + rp - 1}px, ${y2 + rp - 1}px) rotate(${skew}deg) scaleX(${length})`, borderWidth: 1, borderStyle: 'solid', borderColor: 'yellow', width: 0, height: 0 }} />
      <div style={{ transform: `translate(${x2 + rp - 1}px, ${y2 + rp - 1}px) rotate(${skew}deg) scaleY(${length})`, borderWidth: 1, borderStyle: 'solid', borderColor: 'yellow', height: 0, width: 0 }} />
      <div style={{ transform: `translate(${x1 + rp - 1}px, ${y1 + rp - 1}px) rotate(${skew}deg) scaleX(${length})`, borderWidth: 1, borderStyle: 'solid', borderColor: 'yellow', width: 0, height: 0 }} />
    </>
  }


  render() {
    const p1: Point = { x: 10, y: 10 }
    const p2: Point = { x: 100, y: 100 }


    const left_style: React.CSSProperties = {
      transform: `translate(${p1.x}px, ${p1.y}px)`
    }

    const right_style: React.CSSProperties = {
      transform: `translate(${p2.x}px, ${p2.y}px)`
    }

    return <div className="landing-container">
      <div className="column">
        <div className="row"><h1>Hi I'm <b className="highlight">Tenma Rollins</b>,</h1></div>
        <div className="row"><h2>a <b>Software Engineer</b> from Washington</h2></div>


        <div className='constellation'>

          <div className="LEFT" style={{...left_style}} >{this.renderNav(CameraPos.LEFT, "Experience")}</div>
          <div className="RIGHT" style={{...right_style}} >{this.renderNav(CameraPos.RIGHT, "Skills")}</div>
          { this.renderDebugOnPoints(p1,p2)}
          { this.renderLine(p1,p2)}
        </div>
      </div>
    </div>
  }
}

/*
*/

export default withCamera(Landing)

import React from 'react';
import './Camera.css'

import { Transition, TransitionStatus } from 'react-transition-group'

import { CameraPos, withCamera } from '../Model'



interface ICameraProps {
  center?: React.ReactNode,
  left?: React.ReactNode,
  right?: React.ReactNode,
  up?: React.ReactNode,
  down?: React.ReactNode,
  camera: any
}

type AnimStyles = Record<TransitionStatus, React.CSSProperties>

interface ICameraState {
  lastPosition: CameraPos,
  currentPosition: CameraPos,
  centerStyles: AnimStyles
  bgStyles: AnimStyles,
  leftStyles: AnimStyles,
  rightStyles: AnimStyles,
  upStyles: AnimStyles,
  downStyles: AnimStyles,
}

const EXTRA_SIZE = 1000
const EXTRA_SIZE_HALF = EXTRA_SIZE / 2

function constructStates(amount: any, horizontal: boolean = true, duration: number = 500): AnimStyles {
  const type = horizontal ? 'X' : 'Y'
  return {
    entering: { transform: `translate${type}(0)`, transition: `transform ${duration}ms` },
    entered: { transform: `translate${type}(0)`, transition: `transform ${duration}ms`  },
    exiting: { transform: `translate${type}(${amount})`, transition: `transform ${duration}ms` },
    exited: { transform: `translate${type}(${amount})`, transition: `transform ${duration}ms`  },
    unmounted: { transform: `translate${type}(${amount})`  },
  }
}

function getCenterClassStyles(from: CameraPos, to: CameraPos): AnimStyles {
  const isHorizontal = CameraPos.LEFT === to || CameraPos.RIGHT === to || CameraPos.LEFT === from || CameraPos.RIGHT === from
  const amount = CameraPos.LEFT === to || CameraPos.UP === to || CameraPos.LEFT === from || CameraPos.UP === from ? `100%` : `-100%`

  return constructStates(amount, isHorizontal)
}

function getBGClassStyle(from: CameraPos, to: CameraPos): AnimStyles {
  const duration = 500
  const isHorizontal = CameraPos.LEFT === to || CameraPos.RIGHT === to || CameraPos.LEFT === from || CameraPos.RIGHT === from
  const offset = CameraPos.LEFT === to || CameraPos.UP === to || CameraPos.LEFT === from || CameraPos.UP === from ? EXTRA_SIZE_HALF : -EXTRA_SIZE_HALF


  const baseTranslate = `calc(50%)`
  const exitTranslateX = `calc(50% + ${isHorizontal ? offset : 0}px)`
  const exitTranslateY = `calc(50% + ${isHorizontal ? 0 : offset}px)`


  return {
    entering: { backgroundPositionX: baseTranslate, backgroundPositionY: baseTranslate, transition: `background-position ${duration}ms` },
    entered: { backgroundPositionX: baseTranslate, backgroundPositionY: baseTranslate, transition: `background-position ${duration}ms` },
    exiting: { backgroundPositionX: exitTranslateX, backgroundPositionY:  exitTranslateY, transition: `background-position ${duration}ms` },
    exited: { backgroundPositionX: exitTranslateX, backgroundPositionY:  exitTranslateY, transition: `background-position ${duration}ms` },
    unmounted: {  },
  }
}

class Camera extends React.Component<ICameraProps, ICameraState> {
  constructor(props: ICameraProps) {
    super(props)

    const defaultStyles = {
      entering: { },
      entered: { },
      exiting: { },
      exited: { },
      unmounted: { },
    }

    this.state = {
      lastPosition: CameraPos.CENTER,
      currentPosition: CameraPos.CENTER,
      centerStyles: defaultStyles,
      bgStyles: defaultStyles,
      leftStyles: defaultStyles,
      rightStyles: defaultStyles,
      upStyles: defaultStyles,
      downStyles: defaultStyles,
    }

    this.renderTransition = this.renderTransition.bind(this)
    this.renderDebugControls = this.renderDebugControls.bind(this)
    this.renderNav = this.renderNav.bind(this)
  }

  renderTransition(pos: CameraPos, child?: React.ReactNode) {
    const { leftStyles, rightStyles, upStyles, downStyles, lastPosition, currentPosition } = this.state

    const animationStyles = CameraPos.LEFT === pos ? leftStyles : CameraPos.RIGHT === pos ? rightStyles : CameraPos.UP === pos ? upStyles : downStyles
    const baseStyle: React.CSSProperties = {}


    const defaultChild = <div className="content">
      <h1 style={{ color: 'white' }}>{CameraPos[pos]} Content</h1>
      {this.renderNav(CameraPos.CENTER)}
    </div>


    return <Transition
      in={currentPosition === pos}
      timeout={500}
      appear={true}
      mountOnEnter={true}
      unmountOnExit={true}>
      {state => {
        console.log("Animating state:", state, " => ", animationStyles[state])
        return <div className="container" style={{ ...baseStyle, ...animationStyles[state] }}>
          {child || defaultChild}
        </div>
      }}
    </Transition>
  }

  renderDebugControls(state: boolean = false) {
    if (!state) { return <></>}

    return <div style={{ position: 'absolute', zIndex: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button disabled />
        {this.renderNav(CameraPos.UP)}
        <button disabled />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      {this.renderNav(CameraPos.LEFT)}
      {this.renderNav(CameraPos.CENTER)}
      {this.renderNav(CameraPos.RIGHT)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button disabled />
        {this.renderNav(CameraPos.DOWN)}
        <button disabled />
      </div>
    </div>
  }

  renderNav(pos: CameraPos) {
    const { lastPosition, currentPosition } = this.state
    const atCenter = currentPosition === CameraPos.CENTER

    return <button disabled={pos == CameraPos.CENTER ? atCenter : !atCenter } onClick={(evt: any) => {this.props.camera.setCameraPos(pos)}}>{CameraPos[pos]}</button>
  }

  render() {
    const { center, left, right, up, down, camera } = this.props

    const { bgStyles, centerStyles, lastPosition, currentPosition } = this.state

    return (
      <div className="camera">
        <Transition
          in={currentPosition === CameraPos.CENTER}
          timeout={500}>
          {state => <div className="bg" style={{  ...bgStyles[state] }} />}
        </Transition>

        {this.renderDebugControls(false)}

        <Transition
          in={currentPosition === CameraPos.CENTER}
          timeout={500}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}>
          {state => <div className="container" style={{ ...centerStyles[state] }}>
            {center}
          </div>}
        </Transition>
        {this.renderTransition(CameraPos.LEFT, left)}
        {this.renderTransition(CameraPos.UP, up)}
        {this.renderTransition(CameraPos.RIGHT, right)}
        {this.renderTransition(CameraPos.DOWN, down)}


      </div>
    );
  }


  static getDerivedStateFromProps(props: ICameraProps) {
    const { lastPosition, currentPosition } = props.camera

    const centerStyles = getCenterClassStyles(lastPosition, currentPosition)
    const bgStyles = getBGClassStyle(lastPosition, currentPosition)


    const leftStyles = constructStates('-100%', true)
    const rightStyles = constructStates('100%', true)
    const upStyles = constructStates('-100%', false)
    const downStyles = constructStates('100%', false)

    return {
      lastPosition: lastPosition,
      currentPosition: currentPosition,
      centerStyles: centerStyles,
      bgStyles: bgStyles,
      leftStyles: leftStyles,
      rightStyles: rightStyles,
      upStyles: upStyles,
      downStyles: downStyles
    }
  }
}

/**


<CSSTransition in={currentPos === CameraPos.LEFT} timeout={500} classNames='left' unmountOnExit>

</CSSTransition>

<CSSTransition in={currentPos === CameraPos.RIGHT} timeout={500} classNames='right' unmountOnExit>
  <div className='right' style={{ position: 'fixed',height: '100vh', width: '100vw',  flex: 1, backgroundColor: 'blue' }}>
    Position is {CameraPos.RIGHT}
  </div>
</CSSTransition>
*/
export default withCamera(Camera);

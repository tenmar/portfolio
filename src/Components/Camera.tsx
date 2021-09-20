import React from 'react';
import './Camera.css'

import { Transition, TransitionStatus } from 'react-transition-group'

import { CameraPos, withCamera, CameraState } from '../Model'

interface ICameraProps {
  center?: React.ReactNode,
  left?: React.ReactNode,
  right?: React.ReactNode,
  up?: React.ReactNode,
  down?: React.ReactNode,
  camera: CameraState
}

interface ICameraState {
  centerStyles: Record<TransitionStatus, React.CSSProperties>,
  bgStyles: Record<TransitionStatus, React.CSSProperties>,
  currentPos: CameraPos
}

const EXTRA_SIZE = 1000
const EXTRA_SIZE_HALF = EXTRA_SIZE / 2


class Camera extends React.Component<ICameraProps, ICameraState> {
  static defaultProps: Partial<ICameraProps> = {
    center: <div className="content">Center</div>,
    left: <div className="content">Left</div>,
    right: <div className="content">Right</div>,
    up: <div className="content">Up</div>,
    down: <div className="content">Down</div>,
  }

  constructor(props: ICameraProps) {
    super(props)

    const defaultStyles = {
      entering: {},
      entered: {},
      exiting: {},
      exited: {},
      unmounted: {},
    }

    this.state = {
      centerStyles: defaultStyles,
      bgStyles: defaultStyles,
      currentPos: CameraPos.CENTER
    }

    this.moveTo = this.moveTo.bind(this)
    this.constructStates = this.constructStates.bind(this)
    this.getBGClassStyle = this.getBGClassStyle.bind(this)
    this.getCenterClassStyles = this.getCenterClassStyles.bind(this)

    this.renderTransition = this.renderTransition.bind(this)
  }

  constructStates(amount: any, horizontal: boolean = true, duration: number = 500): Record<TransitionStatus, React.CSSProperties> {
    const type = horizontal ? 'X' : 'Y'
    return {
      entering: { transform: `translate${type}(0)`, transition: `transform ${duration}ms` },
      entered: { transform: `translate${type}(0)`, transition: `transform ${duration}ms` },
      exiting: { transform: `translate${type}(${amount})`, transition: `transform ${duration}ms` },
      exited: { transform: `translate${type}(${amount})`, transition: `transform ${duration}ms` },
      unmounted: {},
    }
  }

  getBGClassStyle(from: CameraPos, to: CameraPos): Record<TransitionStatus, React.CSSProperties> {
    const duration = 500
    const isHorizontal = CameraPos.LEFT === to || CameraPos.RIGHT === to || CameraPos.LEFT === from || CameraPos.RIGHT === from
    const offset = CameraPos.LEFT === to || CameraPos.UP === to || CameraPos.LEFT == from || CameraPos.UP == from ? EXTRA_SIZE_HALF : -EXTRA_SIZE_HALF


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

  getCenterClassStyles(from: CameraPos, to: CameraPos): Record<TransitionStatus, React.CSSProperties> {
    const isHorizontal = CameraPos.LEFT === to || CameraPos.RIGHT === to || CameraPos.LEFT === from || CameraPos.RIGHT === from
    const amount = CameraPos.LEFT === to || CameraPos.UP === to || CameraPos.LEFT == from || CameraPos.UP == from ? 'calc(100% + 32px)' : 'calc(-100% - 32px)'

    return this.constructStates(amount, isHorizontal)
  }

  renderTransition(pos: CameraPos, child: React.ReactNode) {
    const { currentPos } = this.state

    const isHorizontal = CameraPos.LEFT === pos || CameraPos.RIGHT === pos
    const amount = CameraPos.LEFT === pos || CameraPos.UP === pos ? 'calc(-100% - 32px)' : 'calc(100% + 32px)'
    const animationStyles = this.constructStates(amount, isHorizontal)

    const baseStyle: React.CSSProperties = {}

    return <Transition
      in={currentPos === pos}
      timeout={500}
      unmountOnExit>
      {state => <div className="container" style={{ ...baseStyle, ...animationStyles[state] }}>
        {child}
      </div>}
    </Transition>
  }

  render() {
    // const { centerStyles, bgStyles } = this.state

    const { center, left, right, up, down, lastPosition, currentPosition} = this.props

    const atCenter = currentPosition == CameraPos.CENTER

    const centerStyles = this.getCenterClassStyles(lastPosition, currentPosition)
    const bgStyles = this.getBGClassStyle(lastPosition, currentPosition)

    return (
      <div className="camera">
        <Transition
          in={currentPosition === CameraPos.CENTER}
          timeout={500}>
          {state => <div className="bg" style={{  ...bgStyles[state] }} />}
        </Transition>

        <div style={{ position: 'absolute', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button disabled />
            <button disabled={!atCenter} onClick={(evt: any) => { evt.preventDefault(); this.props.camera.setCameraPos(CameraPos.UP) }}>Up</button>
            <button disabled />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button disabled={!atCenter} onClick={(evt: any) => { evt.preventDefault(); this.props.camera.setCameraPos(CameraPos.LEFT) }}>Left</button>
            <button disabled={atCenter} onClick={(evt: any) => { evt.preventDefault(); this.props.camera.setCameraPos(CameraPos.CENTER) }}>Center</button>
            <button disabled={!atCenter} onClick={(evt: any) => { evt.preventDefault(); this.props.camera.setCameraPos(CameraPos.RIGHT) }}>Right</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button disabled />
            <button disabled={!atCenter} onClick={(evt: any) => { evt.preventDefault(); this.props.camera.setCameraPos(CameraPos.DOWN) }}>Down</button>
            <button disabled />
          </div>
        </div>

        <Transition
          in={currentPos === CameraPos.CENTER}
          timeout={500}
          unmountOnExit>
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

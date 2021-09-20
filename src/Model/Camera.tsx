// CounterContext.tsx
import React, { } from 'react';

export enum CameraPos {
  CENTER = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
  UP = 4,
}

// Declaring the state object globally.
export interface CameraState {
  lastPosition: CameraPos,
  currentPosition: CameraPos;
}

const initialCameraState: CameraState = {
  lastPosition: CameraPos.CENTER,
  currentPosition: CameraPos.CENTER
}

const cameraContextWrapper = (component?: React.Component) => ({
  ...initialCameraState,
  setCameraPos: (pos: CameraPos) => {
    const lastPos = initialCameraState.currentPosition
    initialCameraState.lastPosition = lastPos
    initialCameraState.currentPosition = pos
    component?.setState({ context: cameraContextWrapper(component) })
  },
});

type Context = ReturnType<typeof cameraContextWrapper>;

export const CameraContext = React.createContext<Context>(cameraContextWrapper());

export class CameraProvider extends React.Component {
  state: { context: Context } = {
    context: cameraContextWrapper(this),
  };

  render() {
    return (
      <CameraContext.Provider value={this.state.context}>
        {this.props.children}
      </CameraContext.Provider>
    );
  }
}

export function useCamera() {
    const context = React.useContext(CameraContext);
    return context || { error: "null context!"};
}

export function withCamera(ChildComponent: typeof React.Component) {
  return function contextComponent(props: any) {
    return <CameraContext.Consumer>
        {(context: any) => {
          return <ChildComponent {...props} camera={context} />
        }}
    </CameraContext.Consumer>
  }
}

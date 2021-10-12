import React from 'react'
import { Project } from '../Model'


interface IOverlayProjectsProps {
    project: Project
}

class OverlayProject extends React.PureComponent<IOverlayProjectsProps> {
    
    render() {
        return <div style={{ position: 'absolute', width: '100vw', height: '100vh', display: 'flex', opacity: 0.6, backgroundColor: 'rgb(100,100,120)' }}>
            <h1>Hello World, My Project</h1>
        </div>
    }
}

export default OverlayProject
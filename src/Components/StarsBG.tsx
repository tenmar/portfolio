import React, { Ref } from "react";
import { withCamera } from "../Model";

class Star extends Object {
  x: number;
  y: number;
  speedX: number;
  speedY: number;

  constructor() {
    super();

    this.x = Math.random();
    this.y = Math.random();

    this.speedX = 4 - Math.round(Math.random() * 8);
    this.speedY = 4 - Math.round(Math.random() * 8);
  }

  getXPos(width: number, frame: number) {
    return Math.round(this.x * width + this.speedX * frame);
  }

  getYPos(height: number, frame: number) {
    return Math.round(this.y * height + this.speedY * frame);
  }
}

class StarsBG extends React.Component {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private starsBack: Star[];
  private starsFront: Star[];
  private frame: number;

  constructor(props: any) {
    super(props);

    this.canvasRef = React.createRef<HTMLCanvasElement>();
    this.starsBack = [];
    this.starsFront = [];
    this.frame = 0;

    for (let i = 0; i < 100; i++) {
      let newStar = new Star();
      if (Math.random() < 0.4) {
        this.starsFront.push(newStar);
      } else {
        this.starsBack.push(newStar);
      }
    }

    this.draw = this.draw.bind(this);
  }

  get Canvas() {
    return this.canvasRef.current;
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    const canvas = this.Canvas;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const { width, height } = canvas;
    const currentFrame = this.frame;

    context.fillRect(0, 0, width, height);

    context.fillStyle = "#DDD";
    for (let s of this.starsBack) {
      const x = s.getXPos(width, currentFrame);
      const y = s.getYPos(height, currentFrame);
      context.fillRect(x, y, 1, 1);
    }

    context.fillStyle = "#FFF";
    for (let s of this.starsFront) {
      const x = s.getXPos(width, currentFrame);
      const y = s.getYPos(height, currentFrame);
      context.fillRect(x, y, 1, 1);
    }

    this.frame += 1;
  }

  render() {
    return (
      <canvas
        style={{ width: "100vw", height: "100vh" }}
        ref={this.canvasRef}
      />
    );
  }
}

export default withCamera(StarsBG);

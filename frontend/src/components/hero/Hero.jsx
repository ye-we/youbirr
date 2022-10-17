import { Link } from "react-router-dom";
import Sketch from "react-p5";
import { createNoise2D } from "simplex-noise";
import "./hero.css";

let dragging = false,
  minFrequency = 0.5,
  maxFrequency = 1,
  minAmplitude = 0.05,
  maxAmplitude = 0.5,
  canvasWidth,
  canvasHeight,
  amplitude,
  frequency;

const simplex = createNoise2D();
console.log(simplex(19, 30));

const setupHelper = function (p5) {
  canvasWidth = p5.windowWidth - 18;
  canvasHeight = p5.windowHeight - 50;
  p5.resizeCanvas(canvasWidth, canvasHeight);
  p5.mouseX = p5.windowWidth / 2;
  p5.mouseY = p5.windowHeight / 2;
};
export default function Hero() {
  const setup = (p5, canvasParentRef) => {
    setupHelper(p5);
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
  };
  const draw = (p5) => {
    p5.background(0);

    const frequency = p5.lerp(
      minFrequency,
      maxFrequency,
      (0.5 * p5.mouseX) / canvasHeight
    );
    const amplitude = p5.lerp(minAmplitude, maxAmplitude, 0.2);
    // console.log(canvasHeight, canvasWidth);
    // Draw the background
    p5.noFill();
    p5.stroke(p5.color("#feb301"));
    p5.strokeWeight(0.2);

    const time = p5.millis() / 1000;
    const rows = 8;

    // Draw each line
    for (let y = 0; y < rows; y++) {
      // Determine the Y position of the line
      const v = rows <= 1 ? 0.5 : y / (rows - 1);
      const py = v * canvasHeight;
      drawNoiseLine({
        v,
        start: [0, py],
        end: [canvasWidth, py],
        amplitude: amplitude * canvasHeight,
        frequency,
        time: time * 0.5,
        steps: 150,
        p5: p5,
      });
    }
  };
  function drawNoiseLine(opt = {}) {
    const {
      v,
      start,
      end,
      steps,
      frequency = 1,
      time = 0,
      amplitude = 1,
      p5,
    } = opt;

    const [xStart, yStart] = start;
    const [xEnd, yEnd] = end;

    // Create a line by walking N steps and interpolating
    // from start to end point at each interval
    p5.beginShape();
    for (let i = 0; i < steps; i++) {
      // Get interpolation factor between 0..1
      const t = steps <= 1 ? 0.5 : i / (steps - 1);

      // Interpolate X position
      const x = p5.lerp(xStart, xEnd, t);

      // Interpolate Y position
      let y = p5.lerp(yStart, yEnd, t);

      // Offset Y position by noise
      y += simplex(t * frequency + time, v * frequency, time) * amplitude;

      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();
  }
  const windowResize = (p5) => {
    setupHelper(p5);
  };
  return (
    <>
      <div className="introSketch">
        <Sketch setup={setup} draw={draw} windowResized={windowResize} />
      </div>
      <div className="intro">
        <div className="intro-content">
          <h1 className="intro-header">
            Make Money! <br />
            Value Creativity!
          </h1>
          <p className="intro-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
            Accusantium quas quisquam non? Quas voluptate nulla. Accusantium
            quas quisquam non? Quas voluptate nulla <br />
            minima deleniti optio Quas voluptate nulla.
          </p>
          <Link to="/getStarted" className="btn-yellow">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}

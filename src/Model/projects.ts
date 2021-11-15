import { Project } from './types'

import AsterioidsThumb from '../Media/project_asteroids_thumb.png'
import FractalsThumb from '../Media/project_fractals_thumb.png'
import CodeDay2017Thumb from '../Media/project_codeday2017_thumb.png'

import AsterioidsBG from '../Media/project_asteroids_bg.png';
import FractalsBG from '../Media/project_fractals_bg.png';
import CodeDay2017BG from '../Media/project_codeday2017_bg.png';

export function createProject(title: string = "", shortDesc: string = "", longDesc: string = "", date: number = 0, thumb: string = "", bg: string = ""): Project  {
    return {
        title: title,
        shortDescription: shortDesc,
        longDescription: longDesc,

        date: date || new Date().getTime(),

        imageThumb: thumb,
        imageBG: bg || thumb,
    };
};


export const AllProjects: Project[] = [
    createProject(
        "Fractals",
        "Visualization of the Mandelbrot Fractal at a static zoom level written in Javascript",
        "This project was one of my first explorations into coding back in high school. At the time, I was extremely fascinated by the structures of fractals, but I had no idea how I might generate or visualize them, so I decided to look into how I might do so using javascript. Definitely a project I want to revist and improve, perhaps with real-time manipulation of the domain/range space and the ability to change the iteration depth!",

        new Date(2013, 1, 1).getTime(),

        FractalsThumb,
        FractalsBG,
      ),
      createProject(
        "Asteroids",
        "Clone of the classic game Asteroids with collision and procedural generation written in Javascript.",
        "This was another early project which was made as an initial exploration into the world of game-dev. I've been into video games all my life, but in High School I think I was particularly fond of top down arcade games: shooters, rouge-lites, and so on. Though the original version of Asteroids was far before my time, I knew of it and decided it was simple enough to replicate as a hobby project.",

        new Date(2014, 1, 1).getTime(),
        
        AsterioidsThumb,
        AsterioidsBG
      ),
      createProject(
        "CodeDay2017",
        "Audio Visualization Web Project created for CodeDay Seattle 2017. Written in Javascript.",
        "Code Day Seattle in 2017 was my first ever Hackathon! It was a 24 hour anything-goes with impromptu teams and I collaborated with some CS undergrads from UW to create this demo of music visualizations inside a webpage. Going into this I had no knowledge whatsoever regarding audio stream data manipulation inside of a web app, nor did I have any real experience with audio visualization, but together with my team we were able to create this interesting demo! Not only that, but we also won an award for \"Best Application\"!",

        new Date(2017, 5, 20).getTime(),
        
        CodeDay2017Thumb,
        CodeDay2017BG
      ),
]
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
        "More info....",

        new Date(2013, 1, 1).getTime(),

        FractalsThumb,
        FractalsBG,
      ),
      createProject(
        "Asteroids",
        "Clone of the classic game Asteroids with collision and procedural generation written in Javascript.",
        "More info....",

        new Date(2014, 1, 1).getTime(),
        
        AsterioidsThumb,
        AsterioidsBG
      ),
      createProject(
        "CodeDay2017",
        "Audio Visualization Web Project createed for CodeDay Seattle 2017. Written in Javascript.",
        "More info....",
        new Date(2017, 5, 20).getTime(),
        CodeDay2017Thumb,
        CodeDay2017BG
      ),
      // createProject(
      //   "Tetris",
      //   "Clone of the class game Tetris written for TCSS 305 WI17. Written in ",
      //   new Date(2017, 3, 31).getTime()
      // ),
]
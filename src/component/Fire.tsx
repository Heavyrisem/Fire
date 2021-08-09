import React, { useEffect, useRef, useState } from "react";
import '../style/Fire.css';
import Particle from "./Particle";
import { randn_bm } from "./Utils";


interface Fire_P {
    MaxParticles: number
    Filter: string
}
function Fire(props: Fire_P) {
    const Canvas = useRef<HTMLCanvasElement>(null);
    // const [Particles, setParticles] = useState<Array<Particle>>([]);
    let Particles: Array<Particle> = [];
    let ReqFrame = -1;

    useEffect(() => {
        if (!Canvas.current) return console.log("errr");

        // for (let i = 0; i <= MaxParticles; i++) {
        //     let Pos = {x: randn_bm(Canvas.current.width / 6, Canvas.current.width / 6 * 5, 1), y: randn_bm(Canvas.current.height / 7 * 6, Canvas.current.height / 7, 2, 10)};
        //     Particles.push(new Particle(randn_bm(725, 2000, 1.3, 20), randn_bm(10, 150, .3), Pos, Math.random() * 360, Math.random() * 3 + 1))
        // }
        // console.log(Particles)
        if (ReqFrame >= 0) cancelAnimationFrame(ReqFrame);
        ReqFrame = requestAnimationFrame(Cycle);
        
        // setInterval(Cycle, 1000);
    }, [props]);

    function Cycle() {
        Calculate();
        Render();
        if (Particles.length) requestAnimationFrame(Cycle);
        else console.log("End")
    }

    function Calculate() {
        if (!Canvas.current) return;
        for (let i = 0; i < props.MaxParticles - Particles.length; i++) {
            // if (i >= 1) break;
            let Pos = {x: randn_bm(Canvas.current.width / 4, Canvas.current.width / 4 * 3, 1), y: randn_bm(Canvas.current.height / 7 * 6, Canvas.current.height / 7, 2.5, 10)};
            Particles.push(new Particle(randn_bm(725, 2000, 1.3, 20), randn_bm(10, 150, .3), Pos, Math.random() * 360, Math.random() * 3 + 1))
        }

        for (let i = 0; i < Particles.length; i++) {
            Particles[i].Update();
            if (Particles[i].size <= 0) Particles.splice(i, 1);
            // let P = Particles[i];

            // if ((P.size -= P.speed) <= 0) {
            //     Particles.splice(i, 1);
            //     P.y -= P.speed;
            //     P.temp -= P.speed * 10
            // } else Particles[i] = P;
        }
    }

    function Render() {
        if (!(Particles.length && Canvas.current)) return;

        let context = Canvas.current.getContext("2d") as CanvasRenderingContext2D;
        context.globalCompositeOperation = props.Filter;
        context.clearRect(0, 0, Canvas.current.width, Canvas.current.height);
        for (let i = 0; i < Particles.length; i++) {
            let P = Particles[i];
            
            context.save();
            context.beginPath();
            // context.arc(0, 0, 5, 0, 2 * Math.PI);
            // context.fillStyle = 'blue';
            // context.fill();
            
            
            context.translate(P.x + P.size/2, P.y + P.size/2);

            // context.font = '11px serif';
            // context.strokeStyle = 'white';
            // context.strokeText(P.color, 0, 0);

            context.rotate(P.rotate);
            context.translate((P.x + P.size/2) * -1, (P.y + P.size/2) * -1);
            
            // context.rect(P.x,P.y,P.size,P.size);
            context.moveTo(P.x, P.y);
            context.lineTo(P.x+P.size, P.y);
            context.lineTo(P.x+(P.size/2), P.y+(P.size/P.shape));
            

            context.fillStyle = P.color;
            context.shadowColor = P.color;
            context.shadowBlur = 5;

            context.fill();
            context.closePath();
            context.restore();
            // console.log(P);
        }
    }

    return (
        <canvas className="Fire" ref={Canvas} width={document.body.clientWidth} height={document.body.clientHeight}>

        </canvas>
    )
}

export default Fire;
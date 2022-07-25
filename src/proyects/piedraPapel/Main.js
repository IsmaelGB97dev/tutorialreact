import { useEffect, useState } from 'react';
import './style.css';

import piedra from './img/piedra.webp';
import papel from './img/papel.webp';
import tijera from './img/tijeras.webp';
import piedrafull from './img/piedrafull.webp';
import papelfull from './img/papelfull.webp';
import tijerafull from './img/tijerafull.webp';
import interrogacion from './img/interrogacion.webp';
import piedravstijera from './img/piedravstijera.webp';
import papelvspiedra from './img/papelvspiedra.webp';
import tijeravspapel from './img/tijeravspapel.webp';
import turnojugador from './audio/turnojugador.mp3';
import turnoenemigo from './audio/turnoenemigo.mp3';
import ganador from './audio/ganador.mp3';
import perdedor from './audio/perdedor.mp3';
import empate from './audio/empate.mp3';

const Main = () => {
    const [nombreJugador, setNombreJugador] = useState('Jugador1');
    const [puntos, setPuntos] = useState([0, 0]);
    const [turno, setTurno] = useState(true);
    const [seleccion, setSeleccion] = useState([null, null]);
    const [resultados, setResultados] = useState('');
    const items = [
        {nombre: 'piedra', foto: piedra, fotofull: piedrafull},
        {nombre: 'papel', foto: papel, fotofull: papelfull},
        {nombre: 'tijera', foto: tijera, fotofull: tijerafull}
    ];
    const fotowin = {
        'papelpiedra': papelvspiedra,
        'piedrapapel': papelvspiedra,
        'piedratijera': piedravstijera,
        'tijerapiedra': piedravstijera,
        'tijerapapel': tijeravspapel,
        'papeltijera': tijeravspapel
    };

    const hacerSeleccion = (e) => {
        playAudio('turnoenemigo');
        setTurno(!turno);
        setSeleccion([e.target.id, null]);

        let seleccionComputer = Math.floor(Math.random()*3);
        setTimeout(() => {
            setSeleccion([e.target.id, seleccionComputer.toString()]);
        }, 2000);
    };

    useEffect(() => {
        let nombre = prompt('Ingresa tu nombre:');
        nombre = (nombre === '') ? 'Jugador1' : nombre;
        setNombreJugador(nombre);
        playAudio('turnojugador');
    }, []);

    useEffect(() => {
        if(seleccion[0]!=null && seleccion[1] != null) {
            setTimeout(() => {
                const res = items[seleccion[0]].nombre + items[seleccion[1]].nombre;
                if(res === 'piedrapiedra' || res === 'papelpapel' || res === 'tijeratijera') {
                    setResultados(['', 'Es un empate', items[seleccion[0]].fotofull]);
                    playAudio('empate');
                } else {
                    if(res === 'piedratijera' || res === 'papelpiedra' || res === 'tijerapapel') {
                        setResultados([nombreJugador, 'Has sido el ganador', fotowin[res]]);
                        setPuntos([puntos[0]+1, puntos[1]]);
                        playAudio('ganador');
                    } else if(res === 'piedrapapel' || res === 'papeltijera' || res === 'tijerapiedra') {
                        setResultados(['Enemigo', 'Es el ganador', fotowin[res]]);
                        setPuntos([puntos[0], puntos[1]+1]);
                        playAudio('perdedor');
                    }
                }
            }, 2000);
        }
    }, [seleccion]);

    const continuar = () => {
        setResultados(['']);
        setSeleccion([null, null]);
        setTurno(true);
        playAudio('turnojugador');
    };

    const reiniciar = () => {
        continuar();
        setPuntos([0, 0]);
        setNombreJugador(prompt('Ingresa tu nombre: '));
        playAudio("turnojugador");
    };

    const playAudio = (audio) => {
        let file = '';
        switch(audio) {
            case 'turnojugador': file = turnojugador; break;
            case 'turnoenemigo': file = turnoenemigo; break;
            case 'ganador': file = ganador; break;
            case 'perdedor': file = perdedor; break;
            case 'empate': file = empate; break;
        }
        var sonido = new Audio(file);
        sonido.play();
    };

    return(
        <div className="contenedor">
            <div className="header">
                <h1>Piedra, Papel y Tijera</h1>
            </div>

            <div className='contenido'>
                <div className='puntaje'>
                    <div className='marcador'>
                        <h3>{nombreJugador}: {puntos[0]} Pts</h3>
                    </div>
                    <div className='marcador'>
                        <h3>Enemigo: {puntos[1]} Pts</h3>
                    </div>
                </div>

                <div className='instrucciones'>
                    <h3>{(turno ? nombreJugador : 'Enemigo')} es tú turno</h3>
                </div>

                <div className={`seleccion-item ${(!turno ? 'disabled' : '')}`}>
                    {
                        items.map((v, i) => {
                            return <img key={i} id={i} src={v.foto} alt={`Foto de item ${v.nombre}`} loading="lazy" width={60} height={60} onClick={hacerSeleccion} />;
                        })
                    }
                </div>

                <div className='versus'>
                    <div className='zona1'>
                        <img src={(seleccion[0]==null ? interrogacion : items[seleccion[0]].fotofull)} alt="Texto alternativo" loading='lazy' width={250} height={250} />
                    </div>
                    <div className='vs'>
                        <h3>VS</h3>
                    </div>
                    <div className='zona2'>
                        <img src={(seleccion[1]==null ? interrogacion : items[seleccion[1]].fotofull)} alt="Texto alternativo" loading='lazy' width={250} height={250} />
                    </div>
                </div>
            </div>
            <div className={`modal-resultados ${(resultados=='') ? 'ocultar' : 'mostrar-modal'}`}>
                <div className='all'>
                    <div className='head'>
                        <h2>Resultado</h2>
                    </div>
                    <div className='body'>
                        <h1>{resultados[0]}</h1>
                        <h2>{resultados[1]}</h2>
                        <img src={resultados[2]} alt="Foto del ganador" loading='lazy' width={200} height={200} />

                        <div className='buttons'>
                            <button onClick={continuar}>Continuar</button>
                            <button onClick={reiniciar}>Reiniciar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
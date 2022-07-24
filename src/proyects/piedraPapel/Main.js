import { useEffect, useState } from 'react';
import './style.css';

import piedra from './img/piedra.png';
import papel from './img/papel.png';
import tijera from './img/tijeras.png';
import piedrafull from './img/piedrafull.png';
import papelfull from './img/papelfull.png';
import tijerafull from './img/tijerafull.png';
import interrogacion from './img/interrogacion.png';


const Main = () => {
    const [nombreJugador, setNombreJugador] = useState('');
    const [puntos, setPuntos] = useState([0, 0]);
    const [turno, setTurno] = useState(true);
    const [seleccion, setSeleccion] = useState([null, null]);
    const [resultados, setResultados] = useState('');
    const items = [
        {nombre: 'piedra', foto: piedra, fotofull: piedrafull},
        {nombre: 'papel', foto: papel, fotofull: papelfull},
        {nombre: 'tijera', foto: tijera, fotofull: tijerafull}
    ];

    const hacerSeleccion = (e) => {
        setTurno(!turno);
        setSeleccion([e.target.id, null]);

        let seleccionComputer = Math.floor(Math.random()*3);
        setTimeout(() => {
            setSeleccion([e.target.id, seleccionComputer.toString()]);
            console.log('la computadora selecciono -> ' +  seleccionComputer);
        }, 2000);
    };

    useEffect(() => {
        setNombreJugador(prompt('Ingresa tu nombre:'));
    }, []);

    useEffect(() => {
        console.log('calculando');
        if(seleccion[0]!=null && seleccion[1] != null) {
            const res = items[seleccion[0]].nombre + items[seleccion[1]].nombre;
            if(res === 'piedrapiedra' || res === 'papelpapel' || res === 'tijeratijera') {
                setResultados(['', 'Es un empate', items[seleccion[0]].fotofull]);
            } else {
                setTimeout(() => {
                    if(res === 'piedratijera' || res === 'papelpiedra' || res === 'tijerapapel') {
                        setResultados([nombreJugador, 'Has sido el ganador', items[seleccion[0]].fotofull]);
                        setPuntos([puntos[0]+1, puntos[1]]);
                    } else if(res === 'piedrapapel' || res === 'papeltijera' || res === 'tijerapiedra') {
                        setResultados(['Computadora', 'Es la ganadora', items[seleccion[1]].fotofull]);
                        setPuntos([puntos[0], puntos[1]+1]);
                    }
                }, 2000);
            }
        }
    }, [seleccion]);

    const continuar = () => {
        setResultados(['']);
        setSeleccion([null, null]);
        setTurno(true);
    };

    const reiniciar = () => {
        continuar();
        setPuntos([0, 0]);
        setNombreJugador(prompt('Ingresa tu nombre: '));
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
                        <h3>Computadora: {puntos[1]} Pts</h3>
                    </div>
                </div>

                <div className='instrucciones'>
                    <h3>{(turno ? nombreJugador : 'Computadora')} es tú turno</h3>
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
                        {console.log(seleccion)}
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
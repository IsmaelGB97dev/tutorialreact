import { useEffect, useRef, useState } from 'react';
import './style.css';
import piedra from './img/piedra.png';
import papel from './img/papel.png';
import tijera from './img/tijeras.png';
import interrogacion from './img/interrogacion.png';
import piedrafull from './img/piedrafull.png';
import papelfull from './img/papelfull.png';
import tijerafull from './img/tijerafull.png';




const Header = () => {
    return(
        <div className='header'>
            <h1>Piedra, Papel y Tijera</h1>
        </div>
    );
};

const Puntajes = ({nombres, puntos}) => {
    console.log('Render puntajes');
    return(
        <div className="puntaje">
            <div>
                {nombres[0]}: {puntos[0]} pts
            </div>
            <div>
                <button>Reiniciar</button>
            </div>
            <div>
                {nombres[1]}: {puntos[0]} pts
            </div>
        </div>
    );
};

const Instrucciones = ({turno, nombres}) => {
    return(
        <div className='instruccion'>
            <h2>Jugador {(turno)?nombres[0]:nombres[1]} es tu turno</h2>
        </div>
    );
};

const Seleccion = ({turno, setTurno, seleccion, setSeleccion}) => {
    const [nombre, setNombre] = useState('...');

    const mostrarNombre = (e) => {
        setNombre(e.target.id);
    };
    const ocultarNombre = () => {
        setNombre('...');
    };

    const hacerSeleccion = (e) => {
        if(turno) {
            setSeleccion([e.target.id, '']);
        } else {
            setSeleccion([seleccion[0], e.target.id]);
        }
        setTurno(!turno);
    };
    


    return (
        <div className="seleccion">
            <h4>{nombre}</h4>
            <img id="Piedra" src={piedra} alt="Foto de piedra" loading='lazy' width="60" height="60" onMouseEnter={mostrarNombre} onMouseLeave={ocultarNombre} onClick={hacerSeleccion} />

            <img id="Papel" src={papel} alt="Foto de papel" loading='lazy' width="60" height="60" onMouseEnter={mostrarNombre} onMouseLeave={ocultarNombre} />

            <img id="Tijera" src={tijera} alt="Foto de tijera" loading='lazy' width="60" height="60" onMouseEnter={mostrarNombre} onMouseLeave={ocultarNombre} />
        </div>
    );
};

const Versus = () => {
    return (
        <div className='versus'>
            <img src={interrogacion} alt="Foto de piedra full" loading='lazy' width="250" />
        </div>
    );
};

const Escenario = ({turno, setTurno, seleccion, setSeleccion}) => {
    return(
        <div className='escenario'>
            <div className='zona1'>
                <Seleccion turno={turno} setTurno={setTurno} seleccion={seleccion} setSeleccion={setSeleccion} />
                <Versus seleccion={seleccion} />
            </div>
            <div className='vs'>
                <h2>VS</h2>
            </div>
            <div className='zona2'>
                <Seleccion />
                <Versus />
            </div>
        </div>
    );
};

const Main = () => {
    const [nombres, setNombres] = useState(['Jugador1', 'Computadora']);
    const [puntos, setPuntos] = useState([0, 0]);
    const [seleccion, setSeleccion] = useState([]);
    let [turno, setTurno] = useState(true);

    // useEffect(() => {
    //     let jugador = prompt('Ingresa tu nombre: ');
    //     setNombres([jugador, 'Computadora']);
    // }, []);


    return(
        <div className="contenedor">
            <Header />
            <Puntajes nombres={nombres} puntos={puntos}/>
            <Instrucciones turno={turno} nombres={nombres} />
            <Escenario turno={turno} setTurno={setTurno} seleccion={seleccion} setSeleccion={setSeleccion} />
        </div>
    );
};

export default Main;
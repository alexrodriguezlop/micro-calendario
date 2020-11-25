const Planner = require('../src/eventscalendar/planner');

module.exports = (req, res) => {
    // La fecha o el evento será introducido en la url
    // fecha por defecto = ''
    const { fecha = '' } = req.query;
    // El resultado que enviaremos finalmente
    let mensaje;
    if (fecha === '') {
        mensaje = 'Evento mal introducido (vacio).';
    }
    // El objeto tipo planner que usaremos para traducir
    // la fecha introducida por el usuario
    // Se convierte en tipo evento y hacemos toString
    const planner = new Planner();
    const evento = planner.translate(`${fecha}`);
    if (evento === null || evento === false) {
        mensaje = `Evento mal introducido.`;
    } else {
        // mensaje = evento.toString();
        const objetoJSON = {
            Fecha: `${evento.fecha.toString()}`,
            Motivo: `${evento.motivo.toString()}`,
        };
        mensaje = JSON.stringify(objetoJSON);
    }

    res.status(200).send(mensaje);
};

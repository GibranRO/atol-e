const app = document.getElementById('app');
const boton = document.getElementById('boton-iniciar');

const precioUnidad = 350;
const descuentoDosProductos = 0.10;
const descuentoCuatroProductos = 0.15;
const cantidadDeOpciones = 4;

const mensajeBienvenida = `¡Bienvenido a Atol-e!
La marca TechWear número 1 en México
¡Hoy hay promo especial, todo al mismo precio!

Precios:
- Por unidad $${precioUnidad}.
- Llevando 2 o más ${descuentoDosProductos * 100}% off.
- Llevando 4 o más ${descuentoCuatroProductos * 100}% off.

¿Qué te vas a llevar hoy?`;

const mensajeOpciones = `Artículos:

1.- Hoodie
2.- Playera
3.- Jogger
4.- Accesorio
`;


const mensajeProductos = `${mensajeOpciones} Ingresa los articulos que quieras comprar:`

const mensajePago = `Forma de pago:
1.- PayPal
2.- Crédito`;

const saludarUsuario = () => {
    alert (mensajeBienvenida);
};

const mostrarOpciones = () => {
    alert (mensajeOpciones);
};

const ingresarCantidad = () => {
    const cantidad = Number(parseInt(prompt('¿Cuántos productos vas a llevar?:')));
    return cantidad;
};

const verificarCantidadIngresada = (cantidad) => {
    return (cantidad <= 0 || cantidad === null || isNaN(cantidad)) ? 
        false : 
        true;
};

const solicitarCantidad = () => {
    let cantidad = ingresarCantidad();
    while (!verificarCantidadIngresada(cantidad)) {
        cantidad = ingresarCantidad();
    }
    return cantidad;
};

let pedidoUsuario = `Los productos que elegiste son:`;

const solicitarOpcion = (mensaje, cantidad) => {
    let opcion = Number(parseInt(prompt(`${mensaje}`)));
    while (!verificarOpcion(opcion, cantidad)) {
        opcion = Number(parseInt(prompt(`${mensaje}`)));
    }
    return opcion;
};

const verificarOpcion = (opcion, cantidadDeOpciones) => {
    return (opcion > 0 && opcion <= cantidadDeOpciones && opcion !== null && !isNaN(opcion)) ?
        true :
        false;
};

const ingresarArticulo = (articulo) => {
    pedidoUsuario += `
    - ${articulo}`;
};

const agregarOpcionAlPedido = (opcion) => {
    if (opcion === 1) {
        ingresarArticulo('Hoodie');
    } else if (opcion === 2) {
        ingresarArticulo('Playera');
    } else if (opcion === 3) {
        ingresarArticulo('Jogger');
    } else if (opcion === 4) {
        ingresarArticulo('Accesorio');
    }
};

const solicitarArticulos = (cantidad) => {
    let articulosSolicitados = 0;
    for (let i = 0; i < cantidad; i++) {
        let opcion = solicitarOpcion(mensajeProductos, cantidadDeOpciones);
        agregarOpcionAlPedido(opcion, pedidoUsuario);
        articulosSolicitados++;
    }
};

const calcularTotal = (cantidad) => {
    return cantidad * precioUnidad;
};

const aplicarDescuento = (total, promocion) => {
    const descuento = total * promocion;
    return total - descuento;
};

const calcularDescuentoCantidad = (cantidad, total) => {
    let totalAPagar = total;
    if (cantidad >= 2 && cantidad < 4) {
        totalAPagar = aplicarDescuento(total, descuentoDosProductos);
    } else if (cantidad >= 4) {
        totalAPagar = aplicarDescuento(total, descuentoCuatroProductos);
    }
    return totalAPagar;
};

const mostrarTotal = (cantidad) => {
    const total = calcularTotal(cantidad);
    alert(`Tu total es: $${total}. Tenemos dos formas de pago.`);
};

const procesarPagoPaypal = (total) => {
    alert(`Pago completo, tu total fue de $${total}`);
    console.log(`El pago final fue de: ${total}`);
};

const procesarPagoTarjeta = (total) => {
    alert(`Pago completo, tu total fue de $${total}`);
    console.log(`El pago final fue de: ${total}`);
};

const procesarPago = (total) => {
    const pagoElegido = solicitarOpcion(mensajePago, 2);
    if (pagoElegido === 1) {
        procesarPagoPaypal(total);
    } else {
        const pagoElegidoDos = solicitarOpcion(mensajePago, 4);
        (pagoElegidoDos === 2)
        procesarPagoTarjeta(total);
    }    
};

const finalizarPedido = () => {
    alert('¡Gracias por tu compra!')
};

const resetearPedido = () => {
    pedidoUsuario = `Los productos que elegiste son:`;
};

function ejecutarPrograma() {
    saludarUsuario();
    mostrarOpciones();
    const cantidad = solicitarCantidad();
    console.log('La cantidad ingresada fue de: ' + cantidad);
    solicitarArticulos(cantidad);
    console.log(pedidoUsuario);
    const totalSinDescuentos = calcularTotal(cantidad);
    console.log('El total sin descuentos es de: ' + totalSinDescuentos);
    const totalSegunCantidad = calcularDescuentoCantidad(cantidad, totalSinDescuentos);
    console.log('El total según la cantidad que lleva es: ' + totalSegunCantidad);
    mostrarTotal(cantidad);
    procesarPago(totalSegunCantidad);
    finalizarPedido();
    resetearPedido();
}

{
    ejecutarPrograma();
}

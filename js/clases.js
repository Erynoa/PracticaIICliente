class Producto
{
    #idProducto; // int
    #nombreProducto; // String
    #precioUnidad; // float
    #idCategoria; // int

    constructor(idProducto, nombreProducto, precioUnidad, idCategoria)
    {
        this.#idProducto = idProducto;
        this.#nombreProducto = nombreProducto;
        this.#precioUnidad = precioUnidad;
        this.#idCategoria = idCategoria;
    }

    get idProducto()
    {
        return this.#idProducto;
    }

    set idProducto(idProducto)
    {
        this.#idProducto = idProducto;
    }

    get nombreProducto()
    {
        return this.#nombreProducto;
    }

    set nombreProducto(nombreProducto)
    {
        this.#nombreProducto = nombreProducto;
    }

    get precioUnidad()
    {
        return this.#precioUnidad;
    }

    set precioUnidad(precioUnidad)
    {
        this.#precioUnidad = precioUnidad;
    }

    get idCategoria()
    {
        return this.#idCategoria;
    }

    set idCategoria(idCategoria)
    {
        this.#idCategoria = idCategoria;
    }

}

class Catalogo
{
    #productos;

    constructor()
    {
        this.#productos = [];
    }

    get productos()
    {
        return this.#productos;
    }

    set productos(productos)
    {
        this.#productos = productos;
    }

    addProducto(idProducto, nombreProducto, precioUnidad, idCategoria)
    {
        let oProducto = new Producto(idProducto, nombreProducto, precioUnidad, idCategoria);
        this.productos.push(oProducto);
    }

    obtieneProductosCategoria(idCategoria)
    {
        // Este método devuelve un array de productos según el id de la categoría recibido
        let productosADevolver = this.productos.filter((producto) => producto.idCategoria == idCategoria);
        return productosADevolver;
    }
    
}

class LineaCuenta
{
    #unidades; // int
    #idProducto; // int

    constructor(idProducto, unidades)
    {
        this.#unidades = unidades;
        this.#idProducto = idProducto;
    }

    get unidades()
    {
        return this.#unidades;
    }

    set unidades(unidades)
    {
        this.#unidades = unidades;
    }

    get idProducto()
    {
        return this.#idProducto;
    }

    set idProducto(idProducto)
    {
        this.#idProducto = idProducto;
    }

}

class Cuenta
{
    #mesa; // int
    #lineasDeCuenta; // array de lineas 
    //#pagada; // boolean

    constructor(mesa)
    {
        this.#mesa = mesa;
        this.#lineasDeCuenta = [];
    }

    get mesa()
    {
        return this.#mesa;
    }

    set mesa(mesa)
    {
        this.#mesa = mesa;
    }

    get lineasDeCuenta()
    {
        return this.#lineasDeCuenta;
    }

    set lineasDeCuenta(lineasDeCuenta)
    {
        this.#lineasDeCuenta = lineasDeCuenta;
    }
/*
    get pagada()
    {
        return this.#pagada;
    }

    set pagada(pagada)
    {
        this.#pagada = pagada;
    }
*/
    anadeLinea(lineaNueva)
    {
        this.lineasDeCuenta.push(lineaNueva);
    }

    
}

class Gestor
{
    #cuentas = [];
    #mesaActual; // int

    get cuentas()
    {
        return this.#cuentas;
    }

    set cuentas(cuentas)
    {
        this.#cuentas = cuentas;
    }

    get mesaActual()
    {
        return this.#mesaActual;
    }

    set mesaActual(mesaActual)
    {
        this.#mesaActual = mesaActual;
    }

    anadeCuenta(nuevaCuenta)
    {
        this.cuentas.push(nuevaCuenta);
    }

    hayCuenta(mesa)
    {
        let existeMesa =  this.cuentas.filter((cuenta) => cuenta.mesa == mesa).length == 1;
        return existeMesa;
    }

    recuperaCuenta(mesa)
    {
        let cuentaADevolver = this.cuentas.filter((cuenta) => cuenta.mesa == mesa)[0];
        return cuentaADevolver;
    }

    recuperaLinea(cuentaMesa, idProducto)
    {
        // Guarda la cuenta de la mesa
        let cuentaGuardada = this.recuperaCuenta(cuentaMesa.mesa);
        // Recorrer las lineas de la mesa y compararla con el idProducto recibido
        let linea = cuentaGuardada.lineasDeCuenta.filter((linea) => linea.idProducto == idProducto)[0];
        return linea;
    }

    eliminaLinea(cuenta, lineaRec)
    {
        let cuentaGuardada = this.recuperaCuenta(cuenta.mesa);
        let aux = cuentaGuardada.lineasDeCuenta.filter((linea) => linea.idProducto != lineaRec.idProducto);
        cuentaGuardada.lineasDeCuenta = aux;
    }

    eliminaCuenta(cuentaRecibida)
    {
        let aux = this.cuentas.filter((cuenta) => cuenta.mesa != cuentaRecibida.mesa);
        this.cuentas = aux;
    }
}
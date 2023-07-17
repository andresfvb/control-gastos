import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ( {presupuesto, gastos, setPresupuesto, setGastos,setIsValidPresupuesto} ) => {

    const [porcentaje, setPorcentaje] =useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)

        const totalDisponible = presupuesto - totalGastado
        // Calcular Porcentaje
        const nuevoPorcentaje = (( (presupuesto - totalDisponible ) / presupuesto) * 100).toFixed(2)
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }
    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gasto?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                value={porcentaje}
                maxValue = {100}
                text={`${porcentaje}% Gastado`}
                styles = {buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
                })}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className="reset-app" type="button" onClick={handleResetApp}>Resetear App</button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gatado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
import React from 'react';
import './ConvertPanel.css';
import Icon from '../../assets/Icon_white.svg';
import HeartIcon from '../../assets/Heart.svg';
import IconCross from '../../assets/Cross.svg';

function ConvertPanel() {

    const [valueNotConverted, setValueNotConverted] = React.useState(''); // La cantidad a convertir
    const [optionSelected, setOptionSelected] = React.useState(0); // Número opción seleccionada
    const [optionSelectedText, setOptionSelectedText] = React.useState(''); // Texto de la opción seleccionada
    const [result, setResult] = React.useState(''); // Resultado numérico de la conversión
    const [unit, setUnit] = React.useState(''); // Unidad a la que ha sido convertido.

    const optionMapping = {
        'km -> miles': 0,
        'miles -> km': 1,
        'ft -> m': 2,
        'm -> ft': 3,
        'cm -> p': 4,
        'p -> cm': 5,
    };

    // Función que se ejecuta después de cada pulsación de tecla
    const handleKeyPress = (newValue) => {
        console.log('Valor actualizado:', newValue);
        console.log('Option selected:', optionSelected);

        switch (optionSelected) {
            case 0:
                newValue = newValue / 1.60934;
                newValue = newValue.toFixed(2);
                console.log('Valor actualizado:', newValue);
                setOptionSelectedText('km');
                setUnit('miles');
                setResult(newValue);
                break;
            case 1:
                newValue = newValue * 1.60934;
                newValue = newValue.toFixed(2);
                console.log('Valor actualizado:', newValue);
                setOptionSelectedText('miles');
                setUnit('km');
                setResult(newValue);
                break;
            case 2:
                newValue = newValue / 3.28084;
                newValue = newValue.toFixed(2);
                console.log('Valor actualizado:', newValue);
                setOptionSelectedText('ft');
                setUnit('m');
                setResult(newValue);
                break;
            case 3:
                newValue = newValue * 3.28084;
                newValue = newValue.toFixed(2);
                console.log('Valor actualizado:', newValue);
                setOptionSelectedText('m');
                setUnit('ft');
                setResult(newValue);
                break;
            case 4:
                newValue = newValue / 2.54;
                newValue = newValue.toFixed(2);
                console.log('Valor actualizado:', newValue);
                setOptionSelectedText('cm');
                setUnit('p');
                setResult(newValue);
                break;
            case 5:
                newValue = newValue * 2.54;
                newValue = newValue.toFixed(2);
                console.log('Valor actualizado:', newValue);
                setOptionSelectedText('p');
                setUnit('cm');
                setResult(newValue);
                break;
        }


    };

    const handleClick = () => {
        setValueNotConverted(result); // Pone los km en el resultado
        setResult(valueNotConverted); // Pone las millas donde los km
        if (unit.valueOf() === 'miles') {
            setUnit('km');
            // Cambia el valor del select a 1
            setOptionSelected(1);
        } else if (unit.valueOf() === 'km') {
            setUnit('miles');
            setOptionSelected(0);
        } else if (unit.valueOf() === 'ft') {
            setUnit('m');
            setOptionSelected(2);
        } else if (unit.valueOf() === 'm') {
            setUnit('ft');
            setOptionSelected(3);
        } else if (unit.valueOf() === 'cm') {
            setUnit('p');
            setOptionSelected(4);
        } else if (unit.valueOf() === 'p') {
            setUnit('cm');
            setOptionSelected(5);
        }
        // setUnit(optionSelectedText); // Cambia millas por kilómetros

    }

    const favoriteHandleClick = () => {
        // Save in localStorage
        let nObjects = localStorage.length + 1;
        console.log(nObjects);
        localStorage.setItem("c" + nObjects, valueNotConverted + " " + optionSelectedText + " -> " + result + " " + unit);
        window.location.reload();
    }

    // Local Storage

    // Obtiene todo el contenido del localStorage
    const getAllLocalStorage = () => {
        const items = {...localStorage}; // Copia todo el localStorage a un objeto
        return items;
    };

    // Obtener los datos del localStorage
    const localStorageData = getAllLocalStorage();

    return (
        <div className="container">
            <div className="convertPanelBox">
                <div className="convertPanelBox-a">
                    <p>convert</p>
                </div>
                <div className="convertPanelBox-selects-container">
                    <div className="convertPanelBox-select-box">
                        <select
                            id="selectPanel"
                            className="select"
                            value={Object.keys(optionMapping)[optionSelected]} // Establece la opción seleccionada
                            onChange={(e) => {
                                const selectedOption = e.target.value; // Obtiene el texto de la opción seleccionada
                                const numericValue = optionMapping[selectedOption]; // Busca el número correspondiente
                                setOptionSelected(numericValue); // Actualiza el estado con el número
                                console.log('Option selected:', numericValue);
                                // handleKeyPress(valueNotConverted)
                            }}
                        >
                            {/* Genera las opciones dinámicamente */}
                            {Object.keys(optionMapping).map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="convertPanelBox-select-box-button">
                        <button onClick={handleClick}>
                            <img src={Icon} width="12" height="12"/>
                        </button>
                    </div>
                    <div className="convertPanelBox-select-box-input">
                        <input
                            type="number"
                            value={valueNotConverted}
                            onInput={(e) => {
                                const newValue = e.target.value;
                                setValueNotConverted(newValue); // Actualiza el estado
                                handleKeyPress(newValue); // Llama a la función después de cada cambio
                            }}
                        />
                    </div>
                    <div className="convertPanelBox-select-box-heartIcon">
                        <button onClick={favoriteHandleClick}>
                            <img src={HeartIcon} width="12" height="12"/>
                        </button>
                    </div>
                    <div className="convertPanelBox-select-box-result">
                        <a className="result">{result}</a>
                        <a className="resultUnit"> {unit}</a>
                    </div>
                </div>
            </div>
            <div className="saved-box">
                <div className="saved-text">
                    <p>Saved</p>
                </div>
                <div className="favorites">
                    {Object.keys(localStorageData).length === 0 ? (
                        <p>No favourite data.</p>
                    ) : (
                        <ul>
                            {Object.entries(localStorageData).map(([key, value], index) => (
                                <li key={index}>
                                    <strong>{value}</strong>
                                    <button onClick={() => {
                                        localStorage.removeItem(key);
                                        window.location.reload();
                                    }}>
                                        <img src={IconCross} width="12" height="12"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

        </div>
    );
}

export default ConvertPanel;
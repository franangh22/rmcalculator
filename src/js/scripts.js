window.onload = function () {

    document.addEventListener('keydown', function (e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'K'))) {
            console.log('Tecla de acceso directo de inspección detectada.');
            location.reload();
        }
    });
}

document.getElementById('rmForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const weightInput = document.getElementById('weight');
    const repsInput = document.getElementById('reps');


    if (weightInput.value.trim() === '' || repsInput.value.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const weight = parseFloat(weightInput.value);
    const reps = parseInt(repsInput.value);


    if (isNaN(weight) || isNaN(reps)) {
        alert('Por favor, ingresa valores numéricos válidos.');
        return;
    }


    if (weightInput.value.length > 20 || repsInput.value.length > 20) {
        alert('Los campos no pueden contener más de 20 caracteres.');
        return;
    }


    if (weight <= 0 || reps <= 0) {
        alert('Por favor, ingresa valores numéricos positivos.');
        return;
    }

    const oneRM = calculateOneRM(weight, reps);
    const roundedOneRM = Math.round(oneRM);

    const resultText = `Tu 1RM estimado es: ${oneRM.toFixed(2)} kg (normal)<br>
                        Tu 1RM estimado es: ${roundedOneRM} kg (redondeado)`;

    let equivalentRepsText = 'Con este peso, puedes realizar las siguientes repeticiones:<br>';
    for (let i = 2; i <= 15; i++) {
        const equivalentWeight = calculateEquivalentWeight(weight, i);
        equivalentRepsText += `${i} RM: ${equivalentWeight.toFixed(2)} kg<br>`;
    }

    document.getElementById('result').innerHTML = resultText + '<br>' + equivalentRepsText;
});

function calculateOneRM(weight, reps) {
    return weight / (1.0278 - (0.0278 * reps));
}

function calculateEquivalentWeight(weight, targetRM) {
    const brzyckiIndex = getBrzyckiIndex(targetRM);
    return weight * brzyckiIndex;
}

function getBrzyckiIndex(reps) {
    const brzyckiIndexValues = {
        2: 0.9722,
        3: 0.9444,
        4: 0.9166,
        5: 0.8888,
        6: 0.8610,
        7: 0.8332,
        8: 0.8054,
        9: 0.7776,
        10: 0.7498,
        11: 0.7220,
        12: 0.6942,
        13: 0.6664,
        14: 0.6386,
        15: 0.6108
    };

    return brzyckiIndexValues[reps] || 0;
}

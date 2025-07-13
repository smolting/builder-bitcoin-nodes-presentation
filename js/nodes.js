(function (document) {
    document.addEventListener("impress:substep:enter",
        function (event) {
            console.log("Substep entered:", event);
            if(event.detail.substep.id === 'miner-icons') {
                onMinerIconsEnter(event);
            }
            if(event.detail.substep.id === 'no-miners') {
                onNoMinersEnter(event);
            }
            if(event.detail.substep.id === 'centralized-bitcoin-beholder') {
                onCentralizedBitcoinBeholderEnter(event);
            }
            if(event.detail.substep.id === 'little-grumpies') {
                onLittleGrumpiesEnter(event);
            }
            if(event.detail.substep.id === 'first-tx-propagation') {
                const txAnimation = document.querySelector('#decentralized-bitcoin .traveling-transaction');
                txAnimation.style.display = 'none';
            }
            if(event.detail.substep.id === 'third-tx-propagation') {
                const txAnimation = document.querySelector('#decentralized-bitcoin #transaction-propagates-to-miners-2-3-4' );
                txAnimation.style.display = 'none';
            }
        },
    )
})(document, window);

function onMinerIconsEnter(event) {
    document.querySelector('#miner1').style.display = 'none';
    document.querySelector('#miner2').style.display = 'none';
    document.querySelector('#miner3').style.display = 'none';
    document.querySelector('#miner4').style.display = 'none';
}

function onNoMinersEnter(event) {
    console.log('No miners entered:', event);
    document.querySelectorAll('#centralized-bitcoin .miners').forEach(element => {
        console.log(element.style.display);
        element.style.display = 'none';
    });

    document.querySelectorAll('#centralized-bitcoin .miner-connection').forEach(element => { 
        element.style.display = 'none';
    });
}

function onCentralizedBitcoinBeholderEnter(event) {
    console.log('Centralized Bitcoin Beholder entered:', event);
    document.querySelector('#centralized-bitcoin #herecomes').style.display = 'none';
}

function onLittleGrumpiesEnter(event) {
    connectSpecificGrumpies('little-grumpy1', 'little-grumpy5');
    connectSpecificGrumpies('little-grumpy1', 'little-grumpy6');
    connectSpecificGrumpies('little-grumpy6', 'little-grumpy3');
    connectSpecificGrumpies('little-grumpy6', 'little-grumpy4');
    connectSpecificGrumpies('little-grumpy3', 'little-grumpy4');
    connectSpecificGrumpies('little-grumpy3', 'little-grumpy2');
    connectSpecificGrumpies('little-grumpy5', 'little-grumpy2');
    connectSpecificGrumpies('little-grumpy5', 'little-grumpy7');
    connectSpecificGrumpies('little-grumpy5', 'little-grumpy4');
    connectSpecificGrumpies('little-grumpy7', 'little-grumpy4');
}

function connectElements(parent, element1, element2) {
    // Get the relative positions of the two elements
    const pos1 = {
        top: element1.offsetTop + element1.offsetHeight / 2,
        left: element1.offsetLeft + element1.offsetWidth / 2
    };
    const pos2 = {
        top: element2.offsetTop + element2.offsetHeight / 2,
        left: element2.offsetLeft + element2.offsetWidth / 2
    };

    // Calculate the distance and angle between the two elements
    const deltaX = pos2.left - pos1.left;
    const deltaY = pos2.top - pos1.top;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Create the line element
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${distance}px`;
    line.style.height = '5px'; // Thin line
    line.style.backgroundColor = '#007bff'; // Line color
    line.style.top = `${pos1.top}px`;
    line.style.left = `${pos1.left}px`;
    line.style.transformOrigin = '0 0'; // Rotate from the start of the line
    line.style.transform = `rotate(${angle}deg)`;
    line.style.zIndex = '-999';

    // Append the line to the parent
    parent.appendChild(line);
}

function connectSpecificGrumpies(leftGrumpyId, rightGrumpyId) {
    const parent = document.getElementById('decentralized-bitcoin'); // Assuming both elements share the same parent
    const leftGrumpy = document.getElementById(leftGrumpyId);
    const rightGrumpy = document.getElementById(rightGrumpyId);

    if (parent && leftGrumpy && rightGrumpy) {
        connectElements(parent, leftGrumpy, rightGrumpy);
    } else {
        console.error('One or more elements could not be found.');
    }
}

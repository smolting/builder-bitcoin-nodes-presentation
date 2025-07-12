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
            // if(event.detail.substep.id === 'centralized-bitcoin-beholder') {
            //     onCentralizedBitcoinBeholderEnter(event);
            // }
            if(event.detail.substep.id === 'little-grumpies') {
                onLittleGrumpiesEnter(event);
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
    connectGrumpies();
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
    line.style.height = '2px'; // Thin line
    line.style.backgroundColor = 'red'; // Line color
    line.style.top = `${pos1.top}px`;
    line.style.left = `${pos1.left}px`;
    line.style.transformOrigin = '0 0'; // Rotate from the start of the line
    line.style.transform = `rotate(${angle}deg)`;
    line.style.zIndex = '-999';

    // Append the line to the parent
    parent.appendChild(line);
}

function connectGrumpies() {
    // 1. Find all elements that match the query ".little-grumpy"
    const iterGrumpies = document.querySelectorAll('.little-grumpy');
    const randomGrumpies = Array.from(iterGrumpies); // Copy the NodeList to an array

    // 2. Iterate over each element in iterGrumpies
    iterGrumpies.forEach(currentGrumpy => {
        // 3. Pick two random elements from randomGrumpies that aren't the same as the currentGrumpy
        const filteredGrumpies = randomGrumpies.filter(grumpy => grumpy !== currentGrumpy);
        if (filteredGrumpies.length < 2) return; // Ensure there are at least two other elements

        const randomIndex1 = Math.floor(Math.random() * filteredGrumpies.length);
        const randomElement1 = filteredGrumpies.splice(randomIndex1, 1)[0]; // Remove and get the first random element

        const randomIndex2 = Math.floor(Math.random() * filteredGrumpies.length);
        const randomElement2 = filteredGrumpies[randomIndex2]; // Get the second random element

        // 4. Draw lines connecting the currentGrumpy to the two random elements
        const parent = currentGrumpy.parentElement; // Assuming all grumpies share the same parent
        connectElements(parent, currentGrumpy, randomElement1);
        connectElements(parent, currentGrumpy, randomElement2);
    });
}

// Example usage:
// const parent = document.getElementById('decentralized-bitcoin');
// const element1 = document.getElementById('little-grumpy1');
// const element2 = document.getElementById('little-grumpy3');
// connectElements(parent, element1, element2);


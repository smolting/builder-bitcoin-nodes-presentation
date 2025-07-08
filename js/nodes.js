(function (document) {
    document.addEventListener("impress:substep:enter",
        function (event) {
            console.log("Substep entered:", event);
            if(event.detail.substep.id === 'miner-icons') {
                onMinerIconsEnter(event);
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
var beforeZoomInPauseDuration = 5000;
var afterZoomInPauseDuration = 4000;
var afterZoomOutPauseDuration = 4000;
var beforeZoomInAttractLoopTimeoutId = null;
var afterZoomInAttractLoopTimeoutId = null;
var afterZoomOutAttractLoopTimeoutId = null;
var attractLoopGigapanId = Number(fl_vars.gigapanID);
var attractLoopGigapanWidth = Number(fl_vars.width);
var attractLoopGigapanHeight = Number(fl_vars.height);
var panoViewerHeight = 400;
var snapshotRatio = (1 / 7);
var snapshotHeight = snapshotRatio * fl_vars.height;
var snapshotWidth = (3 / 2) * snapshotHeight;
var snapshotBandRatio = 0.5;
var snapshotBand = snapshotBandRatio * fl_vars.height;
var snapshotTopline = (0.5 - (0.5 * snapshotBandRatio)) * fl_vars.height;
var totalZooms = 3;
var numZooms = 0;
var ratio = (1 / (1 + totalZooms));
var snapshotLeft = numZooms * ratio * (fl_vars.width - snapshotWidth);
var snapshotTop = numZooms * ratio * (fl_vars.height - snapshotHeight);
var snapshotRight = snapshotLeft + snapshotWidth;
var snapshotBottom = snapshotTop + snapshotHeight;
launchAttractLoop();

function launchAttractLoop() {
    clearTimeout(beforeZoomInAttractLoopTimeoutId);
    beforeZoomInAttractLoopTimeoutId = setTimeout(doAttractLoopZoomIn, beforeZoomInPauseDuration);
}

function stopAutomaticZoom() {
    numZooms = totalZooms + 1;
}

function doAttractLoopZoomIn() {
    if (numZooms < totalZooms) {
        numZooms += 1;
        snapshotLeft = numZooms * ratio * (fl_vars.width - snapshotWidth);
        snapshotTop = snapshotTopline + (Math.random() * snapshotBand);
        snapshotRight = snapshotLeft + snapshotWidth;
        snapshotBottom = snapshotTop + snapshotHeight;
    }
    if (numZooms < totalZooms) {
        document.getElementById('flash_viewer').setViewBounds('launchAttractLoop()', snapshotLeft, snapshotTop, snapshotRight, snapshotBottom);
    } else if (numZooms == totalZooms) {
        document.getElementById('flash_viewer').setViewBounds('afterAttractLoopZoomIn()', snapshotLeft, snapshotTop, snapshotRight, snapshotBottom);
    }
}

function afterAttractLoopZoomIn() {
    clearTimeout(afterZoomInAttractLoopTimeoutId);
    afterZoomInAttractLoopTimeoutId = setTimeout(doAttractLoopZoomOut, afterZoomInPauseDuration);
}

function doAttractLoopZoomOut() {
    document.getElementById('flash_viewer').setViewBounds('afterAttractLoopZoomOut', 0, 0, attractLoopGigapanWidth, attractLoopGigapanHeight);
}

function afterAttractLoopZoomOut() {
    clearTimeout(afterZoomOutAttractLoopTimeoutId);
}

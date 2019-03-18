var color1, color2, color3, grey;
var colorWheelCtx;
var diameter = 512;

function updateColorWheel() {
    colorWheelCtx.clearRect(0, 0, diameter, diameter);
    var c1 = color1.value;
    var c2 = color2.value;
    var c3 = color3.value;
    var g = grey.value;
    // Primaries
    drawColorString(colorWheelCtx, c1, g, 0);
    drawColorString(colorWheelCtx, c2, g, 120);
    drawColorString(colorWheelCtx, c3, g, 240);
    // Secondaries
    var c12 = chroma.mix(c1, c2, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, c12, g, 60);
    var c23 = chroma.mix(c2, c3, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, c23, g, 180);
    var c31 = chroma.mix(c3, c1, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, c31, g, 300);
    // Tertiaries
    var c112 = chroma.mix(c1, c12, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, c112, g, 30);
    var c122 = chroma.mix(c12, c2, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, c122, g, 90);
    var c223 = chroma.mix(c2, c23, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, c223, g, 150);
    var c233 = chroma.mix(c23, c3, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, c233, g, 210);
    var c331 = chroma.mix(c3, c31, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, c331, g, 270);
    var c311 = chroma.mix(c31, c1, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, c311, g, 330);
    // Central grey
    colorWheelCtx.fillStyle = g;
    colorWheelCtx.beginPath();
    colorWheelCtx.moveTo(diameter / 2, diameter / 2);
    colorWheelCtx.arc(diameter / 2, diameter / 2, (diameter * 0.9 / 20), 0, Math.PI * 2, true);
    colorWheelCtx.fill();
    colorWheelCtx.closePath();
}

function drawColorString(ctx, color, grey, degrees) {
    ctx.save();
    var radians = (degrees - 15 - 60) * (Math.PI / 180);
    ctx.translate(diameter / 2, diameter / 2);
    ctx.rotate(radians);

    var endAngle = 330 * (Math.PI / 180);
    for (var i = 11; i > 1; i--) {
        var c = chroma.mix(grey, color, (i - 1) / 10);
        ctx.fillStyle = c.hex();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, (diameter * 0.9 / 20) * i, 0, endAngle, true);
        ctx.fill();
        ctx.closePath();
    }
    ctx.restore();
}

function init() {
    color1 = document.getElementById("c1");
    color2 = document.getElementById("c2");
    color3 = document.getElementById("c3");
    grey = document.getElementById("c4");

    color1.addEventListener("change", function() { updateColorWheel(); }, false);
    color2.addEventListener("change", function() { updateColorWheel(); }, false);
    color3.addEventListener("change", function() { updateColorWheel(); }, false);
    grey.addEventListener("change", function() { updateColorWheel(); }, false);

    colorWheelCtx = document.getElementById("colorWheelCtx").getContext("2d");

    updateColorWheel();
}

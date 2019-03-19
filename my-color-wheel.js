var color1, color2, color3, color4, color5, color6, grey;
var colorWheelCtx;
var diameter = 512;

function updateColorWheel() {
    colorWheelCtx.clearRect(0, 0, diameter, diameter);
    var y = color1.value;
    var m = color2.value;
    var c = color3.value;
    var r = color4.value;
    var g = color5.value;
    var b = color6.value;
    var neutral = grey.value;
    // CMY
    drawColorString(colorWheelCtx, y, neutral, 0);
    drawColorString(colorWheelCtx, m, neutral, 120);
    drawColorString(colorWheelCtx, c, neutral, 240);
    // RGB
    drawColorString(colorWheelCtx, r, neutral, 60);
    drawColorString(colorWheelCtx, b, neutral, 180);
    drawColorString(colorWheelCtx, g, neutral, 300);
    // Secondaries
    var yr = chroma.mix(y, r, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, yr, neutral, 30);
    var rm = chroma.mix(r, m, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, rm, neutral, 90);
    var mb = chroma.mix(m, b, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, mb, neutral, 150);
    var bc = chroma.mix(b, c, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, bc, neutral, 210);
    var cg = chroma.mix(c, g, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, cg, neutral, 270);
    var gy = chroma.mix(g, y, 0.5, "lch").hex();
    drawColorString(colorWheelCtx, gy, neutral, 330);
    // Central grey
    colorWheelCtx.fillStyle = neutral;
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
    color4 = document.getElementById("c4");
    color5 = document.getElementById("c5");
    color6 = document.getElementById("c6");
    grey = document.getElementById("grey");

    color1.addEventListener("change", function() { updateColorWheel(); }, false);
    color2.addEventListener("change", function() { updateColorWheel(); }, false);
    color3.addEventListener("change", function() { updateColorWheel(); }, false);
    grey.addEventListener("change", function() { updateColorWheel(); }, false);

    colorWheelCtx = document.getElementById("colorWheelCtx").getContext("2d");

    updateColorWheel();
}

function download() {
    var download = document.getElementById("download");
    var img = document.getElementById("colorWheelCtx").toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
    download.setAttribute("href", img);
}

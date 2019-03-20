var color1, color2, color3, color4, color5, color6, grey;
var colorWheelCtx;
var valueCount;
var colorMode;
var valueMode;
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
    var values = parseInt(valueCount.value);
    values = values || 5;
    var mode = colorMode.value;
    // CMY
    drawColorString(colorWheelCtx, y, neutral, 0, values);
    drawColorString(colorWheelCtx, m, neutral, 120, values);
    drawColorString(colorWheelCtx, c, neutral, 240, values);
    // RGB
    drawColorString(colorWheelCtx, r, neutral, 60, values);
    drawColorString(colorWheelCtx, b, neutral, 180, values);
    drawColorString(colorWheelCtx, g, neutral, 300, values);
    // Secondaries
    var yr = chroma.mix(y, r, 0.5, mode).hex();
    drawColorString(colorWheelCtx, yr, neutral, 30, values);
    var rm = chroma.mix(r, m, 0.5, mode).hex();
    drawColorString(colorWheelCtx, rm, neutral, 90, values);
    var mb = chroma.mix(m, b, 0.5, mode).hex();
    drawColorString(colorWheelCtx, mb, neutral, 150, values);
    var bc = chroma.mix(b, c, 0.5, mode).hex();
    drawColorString(colorWheelCtx, bc, neutral, 210, values);
    var cg = chroma.mix(c, g, 0.5, mode).hex();
    drawColorString(colorWheelCtx, cg, neutral, 270, values);
    var gy = chroma.mix(g, y, 0.5, mode).hex();
    drawColorString(colorWheelCtx, gy, neutral, 330, values);
}

function drawColorString(ctx, color, grey, degrees, values) {
    ctx.save();
    var radians = (degrees - 15 - 60) * (Math.PI / 180);
    ctx.translate(diameter / 2, diameter / 2);
    ctx.rotate(radians);

    var endAngle = 330 * (Math.PI / 180);
    for (var i = values; i >= 0; i--) {
        var c = chroma.mix(grey, color, i / values, valueMode.value);
        ctx.fillStyle = c.hex();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, (diameter / 2) * (i + 1) / (values + 1), 0, endAngle, true);
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
    valueCount = document.getElementById("valueCount");
    colorMode = document.getElementById("colorMode");
    valueMode = document.getElementById("valueMode");

    color1.addEventListener("change", function() { updateColorWheel(); }, false);
    color2.addEventListener("change", function() { updateColorWheel(); }, false);
    color3.addEventListener("change", function() { updateColorWheel(); }, false);
    color4.addEventListener("change", function() { updateColorWheel(); }, false);
    color5.addEventListener("change", function() { updateColorWheel(); }, false);
    color6.addEventListener("change", function() { updateColorWheel(); }, false);
    grey.addEventListener("change", function() { updateColorWheel(); }, false);
    colorMode.addEventListener("change", function() { updateColorWheel(); }, false);
    valueMode.addEventListener("change", function() { updateColorWheel(); }, false);
    valueCount.addEventListener("change"
        , function() {
            var parsed = parseInt(valueCount.value);
            if (!parsed || parsed < 2 || parsed > 512) {
                valueCount.value = 2;
            }
            updateColorWheel();
        }
        , false);

    colorWheelCtx = document.getElementById("colorWheelCtx").getContext("2d");

    updateColorWheel();
}

function download() {
    var download = document.getElementById("download");
    var img = document.getElementById("colorWheelCtx").toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
    download.setAttribute("href", img);
}

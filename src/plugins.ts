import cursorImg from "../src/assets/images/all-img/cursor.png";
export const chartPlugins = [
  {
    id: "center-text-plugin",
    beforeDraw: function (chart) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 180).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#ffffff";
      var text = "Итого",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2 - 15;
      ctx.fillText(text, textX, textY);
      var fontSizeSmall = (height / 300).toFixed(2);
      ctx.font = fontSizeSmall + "em sans-serif";
      ctx.textBaseline = "bottom";
      var textSmall = "за период",
        textXSmall = Math.round((width - ctx.measureText(textSmall).width) / 2),
        textYSmall = height / 2 + (window.innerWidth <= 768 ? 20 : 45);
      ctx.fillText(textSmall, textXSmall, textYSmall);
      ctx.save();
    },
  },
  {
    id: "emptyDoughnut",
    afterDraw(chart, args, options) {
      const { datasets } = chart.data;
      const { radiusDecrease } = options;

      let hasData = false;
      for (let i = 0; i < datasets.length; i += 1) {
        const dataset = datasets[i];
        hasData = hasData || dataset.data.some((value) => value !== 0);
      }

      if (!hasData) {
        const {
          chartArea: { left, top, right, bottom },
          ctx,
        } = chart;
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;
        const r = Math.min(right - left, bottom - top) / 2;
        const scaleFactor = 0.75;

        ctx.beginPath();
        ctx.lineWidth = 30;
        ctx.strokeStyle = "#202020";
        ctx.arc(
          centerX,
          centerY,
          (r - (radiusDecrease || 0)) * scaleFactor,
          0,
          2 * Math.PI,
        );
        ctx.stroke();
      }
    },
  },
  {
    id: "hover-lineWidth",
    afterEvent(chart, args) {
      const { event } = args;
      const {
        ctx,
        chartArea: { left, top, right, bottom },
      } = chart;
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;
      const r = Math.min(right - left, bottom - top) / 2;
      const scaleFactor = 0.75;
      const x = event.x;
      const y = event.y;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const isHovering =
        window.innerWidth <= 768 ? 0 : distance < (r - 0) * scaleFactor;

      const canvas = chart.canvas;
      const data = chart.data.datasets[0].data;
      const isEmpty = data[0] === 0 && data[1] === 0;

      canvas.style.cursor = `url(${cursorImg}), auto`;

      if (isHovering && isEmpty) {
        ctx.beginPath();
        ctx.lineWidth = 61;
        ctx.strokeStyle = "#202020";
        ctx.arc(centerX, centerY, (r - 0) * scaleFactor, 0, 2 * Math.PI);
        ctx.stroke();
      } else {
        chart.draw();
        // canvas.style.cursor = "default";
      }
    },
  },
];

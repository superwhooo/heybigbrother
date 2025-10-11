document.addEventListener("DOMContentLoaded", () => {
  const widget = document.createElement('div');
  widget.innerHTML = `
    <div id="bb-widget">
      <div class="bb-heartbeat"></div>
      <div class="bb-icon">BB</div>
    </div>
  `;
  document.body.appendChild(widget);

  const bbWidget = document.getElementById('bb-widget');
  bbWidget.addEventListener('click', () => {
    alert('BIG BROTHER: Safety pulse active. Opening dashboard...');
    // Future: trigger embedded mini-dashboard / panic / guardian
  });
});

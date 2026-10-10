(function () {
  "use strict";
  var panels = document.querySelectorAll("[data-vertex-signs]");
  Array.prototype.forEach.call(panels, function (panel) {
    var measuredSigns = [-1, 1, -1, 1];
    var endpoints = [[0, 1], [1, 2], [2, 3], [3, 0]];
    var edges = [0, 0, 0, 0];
    var edgeNames = ["AB", "BC", "CD", "DA"];
    var vertexNames = ["A", "B", "C", "D"];
    var feedback = panel.querySelector("[data-sign-feedback]");

    function update() {
      var signs = measuredSigns.slice();
      var selectedEdges = [];
      edges.forEach(function (chosen, edge) {
        if (chosen) {
          signs[endpoints[edge][0]] *= -1;
          signs[endpoints[edge][1]] *= -1;
          selectedEdges.push(edgeNames[edge]);
        }
        panel.querySelector("[data-edge='" + edge + "']").setAttribute("aria-pressed", chosen ? "true" : "false");
        panel.querySelector("[data-line='" + edge + "']").setAttribute("class", chosen ? "chosen" : "");
      });
      var negativeCount = 0;
      signs.forEach(function (sign, vertex) {
        var symbol = sign === 1 ? "+1" : "−1";
        panel.querySelector("[data-sign='" + vertex + "']").textContent = symbol;
        panel.querySelector("[data-circle='" + vertex + "']").setAttribute("class", sign === 1 ? "" : "negative");
        if (sign === -1) { negativeCount += 1; }
      });
      panel.querySelector("[data-board-description]").textContent = vertexNames.map(function (name, index) {
        return name + ": " + (signs[index] === 1 ? "+1" : "−1");
      }).join("; ");
      panel.querySelector("[data-correction-list]").textContent = selectedEdges.length ? "Z on " + selectedEdges.join(", ") : "No Z corrections selected.";
      feedback.setAttribute("data-result", negativeCount === 0 ? "correct" : "incorrect");
      feedback.textContent = negativeCount === 0
        ? "All four signs are +1. Your path flipped its endpoints once and each interior vertex twice."
        : negativeCount + " negative signs remain. Each edge toggles both adjacent vertex signs; choose a path between the negative vertices.";
    }

    Array.prototype.forEach.call(panel.querySelectorAll("[data-edge]"), function (button) {
      button.addEventListener("click", function () {
        var edge = Number(button.getAttribute("data-edge"));
        edges[edge] = 1 - edges[edge];
        update();
      });
    });
    panel.querySelector("[data-reset]").addEventListener("click", function () {
      edges = [0, 0, 0, 0];
      update();
    });
    update();
  });
}());

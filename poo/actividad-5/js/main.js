
let figureTableBodyElem; 
let activeFigureIdSpanElem; 
let currentControllerInstance; 

function updateActiveFigureDisplay(figure) {
    if (activeFigureIdSpanElem) {
        activeFigureIdSpanElem.textContent = figure ? figure.id : "None";
    }
    if (figureTableBodyElem) {
        const rows = figureTableBodyElem.querySelectorAll('tr');
        rows.forEach(row => {
            row.classList.remove('active-row');
            if (figure && row.dataset.figureId === figure.id) {
                row.classList.add('active-row');
            }
        });
    }
}


function main() {
    const canvas = document.getElementById("gameCanvas");
    canvas.width = 600;
    canvas.height = 400;

    const renderer = new GameEngineRender(canvas);
    const controller = new FigureController();
    currentControllerInstance = controller; 
    controller.keyboardEvents();

    const addRectangleBtn = document.getElementById("addRectangleBtn");
    const addCircleBtn = document.getElementById("addCircleBtn");
    const addTriangleBtn = document.getElementById("addTriangleBtn");
    const shapeColorInput = document.getElementById("shapeColor");
    
    figureTableBodyElem = document.querySelector("#figureTable tbody");
    activeFigureIdSpanElem = document.getElementById("activeFigureId");


    function updateFigureTable() {
        if (!figureTableBodyElem) return;
        figureTableBodyElem.innerHTML = ""; 
        renderer.getAllObjects().forEach(figure => {
            const row = figureTableBodyElem.insertRow();
            row.insertCell().textContent = figure.constructor.name;
            row.insertCell().textContent = figure.id;
            row.dataset.figureId = figure.id;

            if (currentControllerInstance && currentControllerInstance.activeFigure && currentControllerInstance.activeFigure.id === figure.id) {
                row.classList.add("active-row");
            }

            row.addEventListener("click", () => {
                const selectedFigure = renderer.getObject(figure.id);
                if (currentControllerInstance) {
                    currentControllerInstance.setActiveFigure(selectedFigure);
                }
            });
        });
        if (currentControllerInstance) {
            updateActiveFigureDisplay(currentControllerInstance.activeFigure);
        }
    }
    
    function promptForFigureDetails(shapeType) {
        const id = prompt(`Enter ID for the new ${shapeType}:`);
        if (!id) return null;

        const xStr = prompt(`Enter X coordinate for ${id}:`);
        if (xStr === null) return null;
        const yStr = prompt(`Enter Y coordinate for ${id}:`);
        if (yStr === null) return null;

        const color = shapeColorInput.value;
        let details = { id, x: xStr, y: yStr, color };
        let figure = null;

        try {
            if (shapeType === "Rectangle") {
                const widthStr = prompt(`Enter width for ${id}:`);
                if (widthStr === null) return null;
                const heightStr = prompt(`Enter height for ${id}:`);
                if (heightStr === null) return null;
                details.width = widthStr;
                details.height = heightStr;
            } else if (shapeType === "Circle") {
                const radiusStr = prompt(`Enter radius for ${id}:`);
                if (radiusStr === null) return null;
                details.radius = radiusStr;
            } else if (shapeType === "Triangle") {
                const sideStr = prompt(`Enter side length for equilateral ${id}:`);
                if (sideStr === null) return null;
                details.side = sideStr;
            }
            
            if (renderer.getObject(id)) {
                if (!confirm(`Figure with ID "${id}" already exists. Overwrite?`)) {
                    return null;
                }
            }
            figure = ShapeFactory.createShape(shapeType, details);

        } catch (e) {
            alert(`Error: ${e.message}. Please enter valid numbers or ensure ID is unique if not overwriting.`);
            return null;
        }
        return figure;
    }

    addRectangleBtn.addEventListener("click", () => {
        const rect = promptForFigureDetails("Rectangle");
        if (rect) {
            renderer.addObject(rect);
            controller.setActiveFigure(rect); 
            updateFigureTable(); 
        }
    });

    addCircleBtn.addEventListener("click", () => {
        const circ = promptForFigureDetails("Circle");
        if (circ) {
            renderer.addObject(circ);
            controller.setActiveFigure(circ);
            updateFigureTable();
        }
    });

    addTriangleBtn.addEventListener("click", () => {
        const tri = promptForFigureDetails("Triangle");
        if (tri) {
            renderer.addObject(tri);
            controller.setActiveFigure(tri);
            updateFigureTable();
        }
    });
    
    updateFigureTable();
    updateActiveFigureDisplay(null);

    function gameLoop() {
        controller.update();
        renderer.render();
        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
}

window.onload = main;

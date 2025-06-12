class FigureController {
    constructor() {
        this.keyboardState = {};
        this.activeFigure = null;
    }

    setActiveFigure(figure) {
        this.activeFigure = figure;
        if (typeof updateActiveFigureDisplay === 'function') {
            updateActiveFigureDisplay(figure);
        } else {
            //Podria
            console.warn("up");
        }
    }

    keyboardEvents() {
        document.addEventListener("keydown", (e) => this.manageKeyDown(e));
        document.addEventListener("keyup", (e) => this.manageKeyUp(e));
    }

    manageKeyDown(event) {
        this.keyboardState[event.key] = true;
    }

    manageKeyUp(event) {
        this.keyboardState[event.key] = false;
    }

    update() {
        if (!this.activeFigure) return;

        const rotate_value = 0.05;
        const movement_value = 2;

        if (this.keyboardState["ArrowUp"]) this.activeFigure.move(movement_value);
        if (this.keyboardState["ArrowDown"]) this.activeFigure.move(-movement_value);
        if (this.keyboardState["ArrowLeft"]) this.activeFigure.rotate(-rotate_value);
        if (this.keyboardState["ArrowRight"]) this.activeFigure.rotate(rotate_value);
    }
}

class GameEngineRender {
    constructor(canvasInstance) {
        this.canvas = canvasInstance;
        this.ctx = this.canvas.getContext("2d");
        this.objects = new Map(); 
    }

    addObject(figure) {
        if (figure && figure.id) {
            this.objects.set(figure.id, figure);
        }
    }

    getObject(id) {
        return this.objects.get(id);
    }

    getAllObjects() {
        return Array.from(this.objects.values());
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const figure of this.objects.values()) {
            figure.draw(this.ctx);
        }
    }
}

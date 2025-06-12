class Shape {
    constructor(id, x, y, color) {
        this.id = id;
        this.x = parseFloat(x) || 0;
        this.y = parseFloat(y) || 0;
        this.color = color;
        this.angle = 0;
    }

    rotate(value) {
        this.angle += value;
    }

    move(value) {
        const dx = Math.cos(this.angle) * value;
        const dy = Math.sin(this.angle) * value;
        this.x += dx;
        this.y += dy;
    }

    draw(ctx) {
        throw new Error("Draw method must be implemented by subclasses");
    }

    getSummary() {
        return { type: this.constructor.name, id: this.id };
    }
}

class Rectangle extends Shape {
    constructor(id, x, y, width, height, color) {
        super(id, x, y, color);
        this.width = parseFloat(width) || 50;
        this.height = parseFloat(height) || 30;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

class Circle extends Shape {
    constructor(id, x, y, radius, color) {
        super(id, x, y, color);
        this.radius = parseFloat(radius) || 25;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class Triangle extends Shape { 
    constructor(id, x, y, side, color) {
        super(id, x, y, color);
        this.side = parseFloat(side) || 50;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;

        const height = (Math.sqrt(3) / 2) * this.side;

        ctx.beginPath();
        ctx.moveTo(0, -height / 2); 
        ctx.lineTo(-this.side / 2, height / 2); 
        ctx.lineTo(this.side / 2, height / 2); 
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

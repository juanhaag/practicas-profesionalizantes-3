class ShapeFactory {
    static createShape(type, details) {
        const { id, x, y, color } = details;
        switch (type.toLowerCase()) {
            case "rectangle":
                if (isNaN(parseFloat(details.width)) || isNaN(parseFloat(details.height)) || isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
                     throw new Error("Invalid dimensions/coordinates for Rectangle.");
                }
                return new Rectangle(id, x, y, details.width, details.height, color);
            case "circle":
                if (isNaN(parseFloat(details.radius)) || isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
                    throw new Error("Invalid dimensions/coordinates for Circle.");
                }
                return new Circle(id, x, y, details.radius, color);
            case "triangle":
                 if (isNaN(parseFloat(details.side)) || isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
                    throw new Error("Invalid dimensions/coordinates for Triangle.");
                }
                return new Triangle(id, x, y, details.side, color);
            default:
                throw new Error(`Shape type "${type}" is not recognized.`);
        }
    }
}

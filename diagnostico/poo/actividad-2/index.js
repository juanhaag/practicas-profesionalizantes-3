class Printer {
    constructor() {
        this.capacitySheet = 100;
        this.capacityInk = 100;
        this.queue = [];
    }

    addJob(job) {
        this.queue.push(job);
    }

    validateSheet() {
        if (this.capacitySheet <= 0) {
            console.log("No hay papel disponible.");
            return false;
        }
        return true;
    }
    validateInk() {
        if (this.capacityInk <= 0) {
            console.log("No hay tinta disponible.");
            return false;
        }
        return true;
    }
    print() {
        while (this.queue.length > 0) {
            if (!this.validateSheet() || !this.validateInk()) {
                break;
            }
            const job = this.queue.shift();
            console.log(`Printing: ${job}`);
            this.capacitySheet -= 1;
            this.capacityInk -= 1;
        }
    }


    refillInk(amount) {
        this.capacityInk += amount;
        if (this.capacityInk > 100) {
            this.capacityInk = 100;
        }
    }

    refillSheet(amount) {
        this.capacitySheet += amount;
        if (this.capacitySheet > 100) {
            this.capacitySheet = 100;
        }
    }

    getStatus() {
        return {
            capacitySheet: this.capacitySheet,
            capacityInk: this.capacityInk,
            queueLength: this.queue.length
        };
    }

}

const printer = new Printer();
printer.addJob("Document 1");
printer.addJob("Document 2");
printer.addJob("Document 3");

printer.print(); 
printer.refillInk(20); 
printer.refillSheet(20);

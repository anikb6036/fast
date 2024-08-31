class Restaurant {
    constructor() {
        this.menu = [];
        this.orders = [];
    }

    addMenuItem(itemName, price) {
        this.menu.push({ itemName, price });
    }

    takeOrder(tableNumber, items) {
        const orderItems = this.menu.filter(menuItem => items.includes(menuItem.itemName));
        this.orders.push({ tableNumber, items: orderItems, status: 'Preparing' });
    }

    updateOrderStatus(tableNumber, status) {
        const order = this.orders.find(order => order.tableNumber === tableNumber);
        if (order) {
            order.status = status;
        }
    }

    calculateBill(tableNumber) {
        const order = this.orders.find(order => order.tableNumber === tableNumber);
        if (order) {
            return order.items.reduce((total, item) => total + item.price, 0);
        }
        return 0;
    }

    displayActiveOrders() {
        // Display all active orders (status "Preparing" or "Served")
        return this.orders.filter(order => order.status === 'Preparing' || order.status === 'Served');
    }
}


const restaurant = new Restaurant();

restaurant.addMenuItem("Pasta", 12.99);
restaurant.addMenuItem("Pizza", 10.99);
restaurant.addMenuItem("Salad", 6.99);

restaurant.takeOrder(1, ["Pasta", "Salad"]);
restaurant.takeOrder(2, ["Pizza"]);
restaurant.takeOrder(3, ["Pizza", "Salad"]);

restaurant.updateOrderStatus(1, "Served");
restaurant.updateOrderStatus(2, "Preparing");
restaurant.updateOrderStatus(3, "Served");

const billForTable1 = restaurant.calculateBill(1);
console.log(`Total bill for table 1: $${billForTable1.toFixed(2)}`);

const activeOrders = restaurant.displayActiveOrders();
console.log("Active Orders:", activeOrders);

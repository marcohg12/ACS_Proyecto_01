class Cart {
    private _id: string | null;
    private client: string;
    private products: { productRef: string; units: number }[];

    constructor(client: string, products: { productRef: string; units: number }[], _id?: string | null) {
        this._id = _id || null;
        this.client = client;
        this.products = products;
    }

    getId(): string | null {
        return this._id;
    }

    getClient(): string {
        return this.client;
    }

    getProducts(): { productRef: string; units: number }[] {
        return this.products;
    }

    setId(newId: string) {
        this._id = newId;
    }

    setClient(newClient: string) {
        this.client = newClient;
    }

    setProducts(newProducts: { productRef: string; units: number }[]) {
        this.products = newProducts;
    }
}

export { Cart };
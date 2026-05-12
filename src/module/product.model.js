const productImage = (accent, label, shape) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
            <rect width="320" height="220" rx="28" fill="#f8fafc"/>
            <rect x="18" y="18" width="284" height="184" rx="24" fill="#eef2f7"/>
            <circle cx="255" cy="55" r="38" fill="${accent}" opacity=".14"/>
            <circle cx="74" cy="172" r="44" fill="${accent}" opacity=".12"/>
            ${shape}
            <text x="160" y="194" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#111827">${label}</text>
        </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const images = {
    phone: productImage(
        '#2563eb',
        'Nothing Phone 2',
        '<rect x="125" y="38" width="70" height="122" rx="16" fill="#111827"/><rect x="132" y="45" width="56" height="108" rx="12" fill="#f9fafb"/><circle cx="160" cy="147" r="4" fill="#111827"/><circle cx="148" cy="68" r="10" fill="#2563eb"/><circle cx="174" cy="68" r="10" fill="#94a3b8"/>'
    ),
    laptop: productImage(
        '#0f766e',
        'Ultrabook Air 14',
        '<rect x="92" y="50" width="136" height="88" rx="10" fill="#0f172a"/><rect x="102" y="60" width="116" height="68" rx="6" fill="#dbeafe"/><path d="M70 150h180l-16 22H86z" fill="#334155"/><rect x="133" y="154" width="54" height="6" rx="3" fill="#94a3b8"/>'
    ),
    headset: productImage(
        '#db2777',
        'Studio Headphones',
        '<path d="M102 112a58 58 0 0 1 116 0" fill="none" stroke="#111827" stroke-width="16" stroke-linecap="round"/><rect x="78" y="104" width="42" height="62" rx="18" fill="#db2777"/><rect x="200" y="104" width="42" height="62" rx="18" fill="#db2777"/><rect x="91" y="118" width="18" height="34" rx="9" fill="#fce7f3"/><rect x="211" y="118" width="18" height="34" rx="9" fill="#fce7f3"/>'
    ),
    backpack: productImage(
        '#ea580c',
        'Everyday Backpack',
        '<path d="M112 78c0-28 96-28 96 0v76c0 18-14 32-32 32h-32c-18 0-32-14-32-32z" fill="#ea580c"/><path d="M132 82c0-16 56-16 56 0" fill="none" stroke="#fed7aa" stroke-width="8" stroke-linecap="round"/><rect x="131" y="121" width="58" height="38" rx="12" fill="#fff7ed"/><path d="M112 96c-22 6-28 30-20 55" fill="none" stroke="#9a3412" stroke-width="9" stroke-linecap="round"/><path d="M208 96c22 6 28 30 20 55" fill="none" stroke="#9a3412" stroke-width="9" stroke-linecap="round"/>'
    ),
};

export default class ProductModel {
    constructor(_id, _name, _desc, _price, _imageUrl) {
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;
    }

    static getAll() {
        return products;
    }

    static update(productObj) {
        const index = products.findIndex(p => p.id == productObj.id);
        products[index] = productObj;
    }

    static delete(id) {
        const index = products.findIndex(p => p.id == id);
        products.splice(index, 1);
    }

    static add(name, desc, price, imageUrl) {
        const newProduct = new ProductModel(
            products.length + 1,
            name,
            desc,
            price,
            imageUrl
        );
        products.push(newProduct);
    }

    static getById(id) {
        return products.find(p => p.id == id);
    }
}

const products = [
    new ProductModel(1, 'Nothing Phone 2', 'Transparent-back smartphone with 12GB RAM and 256GB storage.', 44999, images.phone),
    new ProductModel(2, 'Ultrabook Air 14', 'Slim 14-inch laptop for study, coding, and everyday productivity.', 72999, images.laptop),
    new ProductModel(3, 'Studio Headphones', 'Wireless over-ear headphones with soft cushions and noise isolation.', 8999, images.headset),
    new ProductModel(4, 'Everyday Backpack', 'Water-resistant backpack with a padded laptop sleeve and quick pockets.', 2499, images.backpack),
];

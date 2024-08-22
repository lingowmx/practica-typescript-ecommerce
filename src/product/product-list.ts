import { addToCart } from "../cart/cart"
import { Product } from "../interfaces/product-interfaces"

//Paso numero 1 Capturar elementos
// obtener la lista de productos desde la API
const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const products = await response.json() as Product[]
    return products
}
// paso 2 rendereizar la lista de productos en el DOM

export const renderProducts = async() => {
    const products = await getProducts()
    const $productList = document.querySelector('#product-list') as HTMLDivElement
    const $productTemplate = document.querySelector('#product-template') as HTMLTemplateElement

    products.forEach((product) => {
       const clone =  createCardProduct(product, $productTemplate);
       $productList.appendChild(clone)
    })
}

//Event delagation
//     products.foreach(({title, id, image, price}) => {
//         const productCardClone = $productTemplate.content.cloneNode(true) as HTMLDivElement
//         productCardClone.querySelector("img")!.src = image;
//         productCardClone.querySelector("h2")!.textContent = title;
//         productCardClone.querySelector("span")!.textContent = `$${price}`;
//         productCardClone.querySelector("button")!.setAttribute('data-id',id.toString())
//         $productList.appendChild(productCardClone)
//     })
// document.querySelector("#product-list")!.addEventListener("click", (event) => {
//     const target = (event.target as HTMLElement)?.closest("button");
//     const productId =  target?.getAttribute('data-id')
//     const product = productId && products.find(p => p.id === parseInt(productId)

// })
// PASO 2.1 Crear la tarjeta card con el template html

const createCardProduct = (
    product:Product,
    $productTemplate:HTMLTemplateElement
) => {
    const {title, id, image, price} = product
    const productCardClone = $productTemplate.content.cloneNode(true) as HTMLDivElement
    productCardClone.querySelector("img")!.src = image;
    productCardClone.querySelector("h2")!.textContent = title;
    productCardClone.querySelector("p span")!.textContent = `$${price}`;
    productCardClone.querySelector("button")!.addEventListener("click",() => {
        addToCart({title, price, id})
    })
    return productCardClone 
};



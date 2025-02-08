import React, {useEffect,useState}  from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";


const sanity = sanityClient({
    projectId:"vhm4mpvq",
    dataset:"production",
    apiVersion:"2023-01-01",
    useCdn: true
});

interface Product {
    _id: string;
    title: string;
    price: number;
    discountPercentage: number;
    imageUrl: {
        assest: {
            _ref: string
        };
    };
    tags: string[];
}


const produtCards: React.FC = () => {
    const [products, setProducts] =  useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);

    const fetchProduct = async () => {
        try {
            const query = `
            *[type == "product"]{
                _id,
                title,
                price,
                description,
                discountPercentage,
                "imageUrl": productImage.assest-> url,
                tags
            }
            `;
            const data = await sanity.fetch(query);
            setProducts(data);
                      
        } catch (error) {
            console.error("Error Fetching Produts:",error);
        }
    };

    const addToCart = (product: Product) => {
        setCart((prevCart) =>[...prevCart, product]);
        alert(`${product.title} has been added to your cart!`);
        
    };

    useEffect(() =>{
        fetchProduct();
    },[]);

    
}
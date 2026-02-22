import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products';

export default function ProductDetails() {
    const {id}= useParams();
    const [product, setProduct]= useState(null);

    useEffect(() => {
        const foundProduct = getProductById(id);
        setProduct(foundProduct);
    }, [id]);
    return (
        <div className="page">
            <div className="container">
                {product ? (
                    <div className="product-detail">
                        <div className="product-detail-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-detail-info">
                            <h1 className="product-detail-name">{product.name}</h1>
                            <p className="product-detail-price">${product.price}</p>
                            <p className="product-detail-description">{product.description}</p>
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                ) : (
                    <p>Product not found.</p>
                )}
            </div>
        </div>
    )
}
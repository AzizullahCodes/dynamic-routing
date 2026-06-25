'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const EachProductDetailPage = () => {
  const { uid } = useParams();
  const [data, setData] = useState([]);
  const navigation = useRouter()

  const productHandler = async () => {
    const apiUrl = 'https://dummyjson.com/products';
    const res = await fetch(apiUrl);
    const jsonData = await res.json();
    jsonData && setData(jsonData.products);
  };

  useEffect(() => {
    productHandler();
  }, []);

  let requiredProduct: any = data?.find((item: any) => {
    return item.id == uid;
  });

  if (!requiredProduct) return <p>Loading...</p>;
  //for routing 
  const routingHandler = ()=>{
    navigation.push('/')
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Go Home Button */}
      <Link href="/">
        <button
          style={{
            marginBottom: '20px',
            padding: '8px 16px',
            backgroundColor: '#444',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
       onClick={routingHandler} >
          ⬅ Go Home
        </button>
      </Link>

      <h1>{requiredProduct.title}</h1>

      {/* Thumbnail */}
      <Image
        src={requiredProduct.thumbnail}
        alt={requiredProduct.title}
        width={300}
        height={300}
        style={{ objectFit: 'cover', borderRadius: '8px' }}
      />

      {/* All images */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
        {requiredProduct.images?.map((img: string, index: number) => (
          <Image
            key={index}
            src={img}
            alt={`${requiredProduct.title}-${index}`}
            width={100}
            height={100}
            style={{ objectFit: 'cover', borderRadius: '6px' }}
          />
        ))}
      </div>

      <p><strong>Brand:</strong> {requiredProduct.brand}</p>
      <p><strong>Category:</strong> {requiredProduct.category}</p>
      <p><strong>Price:</strong> ${requiredProduct.price}</p>
      <p><strong>Discount:</strong> {requiredProduct.discountPercentage}%</p>
      <p><strong>Rating:</strong> {requiredProduct.rating}</p>
      <p><strong>Stock:</strong> {requiredProduct.stock}</p>
      <p><strong>Availability:</strong> {requiredProduct.availabilityStatus}</p>
      <p><strong>Min Order Quantity:</strong> {requiredProduct.minimumOrderQuantity}</p>
      <p><strong>SKU:</strong> {requiredProduct.sku}</p>
      <p><strong>Weight:</strong> {requiredProduct.weight}</p>
      <p><strong>Warranty:</strong> {requiredProduct.warrantyInformation}</p>
      <p><strong>Shipping:</strong> {requiredProduct.shippingInformation}</p>
      <p><strong>Return Policy:</strong> {requiredProduct.returnPolicy}</p>
      <p><strong>Description:</strong> {requiredProduct.description}</p>

      {/* Dimensions */}
      <h3>Dimensions</h3>
      <p>Width: {requiredProduct.dimensions?.width}</p>
      <p>Height: {requiredProduct.dimensions?.height}</p>
      <p>Depth: {requiredProduct.dimensions?.depth}</p>

      {/* Tags */}
      <h3>Tags</h3>
      <p>{requiredProduct.tags?.join(', ')}</p>

      {/* Meta */}
      <h3>Meta Info</h3>
      <p>Created At: {requiredProduct.meta?.createdAt}</p>
      <p>Updated At: {requiredProduct.meta?.updatedAt}</p>
      <p>Barcode: {requiredProduct.meta?.barcode}</p>

      {/* Reviews */}
      <h3>Reviews</h3>
      {requiredProduct.reviews?.map((review: any, index: number) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '8px', borderRadius: '6px' }}>
          <p><strong>{review.reviewerName}</strong> — Rating: {review.rating}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default EachProductDetailPage
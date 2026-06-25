// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'

// const EachProductDetailPage = () => {
//   const { uid } = useParams();
//   const [data, setData] = useState([]);
//   const navigation = useRouter()

//   const productHandler = async () => {
//     const apiUrl = 'https://dummyjson.com/products';
//     const res = await fetch(apiUrl);
//     const jsonData = await res.json();
//     jsonData && setData(jsonData.products);
//   };

//   useEffect(() => {
//     productHandler();
//   }, []);

//   let requiredProduct: any = data?.find((item: any) => {
//     return item.id == uid;
//   });

//   if (!requiredProduct) return <p>Loading...</p>;
//   //for routing 
//   const routingHandler = ()=>{
//     navigation.push('/')
//   }

//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
//       {/* Go Home Button */}
//       <Link href="/">
//         <button
//           style={{
//             marginBottom: '20px',
//             padding: '8px 16px',
//             backgroundColor: '#444',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//        onClick={routingHandler} >
//           ⬅ Go Home
//         </button>
//       </Link>

//       <h1>{requiredProduct.title}</h1>

//       {/* Thumbnail */}
//       <Image
//         src={requiredProduct.thumbnail}
//         alt={requiredProduct.title}
//         width={300}
//         height={300}
//         style={{ objectFit: 'cover', borderRadius: '8px' }}
//       />

//       {/* All images */}
//       <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
//         {requiredProduct.images?.map((img: string, index: number) => (
//           <Image
//             key={index}
//             src={img}
//             alt={`${requiredProduct.title}-${index}`}
//             width={100}
//             height={100}
//             style={{ objectFit: 'cover', borderRadius: '6px' }}
//           />
//         ))}
//       </div>

//       <p><strong>Brand:</strong> {requiredProduct.brand}</p>
//       <p><strong>Category:</strong> {requiredProduct.category}</p>
//       <p><strong>Price:</strong> ${requiredProduct.price}</p>
//       <p><strong>Discount:</strong> {requiredProduct.discountPercentage}%</p>
//       <p><strong>Rating:</strong> {requiredProduct.rating}</p>
//       <p><strong>Stock:</strong> {requiredProduct.stock}</p>
//       <p><strong>Availability:</strong> {requiredProduct.availabilityStatus}</p>
//       <p><strong>Min Order Quantity:</strong> {requiredProduct.minimumOrderQuantity}</p>
//       <p><strong>SKU:</strong> {requiredProduct.sku}</p>
//       <p><strong>Weight:</strong> {requiredProduct.weight}</p>
//       <p><strong>Warranty:</strong> {requiredProduct.warrantyInformation}</p>
//       <p><strong>Shipping:</strong> {requiredProduct.shippingInformation}</p>
//       <p><strong>Return Policy:</strong> {requiredProduct.returnPolicy}</p>
//       <p><strong>Description:</strong> {requiredProduct.description}</p>

//       {/* Dimensions */}
//       <h3>Dimensions</h3>
//       <p>Width: {requiredProduct.dimensions?.width}</p>
//       <p>Height: {requiredProduct.dimensions?.height}</p>
//       <p>Depth: {requiredProduct.dimensions?.depth}</p>

//       {/* Tags */}
//       <h3>Tags</h3>
//       <p>{requiredProduct.tags?.join(', ')}</p>

//       {/* Meta */}
//       <h3>Meta Info</h3>
//       <p>Created At: {requiredProduct.meta?.createdAt}</p>
//       <p>Updated At: {requiredProduct.meta?.updatedAt}</p>
//       <p>Barcode: {requiredProduct.meta?.barcode}</p>

//       {/* Reviews */}
//       <h3>Reviews</h3>
//       {requiredProduct.reviews?.map((review: any, index: number) => (
//         <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '8px', borderRadius: '6px' }}>
//           <p><strong>{review.reviewerName}</strong> — Rating: {review.rating}</p>
//           <p>{review.comment}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EachProductDetailPage 
 


'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const EachProductDetailPage = () => {
  const { uid } = useParams();
  const [data, setData] = useState([]);
  const [activeImage, setActiveImage] = useState<string>('');
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

  useEffect(() => {
    if (requiredProduct && !activeImage) {
      setActiveImage(requiredProduct.thumbnail);
    }
  }, [requiredProduct]);

  if (!requiredProduct) return <p>Loading...</p>;

  //for routing 
  const routingHandler = () => {
    navigation.push('/')
  }

  const discountedPrice = (
    requiredProduct.price - (requiredProduct.price * requiredProduct.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div
      style={{
        background: '#f4f5f7',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px 16px',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto 16px',
          fontSize: '0.85rem',
          color: '#6b7280',
        }}
      >
        Home <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ textTransform: 'capitalize' }}>{requiredProduct.category}</span>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: '#111827', fontWeight: 600 }}>{requiredProduct.title}</span>
      </div>

      {/* Main card */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: '14px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          display: 'flex',
          flexWrap: 'wrap',
          overflow: 'hidden',
        }}
      >
        {/* LEFT: Gallery */}
        <div
          style={{
            flex: '1 1 380px',
            padding: '28px',
            borderRight: '1px solid #f0f0f0',
            display: 'flex',
            gap: '14px',
          }}
        >
          {/* Thumbnails column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '420px',
              overflowY: 'auto',
            }}
          >
            <div
              onClick={() => setActiveImage(requiredProduct.thumbnail)}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: activeImage === requiredProduct.thumbnail ? '2px solid #2563eb' : '1px solid #e5e7eb',
                cursor: 'pointer',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <Image src={requiredProduct.thumbnail} alt="thumb" fill style={{ objectFit: 'cover' }} />
            </div>
            {requiredProduct.images?.map((img: string, index: number) => (
              <div
                key={index}
                onClick={() => setActiveImage(img)}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: activeImage === img ? '2px solid #2563eb' : '1px solid #e5e7eb',
                  cursor: 'pointer',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Image src={img} alt={`thumb-${index}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          {/* Main image */}
          <div
            style={{
              flex: 1,
              height: '420px',
              borderRadius: '10px',
              background: '#fafafa',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src={activeImage || requiredProduct.thumbnail}
              alt={requiredProduct.title}
              fill
              style={{ objectFit: 'contain' }}
            />
            {requiredProduct.discountPercentage > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: '#e11d48',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                -{Math.round(requiredProduct.discountPercentage)}%
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: Details */}
        <div style={{ flex: '1 1 320px', padding: '28px' }}>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {requiredProduct.category}
          </span>

          <h1
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#111827',
              margin: '6px 0 4px',
              lineHeight: 1.35,
            }}
          >
            {requiredProduct.title}
          </h1>

          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '10px' }}>
            Brand: <strong style={{ color: '#111827' }}>{requiredProduct.brand}</strong>
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: '#4b5563',
              marginBottom: '14px',
              paddingBottom: '14px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <span style={{ color: '#f59e0b' }}>
              {'★'.repeat(Math.round(requiredProduct.rating))}
              {'☆'.repeat(5 - Math.round(requiredProduct.rating))}
            </span>
            <span style={{ fontWeight: 600 }}>{requiredProduct.rating}</span>
            <span style={{ color: '#d1d5db' }}>|</span>
            <span style={{ color: '#2563eb' }}>{requiredProduct.reviews?.length || 0} ratings</span>
          </div>

          {/* Price box */}
          <div
            style={{
              background: '#fff7f7',
              border: '1px solid #fde2e2',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '1.7rem', fontWeight: 800, color: '#e11d48' }}>
                ${discountedPrice}
              </span>
              {requiredProduct.discountPercentage > 0 && (
                <>
                  <span
                    style={{
                      fontSize: '1rem',
                      color: '#9ca3af',
                      textDecoration: 'line-through',
                    }}
                  >
                    ${requiredProduct.price}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16a34a' }}>
                    Save {Math.round(requiredProduct.discountPercentage)}%
                  </span>
                </>
              )}
            </div>
            <p
              style={{
                fontSize: '0.8rem',
                color: requiredProduct.stock > 0 ? '#16a34a' : '#dc2626',
                fontWeight: 600,
                marginTop: '8px',
              }}
            >
              {requiredProduct.availabilityStatus} · {requiredProduct.stock} units left
            </p>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '0.875rem',
              color: '#4b5563',
              lineHeight: 1.6,
              marginBottom: '18px',
            }}
          >
            {requiredProduct.description}
          </p>

          {/* Info table */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px 16px',
              fontSize: '0.82rem',
              color: '#4b5563',
              background: '#f9fafb',
              borderRadius: '10px',
              padding: '14px 16px',
              marginBottom: '20px',
            }}
          >
            <p><strong style={{ color: '#111827' }}>Warranty:</strong> {requiredProduct.warrantyInformation}</p>
            <p><strong style={{ color: '#111827' }}>Shipping:</strong> {requiredProduct.shippingInformation}</p>
            <p><strong style={{ color: '#111827' }}>Returns:</strong> {requiredProduct.returnPolicy}</p>
            <p><strong style={{ color: '#111827' }}>Weight:</strong> {requiredProduct.weight}</p>
          </div>

          {/* Action buttons */}
          {/* <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <button
              style={{
                flex: 1,
                padding: '12px',
                background: '#fbbf24',
                color: '#111827',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 700,
              }}
            >
              🛒 Add to Cart
            </button>
            <button
              style={{
                flex: 1,
                padding: '12px',
                background: '#e11d48',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 700,
              }}
            >
              ⚡ Buy Now
            </button>
          </div> */}
        </div>
      </div>

      {/* Reviews */}
      {requiredProduct.reviews?.length > 0 && (
        <div
          style={{
            maxWidth: '1100px',
            margin: '20px auto 0',
            background: '#ffffff',
            borderRadius: '14px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            padding: '24px 28px',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: '#111827' }}>
            Customer Reviews
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {requiredProduct.reviews.map((review: any, index: number) => (
              <div
                key={index}
                style={{
                  borderBottom: '1px solid #f0f0f0',
                  paddingBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#111827' }}>{review.reviewerName}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#f59e0b' }}>
                    {'★'.repeat(review.rating)}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5 }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Go Home */}
      <div style={{ maxWidth: '1100px', margin: '20px auto 0', textAlign: 'center' }}>
        <Link href="/">
          <button
            style={{
              padding: '10px 24px',
              background: '#111827',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
            onClick={routingHandler}
          >
            ⬅ Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EachProductDetailPage
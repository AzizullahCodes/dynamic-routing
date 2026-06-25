// 'use client'
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const AllProuductsPage = () => {
//   const [data, setData] = useState([]);
//   const navigation = useRouter()

//   const productsHandlerFunction = async () => {
//     const apiUrl = 'https://dummyjson.com/products';
//     const res = await fetch(apiUrl);
//     const jsonData = await res.json();
//     console.log(jsonData);
//     jsonData?.products && setData(jsonData.products);
//   };

//   useEffect(() => {
//     productsHandlerFunction();
//   }, []);
// //prouductHandler
// const productHandler = (item:any)=>{
//     console.log(item)
//     navigation.push(`/products/${item.id}`)


// }
//   return (
//     <div>
//       <h1>All products Detail page</h1>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//         {data?.map((item: any, index: number) => {
//           return (
//             <div
//               key={item.id || index}
//               style={{
//                 border: '1px solid #ccc',
//                 borderRadius: '8px',
//                 padding: '15px',
//                 width: '250px',
//               }}
//             >
//               <Image
//                 src={item.thumbnail}
//                 alt={item.title}
//                 width={200}
//                 height={200}
//                 style={{ objectFit: 'cover', borderRadius: '6px' }}
//               />
//               <h3>{item.title}</h3>
//               <p><strong>Brand:</strong> {item.brand}</p>

//               <Link href={`/products/${item.id}`}>
//                 <button
//                   style={{
//                     marginTop: '10px',
//                     padding: '8px 16px',
//                     backgroundColor: '#000',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                   }}
//                onClick={()=>productHandler(item)} >
//                   View Detail
//                 </button>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AllProuductsPage;

'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AllProuductsPage = () => {
  const [data, setData] = useState([]);
  const navigation = useRouter()

  const productsHandlerFunction = async () => {
    const apiUrl = 'https://dummyjson.com/products';
    const res = await fetch(apiUrl);
    const jsonData = await res.json();
    console.log(jsonData);
    jsonData?.products && setData(jsonData.products);
  };

  useEffect(() => {
    productsHandlerFunction();
  }, []);
  //prouductHandler
  const productHandler = (item: any) => {
    console.log(item)
    navigation.push(`/products/${item.id}`)
  }

  return (
    <div
      style={{
        background: '#f1f3f6',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        padding: '0 0 80px',
      }}
    >
      {/* Top header strip */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          padding: '28px 16px 60px',
          marginBottom: '-40px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '1.7rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '4px',
            }}
          >
            All Products
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
            Best deals, handpicked for you
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '14px',
          }}
        >
          {data?.map((item: any, index: number) => {
            const discountedPrice = (
              item.price - (item.price * item.discountPercentage) / 100
            ).toFixed(2);
            const fullStars = Math.round(item.rating);

            return (
              <div
                key={item.id || index}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                  border: '1px solid #f1f1f1',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 14px 28px rgba(0,0,0,0.12)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
                  e.currentTarget.style.transform = 'translateY(0px)';
                }}
                onClick={() => productHandler(item)}
              >
                {/* Image */}
                <div
                  style={{
                    width: '100%',
                    height: '190px',
                    background: '#fafafa',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'contain', padding: '14px' }}
                  />

                  {item.discountPercentage > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: '#f97316',
                        color: '#fff',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                      }}
                    >
                      -{Math.round(item.discountPercentage)}%
                    </span>
                  )}

                  {/* Wishlist icon */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.95rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    🤍
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '12px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#f97316',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '4px',
                    }}
                  >
                    {item.category}
                  </span>

                  <h3
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      color: '#333',
                      lineHeight: '1.4',
                      margin: '0 0 6px',
                      minHeight: '2.4em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f97316' }}>
                      ${discountedPrice}
                    </span>
                    {item.discountPercentage > 0 && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#b0b0b0',
                          textDecoration: 'line-through',
                        }}
                      >
                        ${item.price}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '0.78rem',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ color: '#fbbf24', letterSpacing: '1px' }}>
                      {'★'.repeat(fullStars)}
                      <span style={{ color: '#e5e7eb' }}>{'★'.repeat(5 - fullStars)}</span>
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '0.72rem' }}>
                      ({item.reviews?.length || 0})
                    </span>
                  </div>

                  {/* Stock + brand row */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.72rem',
                      color: '#9ca3af',
                      marginBottom: '12px',
                    }}
                  >
                    <span>{item.brand}</span>
                    <span
                      style={{
                        color: item.stock > 0 ? '#16a34a' : '#dc2626',
                        fontWeight: 600,
                      }}
                    >
                      {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Button */}
                  <Link href={`/products/${item.id}`} style={{ marginTop: 'auto' }}>
                    <button
                      style={{
                        width: '100%',
                        padding: '9px',
                        background: '#ffffff',
                        color: '#f97316',
                        border: '1.5px solid #f97316',
                        borderRadius: '7px',
                        cursor: 'pointer',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        transition: 'background-color 0.2s ease, color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f97316';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.color = '#f97316';
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        productHandler(item);
                      }}
                    >
                      View Detail
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProuductsPage;
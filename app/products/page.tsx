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
const productHandler = (item:any)=>{
    console.log(item)
    navigation.push(`/products/${item.id}`)


}
  return (
    <div>
      <h1>All products Detail page</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data?.map((item: any, index: number) => {
          return (
            <div
              key={item.id || index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                width: '250px',
              }}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={200}
                height={200}
                style={{ objectFit: 'cover', borderRadius: '6px' }}
              />
              <h3>{item.title}</h3>
              <p><strong>Brand:</strong> {item.brand}</p>

              <Link href={`/products/${item.id}`}>
                <button
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
               onClick={()=>productHandler(item)} >
                  View Detail
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProuductsPage;
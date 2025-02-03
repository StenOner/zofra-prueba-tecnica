import { useState, useEffect } from 'react'
import { ProductHistory } from '@/models'

const useProductHistory = () => {
  const [productHistory, setProductHistory] = useState<ProductHistory[]>([])

  useEffect(() => {
    const storedProductHistory = localStorage.getItem('productHistory')
    if (storedProductHistory) setProductHistory(JSON.parse(storedProductHistory))
  }, [])

  const addToProductHistory = (newProduct: ProductHistory) => {
    const updatedProductHistory = [...productHistory, newProduct]
    setProductHistory(updatedProductHistory)
    localStorage.setItem('productHistory', JSON.stringify(updatedProductHistory))
  }

  return { productHistory, addToProductHistory }
}

export default useProductHistory
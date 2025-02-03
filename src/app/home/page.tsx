'use client'

import useProducts from '@/hooks/use-products'
import { Product } from '@/models'
import { Table, TableColumnsType } from 'antd'

const Home: React.FC = () => {
  const { products } = useProducts()
  const dataSource = products.map((product, index) => ({
    key: index,
    ...product,
  }))
  const filterCategories = Array.from(new Set(products.map((product) => product.category)))
    .map((category) => ({ text: category, value: category }))

  const columns: TableColumnsType<Product> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
      filters: filterCategories,
      onFilter: (value, record) => record.category.indexOf(value as string) === 0,
    },
  ]

  return (
    <Table<Product>
      pagination={{ pageSize: 5 }}
      dataSource={dataSource}
      columns={columns}
    />
    // <div>
    //   {products.map((product, index) => (
    //     <div key={index}>
    //       <h2>{product.name}</h2>
    //       <p>{product.description}</p>
    //       <p>${product.price}</p>
    //     </div>
    //   ))}
    // </div>
  )
}

export default Home
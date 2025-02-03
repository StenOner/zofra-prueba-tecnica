'use client'

import useProducts from '@/hooks/use-products'
import useShoppingCart from '@/hooks/use-shopping-cart'
import { Product, ShoppingCartItem } from '@/models'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Table, TableColumnsType } from 'antd'

const Home: React.FC = () => {
  const { products } = useProducts()
  const { addToCart, subtractFromCart } = useShoppingCart()
  const [messageApi, contextHolder] = message.useMessage()

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
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'actions',
      render: (record: Product) => (
        <div className='flex gap-x-1'>
          <button
            className='flex justify-center items-center p-2 bg-blue-500 text-white rounded-full hover:opacity-80 transition-all duration-200'
            onClick={onAddProduct.bind(null, record)}
          >
            <PlusOutlined />
          </button>
          <button
            className='flex justify-center items-center p-2 bg-gray-400 text-white rounded-full hover:opacity-80 transition-all duration-200'
            onClick={onSubstractProduct.bind(null, record)}
          >
            <MinusOutlined />
          </button>
        </div>
      )
    },
  ]

  const onAddProduct = (product: Product) => {
    const item: ShoppingCartItem = {
      productName: product.name,
      quantity: 1,
      price: product.price,
    }
    addToCart(item)
    messageApi.success(`Producto \"${product.name}\" agregado al carrito`)
  }

  const onSubstractProduct = (product: Product) => {
    subtractFromCart(product.name, 1)
    messageApi.info(`Producto \"${product.name}\" substraido del carrito`)
  }

  return (
    <>
      {contextHolder}
      <Table<Product>
        pagination={{ pageSize: 5 }}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  )
}

export default Home
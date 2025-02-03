'use client'

import useProductHistory from '@/hooks/use-product-history'
import useShoppingCart from '@/hooks/use-shopping-cart'
import { ProductHistory, ShoppingCartItem } from '@/models'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Table, TableColumnsType } from 'antd'

const ShoppingCartPage: React.FC = () => {
  const { cartItems, addToCart, subtractFromCart, removeFromCart, clearCart } = useShoppingCart()
  const { addToProductHistory } = useProductHistory()

  const dataSource = cartItems.map((item, index) => ({
    key: index,
    subTotal: (item.price * item.quantity).toFixed(2),
    ...item,
  }))
  const total = dataSource.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
  const columns: TableColumnsType<ShoppingCartItem> = [
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: ShoppingCartItem) => (
        <div className='flex gap-x-2'>
          <button
            className='flex justify-center items-center p-2 bg-gray-400 text-white rounded-full hover:opacity-80 transition-all duration-200'
            onClick={subtractFromCart.bind(null, record.productName, 1)}
          >
            <MinusOutlined />
          </button>
          <span className='flex justify-center items-center text-lg min-w-8'>
            {quantity}
          </span>
          <button
            className='flex justify-center items-center p-2 bg-blue-500 text-white rounded-full hover:opacity-80 transition-all duration-200'
            onClick={addToCart.bind(null, { ...record, quantity: 1 })}
          >
            <PlusOutlined />
          </button>
        </div>
      ),
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subTotal',
      key: 'subTotal',
    },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'actions',
      render: (record: ShoppingCartItem) => (
        <button
          className='flex justify-center items-center p-2 bg-red-500 text-white rounded-full hover:opacity-80 transition-all duration-200'
          onClick={removeFromCart.bind(null, record.productName)}
        >
          <DeleteOutlined />
        </button>
      ),
    },
  ]

  const onPurchase = () => {
    const productHistory: ProductHistory = {
      id: Math.floor(Math.random() * 10_000),
      date: new Date().toISOString(),
      items: cartItems,
    }
    addToProductHistory(productHistory)
    clearCart()
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <Table<ShoppingCartItem>
        pagination={{ pageSize: 5 }}
        dataSource={dataSource}
        columns={columns}
      />
      <div className='flex flex-col w-full justify-center items-center text-lg gap-y-1'>
        <span>Total: PEN {total}</span>
        <button
          className='flex w-[30vw] p-2 bg-blue-500 text-white rounded-md justify-center hover:opacity-80 transition-all duration-200'
          onClick={onPurchase}
        >
          Comprar
        </button>
      </div>
    </div>
  )
}

export default ShoppingCartPage

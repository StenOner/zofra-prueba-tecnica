'use client'


import useProductHistory from '@/hooks/use-product-history'
import { ProductHistory } from '@/models'
import { Table, TableColumnsType } from 'antd'

function toDateString(date: string) {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const History: React.FC = () => {
  const { productHistory } = useProductHistory()

  const dataSource = productHistory.map((history, index) => ({
    key: index,
    total: history.items.reduce((acc, product) => acc + product.price! * product.quantity!, 0).toFixed(2),
    ...history,
  }))
  const filterDates = Array.from(new Set(productHistory.map((item) => toDateString(item.date))))
    .map((date) => ({ text: date, value: date }))

  const columns: TableColumnsType<ProductHistory> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      filters: filterDates,
      onFilter: (value, record) => toDateString(record.date).indexOf(value as string) === 0,
      render: (date: string) => toDateString(date),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ]

  return (
    <Table<ProductHistory>
      rowHoverable
      pagination={{ pageSize: 5 }}
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default History
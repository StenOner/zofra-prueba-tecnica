'use client'

import useProductHistory from '@/hooks/use-product-history'
import { ProductHistory } from '@/models'
import { DateUtil } from '@/utils'
import { useMediaQuery } from '@react-hook/media-query'
import { Table, TableColumnsType } from 'antd'

const History: React.FC = () => {
  const { productHistory } = useProductHistory()
  const matches = useMediaQuery('(max-width: 768px)')

  const dataSource = productHistory.map((history, index) => ({
    key: index,
    total: history.items.reduce((acc, product) => acc + product.price! * product.quantity!, 0).toFixed(2),
    ...history,
  }))
  const filterDates = Array.from(new Set(productHistory.map((item) => DateUtil.toDateString(item.date))))
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
      onFilter: (value, record) => DateUtil.toDateString(record.date).indexOf(value as string) === 0,
      render: (date: string) => matches ? DateUtil.toDateString(date) : DateUtil.toFullDateString(date),
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
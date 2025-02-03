'use client'

import { ClockCircleOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps, theme } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const { Content, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: (
      <Link href="/" rel='noopener noreferrer'>
        Inicio
      </Link>
    ),
  },
  {
    key: '2',
    icon: <ShoppingCartOutlined />,
    label: (
      <Link href="/shopping-cart" rel='noopener noreferrer'>
        Carrito Compras
      </Link>
    ),
  },
  {
    key: '3',
    icon: <ClockCircleOutlined />,
    label: (
      <Link href="/history" rel='noopener noreferrer'>
        Historial Compras
      </Link>
    ),
  }
]

const Navigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64px' }}>
          <Image src="/images/logo.png" alt="logo" width={60} height={60} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 10px' }}>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Navigation
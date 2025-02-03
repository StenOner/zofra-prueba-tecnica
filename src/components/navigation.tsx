'use client'

import { ClockCircleOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useMediaQuery } from '@react-hook/media-query'
import { Layout, Menu, MenuProps, theme } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const { Header, Content, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]
const items: MenuItem[] = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: (
      <Link href='/' rel='noopener noreferrer'>
        Inicio
      </Link>
    ),
  },
  {
    key: '2',
    icon: <ShoppingCartOutlined />,
    label: (
      <Link href='/shopping-cart' rel='noopener noreferrer'>
        Carrito Compras
      </Link>
    ),
  },
  {
    key: '3',
    icon: <ClockCircleOutlined />,
    label: (
      <Link href='/history' rel='noopener noreferrer'>
        Historial Compras
      </Link>
    ),
  }
]

const Navigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const matches = useMediaQuery('(max-width: 768px)')
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    setCollapsed(matches)
  }, [matches])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='flex justify-center items-center h-16'>
          <Image src='/images/logo.png' alt='logo' width={60} height={60} />
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
      </Sider>
      <Layout>
        {!collapsed && (
          <Header className='flex justify-center items-center text-white text-2xl'>
            Prueba Tecnica Kurax
          </Header>
        )}
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
    </Layout >
  )
}

export default Navigation
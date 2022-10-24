import React from 'react'
import { Layout } from 'antd'
import Bookshelf from './Bookshelf'
import './App.css'
import styles from './App.module.css'

const { Header, Content } = Layout;

const App: React.FC = () => {

  return (
    <>
      <Layout>
        <Header className={styles.header}>
          Bookshelf
        </Header>
        <Content className={styles.content}>
          <Bookshelf />
        </Content>
      </Layout>
    </>
  )
}

export default App

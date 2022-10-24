import React from 'react'
import styles from './Book.module.css'
import { Row, Col } from 'antd'


const Book: React.FC<{book:any,onClick:Function}> = ({book,onClick}) => {

  const handleClick = () => {
    onClick(book)
  }

  return (
    <Row className={styles.cover} onClick={handleClick}>
      <div className={styles.hoverContainer}>

      </div>
      
      <Col span={24}>
        <div className={styles.title}>{book.title}</div>
        <div className={styles.pages}>{book.pages} page{book.pages !== 1 ? 's' : ''}</div>
        <div className={styles.genre}>{book.genre}</div>
      </Col>
      <Col className={styles.footer} span={24}>
        <div className={styles.author}><div className={styles.small}>Written By</div>{book.author.firstName} {book.author.lastName}</div>
      </Col>
    </Row>
  )
}

export default Book
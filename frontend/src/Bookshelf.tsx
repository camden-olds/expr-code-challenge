import React, { useEffect, useState } from 'react'
import axios from './config/axiosConfig'
import { Row, Col, Button, Typography, Modal } from 'antd'
import Loader from './Loader'
import BookForm from './BookForm'
import styles from './Bookshelf.module.css'
import Book from './Book'

const { Title } = Typography

const Bookshelf: React.FC = () => {

  const [loading,setLoading] = useState<boolean>(true)
  const [books, setBooks] = useState<any[]>([])
  const [totalBooks, setTotalBooks] = useState<number>(0)
  const [perPage, setPerPage] = useState<number>(20)
  const [page, setPage] = useState<number>(1)
  const [bookModalOpen, setBookModalOpen] = useState<boolean>(false)
  const [bookSaveable, setBookSaveable] = useState<boolean>(false)
  const [selectedBook, setSelectedBook] = useState<any>({})
  const [modalBook, setModalBook] = useState<any>({})
  const [modalSaving, setModalSaving] = useState<boolean>(false)

  useEffect(() => {
    loadBooks()
  }, [])


  const loadBooks = () => {
    setLoading(true)

    axios.get('books')
      .then(response => {
        setBooks(response.data.items)
        setTotalBooks(response.data.totalItems)
        setPerPage(response.data.perPage)
        setPage(response.data.page)
      })
      .finally(() => setLoading(false))
  }


  const handleModalOk = () => {

    const isNew = !modalBook._id || modalBook._id === ''

    console.log('Modal Book', modalBook)
    console.log('Is New', isNew, modalBook._id)

    const postData = {
      title: modalBook.title,
      genre: modalBook.genre,
      pages: modalBook.pages,
      author: modalBook.author,
      publishDate: modalBook.published.format()
    }
    setModalSaving(true)
    if(isNew) {
      axios.post('/books', postData)
        .then(response => {
          const bArr = [...books]
          bArr.push(response.data)
          setBooks(bArr)
          setTotalBooks(totalBooks + 1)
        })
        .finally(() => {
          setModalSaving(false)
          setBookModalOpen(false)
          setSelectedBook({})
        })
    } else {
      axios.put(`/books/${modalBook._id}`, postData)
        .then(response => {
          const bArr = [...books]
          let found = null
          bArr.forEach((b,i) => {
            if(b._id === response.data._id) found = i
          })

          if(found !== null) {
            bArr[found] = response.data
            setBooks(bArr)
          }
        })
        .finally(() => {
          setModalSaving(false)
          setBookModalOpen(false)
          setSelectedBook({})          
        })
    }
    //setBookModalOpen(false)
  }


  const handleModalCancel = () => {
    setBookModalOpen(false)
  }


  const handleAddBook = () => {
    setSelectedBook({})
    setModalBook({})
    setBookModalOpen(true)
  }


  const handleModalCanSave = (saveable: boolean) => {
    console.log('Can Save', saveable)
    setBookSaveable(saveable)
  }


  const handleBookClick = (book: any) => {
    setSelectedBook(book)
    setBookModalOpen(true)
  }


  const handleDelete = (id: string) => {
    handleModalCancel()

    axios.delete(`books/${id}`)
      .then(() => {
        const bArr = [...books]
        let found = null
        bArr.forEach((b,i) => {
          if(b._id === id) found = i
        })
        if(found !== null) {
          bArr.splice(found, 1)
          setBooks(bArr)
          setTotalBooks( totalBooks - 1 )
        }
      })
  }


  return (
    <>
      {loading && (
        <Loader />
      )}
      {!loading && (
        <div>
          <Row gutter={[16,16]} justify="center">
            <Col flex="0 1 auto" className={styles.bookshelfTitle}>
              <Title level={4}>
                {`You have ${totalBooks} book${totalBooks !== 1 ? 's' : ''}`}
              </Title>
            </Col>
            <Col>
              <Button onClick={handleAddBook}>Add A Book</Button>
            </Col>
          </Row>

          <Row gutter={[16,16]} justify="center">
            {books.map(b => {
              return (
                <Col key={`book=${b._id}`} span={3}>
                  <Book book={b} onClick={handleBookClick} />
                </Col>
              )
            })}
          </Row>
        </div>
      )}

      <Modal 
        title={`${modalBook._id ? 'Update Book' : 'Add A Book'}`}
        open={bookModalOpen} 
        onOk={handleModalOk} 
        onCancel={handleModalCancel}
        okText="Save"
        okButtonProps={{
          disabled: !bookSaveable,
          loading: modalSaving
        }}
      >
        <BookForm 
          book={selectedBook}
          onChange={(e:object) => setModalBook(e)}
          canSave={handleModalCanSave}
          onDelete={handleDelete}
        />
      </Modal>
    </>
  )
}

export default Bookshelf

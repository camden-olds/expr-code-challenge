import React, { useEffect, useState } from 'react'
import axios from './config/axiosConfig'
import moment,{ Moment } from 'moment'
import styles from './BookForm.module.css'
import { Row, Col, Input, DatePicker, Select, Button } from 'antd'

const { Option } = Select


const BookForm: React.FC<{
  canSave: Function,
  onChange: Function,
  onDelete?: Function,
  book?:any
}> = ({ 
  onChange,
  canSave, 
  onDelete,
  book
}) => {
  const [genres, setGenres] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')
  const [authorFirstName, setAuthorFirstName] = useState<string>('')
  const [authorLastName, setAuthorLastName] = useState<string>('')
  const [published, setPublished] = useState<Moment|null>(null)
  const [pages, setPages] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const [id, setId] = useState<string>('')


  useEffect(() => {
    axios.get('books/genres')
      .then(response => {
        setGenres(response.data)
      })
  }, [])


  useEffect(() => {
    const saveable: boolean = 
      title.trim() !== '' && 
      authorFirstName.trim() !== '' && 
      authorLastName.trim() !== '' && 
      published !== null &&
      pages.trim() !== '' &&
      genre !== '' &&
      genres.length > 0
    
    canSave(saveable)

    onChange({
      _id: id,
      title,
      published,
      genre,
      pages,
      author: {
        firstName: authorFirstName,
        lastName: authorLastName
      }
    })
  }, [title, authorFirstName, authorLastName,published,genre,pages,canSave,genres.length,id,onChange])


  useEffect(() => {

    const { title: bTitle, pages: bPages, publishDate, genre: bGenre, author } = book
    setTitle(bTitle || '')
    setPages(bPages ? bPages.toString() : '')
    setPublished( publishDate ? moment(publishDate) : null )
    setGenre(bGenre)
    setAuthorFirstName(author?.firstName || '')
    setAuthorLastName(author?.lastName || '')
    setId(book._id || '')
    
  }, [book])


  const handleDelete = () => {
    if(!onDelete) return
    onDelete(id)
  }

  return (
    <>
      <Row gutter={[16,16]}>
        <Col span={24}>
          <div className={styles.newLabel}>Title</div>
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            allowClear
          />
        </Col>
        <Col span={24}>
          <div className={styles.newLabel}>Author</div>
          <Row gutter={[16,16]}>
            <Col span={12}>
              <Input 
                value={authorFirstName}
                placeholder="First Name"
                onChange={(e) => setAuthorFirstName(e.target.value)} 
                allowClear
              />
            </Col>
            <Col span={12}>
              <Input
                value={authorLastName}
                placeholder="Last Name"
                onChange={(e) => setAuthorLastName(e.target.value)}
                allowClear
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <div className={styles.newLabel}>Published</div>
          <DatePicker 
            className={styles.datePicker}
            showTime
            value={published}
            onChange={(e) => setPublished(e)}
          />
        </Col>
        <Col span={8}>
          <div className={styles.newLabel}>Genre</div>
          <Select 
            value={genre}
            onChange={(e) => setGenre(e || '')}
            allowClear
            disabled={!genres.length}
            className={styles.select}
          >
            {genres.map(g => (<Option key={`genre-${g}`} value={g}>{g}</Option>))}
          </Select>
        </Col>
        <Col span={4}>
          <div className={styles.newLabel}>Pages</div>
          <Input
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            type="number"
          />
        </Col>
      </Row>
      {(id && id !== '' && onDelete) && (
        <Row gutter={[16,16]}>
          <Col span={24} className={styles.buttonBox}>
            <Button type="default" danger size="small" onClick={handleDelete}>Delete Book</Button>
          </Col>
        </Row>
      )}
    </>
  )
}

export default BookForm
const genres: string[] = [
  'Action',
  'Fantasy',
  'Science Fiction',
  'Horror',
  'Mystery',
  'Adventure',
  'Thriller',
  'Graphic Novel'
]

genres.sort((a,b) => b.localeCompare(a))

export default genres
import { useQuery } from 'react-query'
import styles from '../styles/Home.module.css'

const getHomeContent = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:1337/home')
      .then(response => {
        setTimeout(() => {
          resolve(response.json())
        }, 3000)
      })
  })
}

export default function Home() {
  const query = useQuery('getHome', getHomeContent, {
    retry: false
  })
  const { data, isLoading, isError, error } = query

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  return (
    <div className={styles.container}>
      <h1>{data?.title}</h1>
      <p>{data?.bio}</p>
    </div>
  )
}

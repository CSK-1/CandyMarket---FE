import { useState, useEffect } from "react"

const Home = () => {
  const [candy, setCandy] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/all_products`)
      const data = await response.json()
      console.log(data)
      setCandy(data)
    } catch (e) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  fetchProducts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    <div>Error: {error}</div>
  }

  return (
    <>
      <h1>Home Sweet Home 🍭</h1>
    </>
  )
}

export default Home

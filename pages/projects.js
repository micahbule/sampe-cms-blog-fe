import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const getProjectContent = async () => {
    const response = await fetch('http://localhost:1337/projects')

    return response.json()
  }

const postProjectContent = async (payload) => {
    const response = await fetch('http://localhost:1337/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
    })

    return response.json()
}

export default function Projects() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const client = useQueryClient()

    const query = useQuery('getProjects', getProjectContent, {
        initialData: []
    })
    const { data, isLoading, isError, error } = query

    const mutation = useMutation(postProjectContent)

    useEffect(() => {
        if (mutation.isSuccess) {
            setTitle('')
            setDescription('')

            client.invalidateQueries('getProjects')
        }
    }, [mutation.isSuccess, client])

    const onSubmit = (e) => {
        e.preventDefault()
        
        mutation.mutate({
            title,
            description,
        })
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} value={description} />
                </fieldset>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}
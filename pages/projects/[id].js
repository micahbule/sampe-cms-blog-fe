import { useRouter } from 'next/router'

export default function ProjectById() {
    const router = useRouter()

    console.log('Id', router.query.id)

    return (
        <div>
            <h1>Title</h1>
            <p>Description</p>
        </div>
    )
}
import Counter from '@/app/_components/Counter'

export const metadata = {
  title: 'Cabins',
}

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await res.json()

  return (
    <div>
      <h1>This is the Wild Osis. Welcome</h1>

      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <Counter users={data} />
    </div>
  )
}

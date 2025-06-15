'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Filter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const activeFilter = searchParams.get('capacity') ?? 'all'

  function filterHundler(filter) {
    const params = new URLSearchParams(searchParams)
    params.set('capacity', filter)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className='border border-primary-800 flex'>
      <Button
        filter={'all'}
        activeFilter={activeFilter}
        filterHundler={filterHundler}
      >
        All Cabins
      </Button>
      <Button
        filter={'small'}
        activeFilter={activeFilter}
        filterHundler={filterHundler}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter={'medium'}
        activeFilter={activeFilter}
        filterHundler={filterHundler}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter={'large'}
        activeFilter={activeFilter}
        filterHundler={filterHundler}
      >
        8&mdash;12 guests
      </Button>
    </div>
  )
}

function Button({ filter, filterHundler, activeFilter, children }) {
  return (
    <button
      className={`${
        filter === activeFilter ? 'bg-primary-700' : ''
      } px-5 py-2 hover:bg-primary-700`}
      onClick={() => filterHundler(filter)}
    >
      {children}
    </button>
  )
}

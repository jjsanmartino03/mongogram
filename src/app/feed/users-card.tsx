import Card from '@common/card'
import { useEffect } from 'react'

export default function UsersCard({}) {
  return (
    <div className={'lg:w-1/4 w-full lg:h-96'}>
      <Card className={'h-full overflow-auto flex lg:flex-col gap-3 lg:items-start items-center'}>
        <h2 className={'lg:text-2xl'}>Usuarios: </h2>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((user, index) => (
          <img
            key={user}
            width={40}
            height={40}
            src={
              'https://source.boringavatars.com/beam/120/Julián%20Sanmartinocolors=264653,2a9d8f,e9c46a,f4a261,e76f51'
            }
          />
        ))}
      </Card>
    </div>
  )
}

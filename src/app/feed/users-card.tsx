import Card from '@common/card'
import { User } from '@interfaces/user'
import { WithId } from 'mongodb'

export default function UsersCard({ users }: { users: WithId<User>[] }) {
  return (
    <div className={'lg:w-1/4 w-full lg:h-96'}>
      <Card className={'h-full overflow-auto flex lg:flex-col gap-3 lg:items-start items-center'}>
        <h2 className={'lg:text-2xl'}>Usuarios: </h2>
        {users.map((user, index) => (
          <div key={user._id} className={'flex items-center gap-2'}>
            <img className={'rounded-full'} width={40} height={40} src={user.image} />
            <div className={'hidden lg:flex'}>{user.name}</div>
          </div>
        ))}
      </Card>
    </div>
  )
}

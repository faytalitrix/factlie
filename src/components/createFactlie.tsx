import { useUser } from '@clerk/nextjs'

const CreateFactlie = () => {    
    const { user } = useUser()
  
    if( !user ) {
      return null
    }
  
    return (
      <div className='flex gap-3 w-full p-2 mb-4'>
        <img src={user.imageUrl} alt={user.id} className='h-10 w-10 rounded-full' />
        <input placeholder='Add a Factlie' className='bg-transparent outline-none w-full block' />
      </div>
    )
  }

  export default CreateFactlie
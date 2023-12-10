import { useUser } from '@clerk/nextjs'

const Nav = () => {    
    const { user } = useUser()
  
    if( !user ) {
      return null
    }
  
    return (
        <section>
            {/* <nav className='text-sm flex'>
            <div className='text-slate-900'>{user.isSignedIn && <SignOutButton />}</div>
            <div className='text-slate-900'>{!user.isSignedIn && <SignInButton />}</div>
          </nav> */}
        </section>    
    )
  }

  export default Nav
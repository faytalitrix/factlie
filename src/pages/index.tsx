import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Head from 'next/head'
import Link from 'next/link'
import { api } from '~/utils/api'
import type { RouterOutputs } from '~/utils/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Nav from '~/components/nav'

dayjs.extend(relativeTime)

type FactlieWithUser = RouterOutputs['factlies']['getAll'][number]
const FactlieView = (props: FactlieWithUser) => {
  const { factlie, author } = props
  
  return (
    <li key={factlie.id} className="border-2 border-slate-400 w-100 h-100">
      {/* <img src={author.profileImageUrl} alt={author.id} className='h-9 w-9 rounded-full' /> */}
      <h2 className='text-base'>{author.username}</h2>
      <p>Fact: {factlie.fact}</p>
      <p>Fact Author: {factlie.factAuthor}</p>
      <p>Fact Url: {factlie.factUrl}</p>
      <br />
      <p>Lie: {factlie.lie}</p>
      <p>Lie Author: {factlie.lieAuthor}</p>
      <p>Lie Url: {factlie.lieUrl}</p>
    </li>
  )
}

export default function Home() {
  const user = useUser()
  const { data, isLoading } = api.factlies.getAll.useQuery()
  if(isLoading) return <div>Loading...</div>
  if(!data) return <div>Something went wrong</div>

  return (
    <>
      <Head>
        <title>Factlie</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-col items-center justify-center bg-[#F6F6F6] h-full w-full'>
        <header className='w-full flex p-3 items-center justify-between'>
          <div className='flex justify-start items-center'>
            <Bars3Icon className='h-6 w-6' />
            <Link href='/'>
              <h1 className='ml-2 uppercase tracking-widest leading-none'><Link href='/'>Factlie</Link></h1>
            </Link>
          </div>
          <MagnifyingGlassIcon className='h-6 w-6' />
        </header>
        <ul className="flex justify-center h-full">
          {/* {[...data, ...data]?.map((fullFactlie) => (
            <FactlieView {...fullFactlie} key={fullFactlie.factlie.id} />
          ))} */}
          <li className="flex flex-col" style={{ width: '60%' }}>
            {/* <img src={author.profileImageUrl} alt={author.id} className='h-9 w-9 rounded-full' /> */}
            <span className='bg-[#000000] text-white p-2 px-4 text-2xl tracking-widest w-auto'>LIE</span>
            <p className='playfair text-5xl'>I never discussed a single thing with my son about anything do with Ukraine.</p>
            <span className='bg-[#0C3192] uppercase text-white p-2 px-4 text-2xl tracking-widest'>Joe Biden</span>
          </li>
        </ul>
      </main>
    </>
  )
}
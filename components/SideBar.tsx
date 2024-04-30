'use client'

import { SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import NewChat from './NewChat'
import { collection, orderBy, query } from 'firebase/firestore'
import ChatRow from './ChatRow'
import ModelSelection from './ModelSelection'

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session && query(
      collection(db, 'users', session.user?.email, 'chats'),
      orderBy('createdAt', 'asc')
    )
  )
  
  return (
    <div className="p-2 flex flex-col h-screen">
        <div className='flex-1'>
            <div>
                <NewChat />

                <div className='hidden sm:inline'>
                    <ModelSelection />
                </div>

                <div className='flex flex-col space-y-2 my-2'>
                  {chats?.docs.map(chat => (
                    <ChatRow key={chat.id} id={chat.id} />
                  ))}
                </div>
            </div>
        </div>
        { 
          session && <button
          onClick={() => signOut()}
          className='flex px-5 py-3 items-center rounded-lg hover:bg-[#212121] cursor-pointer text-gray-300 transition-all duration-200 ease-out'>
              <img 
              src={session.user?.image!} 
              alt={session.user?.name!} 
              className='h-8 w-8 rounded-full cursor-pointer mr-4 hover:opacity-50'
              /> 
              <div>{session.user?.email!}</div>
            </button> 
        }
    </div>
  )
}

export default SideBar
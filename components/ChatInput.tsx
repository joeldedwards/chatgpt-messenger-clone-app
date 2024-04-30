'use client';

import { db } from "../firebase"
import { PaperAirplaneIcon } from "@heroicons/react/16/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr"
import { ArrowUpIcon } from "@heroicons/react/24/outline";

type Props = {
    chatId: string
};

function ChatInput({ chatId }: Props) {  
    const [ prompt, setPrompt ] = useState('');
    const { data: session } = useSession();
    
    const { data: model } = useSWR('model', {
        fallbackData: 'text-davinci-003'
    });

    const sendMessage = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!prompt) return;

        const input = prompt.trim();
        setPrompt('');

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        const notification = toast.loading('ChatGPT is thinking...');

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, 
                chatId, 
                model, session
            })
        }).then(() => {
            toast.success('ChatGPT has responded!', {
                id: notification
            })
        })
    }

  return (
    <div className="stretch my-4 mx-auto flex flex-row gap-3 w-8/12">
        <div className="w-full border border-[#ffffff26] text-gray-400 rounded-2xl text-sm">
            <form 
                onSubmit={sendMessage} 
                className="p-3 space-x-5 flex">
                <input 
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-800"
                    placeholder="Message ChatGPT..."
                />
                <button 
                    disabled={!prompt || !session}
                    type="submit"
                    className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-2 py-2 rounded-lg disabled:bg-zinc-700 disabled:cursor-not-allowed">
                    <ArrowUpIcon className="h-4 w-4 text-black" />
                </button>
            </form>

            <div className="md:hidden">
                <ModelSelection />
            </div>
        </div>
    </div>
  )
}

export default ChatInput
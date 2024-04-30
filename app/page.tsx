import { SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-2xl font-bold mb-20">How can I help you today?</h1>
      <div>
        <div className='stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
          <div>
            <div className="flex flex-col space-y-2">
              <p className="infoText">
                <span className="truncate text-white">Plan a trip</span>
                <span className="truncate opacity-50">to experience Seoul like a local</span>
              </p>
              <p className="infoText">
                <span className="truncate text-white">Write a thank-you note</span>
                <span className="truncate opacity-50">to a guest speaker for my class</span>
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-2">
              <p className="infoText">
                <span className="truncate text-white">Brainstorm names</span>
                <span className="truncate opacity-50">for my new podcast on urban design</span>
              </p>
              <p className="infoText">
                <span className="truncate text-white">Write a thank-you note</span>
                <span className="truncate opacity-50">to my interviewer</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
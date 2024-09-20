import React from 'react'
import Header from './Header'
import { PlayListCard } from './MusicPlayer'


function Music() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
            <Header />
            <div className='w-screen h-screen flex items-center justify-center bg-red-100 text-center'>
                <PlayListCard />

            </div>


        </div>
    )
}

export default Music

import React from 'react'
import Header from './Header'
import { PlayListCard } from './MusicPlayer'


function Music() {
    return (
        <div className="relative w-screen h-screen">
            <div className='flex text-center items-center justify-center'>
                <Header />
            </div>
            <div className='flex text-center items-center justify-center'>
                <PlayListCard />

            </div>


        </div>
    )
}

export default Music

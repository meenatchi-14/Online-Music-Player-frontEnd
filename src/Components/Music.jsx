import React from 'react'
import Header from './Header'
import { PlayListCard } from './MusicPlayer'


function Music() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
            <Header />
            <div className='flex text-center items-center justify-center'>
                <PlayListCard />

            </div>


        </div>
    )
}

export default Music

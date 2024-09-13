import React from 'react'
import Header from './Header'
const Dashboard = () => {
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <Header />
            <div className="w-[60%] p-2 my-2 flex items-center bg-purple-400">
                DashBoard
            </div>
        </div>
    )
}

export default Dashboard 

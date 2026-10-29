import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import StudentInput from './pages/StudentInput'
import AdminDashboard from './pages/AdminDashboard'
import EvaluationResult from './pages/EvaluationResult'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
             <Route path="/student" element={<StudentInput />} />
             <Route path="/result/:id" element={<EvaluationResult />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/*
            <Route path="/result/:id" element={<EvaluationResult />} />
            <Route path="/success/:id" element={<SubmissionSuccess />} /> */}
        </Routes>
    )
}

export default App

import React, { createContext, useContext, useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import AuthForm from "./pages/AuthForm"
import Categories from "./pages/Categories"
import Dashboard from "./Dashboard/Dashboard"
import AddBlog from "./Dashboard/AddBlog"
import MyBlogs from "./Dashboard/MyBlogs"

function App() {
  const Navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/blog/categories" element={<Categories />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="add-blog" replace />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="my-blogs" element={<MyBlogs />} />
        </Route>

      </Routes>
    </>
  )
}

export default App

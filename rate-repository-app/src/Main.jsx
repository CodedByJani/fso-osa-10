import React from "react";
import { NativeRouter, Routes, Route } from "react-router-native";

import AppBar from "./components/AppBar";
import RepositoryList from "./components/RepositoryList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SingleRepository from "./components/SingleRepository";
import ReviewForm from "./components/ReviewForm";

const Main = () => {
  return (
    <NativeRouter>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-review" element={<ReviewForm />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
      </Routes>
    </NativeRouter>
  );
};

export default Main;

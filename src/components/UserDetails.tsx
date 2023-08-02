import React from "react";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { userId } = useParams();
  return (
    <div>
    
      <h1 className="">User {userId}</h1>
    </div>
  );
}

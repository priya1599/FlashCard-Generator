/* in this file we are creating the header of our website which contains the routes to create new page to create flashcard
and the route to myFlashcard page which will display all the flashcard  */

import React from 'react';
import { NavLink}  from 'react-router-dom';


const Header = (props) => { // Here we are passing props to use functionality of dark mode/light mode
 
  return (
    <div className="py-5 mt-0 ml-4 mr-4" id="flash-creators-heading"
    style={{ color: props.mode === "white" ? "black" : "white" }}
    >

      {/* Heading of the flashcard website */}

      <h2 className="text-3xl font-semibold mb-6 ml-36">Create Flashcard</h2>

     {/* Navigation button for creating a new flash card . */}

     <div className="flex items-center space-x-10 mb-3 text-gray-800" 
     style={{ color: props.mode === "white" ? "gray" : "white" }}>
    <button className="text-xl font-semibold ml-40">
      <NavLink to={"/"}
       /*if the link is actve it will give bottom background to create new of red color */

       style={({ isActive }) => ({
        borderBottom: isActive ? "4px solid red" : undefined,
        color: isActive ? "red" : undefined,
        paddingBottom: "12px",
        borderRadius: "3px",
      })}>
        Create New
      </NavLink>
    </button>


        {/* Navigation button for displaying the created flashcard . */}
       <button className="text-xl font-semibold ml-3 ">
        <NavLink  to={"/MyFlashCard"}
         style={({ isActive }) => ({
          borderBottom: isActive ? "4px solid red" : undefined,
          color: isActive ? "red" : undefined,
          paddingBottom: "12px",
          borderRadius: "3px",
        })}>
       My Flashcard
       </NavLink>
        </button>
        </div>
        <hr className="border bg-black-700 border-gray-300 mb-0 ml-36 mr-36" />
    </div>
  );
};

export default Header

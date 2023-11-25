
// By using formik library here we are creating CreateFlashCard page to take input from user and create flashCard.

import React, {useRef, useState } from "react";
import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import  FlashCardSchema  from "../validations/schema/cardsSchema";
import {
  AiOutlineUpload,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus 
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setFlashCard } from "../app/feature/flashcardSlice";
import demoimage from "../assets/images/demoimage.jpg";
import TextError from "../validations/customErrorForm/TextError";
import { nanoid } from "@reduxjs/toolkit";


const CreateFlashCard = (props) => {
const dispatch = useDispatch(); //for dispaching or action 
const filePickerRef = useRef(null);
const editRef = useRef(null);
const [groupImg, setGroupImg] = useState(""); /*State for group image. Set initial value as empty.
/*we are creating a functin which will take values and actions as parameter and will dispatch the action to create flashcard on calling and will reset the form and change the group image to empty string. */


const filePicker = useRef(null);
const [singleImg, setSelectImg]=useState("");

const addFlashCard = (values, actions) => {
  dispatch(setFlashCard(values));
  actions.resetForm();
  setGroupImg("");
  setSelectImg("");
  actions.setSelectImg(false);
};

return (
    <Formik
    initialValues={{
      groupid: nanoid(), //to create unique group id
      groupname: "",
      groupdescription: "",
      groupimg: null,
      selectimg: null,
      singleImg: null,
      
      cards: [
        {
          cardid: nanoid(), // To create unique card id
          cardname: "",
          carddescription: "",
        },
      ],
      createOn: new Date(Date.now()).toLocaleString(),
    }}
      validationSchema = {FlashCardSchema} //giving validation schema to the form to show error if values entered are wrong 
      onSubmit={addFlashCard}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          // Here we are creating a Form for  create group, Upload Image, group desciption to the flashcard

    <Form className=" text-black text-bold font-medium ">
    <div className='md:flex flex-col px-10 py-4 bg-white drop-shadow-lg space-y-4  ml-36 mr-36 rounded-lg' style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(30 41 59)" }}>
      <div className="flex flex-col sm:flex-row items-center space-x-10 pt-2 text-gray-600 text-lg md:flex-row">
      <div className="flex flex-col relative ">
        <label style={{ color: props.mode === "white" ? "black" : "white" }} htmlFor='createGroup'>Create Group *</label>
        <Field
                  type="text"
                  name="groupname" 
                  id="createGroup"
                  placeholder="   Enter Group Name "
                  className="border-gray-300 md:w-96 h-9 border-2  focus:ring-gray-500 focus:border focus:border-gray-700 rounded-lg" 
                  style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(15 23 42)", color: props.mode === "white" ? "black" : "white" }}
                />
          <ErrorMessage component={TextError} name="groupname" />
          </div>
          {/*if the group image is present it will display the group image 
              else it will give the button to add group image from your device and then display it.*/}

          { groupImg ? (
            <image
            src={demoimage}
            alt="groupImg"
            className="w-28 h-28 object-contain"
            />
          ):(
            
          <button style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(12 74 110)" , color: props.mode === "white" ? "black" : "white"}}
          type='button'
          onClick={() => filePicker.current.click()}
          className="md:flex items-center px-10 py-2 mt-6 h-9 text-lg bg-white border-2 border-slate-300 active:border-blue-600 
          text-blue-700 font-semibold  space-x-2 rounded-lg"
          >
          <AiOutlineUpload className='w-6 h-6'/><label>Upload Image</label>
          <input
          type='file'
          ref={filePicker}
          value={groupImg}
          onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
                    reader.onload = () => {
                    setFieldValue("groupimg", reader.result);
                    setGroupImg(reader.result);
                  };
                }}
                hidden
                />
                </button>
                )}
                </div>
                <div className='flex flex-col w-full sm:w-[70%] text-gray-600 text-lg'>
                  <label style={{ color: props.mode === "white" ? "black" : "white" }} htmlFor='addDescription' className='mb-2'>
                    Add Description
                  </label>
                  <Field
                  as="textarea"
                  name="groupdescription"
                  id="addDescription"
                  rows={3}
                  placeholder="   Enter Group Description"
                  className="resize-none border-gray-300 border-2 focus:ring-gray-400 focus:border focus:border-gray-400 rounded-lg "
                  style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(15 23 42)", color: props.mode === "white" ? "black" : "white" }}
                  />
                  <ErrorMessage component={TextError} name='groupdesciption'/>
                  </div>
                </div>


             {/*here we are creating the form for adding card and taking values of card field */}

             <div className='text-black drop-shadow-lg pt-5 ml-36 mr-36'>
             <FieldArray name="cards">
              {(arrayHelper) => {
                const cards = values.cards;
                return(
                  <div className=''>
                    {cards && cards.length > 0
                    ? cards.map((cards, index) => (
                      <div
                      className='flex rounded-t-lg items-center space-x-10 bg-white px-5 lg:px-10 py-1'
                      style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(30 41 59)" }}
                      key={index}
                      >
                        <div className='w-8 h-8 px-5 py-5  flex items-center justify-center bg-red-600 text-white font-semibold rounded-full opacity-95'>
                          {index + 1}
                          </div>
                          <div className='flex flex-col space-y-4 md:space-x-10 md:flex-row '>
                            <div className='relative flex flex-col  justify-center  text-gray-600 text-lg'>
                           <label  className="" style={{ color: props.mode === "white" ? "black" : "white" }} >
                            Enter Term*
                            </label>
                      <Field
                      type="text"
                      id="enterTerm"
                      placeholder="term name"
                      name={`cards.${index}.cardname`}
                      innerRef={editRef}
                      
                      className="border-gray-300 w-full md:w-80 border-2 focus:ring-gray-500 focus:border focus:border-gray-700 rounded-lg"
                      style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(15 23 42)", color: props.mode === "white" ? "black" : "white" }}
                    />
                    <ErrorMessage
                    component={TextError}
                    name={`cards.${index}.cardname`}
                    />
                    </div>

                    
                    <div className='relative flex flex-col justify-center space-y-0 text-gray-600 text-lg'>
                      <label style={{ color: props.mode === "white" ? "black" : "white" }} htmlFor='enterTerm' className=''>
                        Enter Defination*
                      </label>

                      <Field
                      as = "textarea"
                      id = "enterDefination"
                      placeholder="term definition"
                      name = {`cards.${index}.carddescription`}
                      className = "resize-none md:w-80 border-gray-300 border-2 focus:ring-gray-400 focus:border focus:border-gray-400 rounded-lg  md:flex-row"
                      style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(15 23 42)", color: props.mode === "white" ? "black" : "white" }}
                      />
                      <ErrorMessage
                      component={TextError}
                      name={`cards.${index}.carddescription`}
                      />
                      </div>

                      <div className='flex items-center space-x-2 md:flex'>
                        {singleImg ?(
                          <img src={singleImg} alt="singleImg" 
                          className='w-28 h-28 object-contain'
                          />
                          ):(
                            <button style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(12 74 110)" , color: props.mode === "white" ? "black" : "white"}}
                            type='button'
                            onClick={()=>
                            filePickerRef.current.click()
                            }
                            className={`md:flex-row px-10 py-1 mt-6 bg-white border-2 border-slate-300
                            active:border-blue-600 text-blue-600 font-semibold rounded-md space-x-2 text-lg`} >
                            
                            <input 
                             type="file" 
                             ref={filePickerRef}
                             value={singleImg}
                             onChange={(e)=>{
                              const file = e.target.files[0]
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onload = () =>{
                                setFieldValue("img", reader.result);
                                setSelectImg(reader.result);
                              };
                             }}
                             hidden         
                             />
                             <span>Select Image</span>
                             </button>
                             )}
                             <div className='flex items-center justify-around md:flex-col md:space-y-5 md:mt-5'>
                              <button 
                              type='button'
                              onClick={() => arrayHelper.remove(index)} //Will remove flashcard entry
                              >
                                <AiOutlineDelete className ='w-7 h-7 text-blue-700 ' style={{ color: props.mode === "white" ? "blue" : "white" }}/>
                                </button>

                                <button
                                type='button'
                                onClick={() => editRef.current.focus()} 
                                >
                                <AiOutlineEdit className ='w-7 h-7 text-blue-700' style={{ color: props.mode === "white" ? "blue" : "white" }}/>
                                </button>
                                </div>
                            </div>
                         </div>
                     </div>
                    ))
                   :null}
                   <div style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(30 41 59)" }} className='bg-white rounded-b-lg flex w-full mb-10 px-5 py-2'>
                    <button
                    type='button'
                    //Add Flashcard entry
                    onClick={() => 
                    arrayHelper.push({
                      cardid:nanoid(),
                      cardname: "",
                      carddescription: "",
                    })
                    }
                    //creating add more button
                    className="flex items-center text-blue-700  mb-2 mt-0 ml-10 text-lg">
                      <AiOutlinePlus/>
                      <span>Add More</span>
                      </button>
                      </div>

                      <div className='flex justify-center w-full pb-5'>
                        <button
                        disabled={isSubmitting}
                        type="submit"
                        data-testid="create"
                        className='py-1 px-14 bg-red-600 text-white rounded-md text-lg'>
                          Create</button> {/* Create button which will submit the form when clicked on by the user  */}
                      </div>
                      </div>
                   );
                 }}
              </FieldArray>
            </div>
        </Form>
     )}
    </Formik>
  )
}
export default CreateFlashCard

import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../store";
import CreateFlashCard from "../../pages/CreateFlashCard";
import user from "@testing-library/user-event";

describe("Create New Flashcard - Required Check", () => {
    render(
      <Provider store={store}>
        <CreateFlashCard />
      </Provider>
    );
  
    it("Should show warnings on fields that are not filled", async () => {
      const cardName = screen.getByPlaceholderText(/group name/i);
      user.type(cardName, "Test Name");
  
      const cardDesc = screen.getByPlaceholderText(/Enter Group Description/i);
      user.type(cardDesc, "Lo");
  
      const termName = screen.getByPlaceholderText(/term name/i);
      user.type(termName, "Test Term Name");
  
      const termDef = screen.getByPlaceholderText(/term definition/i);
      user.type(
        termDef,
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, odit."
      );
  
      user.click(screen.getByTestId("create"));
     });
  });
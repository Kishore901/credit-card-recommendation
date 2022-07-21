import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Home({ cards, setCards }) {
  const myRef = useRef(null);

  const history = useHistory();
  const divRef = useRef(null);

  const [answer, setanswer] = useState("");
  const [istyping, setistyping] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [chats, setchats] = useState([
    {
      id: 1,
      content: "What is your Name?",
      alignedLeft: true,
    },
  ]);

  const [questions, setquestions] = useState([
    {
      id: 2,
      content: "What is your age ?",
      alignedLeft: true,
    },
    {
      id: 3,
      content: "What is your credit score ?",
      alignedLeft: true,
    },
    {
      id: 4,
      content: "What is your monthly salary ?",
      alignedLeft: true,
    },
    {
      id: 5,
      content:
        "Thanks for the input! Please upload your bank transaction and shoot your questions at me!",
      alignedLeft: true,
    },
  ]);

  const [userData, setUserData] = useState({
    name: "",
    age: "",
    salary: "",
    cScore: "",
  });

  const [selectedfile, setselectedfile] = useState(null);

  const [saved, setSaved] = useState(false);

  const handleUserData = () => {
    setSaved(true);
  };

  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    setselectedfile(event.target.files[0]);
    const data = new FormData();
    data.append("files", event.target.files[0]);
    data.append("name", userData.name);
    data.append("age", userData.age);
    data.append("salary", userData.salary);
    data.append("cscore", userData.cScore);

    console.log(data.values);
    const options = {
      method: "POST",
      body: data,
    };

    fetch("http://localhost:5000/", options)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setCards(res);

        // history.push("/cards");
        setShowResult(true);
      });
  };

  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  function onlyLetters(str) {
    return /^[a-zA-Z ]+$/.test(str);
  }

  const useranswer = (e) => {
    e.preventDefault();
    console.log("length", chats.length);
    if (answer.length !== 0) {
      if (chats.length === 1) {
        if (onlyLetters(answer)) {
          setUserData({ ...userData, name: answer });
        } else {
          toast.warn("Please enter valid name!");
          return;
        }
      }
      if (chats.length === 3) {
        if (Number(answer) > 0 && Number(answer) <= 100) {
          setUserData({ ...userData, age: answer });
        } else {
          toast.warn("Please enter valid age!");
          return;
        }
      }

      if (chats.length === 5) {
        if (Number(answer) >= 300 && Number(answer) <= 900) {
          setUserData({ ...userData, cScore: answer });
        } else {
          toast.warn("Please enter valid credit score!");
          return;
        }
      }
      if (chats.length === 7) {
        console.log(Number(answer));
        if (Number.isInteger(Number(answer)) && Number(answer) > 0) {
          setUserData({ ...userData, salary: answer });
        } else {
          toast.warn("Please enter valid salary!");
          return;
        }
      }
      if (questions.length > 0) {
        if (questions.length === 1) {
          handleUserData();
        }
        const temp = questions[0];
        console.log(temp, answer);

        setquestions(questions.slice(1));
        setchats([
          ...chats,
          {
            id: 0,
            content: answer,
            alignedLeft: false,
          },
          temp,
        ]);
      } else {
        setistyping(true);
        console.log("**");
        setchats([
          ...chats,
          {
            id: 0,
            content: answer,
            alignedLeft: false,
          },
        ]);
        //fetch
        console.log(JSON.stringify({ answer }));
        fetch("http://localhost:5000/chatbot", {
          method: "POST",
          body: JSON.stringify({ answer }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((res) => {
            console.log(res);
            setistyping(false);
            setchats([
              ...chats,
              {
                id: 0,
                content: answer,
                alignedLeft: false,
              },
              {
                id: 0,
                content: res,
                alignedLeft: true,
              },
            ]);
          });
      }
      setanswer("");
    }
  };

  // useEffect(() => {
  //   console.log("running", divRef);
  //   divRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chats]);

  return (
    <>
      <Navbar executeScroll={executeScroll} />
      <div className="w-full flex justify-between mt-24">
        <div className="ml-20 mt-10 header">
          <h2 className="text-4xl  tracking-wide">
            Confused on what credit Card to choose ?
          </h2>
          <div className="text-3xl mt-5">We got you!</div>
          <button
            onClick={executeScroll}
            className="text-xl mt-10 upload-button p-3 rounded-xl flex items-center justify-around hover:bg-black hover:text-white tracking-wider w-52"
          >
            Test Now <AiOutlineArrowRight className="ml-2" />
          </button>
        </div>
        <img
          className="h-96 mr-10 rounded-3xl"
          src="./creditcard.gif"
          alt="creditcard"
        ></img>
      </div>
      <div className="features-section mt-20 py-20 flex justify-center text-white">
        <div className="feature-inner-section flex-col justify-center items-center text-center tracking-wider">
          <img className="feature-images-1 h-64" src="./p2.png" alt="" />
          <div className="text-xl">Personalized Results</div>
          <div className="w-full flex justify-center text-gray-300 text-sm">
            <div className="w-60 pt-5">
              Get Personalized results depending upon your transaction
            </div>
          </div>
        </div>
        <div className="feature-inner-section flex-col text-center w-full tracking-wider">
          <img className="feature-images-2 h-72" src="./p3.png" alt="" />
          <div className="text-xl">No Questionnaire Model</div>
          <div className="w-full flex justify-center text-gray-300 text-sm">
            <div className="w-60 pt-5">
              Your Recommendation purely depends on your transactions
            </div>
          </div>
        </div>
        <div className="feature-inner-section flex-col justify-center items-center text-center tracking-wider">
          <img className="feature-images-3 h-72" src="./p4.png" alt="" />
          <div className="text-xl">Wide Range of Cards</div>
          <div className="w-full flex justify-center text-gray-300 text-sm">
            <div className="w-60 pt-5">
              Recommended from 100+ curated credit Cards
            </div>
          </div>
        </div>
      </div>
      <div ref={myRef} className="flex flex-col justify-center items-center">
        {/* <form onSubmit={handleUserData} className="mb-8">
          <div className="flex mb-4">
            <input
              disabled={saved ? true : false}
              name="name"
              required
              type="text"
              placeholder="Enter your name"
              className="w-3/6 border-2 p-3 mr-8 rounded-lg outline-none"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <input
              disabled={saved ? true : false}
              name="age"
              required
              type="text"
              placeholder="Age"
              className="w-3/6 border-2 p-3 rounded-lg outline-none"
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
            />
          </div>
          <div className="flex">
            <input
              disabled={saved ? true : false}
              name="salary"
              required
              type="text"
              placeholder="Monthly Income"
              className="w-3/6 border-2 mr-8 p-3 rounded-lg outline-none"
              value={userData.salary}
              onChange={(e) =>
                setUserData({ ...userData, salary: e.target.value })
              }
            />
            <input
              disabled={saved ? true : false}
              name="cScore"
              required
              type="text"
              placeholder="Credit Score"
              className="w-3/6 border-2 p-3 rounded-lg outline-none"
              value={userData.cScore}
              onChange={(e) =>
                setUserData({ ...userData, cScore: e.target.value })
              }
            />
          </div>
          <div className="mt-12 flex justify-center">
            <button
              disabled={saved ? true : false}
              className="border-2 border-black p-3 rounded-xl w-60 flex items-center justify-around hover:bg-black hover:text-white cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </div>
        </form> */}

        {/*  */}
        <div className="flex justify-center p-6">
          <div className="max-w-2xl border rounded bg-white">
            <div>
              <div className="w-full">
                <div className="relative flex items-center p-3 border-b border-gray-300">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src="https://img.freepik.com/free-vector/cute-robot-waving-hand-cartoon-illustration_138676-2744.jpg"
                    alt="username"
                  />
                  <span className="block ml-2 font-bold text-gray-600">
                    Chotu
                  </span>
                  <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                </div>
                <div
                  ref={divRef}
                  className="chatbox relative p-6 overflow-y-scroll h-[25rem] w-[40vw]"
                >
                  <ul className="space-y-2">
                    {/* <li className="flex justify-start">
                      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                        <span className="block">Hi</span>
                      </div>
                    </li> */}
                    {chats.map((chat, index) => (
                      <li
                        key={index}
                        className={`pt-2 flex ${
                          chat.alignedLeft
                            ? " justify-start rounded-xl"
                            : " justify-end"
                        }`}
                      >
                        <div className="relative max-w-xl  text-gray-700 rounded shadow">
                          <span
                            className={`block px-4 py-2 ${
                              chat.alignedLeft ? "bg-gray-200" : ""
                            }`}
                          >
                            {chat.content}
                          </span>
                        </div>
                      </li>
                    ))}
                    {istyping && (
                      <li>
                        <img
                          className="h-16 mt-5"
                          src="./oop-tehe.gif"
                          alt=""
                        />
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                  <form
                    action=""
                    onSubmit={useranswer}
                    className="flex justify-between w-full"
                  >
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setanswer(e.target.value)}
                      placeholder="Message"
                      className="block w-full py-2 pl-4 mx-3 bg-gray-200 rounded-full outline-none border-2 border-black focus:text-gray-700"
                      name="message"
                      required
                    />
                    <button type="submit">
                      <svg
                        className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {saved && (
          <form action="">
            <label htmlFor="pdf-file">
              <input
                onChange={onChangeHandler}
                type="file"
                id="pdf-file"
                className="hidden"
                accept="application/pdf"
              />
              <div className="upload-pdf-button p-3 text-2xl rounded-xl w-72 flex items-center justify-around h-20 hover:bg-black hover:text-white cursor-pointer">
                Upload PDF <BiUpload className="text-3xl" />
              </div>
            </label>
          </form>
        )}
        {showResult && (
          <div className="mt-6">
            <div
              onClick={() => {
                history.push("/cards");
              }}
              className="upload-pdf-button p-3 text-2xl rounded-xl w-72 flex items-center justify-around h-20 hover:bg-black hover:text-white cursor-pointer"
            >
              View Results
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

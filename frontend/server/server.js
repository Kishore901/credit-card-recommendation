let { PythonShell } = require("python-shell");
const express = require("express");
const movie = require("./Credit-cards/movies");
const movietravel = require("./Credit-cards/movie_travel");
const moviefood = require("./Credit-cards/movie_food");
const moviebills = require("./Credit-cards/movie_bills");
const movieshopping = require("./Credit-cards/movie_shopping");
const shopping = require("./Credit-cards/shopping");
const shoppingbills = require("./Credit-cards/shopping_bills");
const shoppingfood = require("./Credit-cards/shopping_food");
const shoppingtravel = require("./Credit-cards/shopping_travel");
const travel = require("./Credit-cards/travel");
const travelbills = require("./Credit-cards/travel_bills");
const travelfood = require("./Credit-cards/food_travel");
const food = require("./Credit-cards/food");
const bills = require("./Credit-cards/bills_cards");
const billsfood = require("./Credit-cards/bills_food");

//special cards
const airindia = require("./Credit-cards/special_cards/airindia");
const fbb = require("./Credit-cards/special_cards/fbb");
const indianoil = require("./Credit-cards/special_cards/indianoil");
const indigo = require("./Credit-cards/special_cards/indigo");
const mmt = require("./Credit-cards/special_cards/mmt");
const paytm = require("./Credit-cards/special_cards/paytm");
const shopperstop = require("./Credit-cards/special_cards/shopperstop");
const vistara = require("./Credit-cards/special_cards/vistara");
const yatra = require("./Credit-cards/special_cards/yatra");
const irctcwe = require("./Credit-cards/special_cards/irctcwe");
const flipkart = require("./Credit-cards/special_cards/flipkart");

const specialcards = [
  "airindia",
  "fbb",
  " indianoil",
  "indigo",
  "mmt",
  "paytm",
  "shopperstop",
  "vistara",
  "yatra",
  "irctcwe",
  "flipkart",
];

const file = {
  movie,

  movieshopping,
  shoppingmovie: movieshopping,

  moviebills,
  billsmovie: moviebills,

  moviefood,
  foodmovie: moviefood,

  movietravel,
  travelmovie: movietravel,

  shopping,

  shoppingbills,
  billsshopping: shoppingbills,

  shoppingfood,
  foodshopping: shoppingfood,

  shoppingtravel,
  travelshopping: shoppingtravel,

  travel,

  travelbills,
  billstravel: travelbills,

  travelfood,
  foodtravel: travelfood,

  food,

  bills,

  billsfood,
  foodbills: billsfood,

  airindia,
  fbb,
  vistara,
  indianoil,
  indigo,
  mmt,
  paytm,
  shopperstop,
  yatra,
  irctcwe,
  flipkart,
};
const cors = require("cors");
const app = express();
const path = require("path");
const ObjectsToCsv = require("objects-to-csv");
const categories = require("./Categories/categories");
const multer = require("multer");
const { exec } = require("child_process");
const storage = multer.diskStorage({
  destination: "./",
  filename: function (req, file, cb) {
    cb(null, "base" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const output_data = [];

let user_age = "";
let user_cscore = "";
let user_income = "";

app.listen(5000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/", upload.any(), uploadFiles);

app.post("/chatbot", (req, res) => {
  console.log(req.body);

  let options = {
    mode: "text",
    pythonPath: "./.venv/Scripts/python.exe",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "./",
    args: [req.body.answer],
  };

  PythonShell.run("python3.py", options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("results: %j", results);
    res.json(results[0]);
  });
});

function similar_text(first, second, percent) {
  if (
    first === null ||
    second === null ||
    typeof first === "undefined" ||
    typeof second === "undefined"
  ) {
    return 0;
  }

  first += "";
  second += "";

  var pos1 = 0,
    pos2 = 0,
    max = 0,
    firstLength = first.length,
    secondLength = second.length,
    p,
    q,
    l,
    sum;

  max = 0;

  for (p = 0; p < firstLength; p++) {
    for (q = 0; q < secondLength; q++) {
      for (
        l = 0;
        p + l < firstLength &&
        q + l < secondLength &&
        first.charAt(p + l) === second.charAt(q + l);
        l++
      );
      if (l > max) {
        max = l;
        pos1 = p;
        pos2 = q;
      }
    }
  }

  sum = max;
  if (sum) {
    if (pos1 && pos2) {
      sum += similar_text(first.substr(0, pos1), second.substr(0, pos2));
    }

    if (pos1 + max < firstLength && pos2 + max < secondLength) {
      sum += similar_text(
        first.substr(pos1 + max, firstLength - pos1 - max),
        second.substr(pos2 + max, secondLength - pos2 - max)
      );
    }
  }

  if (!percent) {
    return sum;
  } else {
    return (sum * 200) / (firstLength + secondLength);
  }
}

const searchword = (keyword) => {
  let search_keyword = null;

  const searchindex = categories.findIndex(
    (element) =>
      element.name.toLowerCase().includes(keyword.toLowerCase()) ||
      keyword.toLowerCase().includes(element.name.toLowerCase())
  );

  if (searchindex !== -1) {
    search_keyword = categories[searchindex];
  } else {
    for (var i = 0; i < categories.length; i++) {
      if (
        similar_text(categories[i].name.toLowerCase(), keyword.toLowerCase()) >=
        7
      ) {
        search_keyword = categories[i];
        break;
      }
    }
  }

  return search_keyword;
};

function uploadFiles(req, res) {
  // console.log("idhar", req.body.name);
  user_age = req.body.age;
  user_cscore = req.body.cscore;
  user_income = req.body.salary;

  console.log(req.files);
  exec("node server.js");
  python_extraction(res);
  // res.json({ message: "Successfully uploaded files" });
}

const python_extraction = (res) => {
  let options = {
    mode: "text",
    pythonPath: "./.venv/Scripts/python.exe",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "./",
    args: ["Kishore"],
  };

  PythonShell.run("python.py", options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    // console.log("results: %j", results);
    console.log("Running second now");

    const expectedJSON = require("./extracted.json");

    expectedJSON.map((data) => {
      if (data.Description) {
        data["Txn Date"] = data["Txn Date"].replace("\r", " ");
        // console.log(data);
        let searched_object = searchword(data.Description);
        // console.log(searched_object);
        if (searched_object) {
          data.category = searched_object.cat;
          output_data.push(data);
        }
      }
      // console.log(data);
    });
    // console.log(output_data);

    const csv = new ObjectsToCsv(output_data);

    csv.toDisk("./list.csv").then(() => {
      console.log("csv converted bro");
      triggerRFM(res);
    });

    // script2();
  });
};

const mapthecards = (results, res) => {
  const user_specific = results.slice(0, 2);
  const user_frequent = results.slice(2);

  //taking dummy ["movie", "shopping"]
  // const user_specific = ["movie", "shopping"];

  const joint_features = user_specific.join("");

  // console.log(file[joint_features]);

  const final_results = [];
  const final_results_id = [];

  user_frequent.map((special_club) => {
    const index = specialcards.indexOf(special_club);
    if (index > 0) {
      console.log(index);
      console.log("hry", specialcards[index]);
      file[`${specialcards[index]}`].map((club) => {
        if (
          user_age >= club.minAge &&
          user_age <= club.maxAge &&
          user_cscore >= club.cScore &&
          user_income >= club.income
        ) {
          console.log("hry", specialcards[index]);

          if (
            !final_results_id.includes(club.name) &&
            final_results.length < 5
          ) {
            console.log("hry", specialcards[index]);

            console.log(final_results.length);
            final_results.push(club);
            final_results_id.push(club.name);
          }
        }
      });
    }
  });

  // for (let i = 0; final_results.length !== 5; i++) {
  //   movieshopping
  // }
  file[joint_features].map((club) => {
    if (
      user_age >= club.minAge &&
      user_age <= club.maxAge &&
      user_cscore >= club.cScore &&
      user_income >= club.income
    ) {
      final_results.push(club);
      final_results_id.push(club.name);
    }
  });

  //with eligibility
  if (final_results.length < 5) {
    file[user_specific[0]].map((club) => {
      if (
        user_age >= club.minAge &&
        user_age <= club.maxAge &&
        user_cscore >= club.cScore &&
        user_income >= club.income
      ) {
        if (!final_results_id.includes(club.name) && final_results.length < 5) {
          console.log(final_results.length);
          final_results.push(club);
          final_results_id.push(club.name);
        }
      }
    });
    file[user_specific[1]].map((club) => {
      if (
        user_age >= club.minAge &&
        user_age <= club.maxAge &&
        user_cscore >= club.cScore &&
        user_income >= club.income
      ) {
        if (!final_results_id.includes(club.name) && final_results.length < 5) {
          console.log(final_results.length);
          final_results.push(club);
          final_results_id.push(club.name);
        }
      }
    });
  }

  if (final_results.length < 5) {
    file[user_specific[0]].map((club) => {
      if (!final_results_id.includes(club.name) && final_results.length < 5) {
        console.log(final_results.length);
        final_results.push(club);
        final_results_id.push(club.name);
      }
    });
    file[user_specific[1]].map((club) => {
      if (!final_results_id.includes(club.name) && final_results.length < 5) {
        console.log(final_results.length);
        final_results.push(club);
        final_results_id.push(club.name);
      }
    });
  }

  // for (let i = 0; final_results.length !== 5; i++) {
  //   final_results.push()
  // }
  console.log(final_results);
  res.send(JSON.stringify(final_results));
};

// RFM Code

let options2 = {
  mode: "text",
  pythonPath: "./.venv/Scripts/python.exe",
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: "./",
  args: ["Aniket"],
};

const triggerRFM = (res) => {
  PythonShell.run("python2.py", options2, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("results: %j", results);

    mapthecards(results, res);
    // results is an array containing data from RFM.
  });
};

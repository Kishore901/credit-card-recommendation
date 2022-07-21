const express = require("express");
const app = express();
const ObjectsToCsv = require("objects-to-csv");
const categories = require("./frontend/server/Categories/categories");

app.listen(4000);

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
        3
      ) {
        search_keyword = categories[i];
        break;
      }
    }
  }

  return search_keyword;
};

const input_data = [
  {
    index: 0,
    date: "23-03-2029",
    keyword: "star",
    debit: "230",
  },
  {
    index: 1,
    date: "23-03-2029",
    keyword: "myntra India",
    debit: "230",
  },
  {
    index: 2,
    date: "23-03-2029",
    keyword: "paytmbill",
    debit: "230",
  },
  {
    index: 3,
    date: "23-03-2029",
    keyword: "--",
    debit: "230",
  },
  {
    index: 4,
    date: "23-03-2029",
    keyword: "myntra",
    debit: "230",
  },
];

const output_data = [];

app.get("/", async (req, res) => {
  input_data.map((data, index) => {
    let searched_object = searchword(data.keyword);
    if (searched_object) {
      data.category = searched_object.cat;
      output_data.push(data);
    }
  });
  console.log(output_data);

  const csv = new ObjectsToCsv(output_data);

  await csv.toDisk("./list.csv");

  res.send("hello");
});

import React from "react";

const Recommend = ({ cards, setCards }) => {
  return (
    <>
      <div className="my-6 mx-4">
        <div className="text-xl">
          Suggestions for you after analysing your spending behavior.
        </div>
        <p className="text-sm">Click on the card for more information.</p>
      </div>
      <div className="w-full flex justify-evenly items-baseline flex-wrap mt-10">
        {/* Cards */}
        {cards &&
          cards.map((card, index) => (
            <a
              className="cards rounded-md p-4 m-4 w-1/4 h-fit overflow-hidden"
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <div>
                <img src={card.img} alt="credit-card" className="h-48" />
                <div className="mt-4 font-semibold">{card.name}</div>
                <div className="text-sm">
                  <div className="font-semibold">Benefits:</div>
                  <ul>
                    {card.benefits.map((ben, index) => (
                      <li className="list-disc ml-4" key={index}>
                        {ben}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-evenly font-light mt-5">
                  <div className="flex flex-col items-center">
                    <div className="font-semibold">Joining Fee</div>
                    <div className="font-semibold">{card.joiningFee}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-semibold">Renewal Fee</div>
                    <div className="font-semibold">{card.renewalFee}</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
      </div>
    </>
  );
};

export default Recommend;

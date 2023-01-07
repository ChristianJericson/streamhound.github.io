import axios from "axios";

import { useState } from "react";


export default function Home() {
  const [title, setTitle] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [titleDetails, setTitleDetails] = useState(null);
  const [streamingInfo, setStreamingInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTitle = async () => {
    try {
      setLoading(true);
      const res = await axios.get("api/search/", {
        params: { title },
      });
      const { data } = res;
      setSearchResults(data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getTitleDetails = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get("api/details/", {
        params: { id },
      });
      const { data } = res;
      setLoading(false);
      setTitleDetails(data);
      setStreamingInfo(data.streamingAvailability.country.US);
    } catch (error) {
      setLoading(false);
    }
  };


 


  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-background font-poppins items-center min-h-screen"> 

      <img

       src={"hound.png"}

       width="150" height="150"

      />

      <h1 className="text-6xl font-bold text-primary mt-15">
        <span className="text-active">Stream</span> Hound
      </h1>

      

      <h2 className="text-primary text-2xl font-light mt-6 font-ebas">
        Search 150+ Streaming
        platforms for your favourite media
      </h2>

      <form
        className="sm:mx-auto mt-20 justify-center sm:w-full sm:flex"

        onSubmit={(e) => {

          getTitle();

          e.preventDefault();

          e.stopPropagation();

        }}
      >
        <input // handles user input

          type="text"

          className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"

          placeholder="Enter a movie/show title"

          onChange={(e) => {

            setTitle(e.target.value);

            setSearchResults(null);

            setTitleDetails(null);

          }}
        />

        <div className="mt-4 sm:mt-0 sm:ml-3">

          <button //search button

            className="block w-full rounded-lg px-5 py-3 bg-active text-base text-secondary font-bold focus:outline-none focus:ring-2 focus:ring-primary sm:px-10"
            type="submit"
          >
            {loading ? <>Loading..</> : <>Search</>}

          </button>

        </div>

      </form>

      {searchResults && ( //handles search results using search.js

        <div className="mt-10">

          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {searchResults

              .filter((item) => item.imageurl && item.imageurl[0]) //deletes results with no images

              .map((item) => (

                <div key={item.title} className="pt-6">

                  <div className="flow-root bg-light rounded-lg px-4 pb-8">

                    <div className="-mt-6">

                      <div className="flex items-center justify-center">

                        <span className="p-2">

                          {item.imageurl && item.imageurl[0] && (

                            <img

                              src={item.imageurl[0]}

                              className="w-full h-full rounded-lg"

                              alt={item.title}
                            />
                          )}
                        </span>

                      </div>

                      <div className="text-center justify-center items-center">

                        <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">

                          {item.title}

                        </h3>

                        <span className="mt-2 text-sm text-secondary block">

                          {item.released} - {item.genre[0]}

                        </span>

                        <p className="mt-4 text-sm leading-relaxed text-secondary block">

                          {item.synopsis}

                        </p>

                        {titleDetails?.imdbid === item.imdbid ? (

                          <span className="mt-4 block max-w-2xl text-primary">

                            {streamingInfo ? (

                              <>
                                Available on:
                                <span className="flex mt-2 text-base gap-2 justify-center">

                                  {streamingInfo.map((item) => {

                                    return (

                                      <a
                                        href={item.url}

                                        className="text-active underline"

                                      >
                                        {item.platform}

                                      </a>

                                    );

                                  })}

                                </span>

                              </>

                            ) : (

                              <>Not available on any service.</> //prints if no available site streams it

                            )}
                          </span>

                        ) : (

                          <button //button to handle streaming details

                            className="mt-5 text-md  text-active"

                            onClick={() => {

                              getTitleDetails(item.imdbid);

                            }}
                          >

                            Streaming Details &darr; 
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

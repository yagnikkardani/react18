import React, { useState, useTransition } from 'react';
// import statement

function App() {  //Main Component
  const [isPending, startTransition] = useTransition(); //useTransition Hook Declaration
  const [images, setImages] = useState(null) //useState hook

  const loadData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/photos") // Here, we are fetching data from a Free API
      .then(response => response.json())
      .then(data => setImages(data)) // Store data into our state variable - 'images'
      .catch(err => console.log(err))
  }

  return (
    <>
      <button onClick={() => {
        startTransition(() => {
          loadData()
        }); // Wrapped our loadData into startTransition.
      }}>NEXT</button> 
      <div style={{ opacity: isPending ? 0.5 : 1, // isPending is the state value of our useTransition hook. 
        }}          // when transition is ongoing, isPending returns True, otherwise False
      >
        <DisplayImages imgs={images} /> 
        {/* This is another Component, whose prop depends on loadData() which is wrapped in startTransition() */}
      </div>
    </>
  );
}

const DisplayImages = ({ imgs }) => {
  for (var a = [], i = 0; i < 10000; ++i) a[i] = i; // Created an array of 10000 numbers.
  const getIndex = (index) => { return index < 4999 ? index : index - 5000 } 
  // In this function, index will restart from 0 after 4999, because we just have 5000 data in our API and we need 10000
  // We made it large to take longer time.
  return (
    <>
      {imgs && a.map((ele, index) => <img src={imgs[getIndex(index)]?.url} // url from data will load the images.
                                          alt='LOGO' 
                                          style={{ height: 50, width: 50 }} // set smaller size to fit more images.
                                          key={index} />)}
    </>
  )
}

export default App;
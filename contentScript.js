const {fetch: origFetch} = window;
window.fetch = async (...args) => {
  console.log("fetch called with args:", args);
  const response = await origFetch(...args);
  
  /* work with the cloned response in a separate promise
     chain -- could use the same chain with `await`. */
// debugger;
  response
    .clone()
    .json()
    .then(body => {
        console.log("intercepted response:", body);
    })
    .catch(err => console.error(err))
  ;
    
  /* the original response can be resolved unmodified: */
  return response;
  
  /* or mock the response: */
//   return {
//     ok: true,
//     status: 200,
//     json: async () => ({
//       userId: 1,
//       id: 1,
//       title: "Mocked!!",
//       completed: false
//     })
//   };
};

// test it out with a typical fetch call
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(json => console.log("original caller received:", json))
  .catch(err => console.error(err))
;
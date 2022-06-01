import React, { useReducer } from 'react';
// import statement

// Init function with initialData as an argument
const init = (initialData) => {
    return {parentAge: initialData,
            childAge: Math.round(initialData / 3)};
    // return the data after calculation.
}

// reducer function of type ~ (state, action) => newState
const reducer = (state, action) => {
    //Perform the action as per the given type.
    switch (action.type) {
      case 'parent':
        return {parentAge: action.payload, 
                childAge: Math.round(action.payload/3)};
      case 'child':
        return {childAge: Math.round(action.payload), 
                parentAge: action.payload*3};
      case 'reset':
        return init(action.payload);
      default:
        throw new Error();
    }
}
  
export default function AgeFinder({initialCount}) {
    const initialData = 50; // Default value of initialData
    
    // Defined the useReducer hook
    const [state, dispatch] = useReducer(reducer, initialData, init);

    return (
      <>
        Parent Age: {state.parentAge}
        <br/>
        <input value={state.parentAge} 
            onChange={(e)=>{
                dispatch({type: "parent", payload: e.target.value});
            }}
        /> {/* Input field to enter the age of parent */}
        <br/>
        Child Age: {state.childAge}
        <br/>
        <input value={state.childAge} 
            onChange={(e)=>{
                dispatch({type: "child", payload: e.target.value});
            }}
        /> {/* Input field to enter the age of child */}
        <button
          onClick={() => dispatch({type: 'reset', payload: initialData})}>
          Reset
        </button>
      </>
    );
}
  
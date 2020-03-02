const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const inc_good = { 
        ...state, 
        good: state.good + 1
      }
      return inc_good
    case 'OK':
      const inc_ok = { 
        ...state, 
        ok: state.ok + 1
      }
      return inc_ok
    case 'BAD':
      const inc_bad = { 
        ...state, 
        bad: state.bad + 1
      }
      return inc_bad
    case 'ZERO':
      const zero = { 
        ...state, 
        good: 0,
        ok: 0,
        bad: 0
      }
      return zero
    default: return state
  }
  
}

export default counterReducer
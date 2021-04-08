export default (_object, stateValue = {}, allowWrite = false) => {

  let _get = () => {}

  if(allowWrite){
    _get = function() {
      return stateValue
    }
  }else{
    _get = function() {
      return {...stateValue}
    }
  }

  Object.defineProperty(_object, 'state', {

    get: _get,

    set: function(newData = null) {
      _object.ifSetState = false

      if (newData === null || newData === undefined)
        return false

      for (const [key, value] of Object.entries(newData)) {
        if (stateValue.hasOwnProperty(key)) {
          if (stateValue[key] !== value && areEquals(stateValue[key], value) === false) {
            stateValue[key] = value
            _object.ifSetState = true
          }
        }
      }
    }
  });
};

function areEquals(valueOne, valueTwo) {
  if (typeof valueOne === 'object')
    return JSON.stringify(valueOne) === JSON.stringify(valueTwo)

  return false
}
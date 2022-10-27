# Car storage API

## **getAllModels()**

return the name of all models in storage as an array of strings.
the name is added to the array only once.

## **getCar(key, value)**
get all cars that matches the givwn key-value pair.
- returns car objects in an array.
- if there is no match , an empty array is returned.

### Example
```js
getCar('model', 'Fast GT');
getCar('licence', 'ABC-1');
```

## **getAllcars()**
returns all car objects in an array or an empty array
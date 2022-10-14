# JSON (JavaScript Object Notation)

## Documentation
www.json.org
in json we need to use only doblequets

## File expension
.json

## values
- string
- number
- array
- object
- true
- false
- null 

### examples

### string
must be doublequoted
empty string:
""

```json
"this is a string"
"here is a \"quote\" in the 'middle'"
"hearts symbol is \u2665"
```

### Number 
- no leading +
- only one leading 0
- deciml delimiter is .

these are allowed:
```json
0, 0.5, 345.567, 1200, 1.5E10,c 2E-2, 2E +2, -1, -11.5, -0.567
```

these are not allowed:
```json
000.34, +20, 00030
````

### Array
Array begins with [ and ends with ]. Values in array are separeted by a comma.

#### examples
```json
[1,2,3,4,5]
["textA", "textB"],
[true, null, false]
[
    {"name": "Alexandra"},
    {"name": "Marina"}
]

[
    [1,2,3]
    [4,5,6]
]
```

### Object

An object begit with { and ends with}. The object consists of comma separeted key-value pairs. The key and value separated by colon :

```json
{
    "firstname": "Matt",
    "lastname": "River"
}
```
```json
{
    "firstname": "Leila",
    "children": [
        {"firstname": "Vera", "age": 5},
        {"firstname": "Jesse",
         "age": 7,
         "toys": ["doll", "ball"]
         }
    ]
}
```
```json
{
    "key1": "value1",
    "key2": "value2",
    "key3": [1,2,3],
    "key4": {
        "a": 1,
        "b": "text",
        "c": [7,8,9],
        "d": {
            "x" : true,
            "y" : false,
            "w" : 2
        }
    }
}
```
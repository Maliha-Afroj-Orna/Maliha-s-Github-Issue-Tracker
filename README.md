1. What is the difference between var, let, and const?
   
➡️ (i) var is hoisted.
	let and const are hoisted but in Temporal Dead Zone.
   (ii) In var we can redeclare with same name.
	But in let and const we can't redeclare with same name.
  (iii) var and let allow reassignment.
	But const doesn't allow reassignment.
   (iv) var maintains only function scope or global scope, but does not maintain block scope.
        let and const maintain all scope.

2. What is the spread operator (...)?
   
➡️ Spread(...) operator is used to expand the elements of an array/object into another array/object. It makes a copy of the array/object.

For Example: arr1 =[1, 2, 4]
	     arr2 = [...arr1] = [1, 2, 4]

3. What is the difference between map(), filter(), and forEach()?
   
➡️ map() returns a new array after modifying the elements, filter() returns an array of elements that match a condition, forEach() is used for looping - it does not return anything.

4. What is an arrow function?
   
➡️ Arrow function is the short form of traditional function using (=>).

For Example: const loadData = () => {}

5. What are template literals?
   
➡️ Template literals are used to create strings using ``. We can also use dynamic values inside ``. For dynamic values we use `${}`.




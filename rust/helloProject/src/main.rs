// In Rust the main function should always be called as fn main. If you don't specificly define it then it will throw Eroror
// And a function / variable should be written in snake case
// Snake Case: hello_world (Right)
// Kebab Case: hello-world (Wrong)
fn main() {
    println!("Hello, CRAB from CARGO!");
    // Rust has signed (+ and -) and unsigned (only +) integer types of different sizes.
    // i8, i16, i32, i64, i128: Signed integers.
    // u8, u16, u32,u64, u128: Unsigned integers.
    // i32 - 2147483647
    // i64 - 9223372036854775
    let a: i32 = -2147483647;
    let b: i64 = -9223372036854775;
    let y: u32 = 2147483647;
    let z: u64 = 9223372036854775;
    println!("a = {}, b = {}, y = {}, z = {}", a, b, y, z);

    // Flots [Floting Point Types]
    let pi: f64 = 3.14;
    println!("Value of pi = {}", pi);

    // Booleans [Boolean Types True or False]
    let is_snowing: bool = true;
    println!{"Is today is snowing? {}", is_snowing};

    // Characters [Character Types]
    let letter: char ='a';
    println!{"The first letter of the alphabet is: {}", letter};

    // Compound Data Types [Compound Data Types]:
    // 1. Arrays
    let numbers: [i32; 5] = [1,2,3,4,5];
    // So, in Rust we have 2 formats to render something with println!
    // 1. Debuggable
    // 2. Display
    println!("Number Array: {:?}", numbers);

    // let mix = [1,2,3, "apple", true];
    // println!("Mix Array: {}", mix);

    let fruits: [&str; 3] = ["Apple", "Banana", "Orange"];
    println!("Fruits Arrary: {:?}", fruits);
    println!("Fruits Arrary 1st Item: {}", fruits[0]);
    println!("Fruits Arrary 2nd Item: {}", fruits[1]);
    println!("Fruits Arrary 3rd Item: {}", fruits[2]);

    // Tuples
    let human: (String, i32, bool) = ("Adam".to_string(), 30, false);
    println!("Human Tuple: {:?}", human);

    let my_mix_tuple = ("Kratos", 23, true, [1,2,3,4,5]);
    println!("My Mix Tuple: {:?}", my_mix_tuple);

    // Slices: [Contagies Sequence Of Data] = [1,2,3,4,5]
    let number_slices:&[i32] = &[1,2,3,4,5];
    println!("Number Slice: {:?}", number_slices);

    let animal_slices:&[&str] = &["Lion", "Elephant", "Crocodile"];
    println!("Animal Slice: {:?}", animal_slices);

    let book_slices:&[ String] = &["Maththamatics".to_string(), "Physics".to_string(), "Chemistry".to_string()];
    println!("Book Slice: {:?}", book_slices);

    // Warning [All variables of Rust langueage is immutable means you cannot change it by default]
    // Strings Vs String Slices (&str)
    // Strings [Growable, Mutable, Owned String Type]
    let mut stone_cold: String = String::from("Ohh, ");
    stone_cold.push_str("Yeah!");
    println!("Stone Cold Says: {}", stone_cold);

    // B- &stc (String Slice)
    let string: String = String::from("Hello, World!");
    let slice: &str = &string[0..5];
    println!("Slice Value: {}", slice);


    hello_world();
    tell_height(182);
    human_id("Emon", 21, 182.2);


    let _X: i32 = {
        let price: i32 = 5;
        let qty: i32 = 10;
        price * qty
    };

    println!("Result is : {}", _X);
    let y = add(4,6);
    println!("Value of y is : {}", y);
    println!("Value from function 'add' is {}.",  add(4,6));
    // Calling the BMI function
    let weight: f64 = 70.0;
    let height: f64 = 1.82;
    let bmi = calculate_bmi(weight, height);
    println!("Your BMI is: {:.2}", bmi);
    // Rust Ownership Rues(3):
    each_value_in_rust_has_an_owner();
    there_can_be_only_one_owner_at_a_time();
    when_the_owner_goes_out_of_scope_the_value_will_be_dropped();
}

//const _X = {
    // code
//};

fn hello_world(){
    println!("Hello, Rust CRAB! from hello_world function")
}

fn tell_height(height: u32){
    println!("My height is {} cm.", height)
}

fn human_id(name: &str, age: u32, height: f32){
    println!("My name is {}, I am {} years old, and my height is {} cm.", name, age, height)
}

fn add(a: i32, b: i32) -> i32{
    a + b
}

// Ecpressions and Statements
// Expression: It is anything that returns a value.
// Statement: It is anything that does not returns a value.


// Expression
// -----------------------------------
// 5
// true & false
// add(3,4)
// 1. Variable Defination
// 2. if condition {value1} else {value2} && control flow like while loop and etc plus so on...
// 3. Function Defination
// Final Exaple;
// BMI = weight(kg)/height(m)*2
fn calculate_bmi(weight_kg: f64, height_m: f64) -> f64{
    weight_kg / (height_m * height_m)
}

// Statement
// ------------------------------------
// All the other things are mostly statements. I know you yeah ((You)) know that so do not ask me that.

// Ownership, Borrowing and Refrences
// Ownership
// -----------------------------------------
// C, C++ -> Memory Management Control Issue
// Garbage Collector solved the issue, but created another new issue
// [stops/Resums the programs]
// Rust has solved the issue by introducing Ownerships to solve memory safety issues and high perfomance at the same time.
// What is Ownership?
// Every value has a single owner [every varible has one value, and it is its sole owner].
// Ownership Rules:(3)
// 1. Each value in Rust has an owner.
fn each_value_in_rust_has_an_owner(){
    let s1 = String::from("RUST");
    let len = calculate_length(&s1);
    println!("Length of '{}' is {}.", s1,len);
}
fn calculate_length(s: &String) -> usize{
    s.len()
}
// 2. There can be only one owner at a time.
fn there_can_be_only_one_owner_at_a_time(){
    let s1 = String::from("RUST");
    let s2 = s1;
    // println!("{}", s1); (This will not work cause we transferred the ownership of s1 to s2)
    println!("{}", s2)
}
// 3. When the owner goes out of scope, the value wil be dropped.
fn when_the_owner_goes_out_of_scope_the_value_will_be_dropped(){
    let s1 = String::from("RUST");
    let len = calculate_length(&s1);
    println!("Length of '{}' is {}.", s1,len);
}
// Outside of the scope s1 is defined it will go out of scope and its value will be dropped.
// fn printLost(s: &string){
//    println!("{}", &s1); =====================> We cannot access s1 here!
// }

fn calculate_length(s: &String) -> usize{
    s.len()
}






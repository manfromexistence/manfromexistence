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


    let _x: i32 = {
        let price: i32 = 5;
        let qty: i32 = 10;
        price * qty
    };

    println!("Result is : {}", _x);
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
    // when_the_owner_goes_out_of_scope_the_value_will_be_dropped();

    create_a_reference();

    // ================================================================================================================================================================================================
    let mut account = BankAccount{
        owner: "Alice".to_string(),
        balance: 150.55,
    };

    // Immutable borrow to check the balance.
    account.check_balance();

    // Mutable borrow to widraw money.
    account.withdraw(45.5);

    // And if you widrawen your balance then you must check your balance again just to be safe!
    account.check_balance();


    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    declaring_variable();
    declaring_constants();
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    shadowing();
    shadowing_spaces();
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* 
        We all know about the comments. So, nothing to learn here
    */
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Control Flow in Rust. Like:
    /* 
        1. if else statement
        2. for loop
        3. while loop
        4. etc...
    */
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
// fn when_the_owner_goes_out_of_scope_the_value_will_be_dropped(){
//     let s1 = String::from("RUST");
//     let len = calculate_length(&s1);
//     println!("Length of '{}' is {}.", s1,len);
// }

// Outside of the scope s1 is defined it will go out of scope and its value will be dropped.
// fn printLost(s: &string){
//    println!("{}", &s1); =====================> We cannot access s1 here!
// }

// fn calculate_length(s: &String) -> usize{
//    s.len()
//}

// ===============================================================================================================================================
// Borrowing and References
// ===============================================================================================================================================
// So, this is for safety and performance issues.Borrowing is a way to allow multiple references to one piece of data.
// References are a way to borrow data without taking ownership of it.
// Understanding Borrowing and References
// --------------------------------------------------------------------------------------------------------------------------------------------------------
// Borrowing is a way to allow multiple references to one piece of data.
// Borrowing and References are similar to pointers in C.
// There are two types of references in Rust:
// 1. Immutable Reference: &T
// 2. Mutable Reference: &mut T
// Create a reference of a by using the & operator.
// So, you can only have one mutable reference or many immutable references.
fn create_a_reference(){
    let mut _x: i32 = 5;
    // let r: i32 = _x; // This is not good cause here we are taking ownership of x totally so x wil no longer be available anymore.
    let _r: &mut i32 = &mut _x; // This is good cause we are borrowing x. But notice that we no saying anything about mutability.
    
    *_r += 1;
    *_r -= 3;

    println!("Value of _x is {}", _x);
    // println!("Value of _r is {}", _r);
}


// ===============================================================================================================================================
// Stucts are also in C and C++ code.
struct BankAccount {
    owner: String,
    balance: f64,
}

impl BankAccount {
    fn withdraw(&mut self, amount: f64) {
        println!("Withdrawing {} from account owned by {}", amount, self.owner);
        self.balance -= amount;
    }

    fn check_balance(&self){
        println!("Account owned by {} has a balance of {}", self.owner, self.balance);
    }
}
// ===========================================================================================================================================================================================================================================
// [So, this "&" sign's name is ampersand]
// Variables & Mutability
// When the variable is immutable its value cannot be after its value is assined. And still you try to do so then you will get a compile error at your face!
fn declaring_variable(){
    let mut a = 5;
    println!("So, the value of a is {}", a);
    a = 10;
    println!("So now again, the value of a is {}", a);
}
// ==========================================================================================================================================================================================================================================
// Constants
// This is like variable or I say borrowed from javascript.(LOL). So, constants are not allowed to change!
// That means you cannot use mut in constants
// So, it is a feature of using (const)s that you can decalre it in GLOBAL scope. But that does mean you are a good or international programmer! (FREE KNOWLEDGE FOR EVERBODY!)
// That means you can decalre a const here there anywhere in Rust with obiously type annotation (CAUSE YOU ALREADY SIGN YOUR NAME AS A RUST PROGRAMMER AND NOW YOU CANNOT BACK-OFF FROM THIS RESPONSIBILITY LIKE YOUR YOU DAD
// DID WHEN HE WENT OUT TO BORROW SOME MILK FOR YOU AND NEVER CAME BACK || THIS TYPE OF SORROW WILL NEVER COME TO YOUR LIFE AGAIN CAUSE AS A RUST DEVELOPER YOU WILL GET A LIFETIME SUPPLY OF COPIUM
// AND YOU WILL BE SEEN JUST MESSING AROUND SHOUTING ABUOT RUST AND WHY IT IS BETTER AND SAFER AND ETC... THAN ANY OTHER PROGRAMMING LANGUAGES OUT THERE!)
// sORRY I THOUGHT CONST IN RUST IS CAMEL-CASE BUT NOT IT JUST THE BOUNCH OF UPPER CASE LETTER. YEAH, I KNOW THAT SUCKS!
fn declaring_constants(){
    let x = 5; // Plus use mut when it is not nessasary cause or else Rust will show a waring
    const Y: u16 = 10; // This is not according to Rust Rules. | You should provide data type annotation while declaring a constants :) So, why you might ask? Here is the answer(BECAUSE I SAID SO!!!) | And constants should be in camel-case I guess I am a react guy so this is something that you have to accept from me.
    // Cause in Rust Rules it just says the constant should be a UpperCase letter as a scrapy React.js developer by a lot of means I will probably assume that's means use a Camel-Case word! LOL 
    println!("The value of LET x is {}", x);
    println!("The value of CONST Y is {}", Y);
    println!("The value of CONST PI declare above no.. no... in the bottom of this function is {}", PI);
    println!("The value of CONST THREE_HOURS_IN_SECONDS declare above no.. no... in the bottom of this function is {}", THREE_HOURS_IN_SECONDS);
}
const PI: f64 = 3.141592653;
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;

// ===========================================================================================================================================================================================================================
// Shadowing
// So, what is shadowing? You might wonder. So, the answer is my friend is: currently at this exact time while I am writing this I don't know either. Let me learn this first then I will try to mess up with it later.
// As the Rust all knowing Rust Book tell us in their Rust Book
fn shadowing(){
    let x = 5;     // Let us take this x as x number 1. (x = 5)
    let x = x + 1; // So, now This x can be said as x number 2. Is accually x number 1 with +1 right. (x = 6)
                   // So, the first x was shadowed by the second x.
                   // And when you print x the compiler will ignore first x and and just focus on the second x.
                   // You can do this as many time as you want.
                   // So now x = 6; and if keep doing it the x will increase as it is 7, 8, and so on...
    println!("In the middle of the function x is: {}", x);
    {               
                   // So, now x is 6 times 2 = 12;
        let x = x * 2;
        println!("And in the inner funcion x is: {}", x);
                    // In the inner function x is now 12
    }

    let x = x * 10000;
    println!("In the outer main function x is: {}", x);
    println!("After shadowing all other x's the value of x is: {}", x);
}
// Shadowing is simply means if you create a variable with the same name and letting the first one as a ingored code!
// So, in the shadowing dark world the last shadow holds all the power!
// Last but not least so, shadowing a variable is different than marking a variable as mutable.
// Cause if you just simply try to re assign a shadowing value without let then you will face the TRUTH as a ERROR!
// Here is another example clarifying this shadowing mess
// So, let say you want to know how much space do you have in a variables like this:
function shadowing_spaces(){
    let spaces = "     ";       // Here, the spaces variable is type string.
    let spaces = spaces.len();  // But, here the spaces variable is type number.
                                // If you try to act smart and use mut here then Rust will send you a gift as ERROR!
    println!("The value of shadowed_spaece is {}", spaces);
    // let mut spaces = "     ";   // still a string type. But as I try to mutate it as number type using our same old mutate keyword
    // spaces = spaces.len();      // Ther will be a ERROR and it will say that we're not allowed to mutate a varable's type.
}



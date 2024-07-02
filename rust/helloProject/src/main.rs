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
    let human: (&str, i32, bool) = ("Adam", 30, false);
    println!("Human Tuple: {:?}", human);
}

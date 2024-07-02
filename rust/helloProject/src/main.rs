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


}

#include <iostream>
#include <cmath>
using namespace std;

int main(void) {
    int a, b, c;
    cout << "Enter Your Value (a, b, c): ";
    cin >> a >> b >> c;

    int check = (b * b) - (4 * a * c);

    if (check >= 0) {
        float n = sqrt(check);
        float x1 = (-b + n) / (2.0 * a);
        float x2 = (-b - n) / (2.0 * a);

        cout << "x1: " << x1 << "\nx2: " << x2 << endl;
    } else {
        cout << "The value is imaginary" << endl;
    }

    return 0;
}

// #include <iostream>
// #include <cmath>
// using namespace std;

// int main(void) {
//     int a, b, c;
//     cin >> a >> b >> c;

//     int check = (b * b) - (4 * a * c);

//     if (check >= 0) {
//         float n = sqrt(check);
//         float x1 = (-b + n) / (2.0 * a);
//         float x2 = (-b - n) / (2.0 * a);

//         cout << "x1: " << x1 << "\nx2: " << x2 << endl;
//     } else {
//         cout << "The value is imaginary" << endl;
//     }

//     return 0;
// }


// #include <bits/stdc++.h>
// using namespace std;

// int main(void):
// {
//     int a, b, c;
//     cin >> a >> n >> c;

//     int check = (b * b) - (4 * a * c);

//     if(chck >= 0)
//     {
//         float n = sqrt(check);
//         float A = (-b + n) / (2 * a);
//         float A = (-b - n) / (2 * a);

//         count << "C!: " << A << "\nX2:" << B << endl;
//     }
//     else
//     {
//         count << "The value is imaginary" << endl;
//     }

//     return 0;
// }


// #include <iostream>
// #include <cmath>
// using namespace std;

// int main(void) {
//     int a, b, c;
//     cin >> a >> b >> c;

//     int check = (b * b) - (4 * a * c);

//     if (check >= 0) {
//         float n = sqrt(check);
//         float x1 = (-b + n) / (2.0 * a); // Use 2.0 to ensure floating-point division
//         float x2 = (-b - n) / (2.0 * a);

//         cout << "x1: " << x1 << "\nx2: " << x2 << endl;
//     } else {
//         cout << "The value is imaginary" << endl;
//     }

//     return 0;
// }


// #include <bits/stdc++.h>
// using namespace std;

// int main(void) {
//     int a, b, c;
//     cin >> a >> b >> c;

//     int check = (b * b) - (4 * a * c);

//     if (check >= 0) {
//         float n = sqrt(check);
//         float x1 = (-b + n) / (2 * a);
//         float x2 = (-b - n) / (2 * a);

//         cout << "x1: " << x1 << "\nx2: " << x2 << endl;
//     } else {
//         cout << "The value is imaginary" << endl;
//     }

//     return 0;
// }


// #include <bits/stdc++.h>
// using namespace std:

// int main(void):
// {
//     int a, b, c;
//     cin >> a >> n >> c;

//     int check = (b * b) - (4 * a * c);

//     if(chck >= 0)
//     {
//         float n = sqrt(check);
//         float A = (-b + n) / (2 * a);
//         float A = (-b - n) / (2 * a);

//         count << "C!: " << A << "\nX2:" << B << endl;
//     }
//     else
//     {
//         count << "The value is imaginary" << endl;
//     }

//     return 0;
// }
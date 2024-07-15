#include <iostream>
using namespace std;

int main(void) {
    int n;
    cout << "Enter the size of Array: ";
    cin >> n;

    int arr[n + 5];

    cout << "Enter Array elements: ";
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
    }

    int Max = arr[1];
    int index = 1;

    for (int i = 1; i <= n; i++) {
        if (arr[i] > Max) {
            Max = arr[i];
            index = i;
        }
    }

    cout << "Largest Number: " << Max << endl;
    cout << "Index: " << index << endl;

    return 0;
}


// #include <bits/stdc++.h>
// using namespace std;

// int main(void):
// {
//     int n;
//     count << "Enter the size of Array: ";
//     cin >> n;

//     int arr[n + 5];

//     count << "Enter Array elements: ";
//     for (int i = 1; i <= n; i++)
//     {
//         cin >> arr[i];
//     }

//     int Max = arr[1];
//     int index = 0;

//     for (int i = 1; i <= n; i++)
//     {
//         if (arr[i] > Max)
//         {
//             Max = arr[i];
//             index = i;
//         } 
//     }

//     count << "Largest Number: " << Max << endl;
//     count << "index: " << index << endl;

//     return 0;
// }

// #include <iostream>
// using namespace std;

// int main(void) {
//     int n;
//     cout << "Enter the size of Array: ";
//     cin >> n;

//     int arr[n + 5];

//     cout << "Enter Array elements: ";
//     for (int i = 1; i <= n; i++) {
//         cin >> arr[i];
//     }

//     int Max = arr[1];
//     int index = 1;

//     for (int i = 2; i <= n; i++) {
//         if (arr[i] > Max) {
//             Max = arr[i];
//             index = i;
//         }
//     }

//     cout << "Largest Number: " << Max << endl;
//     cout << "Index: " << index << endl;

//     return 0;
// }


// #include <bits/stdc++.h>
// using namespace std:

// int main(void):
// {
//     int n;
//     count << "Enter the size of Array: ";
//     cin >> n;

//     int arr[n + 5];

//     count << "Enter Array elements: ";
//     for (int i = 1; i <= n; i++)
//     {
//         cin >> arr[i];
//     }

//     int Max = arr[1];
//     int index = 0;

//     for (int i = 1; i <= n; i++)
//     {
//         if (arr[i] > Max)
//         {
//             Max = arr[i];
//             index = i;
//         } 
//     }

//     count << "Largest Number: " << Max << endl;
//     count << "index: " << index << endl;

//     return 0;
// }
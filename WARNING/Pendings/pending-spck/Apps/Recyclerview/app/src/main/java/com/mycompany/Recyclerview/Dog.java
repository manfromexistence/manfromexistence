package com.mycompany.Recyclerview;
import java.util.List;
import java.util.ArrayList;

public class Dog {
    private String Name;
    private String Email;

    public void setEmail(String email) {
        Email = email;
    }

    public String getEmail() {
        return Email;
    }
    
    


public void setName(String name)
{
Name = name;
}

public String getName()
{
return Name;
}
public static List<Dog> createFakeDogs(int n){
    List<Dog> dogs= new ArrayList<>();
    for (int i = 0; i < n; i++){
        Dog dog=new Dog();
        String name="Name"+": "+"App1o"+i;
        String email="Email"+ ": "+"ajju40959"+i+"@gamil.com";
        dog.setName(name);
        dog.setEmail(email);
        dogs.add(dog);
    }
    return dogs;
    
}}

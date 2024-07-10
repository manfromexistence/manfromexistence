package com.mycompany.myapp;
import android.app.Fragment;
import android.view.View;
import android.os.*;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.widget.Toast;
import android.util.Log;
import android.content.Intent;

public class fragment1 extends Fragment{
	View View;
    Button fbtn1;
	
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){

		View = inflater.inflate(R.layout.fragment1,container,false);
		Button button = (Button) View.findViewById(R.id.fbtn1);
		button.setText("Hello world");
		button.setOnClickListener(new OnClickListener()
			{
				@Override
				public void onClick(final View v){
					
					
					
					Intent intent= new Intent(getContext() , activity3.class);
					startActivity(intent);
					
					try {
						Toast.makeText(getActivity(),"Yes This is fragment",Toast.LENGTH_SHORT).show();
						
			
						
						
					} catch (Exception e) {
						Toast.makeText(getActivity(),"Yes This is fragment",Toast.LENGTH_SHORT).show();
					}
					Log.d("~~~","~~~ llllllloookkkoonButtonSomethingiiiiuuujhjjjjhhhjuuuuujjuiiiiiiiiiiiiiiii");
				} 
			}); 
		
		
			
			
			
			
			
			
		return View;
	}
}





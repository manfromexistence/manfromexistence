package com.mycompany.myapp;
import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;
import android.view.View;
import android.widget.Toast;
import android.content.Intent;
import android.view.Menu;
import java.util.zip.Inflater;
import android.app.Fragment;
import android.app.FragmentTransaction;
import android.app.FragmentManager;



public class MainActivity extends Activity { 
    Intent i = new Intent();
    Button btn1,btn2,btn3,btn4,btn5,bs1,bs2;
	
	
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
		
		loadFragment1(new fragment1());
	
	    bs1=findViewById(R.id.bs1);
		bs2=findViewById(R.id.bs2);
	    btn1=findViewById(R.id.btn1);
		btn2=findViewById(R.id.btn2);
		btn3=findViewById(R.id.btn3);
		btn4=findViewById(R.id.btn4);
		btn5=findViewById(R.id.btn5);
		
		
		btn1.setOnClickListener(new View.OnClickListener(){
				@Override
				public void onClick(View v){


					Toast.makeText(getApplicationContext(),
								   "This is Toast",Toast.LENGTH_SHORT).show();
					i.setClass(MainActivity.this,activity1.class);
					startActivity(i);
				}});
				
				
		btn2.setOnClickListener(new View.OnClickListener(){
				@Override
				public void onClick(View v){


					Toast.makeText(getApplicationContext(),
								   "This is Toast2",Toast.LENGTH_SHORT).show();

					i.setClass(MainActivity.this,activity2.class);
					startActivity(i);
				}});




		btn3.setOnClickListener(new View.OnClickListener(){
				@Override
				public void onClick(View v){


					Toast.makeText(getApplicationContext(),
								   "This is Toast3",Toast.LENGTH_SHORT).show();
					i.setClass(MainActivity.this,activity3.class);
					startActivity(i);

				}});		


		btn4.setOnClickListener(new View.OnClickListener(){
				@Override
				public void onClick(View v){


					Toast.makeText(getApplicationContext(),
								   "This is Toast4",Toast.LENGTH_SHORT).show();
					i.setClass(MainActivity.this,activity4.class);
					startActivity(i);

				}});	



		btn5.setOnClickListener(new View.OnClickListener(){
				@Override
				public void onClick(View v){


					Toast.makeText(getApplicationContext(),
								   "This is Toast5",Toast.LENGTH_SHORT).show();
					i.setClass(MainActivity.this,activity5.class);
					startActivity(i);

				}});	


		
				
				
				
		bs2.setOnClickListener(new View.OnClickListener(){
				@Override
				public void onClick(View v){
					Toast.makeText(getApplicationContext(),
								   "This is Fragment2",Toast.LENGTH_SHORT).show();
					loadFragment2(new fragment2());
				}});}
	public void loadFragment2(Fragment Fragment){
		FragmentManager fm= getFragmentManager();
		FragmentTransaction ft=fm.beginTransaction();
		ft.replace(R.id.frameLayout,Fragment);
		ft.commit();

		
		
		
		bs1.setOnClickListener(new View.OnClickListener(){
				@Override
				public void onClick(View v){
					Toast.makeText(getApplicationContext(),
					"This is Fragment1",Toast.LENGTH_SHORT).show();
					loadFragment1(new fragment1());
				}});}
	public void loadFragment1(Fragment Fragment){
		FragmentManager fm= getFragmentManager();
		FragmentTransaction ft=fm.beginTransaction();
		ft.replace(R.id.frameLayout,Fragment);
		ft.commit();
		
		
		
		
		

				
				}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
	getMenuInflater().inflate(R.menu.menu_items,menu);

		return true;
	}
}

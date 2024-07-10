package com.mycompany.myapp;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.app.FragmentManager;
import android.app.Fragment;
import android.app.FragmentTransaction;

public class activity3 extends Activity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity3);
		loadFragment1(new fragment1());
		
		
		
		}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		menu.add(0,0,0,"Hello");
		menu.add(0,0,0,"Hello");
		menu.add(0,0,0,"Hello");
		menu.add(0,0,0,"Hello");

		return super.onCreateOptionsMenu(menu);
	}
	
	public void loadFragment1(Fragment Fragment){
		FragmentManager fm= getFragmentManager();
		FragmentTransaction ft=fm.beginTransaction();
		ft.replace(R.id.activity3FrameLayout1,Fragment);
		ft.commit();


		
	
    }
}

package com.mycompany.myapp;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;

public class activity1 extends Activity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity1);
		
		
		
}
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		menu.add(0,0,0,"Hello");
		menu.add(0,0,0,"Hello");
		menu.add(0,0,0,"Hello");
		menu.add(0,0,0,"Hello");

		return super.onCreateOptionsMenu(menu);
	}

	
    
    
}

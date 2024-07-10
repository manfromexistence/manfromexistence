package com.myapp.navigation;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import com.google.android.material.navigation.NavigationView;
import androidx.appcompat.app.ActionBarDrawerToggle;
import android.os.Bundle;
import android.database.sqlite.SQLiteDatabase;
import android.os.Environment;

public class MainActivity extends AppCompatActivity 
{
    private Toolbar toolbar;
    private DrawerLayout d;
	private NavigationView n;
    SQLiteDatabase sdb;
	
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        toolbar = (Toolbar) findViewById(R.id.mainToolbar);
        d = findViewById(R.id.mainDrawerLayout);
		n = findViewById(R.id.nav_view);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        
        ActionBarDrawerToggle t = new ActionBarDrawerToggle(this, d, toolbar, R.string.app_name, R.string.app_name);
		d.setDrawerListener(t);
		t.syncState();
		
		
		//sdb=SQLiteDatabase.openOrCreateDatabase(Environment.getExternalStorageDirectory(),getAbsolutePath()+"/mydatabase.sqlite",null);
		
		//sdb=SQLiteDatabase.openOrCreateDatabase(Environment.getExternalStorageDirectory(),getAbsolutePath()+"//mydatabase.sqlite",null);

	
    }
}

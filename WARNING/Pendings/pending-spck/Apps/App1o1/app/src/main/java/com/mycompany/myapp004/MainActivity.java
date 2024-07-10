package com.mycompany.myapp004;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.TextView;
import android.view.View.OnClickListener;
import android.view.View;
import android.view.animation.Animation;
import android.support.transition.AnimatorUtils;
import android.database.sqlite.SQLiteDatabase;


public class MainActivity extends AppCompatActivity  {
    Button start;
    TextView text_animation;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
		
		
	
	start=findViewById(R.id.start);
    text_animation=findViewById(R.id.animation);
    database g=new database(this);
 SQLiteDatabase db=g.getReadableDatabase();
    
      }
}

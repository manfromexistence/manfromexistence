package com.mycompany.Recyclerview;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Adapter;
import android.widget.TextView;
import android.view.ViewGroup;
import android.view.View;
import android.view.LayoutInflater;
import android.util.Log;
import java.util.List;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.LinearLayoutManager;
import android.widget.Toast;




public class MainActivity extends AppCompatActivity {
    
    private RecyclerView list;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
	
        list=findViewById(R.id.recyclerview);
        adapter adaptor= new adapter(Dog.createFakeDogs(80));
        list.setAdapter(adaptor);
        list.setLayoutManager(new LinearLayoutManager(this));
    }
    public class holder extends RecyclerView.ViewHolder implements View.OnClickListener{
        private TextView tv1,tv2;
        
        public holder(View v){
            super(v);
            tv1=itemView.findViewById(R.id.tv1);
            tv2=itemView.findViewById(R.id.tv2);
            itemView.setOnClickListener(this);
        }
        public void bind( Dog dog){
            tv1.setText(dog.getName());
            tv2.setText(dog.getEmail());
        }

        @Override
        public void onClick(View p1) {
			Toast.makeText(getApplicationContext(),
						   "This is Toast",Toast.LENGTH_SHORT).show();
        }

    }
    
    private class adapter extends RecyclerView.Adapter<holder> {
        private List<Dog> mdogs;
       public adapter(List<Dog> dogs){
           mdogs=dogs;
       }

        @Override
        public holder onCreateViewHolder(ViewGroup p1, int p2) {
            LayoutInflater inflator= LayoutInflater.from(MainActivity.this);
            View v= inflator.inflate(R.layout.list,p1,false);
            Log.i("MainActivity", "onCreateViewHolder");
            return new holder(v);
        }

      
        @Override
        public void onBindViewHolder(holder p1, int p2) {
            Dog dog=mdogs.get(p2);
            p1.bind(dog);
            Log.i("MainActivity", "onBindViewHolder");
        }

        @Override
        public int getItemCount() {
            Log.i("MainActivity", "getItemCount");
            return mdogs.size();
        }
    }
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}

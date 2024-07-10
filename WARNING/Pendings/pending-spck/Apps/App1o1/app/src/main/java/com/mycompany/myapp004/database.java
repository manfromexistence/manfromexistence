package com.mycompany.myapp004;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteDatabase;
import android.support.v4.database.DatabaseUtilsCompat;
import android.support.annotation.Nullable;
import android.content.Context;

public class database extends SQLiteOpenHelper {
	
	private static final String dbname="singup.db";
	public database(@Nullable Context context){
		super(context, dbname, null,1);
	}

	@Override
	public void onCreate(SQLiteDatabase p1) {
		String q="create table users (id integer primarykey,name text,username text,password text)";
		p1.execSQL(q);
		
		
		
	}


@Override
	public void onUpgrade(SQLiteDatabase p1, int p2, int p3) {
	}
}
